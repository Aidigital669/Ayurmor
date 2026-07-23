import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import fs from 'fs';
import path from 'path';

// Helper for local file fallback storage if MySQL is offline
const DATA_DIR = path.join(process.cwd(), 'data');
const CONTACTS_FILE = path.join(DATA_DIR, 'contacts.json');

function ensureLocalFile() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(CONTACTS_FILE)) {
    fs.writeFileSync(CONTACTS_FILE, JSON.stringify([]), 'utf-8');
  }
}

function getLocalContacts() {
  ensureLocalFile();
  try {
    const raw = fs.readFileSync(CONTACTS_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    return [];
  }
}

function saveLocalContacts(data: any[]) {
  ensureLocalFile();
  fs.writeFileSync(CONTACTS_FILE, JSON.stringify(data, null, 2), 'utf-8');
}

// POST: Save new Callback / Contact Us request
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, mobile, message } = body;

    if (!name || !email || !mobile) {
      return NextResponse.json(
        { success: false, error: 'Name, Email, and Mobile number are required.' },
        { status: 400 }
      );
    }

    const createdAt = new Date().toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      dateStyle: 'medium',
      timeStyle: 'short'
    });

    let savedInDb = false;

    try {
      // Try DB insert first
      const query = `
        INSERT INTO contacts (name, email, mobile, message, status, created_at)
        VALUES (?, ?, ?, ?, 'new', ?)
      `;
      const [result]: any = await pool.query(query, [
        name.trim(),
        email.trim(),
        mobile.trim(),
        message ? message.trim() : '',
        createdAt
      ]);

      if (result.insertId) {
        savedInDb = true;
      }
    } catch (dbErr) {
      console.warn('DB Contact Insert failed, falling back to local file storage:', dbErr);
    }

    // Always append to local file fallback as well to guarantee no lost data
    const local = getLocalContacts();
    const newEntry = {
      id: Date.now(),
      name: name.trim(),
      email: email.trim(),
      mobile: mobile.trim(),
      message: message ? message.trim() : '',
      status: 'new',
      created_at: createdAt,
      storage: savedInDb ? 'database' : 'file'
    };
    local.unshift(newEntry);
    saveLocalContacts(local);

    return NextResponse.json({
      success: true,
      message: 'Callback request submitted successfully!',
      entry: newEntry
    });
  } catch (error: any) {
    console.error('Contact Submission Error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}

// GET: Retrieve all contact enquiries for Admin Panel
export async function GET() {
  try {
    try {
      const [rows]: any = await pool.query('SELECT * FROM contacts ORDER BY id DESC');
      return NextResponse.json({
        success: true,
        contacts: rows,
        source: 'database'
      });
    } catch (dbErr) {
      console.warn('Fetching contacts from DB failed, using local file:', dbErr);
      const local = getLocalContacts();
      return NextResponse.json({
        success: true,
        contacts: local,
        source: 'file'
      });
    }
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// PUT: Update enquiry status (e.g. 'new', 'contacted', 'resolved')
export async function PUT(req: Request) {
  try {
    const { id, status } = await req.json();

    if (!id || !status) {
      return NextResponse.json(
        { success: false, error: 'Missing contact ID or status.' },
        { status: 400 }
      );
    }

    try {
      await pool.query('UPDATE contacts SET status = ? WHERE id = ?', [status, id]);
    } catch (dbErr) {
      console.warn('DB update failed, updating local file:', dbErr);
    }

    // Update local file fallback as well
    const local = getLocalContacts();
    const updated = local.map((item: any) =>
      item.id === id || String(item.id) === String(id) ? { ...item, status } : item
    );
    saveLocalContacts(updated);

    return NextResponse.json({
      success: true,
      message: 'Contact status updated successfully!'
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// DELETE: Remove an enquiry
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, error: 'Missing ID parameter' }, { status: 400 });
    }

    try {
      await pool.query('DELETE FROM contacts WHERE id = ?', [id]);
    } catch (dbErr) {
      console.warn('DB delete failed, deleting from local file:', dbErr);
    }

    const local = getLocalContacts();
    const filtered = local.filter((item: any) => String(item.id) !== String(id));
    saveLocalContacts(filtered);

    return NextResponse.json({
      success: true,
      message: 'Contact request deleted successfully!'
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
