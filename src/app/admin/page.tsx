'use client';

import { useState, useEffect } from 'react';
import { 
  Plus, Edit2, Trash2, Check, X, RefreshCw, 
  Layers, DollarSign, ShoppingCart, ArrowLeft, 
  Settings, Loader2, Database, ExternalLink, Mail, Phone, Clock
} from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'products' | 'orders' | 'contacts' | 'compliance'>('products');
  const [products, setProducts] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [contacts, setContacts] = useState<any[]>([]);
  const [dbSource, setDbSource] = useState<string>('database');
  const [loading, setLoading] = useState<boolean>(true);
  const [actionLoading, setActionLoading] = useState<boolean>(false);
  const [initDbMsg, setInitDbMsg] = useState<string>('');
  const [dbConnectionError, setDbConnectionError] = useState<string>('');

  // Product Form Modal State
  const [showProductModal, setShowProductModal] = useState<boolean>(false);
  const [editingProduct, setEditingProduct] = useState<any | null>(null);
  const [productForm, setProductForm] = useState({
    title: '',
    category: 'Superfood Malts',
    price: '299',
    rating_count: '100',
    tag: '',
    svg_type: 'abc',
    image: '/product1.png',
    description: '',
    ingredients: '',
    usage_instructions: '',
    nutrition: '',
    benefits: ''
  });

  // Order Details Modal State
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);
  const [orderShippingForm, setOrderShippingForm] = useState({
    shipping_status: 'processing',
    courier_partner: '',
    tracking_number: ''
  });

  // Bigship Shipping Integration State
  const [bigshipWarehouses, setBigshipWarehouses] = useState<any[]>([]);
  const [selectedWarehouse, setSelectedWarehouse] = useState<string>('');
  const [courierRates, setCourierRates] = useState<any[]>([]);
  const [bigshipLoading, setBigshipLoading] = useState(false);
  const [ratesLoading, setRatesLoading] = useState(false);
  const [trackingTimeline, setTrackingTimeline] = useState<any | null>(null);
  const [trackingLoading, setTrackingLoading] = useState(false);
  const [selectedCourierId, setSelectedCourierId] = useState<string>('');

  const fetchWarehouses = async () => {
    try {
      const res = await fetch('/api/admin/bigship?action=warehouses');
      const data = await res.json();
      if (data.status && data.data && data.data.warehouse) {
        setBigshipWarehouses(data.data.warehouse);
        if (data.data.warehouse.length > 0) {
          setSelectedWarehouse(data.data.warehouse[0].warehouseId);
        }
      }
    } catch (err) {
      console.error('Error fetching warehouses:', err);
    }
  };

  const fetchRates = async (orderId: number) => {
    setRatesLoading(true);
    try {
      const res = await fetch(`/api/admin/bigship?action=rates&orderId=${orderId}`);
      const data = await res.json();
      if (data.status && data.data && data.data.calculatedRates) {
        setCourierRates(data.data.calculatedRates);
      } else {
        setCourierRates([]);
      }
    } catch (err) {
      console.error('Error fetching rates:', err);
      setCourierRates([]);
    } finally {
      setRatesLoading(false);
    }
  };

  const fetchTracking = async (orderId: number) => {
    setTrackingLoading(true);
    try {
      const res = await fetch(`/api/admin/bigship?action=track&orderId=${orderId}`);
      const data = await res.json();
      if (data.status && data.data) {
        setTrackingTimeline(data.data);
      }
    } catch (err) {
      console.error('Error fetching tracking:', err);
    } finally {
      setTrackingLoading(false);
    }
  };

  const handleCreateDraft = async (orderId: number) => {
    if (!selectedWarehouse) {
      alert('Please select a pickup warehouse first.');
      return;
    }
    setBigshipLoading(true);
    try {
      const res = await fetch('/api/admin/bigship?action=draft', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId, warehouseId: selectedWarehouse })
      });
      const data = await res.json();
      if (data.status) {
        alert('Draft order created successfully on Bigship!');
        await fetchOrders();
        // Update selected order in local modal state
        const updatedRes = await fetch('/api/admin/orders');
        const updatedData = await updatedRes.json();
        if (updatedData.success) {
          const freshOrder = updatedData.orders.find((o: any) => o.id === orderId);
          if (freshOrder) {
            setSelectedOrder(freshOrder);
            fetchRates(orderId);
          }
        }
      } else {
        alert(`Failed to create draft: ${data.message || 'Unknown error'}`);
      }
    } catch (err: any) {
      alert(`Error creating draft: ${err.message}`);
    } finally {
      setBigshipLoading(false);
    }
  };

  const handleManifestOrder = async (orderId: number, courierId: number) => {
    setBigshipLoading(true);
    try {
      const res = await fetch('/api/admin/bigship?action=manifest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId, courierId })
      });
      const data = await res.json();
      if (data.status) {
        alert(`Shipment manifested successfully! AWB Assigned: ${data.data.awb_assigned}`);
        await fetchOrders();
        const updatedRes = await fetch('/api/admin/orders');
        const updatedData = await updatedRes.json();
        if (updatedData.success) {
          const freshOrder = updatedData.orders.find((o: any) => o.id === orderId);
          if (freshOrder) {
            setSelectedOrder(freshOrder);
            fetchTracking(orderId);
          }
        }
      } else {
        alert(`Failed to manifest order: ${data.message || 'Unknown error'}`);
      }
    } catch (err: any) {
      alert(`Error manifesting: ${err.message}`);
    } finally {
      setBigshipLoading(false);
    }
  };

  const handleDownloadDoc = async (orderId: number, type: string) => {
    try {
      const res = await fetch(`/api/admin/bigship?action=documents&orderId=${orderId}&type=${type}`);
      const data = await res.json();
      if (data.status && data.data && data.data.AttachmentData) {
        window.open(data.data.AttachmentData, '_blank');
      } else {
        alert(`Document not found: ${data.message || 'The document has not been generated by Bigship yet.'}`);
      }
    } catch (err: any) {
      alert(`Error downloading document: ${err.message}`);
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products');
      const data = await res.json();
      if (data.success) {
        setProducts(data.products || []);
        setDbSource(data.source);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchOrders = async () => {
    try {
      const res = await fetch('/api/admin/orders');
      const data = await res.json();
      if (data.success) {
        setOrders(data.orders || []);
        setDbConnectionError('');
      } else {
        setDbConnectionError(data.error || 'Failed to fetch orders.');
      }
    } catch (err: any) {
      console.error(err);
      setDbConnectionError('Database server connection error. Please verify your config settings.');
    }
  };

  const fetchContacts = async () => {
    try {
      const res = await fetch('/api/contact');
      const data = await res.json();
      if (data.success) {
        setContacts(data.contacts || []);
      }
    } catch (err) {
      console.error('Error fetching contacts:', err);
    }
  };

  const handleUpdateContactStatus = async (id: number, status: string) => {
    try {
      const res = await fetch('/api/contact', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status })
      });
      const data = await res.json();
      if (data.success) {
        await fetchContacts();
      } else {
        alert(data.error || 'Failed to update contact status');
      }
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleDeleteContact = async (id: number) => {
    if (!confirm('Are you sure you want to delete this callback enquiry?')) return;
    try {
      const res = await fetch(`/api/contact?id=${id}`, {
        method: 'DELETE'
      });
      const data = await res.json();
      if (data.success) {
        await fetchContacts();
      } else {
        alert(data.error || 'Failed to delete callback enquiry');
      }
    } catch (err: any) {
      alert(err.message);
    }
  };

  const loadData = async () => {
    setLoading(true);
    await Promise.all([fetchProducts(), fetchOrders(), fetchContacts()]);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleInitDb = async () => {
    setActionLoading(true);
    setInitDbMsg('');
    try {
      const res = await fetch('/api/init-db');
      const data = await res.json();
      if (data.success) {
        setInitDbMsg('✓ Database provisioned and seeded successfully!');
        await loadData();
      } else {
        setInitDbMsg(`✗ Error: ${data.error || 'Failed to initialize database.'}`);
      }
    } catch (err: any) {
      setInitDbMsg(`✗ Connection error: ${err.message}`);
    } finally {
      setActionLoading(false);
    }
  };

  const handleOpenAddProduct = () => {
    setEditingProduct(null);
    setProductForm({
      title: '',
      category: 'Superfood Malts',
      price: '299',
      rating_count: '100',
      tag: '',
      svg_type: 'abc',
      image: '/product1.png',
      description: '',
      ingredients: '',
      usage_instructions: '',
      nutrition: '',
      benefits: ''
    });
    setShowProductModal(true);
  };

  const handleOpenEditProduct = (product: any) => {
    setEditingProduct(product);
    setProductForm({
      title: product.title,
      category: product.category,
      price: product.price.toString(),
      rating_count: (product.rating_count || 100).toString(),
      tag: product.tag || '',
      svg_type: product.svg_type,
      image: product.image || '/product1.png',
      description: product.description || '',
      ingredients: product.ingredients || '',
      usage_instructions: product.usage_instructions || '',
      nutrition: product.nutrition || '',
      benefits: product.benefits || ''
    });
    setShowProductModal(true);
  };

  const handleProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionLoading(true);
    try {
      const payload = {
        ...productForm,
        price: parseFloat(productForm.price),
        rating_count: parseInt(productForm.rating_count, 10),
        id: editingProduct?.id
      };

      const endpoint = editingProduct ? '/api/admin/products' : '/api/admin/products';
      const method = editingProduct ? 'PUT' : 'POST';

      const res = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();

      if (data.success) {
        alert(editingProduct ? 'Product updated successfully!' : 'Product added successfully!');
        setShowProductModal(false);
        await fetchProducts();
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (err: any) {
      alert(`Error: ${err.message}`);
    } finally {
      setActionLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 1.5 * 1024 * 1024) {
      alert("Image file is too large! Please upload a file smaller than 1.5MB to ensure database compatibility.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setProductForm(prev => ({
        ...prev,
        image: reader.result as string
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleDeleteProduct = async (id: number) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    setActionLoading(true);
    try {
      const res = await fetch(`/api/admin/products?id=${id}`, {
        method: 'DELETE'
      });
      const data = await res.json();
      if (data.success) {
        alert('Product deleted successfully!');
        await fetchProducts();
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (err: any) {
      alert(`Error: ${err.message}`);
    } finally {
      setActionLoading(false);
    }
  };

  const handleOpenOrderDetails = (order: any) => {
    setSelectedOrder(order);
    setOrderShippingForm({
      shipping_status: order.shipping_status || 'processing',
      courier_partner: order.courier_partner || '',
      tracking_number: order.tracking_number || ''
    });
    setCourierRates([]);
    setTrackingTimeline(null);
    setSelectedCourierId('');

    // Fetch pickup warehouses
    fetchWarehouses();

    if (order.bigship_order_id) {
      if (order.bigship_status === 'draft') {
        fetchRates(order.id);
      } else if (order.bigship_status === 'manifested') {
        fetchTracking(order.id);
      }
    }
  };

  const handleOrderShippingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionLoading(true);
    try {
      const res = await fetch('/api/admin/orders', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: selectedOrder.id,
          ...orderShippingForm
        })
      });
      const data = await res.json();

      if (data.success) {
        alert('Order shipment details updated successfully!');
        setSelectedOrder(null);
        await fetchOrders();
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (err: any) {
      alert(`Error: ${err.message}`);
    } finally {
      setActionLoading(false);
    }
  };

  // Math Metrics
  const totalSales = orders
    ? orders
        .filter((o: any) => o && o.payment_status === 'success')
        .reduce((acc: number, curr: any) => acc + (parseFloat(curr.total_amount) || 0), 0)
    : 0;

  return (
    <div className="min-h-screen bg-[#0A192F] text-[#F3EFE9] font-sans antialiased pb-24">
      {/* Header - Navy & Sky Blue Logo Palette */}
      <header className="sticky top-0 bg-[#0A192F]/90 backdrop-blur-md border-b border-[#0080FF]/20 z-40 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="p-2 hover:bg-white/10 rounded-full transition-colors">
              <ArrowLeft className="w-5 h-5 text-white" />
            </Link>
            <div>
              <h1 className="font-serif text-2xl font-bold text-white tracking-wide">Ayurmor Admin Panel</h1>
              <p className="text-xs text-sky-300 font-medium uppercase tracking-wider">Workspace Management Dashboard</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={handleInitDb}
              disabled={actionLoading}
              className="px-4 py-2 border border-[#0080FF]/40 text-sky-300 rounded-full text-xs font-bold tracking-wider uppercase hover:bg-[#0080FF]/10 hover:border-[#0080FF] transition-all flex items-center gap-1.5 active:scale-95 disabled:opacity-50"
            >
              <Database className="w-3.5 h-3.5" />
              <span>Provision Database</span>
            </button>
            <button 
              onClick={loadData}
              disabled={loading}
              className="p-2.5 rounded-full border border-white/5 hover:bg-white/5 transition-colors active:scale-95"
              aria-label="Refresh Data"
            >
              <RefreshCw className={`w-4 h-4 text-white ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-6 mt-10 space-y-10">
        
        {/* Status Message */}
        {initDbMsg && (
          <div className={`p-4 rounded-xl border text-sm font-semibold flex items-center justify-between ${
            initDbMsg.startsWith('✓') 
              ? 'bg-emerald-950/40 border-emerald-500/25 text-emerald-400' 
              : 'bg-rose-950/40 border-rose-500/25 text-rose-400'
          }`}>
            <span>{initDbMsg}</span>
            <button onClick={() => setInitDbMsg('')} className="p-1 hover:bg-white/5 rounded-full">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Database Connection Error Banner */}
        {dbConnectionError && (
          <div className="p-5 bg-rose-950/20 border border-rose-500/25 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 text-rose-300">
            <div className="space-y-1">
              <h4 className="font-serif text-lg font-bold">MySQL Connection Error</h4>
              <p className="text-xs text-rose-300/80 leading-relaxed font-light">
                {dbConnectionError}
              </p>
            </div>
          </div>
        )}

        {/* Info Box: MySQL default fallback warning */}
        {dbSource === 'mock' && (
          <div className="p-5 bg-amber-950/20 border border-amber-500/20 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 text-amber-200">
            <div className="space-y-1">
              <h4 className="font-serif text-lg font-bold">MySQL Connection Status: Offline (Fallback Mode)</h4>
              <p className="text-xs text-amber-200/80 leading-relaxed font-light">
                The application was unable to establish a link to local MySQL. To activate live persistent storage, start MySQL in XAMPP (port 3306), create database <code>ayurmor</code>, or click <strong>Provision Database</strong> above.
              </p>
            </div>
          </div>
        )}

        {/* Metric Cards Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#0F3D2E]/30 p-6 rounded-2xl border border-white/5 shadow-lg flex items-center justify-between">
            <div>
              <span className="text-xs text-[#5A8B73] font-bold uppercase tracking-wider">Total Sales (Processed)</span>
              <h3 className="font-serif text-3xl font-bold mt-2 text-white">Rs. {totalSales.toFixed(2)}</h3>
            </div>
            <div className="w-12 h-12 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center">
              <DollarSign className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-[#0F3D2E]/30 p-6 rounded-2xl border border-white/5 shadow-lg flex items-center justify-between">
            <div>
              <span className="text-xs text-[#5A8B73] font-bold uppercase tracking-wider">Orders Received</span>
              <h3 className="font-serif text-3xl font-bold mt-2 text-white">{orders.length}</h3>
            </div>
            <div className="w-12 h-12 bg-amber-500/10 text-amber-400 rounded-full flex items-center justify-center">
              <ShoppingCart className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-[#0F3D2E]/30 p-6 rounded-2xl border border-white/5 shadow-lg flex items-center justify-between">
            <div>
              <span className="text-xs text-[#5A8B73] font-bold uppercase tracking-wider">Active Products</span>
              <h3 className="font-serif text-3xl font-bold mt-2 text-white">{products.length}</h3>
            </div>
            <div className="w-12 h-12 bg-blue-500/10 text-blue-400 rounded-full flex items-center justify-center">
              <Layers className="w-6 h-6" />
            </div>
          </div>
        </section>

        {/* Tab Buttons */}
        <div className="flex border-b border-white/5 gap-6 text-sm font-bold uppercase tracking-wider overflow-x-auto">
          <button 
            onClick={() => setActiveTab('products')}
            className={`pb-3 transition-all relative whitespace-nowrap ${
              activeTab === 'products' ? 'text-white after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2.5px] after:bg-[#E7977D]' : 'text-white/40 hover:text-white'
            }`}
          >
            Manage Products ({products.length})
          </button>
          <button 
            onClick={() => setActiveTab('orders')}
            className={`pb-3 transition-all relative whitespace-nowrap ${
              activeTab === 'orders' ? 'text-white after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2.5px] after:bg-[#E7977D]' : 'text-white/40 hover:text-white'
            }`}
          >
            Manage Orders ({orders.length})
          </button>
          <button 
            onClick={() => setActiveTab('contacts')}
            className={`pb-3 transition-all relative whitespace-nowrap ${
              activeTab === 'contacts' ? 'text-white after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2.5px] after:bg-[#E7977D]' : 'text-white/40 hover:text-white'
            }`}
          >
            Callback Enquiries ({contacts.length})
          </button>
          <button 
            onClick={() => setActiveTab('compliance')}
            className={`pb-3 transition-all relative whitespace-nowrap ${
              activeTab === 'compliance' ? 'text-white after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2.5px] after:bg-[#E7977D]' : 'text-white/40 hover:text-white'
            }`}
          >
            Corporate & Compliance Info
          </button>
        </div>

        {/* Tab Content Panel */}
        {loading ? (
          <div className="h-64 flex flex-col items-center justify-center gap-2">
            <Loader2 className="w-8 h-8 text-[#E7977D] animate-spin" />
            <span className="text-xs text-[#5A8B73] font-semibold uppercase tracking-wider">Loading Dashboard Data...</span>
          </div>
        ) : (
          <section className="bg-[#0F3D2E]/15 rounded-2xl border border-white/5 shadow-xl overflow-hidden">
            {activeTab === 'products' ? (
              /* Products Management Panel */
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="font-serif text-xl font-bold text-white">Products Catalog</h3>
                    <p className="text-xs text-[#5A8B73]">Create, update, or delete products displayed on the homepage best seller grid.</p>
                  </div>
                  <button 
                    onClick={handleOpenAddProduct}
                    className="px-5 py-2.5 bg-[#E7977D] text-[#0b1a15] rounded-full text-xs font-bold uppercase tracking-wider hover:bg-[#ffebe5] hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-1.5"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add New Product</span>
                  </button>
                </div>

                <div className="overflow-x-auto rounded-xl border border-white/5">
                  <table className="w-full text-left border-collapse text-sm">
                    <thead>
                      <tr className="bg-white/5 text-[#5A8B73] font-bold uppercase tracking-wider text-xs border-b border-white/5">
                        <th className="p-4">Product Info</th>
                        <th className="p-4">Category</th>
                        <th className="p-4">Price</th>
                        <th className="p-4">Rating Count</th>
                        <th className="p-4">Tag</th>
                        <th className="p-4">SVG Animation</th>
                        <th className="p-4 text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {products.map((p) => (
                        <tr key={p.id} className="hover:bg-white/5 transition-colors">
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center p-1 border border-white/5 relative overflow-hidden">
                                <img src={p.image || '/product1.png'} alt={p.title} className="max-w-full max-h-full object-contain" />
                              </div>
                              <div>
                                <h4 className="font-serif text-base font-bold text-white leading-tight">{p.title}</h4>
                                <span className="text-[10px] text-white/40 block mt-1">ID: #{p.id}</span>
                              </div>
                            </div>
                          </td>
                          <td className="p-4">
                            <span className="text-xs bg-[#5A8B73]/10 text-[#88B29C] border border-[#5A8B73]/10 px-2.5 py-1 rounded-full font-semibold uppercase tracking-wider">
                              {p.category}
                            </span>
                          </td>
                          <td className="p-4 font-serif font-bold text-white text-base">
                            Rs. {Number(p.price).toFixed(2)}
                          </td>
                          <td className="p-4 text-white/70">
                            {p.rating_count || 0} reviews
                          </td>
                          <td className="p-4">
                            {p.tag ? (
                              <span className="text-[10px] bg-amber-500/10 text-amber-400 border border-amber-500/15 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                                {p.tag}
                              </span>
                            ) : (
                              <span className="text-white/20 text-xs italic">-</span>
                            )}
                          </td>
                          <td className="p-4 font-mono text-xs text-[#88B29C]">
                            {p.svg_type}
                          </td>
                          <td className="p-4">
                            <div className="flex items-center justify-center gap-2">
                              <button 
                                onClick={() => handleOpenEditProduct(p)}
                                className="p-2 border border-white/5 hover:border-white/10 hover:bg-white/5 rounded-full text-white/80 hover:text-white transition-all active:scale-95"
                                title="Edit Product"
                              >
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <button 
                                onClick={() => handleDeleteProduct(p.id)}
                                className="p-2 border border-rose-500/10 hover:border-rose-500/20 hover:bg-rose-500/10 rounded-full text-rose-400 hover:text-rose-300 transition-all active:scale-95"
                                title="Delete Product"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                      {products.length === 0 && (
                        <tr>
                          <td colSpan={7} className="text-center py-12 text-white/40 italic">
                            No products found. Start by provisioning the database or adding one manually.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : activeTab === 'orders' ? (
              /* Orders Management Panel */
              <div className="p-6">
                <div className="mb-6">
                  <h3 className="font-serif text-xl font-bold text-white">Orders Pipeline</h3>
                  <p className="text-xs text-[#5A8B73]">Track client payments and configure courier tracking info for dispatched bundles.</p>
                </div>

                <div className="overflow-x-auto rounded-xl border border-white/5">
                  <table className="w-full text-left border-collapse text-sm">
                    <thead>
                      <tr className="bg-white/5 text-[#5A8B73] font-bold uppercase tracking-wider text-xs border-b border-white/5">
                        <th className="p-4">Order Number</th>
                        <th className="p-4">Date</th>
                        <th className="p-4">Customer Details</th>
                        <th className="p-4">Billing</th>
                        <th className="p-4">Payment</th>
                        <th className="p-4">Shipment</th>
                        <th className="p-4 text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {orders.map((o) => (
                        <tr key={o.id} className="hover:bg-white/5 transition-colors">
                          <td className="p-4 font-mono font-bold text-[#E7977D]">
                            {o.order_number}
                          </td>
                          <td className="p-4 text-white/70 text-xs">
                            {o.order_date || '-'}
                          </td>
                          <td className="p-4">
                            <div className="space-y-0.5">
                              <h5 className="font-semibold text-white">{o.customer_name}</h5>
                              <p className="text-xs text-white/40">{o.customer_email} | {o.customer_phone}</p>
                            </div>
                          </td>
                          <td className="p-4 font-serif font-bold text-white text-base">
                            Rs. {Number(o.total_amount).toFixed(2)}
                          </td>
                          <td className="p-4">
                            <span className={`text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full border ${
                              o.payment_status === 'success' 
                                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                                : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                            }`}>
                              {o.payment_status}
                            </span>
                          </td>
                          <td className="p-4">
                            <div className="flex flex-col gap-1">
                              <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full border text-center ${
                                o.shipping_status === 'delivered' 
                                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                                  : o.shipping_status === 'shipped'
                                  ? 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                                  : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                              }`}>
                                {o.shipping_status}
                              </span>
                              {o.courier_partner && (
                                <span className="text-[10px] text-white/40 block italic text-center">
                                  {o.courier_partner} ({o.tracking_number})
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="p-4 text-center">
                            <button 
                              onClick={() => handleOpenOrderDetails(o)}
                              className="px-3.5 py-1.5 bg-white/5 border border-white/10 hover:bg-[#E7977D] hover:text-[#0b1a15] hover:border-transparent rounded-full text-xs font-bold uppercase tracking-wider transition-all"
                            >
                              Fulfill
                            </button>
                          </td>
                        </tr>
                      ))}
                      {orders.length === 0 && (
                        <tr>
                          <td colSpan={7} className="text-center py-12 text-white/40 italic">
                            No orders received yet. Place test orders from the homepage cart.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : activeTab === 'contacts' ? (
              /* Callback Enquiries Management Panel */
              <div className="p-6">
                <div className="mb-6">
                  <h3 className="font-serif text-xl font-bold text-white">Callback & Contact Enquiries</h3>
                  <p className="text-xs text-[#5A8B73]">Manage user queries and callback requests submitted from the Contact Us page.</p>
                </div>

                <div className="overflow-x-auto rounded-xl border border-white/5">
                  <table className="w-full text-left border-collapse text-sm">
                    <thead>
                      <tr className="bg-white/5 text-[#5A8B73] font-bold uppercase tracking-wider text-xs border-b border-white/5">
                        <th className="p-4">Submission Date</th>
                        <th className="p-4">Contact Info</th>
                        <th className="p-4">Message</th>
                        <th className="p-4">Status</th>
                        <th className="p-4 text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {contacts.map((c) => (
                        <tr key={c.id} className="hover:bg-white/5 transition-colors">
                          <td className="p-4 text-white/70 text-xs font-medium">
                            <div className="flex items-center gap-1.5">
                              <Clock className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                              <span>{c.created_at || '-'}</span>
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="space-y-1">
                              <h5 className="font-semibold text-white">{c.name}</h5>
                              <p className="text-xs text-white/40 flex items-center gap-1">
                                <Mail className="w-3 h-3 text-sky-400" />
                                <span>{c.email}</span>
                              </p>
                              <p className="text-xs text-sky-300 font-bold flex items-center gap-1">
                                <Phone className="w-3 h-3 text-[#76BC21]" />
                                <span>{c.mobile}</span>
                              </p>
                            </div>
                          </td>
                          <td className="p-4 text-xs text-slate-300 max-w-sm whitespace-pre-wrap leading-relaxed">
                            {c.message || <span className="text-white/20 italic">No message provided. Request callback only.</span>}
                          </td>
                          <td className="p-4">
                            <select
                              value={c.status}
                              onChange={(e) => handleUpdateContactStatus(c.id, e.target.value)}
                              className={`text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-xl border focus:outline-none bg-[#0b1a15] ${
                                c.status === 'resolved'
                                  ? 'text-emerald-400 border-emerald-500/35'
                                  : c.status === 'contacted'
                                  ? 'text-blue-400 border-blue-500/35'
                                  : 'text-amber-400 border-amber-500/35'
                              }`}
                            >
                              <option value="new">New Enquiry</option>
                              <option value="contacted">Contacted</option>
                              <option value="resolved">Resolved</option>
                            </select>
                          </td>
                          <td className="p-4 text-center">
                            <button
                              onClick={() => handleDeleteContact(c.id)}
                              className="p-2 border border-rose-500/10 hover:border-rose-500/20 hover:bg-rose-500/10 rounded-full text-rose-400 hover:text-rose-300 transition-all active:scale-95"
                              title="Delete Enquiry"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                      {contacts.length === 0 && (
                        <tr>
                          <td colSpan={5} className="text-center py-12 text-white/40 italic">
                            No callback requests received yet.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              /* Corporate & Compliance Panel */
              <div className="p-6 space-y-8">
                <div>
                  <h3 className="font-serif text-xl font-bold text-white">Corporate Identity & Regulatory Compliance</h3>
                  <p className="text-xs text-[#5A8B73]">Official manufacturer, marketer, FSSAI registration, GSTIN, and brand compliance guidelines active across the website.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Manufacturer Card */}
                  <div className="bg-[#0b1a15] p-6 rounded-2xl border border-emerald-500/20 space-y-4">
                    <div className="flex items-center justify-between border-b border-white/5 pb-3">
                      <div>
                        <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider block">Sole Manufacturer</span>
                        <h4 className="font-serif text-xl font-bold text-white">Saish Technofarms</h4>
                      </div>
                      <span className="px-2.5 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full text-[10px] font-bold uppercase">
                        FSSAI Registered
                      </span>
                    </div>

                    <div className="space-y-2 text-xs text-white/80">
                      <p><strong className="text-white">FSSAI Reg. No.:</strong> <span className="font-mono text-emerald-400">21224169000054</span></p>
                      <p><strong className="text-white">ISO Standard:</strong> <span className="font-mono text-sky-400">ISO 9001:2015</span> (QCCI LLP & UGAC Accredited)</p>
                      <p><strong className="text-white">Facility Address:</strong> 137/5 Kagal Maneer, Kumta, Uttara Kannada, Karnataka - 581362, India.</p>
                    </div>
                  </div>

                  {/* Marketer Card */}
                  <div className="bg-[#0b1a15] p-6 rounded-2xl border border-sky-500/20 space-y-4">
                    <div className="flex items-center justify-between border-b border-white/5 pb-3">
                      <div>
                        <span className="text-[10px] text-sky-400 font-bold uppercase tracking-wider block">Marketed By</span>
                        <h4 className="font-serif text-xl font-bold text-white">Zeyora Global Trading Co.</h4>
                      </div>
                      <span className="px-2.5 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 rounded-full text-[10px] font-bold uppercase">
                        GSTIN Verified
                      </span>
                    </div>

                    <div className="space-y-2 text-xs text-white/80">
                      <p><strong className="text-white">GSTIN:</strong> <span className="font-mono text-sky-400">33AEQPT6920G1Z6</span></p>
                      <p><strong className="text-white">FSSAI License No.:</strong> <span className="font-mono text-emerald-400">124250140000673</span></p>
                      <p><strong className="text-white">Corporate Address:</strong> Kombai Nagar, Tiruchengode – 637211, Tamil Nadu, India.</p>
                    </div>
                  </div>
                </div>

                {/* Brand Compliance Rules Banner */}
                <div className="p-5 bg-white/5 border border-white/10 rounded-2xl space-y-3">
                  <h4 className="font-serif text-base font-bold text-[#E7977D]">Global Website Brand Compliance Rules</h4>
                  <ul className="text-xs text-white/80 space-y-2 list-disc list-inside">
                    <li><strong>100% Pure Botanical:</strong> Replaced all "Organic" claims with "100% Pure", "Wild-Crafted", or "Natural".</li>
                    <li><strong>Hygienic Packaging:</strong> Updated all quality references from "Repackaging" to "Hygienic Packaging".</li>
                    <li><strong>Dynamic Routing:</strong> Every product card routes to its unique `/product/[id]` detail page with custom specs & nutrition facts.</li>
                    <li><strong>Header Link Navigation:</strong> Clicking "Home" or logo on any subpage returns to `/` homepage root cleanly.</li>
                  </ul>
                </div>
              </div>
            )}
          </section>
        )}
      </main>

      {/* Product Form Modal */}
      {showProductModal && (
        <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={() => setShowProductModal(false)} />
          
          <div className="bg-[#0F3D2E] border border-white/10 rounded-2xl p-6 md:p-8 w-full max-w-lg shadow-2xl relative z-10 text-white">
            <button onClick={() => setShowProductModal(false)} className="absolute top-4 right-4 p-1.5 hover:bg-white/5 rounded-full text-white/70 hover:text-white">
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-serif text-2xl font-bold mb-2">
              {editingProduct ? 'Edit Product Details' : 'Add New Wellness Product'}
            </h3>
            <p className="text-xs text-[#5A8B73] mb-6">Manage all metadata, display graphics, and pricing configuration in real time.</p>

            <form onSubmit={handleProductSubmit} className="space-y-4 text-sm">
              <div className="max-h-[60vh] overflow-y-auto pr-2 space-y-4">
                <div>
                  <label className="block text-xs uppercase text-[#5A8B73] font-bold tracking-wider mb-1.5">Product Title</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. Moringa Premix Soup Powder"
                    value={productForm.title}
                    onChange={(e) => setProductForm({ ...productForm, title: e.target.value })}
                    className="w-full bg-[#0b1a15] border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-white/20 focus:outline-none focus:border-[#E7977D]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase text-[#5A8B73] font-bold tracking-wider mb-1.5">Category</label>
                    <select 
                      value={productForm.category}
                      onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                      className="w-full bg-[#0b1a15] border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[#E7977D]"
                    >
                      <option value="Premix Soups">Premix Soups</option>
                      <option value="Superfood Malts">Superfood Malts</option>
                      <option value="Granola & Cereals">Granola & Cereals</option>
                      <option value="Daily Supplements">Daily Supplements</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs uppercase text-[#5A8B73] font-bold tracking-wider mb-1.5">Price (Rs.)</label>
                    <input 
                      type="number" 
                      required
                      placeholder="299"
                      value={productForm.price}
                      onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                      className="w-full bg-[#0b1a15] border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-white/20 focus:outline-none focus:border-[#E7977D]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase text-[#5A8B73] font-bold tracking-wider mb-1.5">Rating Reviews Count</label>
                    <input 
                      type="number" 
                      placeholder="120"
                      value={productForm.rating_count}
                      onChange={(e) => setProductForm({ ...productForm, rating_count: e.target.value })}
                      className="w-full bg-[#0b1a15] border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-white/20 focus:outline-none focus:border-[#E7977D]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase text-[#5A8B73] font-bold tracking-wider mb-1.5">Promo Tag</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Best Seller, NULL"
                      value={productForm.tag}
                      onChange={(e) => setProductForm({ ...productForm, tag: e.target.value })}
                      className="w-full bg-[#0b1a15] border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-white/20 focus:outline-none focus:border-[#E7977D]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase text-[#5A8B73] font-bold tracking-wider mb-1.5">Preset Image</label>
                    <select 
                      value={productForm.image.startsWith('data:') ? '/product1.png' : productForm.image}
                      onChange={(e) => setProductForm({ ...productForm, image: e.target.value })}
                      className="w-full bg-[#0b1a15] border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[#E7977D]"
                    >
                      <option value="/product1.png">product1.png (Moringa soup)</option>
                      <option value="/product2.png">product2.png (Choco Malt)</option>
                      <option value="/product3.png">product3.png (ABC Malt)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs uppercase text-[#5A8B73] font-bold tracking-wider mb-1.5">SVG Animation Key</label>
                    <select 
                      value={productForm.svg_type}
                      onChange={(e) => setProductForm({ ...productForm, svg_type: e.target.value })}
                      className="w-full bg-[#0b1a15] border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[#E7977D]"
                    >
                      <option value="moringa">moringa</option>
                      <option value="choco">choco</option>
                      <option value="abc">abc</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase text-[#5A8B73] font-bold tracking-wider mb-1.5">Or Upload Custom Product Image</label>
                  <div className="flex items-center gap-4 bg-[#0b1a15] p-3 rounded-xl border border-white/10">
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={handleFileChange}
                      className="flex-grow text-xs text-white file:mr-4 file:py-1.5 file:px-3.5 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-[#E7977D]/20 file:text-[#E7977D] hover:file:bg-[#E7977D]/35 transition-colors cursor-pointer"
                    />
                    {productForm.image && (
                      <div className="w-12 h-12 bg-white rounded-lg p-1 border border-white/5 relative flex-shrink-0 flex items-center justify-center overflow-hidden">
                        <img src={productForm.image} alt="Preview" className="max-w-full max-h-full object-contain" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Details & Specs sections */}
                <div className="border-t border-white/5 pt-4 space-y-4">
                  <h4 className="font-serif font-bold text-sm text-[#E7977D]">Product Specifications & Tabs</h4>
                  
                  <div>
                    <label className="block text-xs uppercase text-[#5A8B73] font-bold tracking-wider mb-1.5">Description</label>
                    <textarea 
                      placeholder="Describe the product's taste, texture, and core health benefits..."
                      value={productForm.description}
                      onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                      rows={3}
                      className="w-full bg-[#0b1a15] border border-white/10 rounded-xl px-4 py-2 text-white placeholder-white/20 focus:outline-none focus:border-[#E7977D] text-xs resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase text-[#5A8B73] font-bold tracking-wider mb-1.5">Ingredients</label>
                    <textarea 
                      placeholder="Comma-separated list of ingredients..."
                      value={productForm.ingredients}
                      onChange={(e) => setProductForm({ ...productForm, ingredients: e.target.value })}
                      rows={2}
                      className="w-full bg-[#0b1a15] border border-white/10 rounded-xl px-4 py-2 text-white placeholder-white/20 focus:outline-none focus:border-[#E7977D] text-xs resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase text-[#5A8B73] font-bold tracking-wider mb-1.5">Directions / How to Use</label>
                    <textarea 
                      placeholder="e.g. Add 2 tablespoons to hot water/milk and stir well..."
                      value={productForm.usage_instructions}
                      onChange={(e) => setProductForm({ ...productForm, usage_instructions: e.target.value })}
                      rows={2}
                      className="w-full bg-[#0b1a15] border border-white/10 rounded-xl px-4 py-2 text-white placeholder-white/20 focus:outline-none focus:border-[#E7977D] text-xs resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase text-[#5A8B73] font-bold tracking-wider mb-1.5">Nutrition facts (one per line)</label>
                      <textarea 
                        placeholder="e.g.&#10;Energy: 380 kcal&#10;Protein: 12g"
                        value={productForm.nutrition}
                        onChange={(e) => setProductForm({ ...productForm, nutrition: e.target.value })}
                        rows={4}
                        className="w-full bg-[#0b1a15] border border-white/10 rounded-xl px-4 py-2 text-white placeholder-white/20 focus:outline-none focus:border-[#E7977D] text-xs resize-none font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase text-[#5A8B73] font-bold tracking-wider mb-1.5">Benefits (one per line)</label>
                      <textarea 
                        placeholder="e.g.&#10;Zero Refined Sugar&#10;High in Calcium"
                        value={productForm.benefits}
                        onChange={(e) => setProductForm({ ...productForm, benefits: e.target.value })}
                        rows={4}
                        className="w-full bg-[#0b1a15] border border-white/10 rounded-xl px-4 py-2 text-white placeholder-white/20 focus:outline-none focus:border-[#E7977D] text-xs resize-none font-mono"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex gap-3">
                <button 
                  type="button" 
                  onClick={() => setShowProductModal(false)}
                  className="flex-1 py-3 border border-white/15 text-white/80 hover:text-white rounded-full font-bold text-xs uppercase tracking-wider transition-all"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  disabled={actionLoading}
                  className="flex-1 py-3 bg-[#E7977D] text-[#0b1a15] hover:bg-[#ffebe5] rounded-full font-bold text-xs uppercase tracking-wider transition-all disabled:opacity-50 flex items-center justify-center gap-1.5"
                >
                  {actionLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : null}
                  <span>{editingProduct ? 'Update Product' : 'Add Product'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Order fulfillment details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={() => setSelectedOrder(null)} />
          
          <div className="bg-[#0F3D2E] border border-white/10 rounded-2xl p-6 md:p-8 w-full max-w-2xl shadow-2xl relative z-10 text-white flex flex-col md:flex-row gap-6 max-h-[90vh] overflow-y-auto">
            <button onClick={() => setSelectedOrder(null)} className="absolute top-4 right-4 p-1.5 hover:bg-white/5 rounded-full text-white/70 hover:text-white z-20">
              <X className="w-5 h-5" />
            </button>

            {/* Left side: order info */}
            <div className="flex-1 space-y-4">
              <div>
                <span className="text-[10px] text-[#5A8B73] font-bold uppercase tracking-wider">Fulfill Order</span>
                <h3 className="font-serif text-2xl font-bold text-[#E7977D]">{selectedOrder.order_number}</h3>
                <p className="text-xs text-white/50">{selectedOrder.order_date}</p>
              </div>

              <div className="space-y-2 border-t border-white/5 pt-4">
                <h5 className="font-bold text-xs uppercase tracking-wider text-[#5A8B73]">Customer Details</h5>
                <p className="text-sm font-semibold">{selectedOrder.customer_name}</p>
                <p className="text-xs text-white/70">{selectedOrder.customer_email}</p>
                <p className="text-xs text-white/70">{selectedOrder.customer_phone}</p>
              </div>

              <div className="space-y-2 border-t border-white/5 pt-4">
                <h5 className="font-bold text-xs uppercase tracking-wider text-[#5A8B73]">Shipping Address</h5>
                <p className="text-xs leading-relaxed text-white/80 bg-[#0b1a15] p-3 rounded-lg border border-white/5">
                  {selectedOrder.shipping_address}
                </p>
              </div>

              <div className="space-y-2 border-t border-white/5 pt-4">
                <h5 className="font-bold text-xs uppercase tracking-wider text-[#5A8B73]">Order Items</h5>
                <div className="text-xs max-h-40 overflow-y-auto space-y-2">
                  {(() => {
                    try {
                      const items = JSON.parse(selectedOrder.items_json || '[]');
                      return items.map((it: any, index: number) => (
                        <div key={index} className="flex justify-between items-center py-1 border-b border-white/5 last:border-b-0">
                          <div>
                            <span className="font-bold text-white">{it.title}</span>
                            <span className="text-white/40 ml-1">x{it.quantity}</span>
                          </div>
                          <span className="font-serif text-white/80">Rs. {(Number(it.price) * it.quantity).toFixed(0)}</span>
                        </div>
                      ));
                    } catch (e) {
                      return <span className="text-white/40 italic">Failed to parse items json metadata.</span>;
                    }
                  })()}
                </div>
              </div>
            </div>

            {/* Right side: fulfillment forms */}
            <div className="flex-1 space-y-4 border-t md:border-t-0 md:border-l border-white/5 pt-4 md:pt-0 md:pl-6">
              <div className="flex items-center justify-between">
                <h4 className="font-serif text-lg font-bold text-white">Logistics & Dispatch</h4>
                <span className="text-[9px] bg-[#E7977D]/20 text-[#E7977D] border border-[#E7977D]/30 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                  Bigship Partner
                </span>
              </div>

              {/* Bigship Section */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-4">
                <h5 className="font-serif text-xs font-bold text-[#E7977D] uppercase tracking-wider">Bigship Direct Panel</h5>
                
                {!selectedOrder.bigship_order_id ? (
                  /* STEP 1: CREATE DRAFT */
                  <div className="space-y-3">
                    <p className="text-xs text-white/70">
                      Sync this order as a draft to Bigship to retrieve real-time courier quotes.
                    </p>
                    
                    <div>
                      <label className="block text-[10px] uppercase text-[#5A8B73] font-bold tracking-wider mb-1">
                        Select Pickup Location (Warehouse)
                      </label>
                      {bigshipWarehouses.length === 0 ? (
                        <p className="text-xs text-white/40 italic">Loading pickup locations...</p>
                      ) : (
                        <select
                          value={selectedWarehouse}
                          onChange={(e) => setSelectedWarehouse(e.target.value)}
                          className="w-full bg-[#0b1a15] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#E7977D]"
                        >
                          {bigshipWarehouses.map((w: any) => (
                            <option key={w.warehouseId} value={w.warehouseId}>
                              {w.warehouseName} ({w.city})
                            </option>
                          ))}
                        </select>
                      )}
                    </div>

                    <button
                      type="button"
                      disabled={bigshipLoading || bigshipWarehouses.length === 0}
                      onClick={() => handleCreateDraft(selectedOrder.id)}
                      className="w-full py-2 bg-[#E7977D] text-[#0b1a15] hover:bg-[#ffebe5] rounded-xl font-bold text-xs uppercase tracking-wider transition-all disabled:opacity-50 flex items-center justify-center gap-1.5"
                    >
                      {bigshipLoading && <Loader2 className="w-3 h-3 animate-spin" />}
                      <span>Sync Draft with Bigship</span>
                    </button>
                  </div>
                ) : selectedOrder.bigship_status === 'draft' ? (
                  /* STEP 2: SELECT COURIER & MANIFEST */
                  <div className="space-y-4">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-white/60">Draft ID: <strong className="font-mono text-[#E7977D]">{selectedOrder.bigship_order_id}</strong></span>
                      <button 
                        onClick={() => fetchRates(selectedOrder.id)}
                        disabled={ratesLoading}
                        className="text-[#E7977D] font-bold uppercase text-[10px] hover:underline"
                      >
                        Refresh Rates
                      </button>
                    </div>

                    {ratesLoading ? (
                      <div className="flex flex-col items-center justify-center py-6 gap-2">
                        <Loader2 className="w-6 h-6 animate-spin text-[#E7977D]" />
                        <p className="text-xs text-white/40">Fetching active courier rates...</p>
                      </div>
                    ) : courierRates.length === 0 ? (
                      <p className="text-xs text-white/40 italic py-2">No serviceable courier rates returned. Ensure pincode is correct.</p>
                    ) : (
                      <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                        <label className="block text-[10px] uppercase text-[#5A8B73] font-bold tracking-wider mb-1">
                          Select Serviceable Courier
                        </label>
                        {courierRates.map((c: any) => (
                          <div 
                            key={c.courier_partner_id} 
                            onClick={() => setSelectedCourierId(c.courier_partner_id)}
                            className={`p-3 rounded-lg border text-xs cursor-pointer transition-all flex items-center justify-between ${
                              selectedCourierId == c.courier_partner_id
                                ? 'bg-[#E7977D]/10 border-[#E7977D]'
                                : 'bg-[#0b1a15] border-white/5 hover:border-white/20'
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              {c.courierImage && (
                                <img src={c.courierImage} alt={c.courierName} className="w-8 h-8 rounded bg-white p-0.5 object-contain" />
                              )}
                              <div>
                                <h6 className="font-bold text-white">{c.courierName}</h6>
                                <p className="text-[10px] text-white/40">{c.courierType} • Est. {c.tat} days</p>
                              </div>
                            </div>
                            <span className="font-serif font-bold text-white">Rs. {c.totalCharge}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    <button
                      type="button"
                      disabled={bigshipLoading || !selectedCourierId}
                      onClick={() => handleManifestOrder(selectedOrder.id, Number(selectedCourierId))}
                      className="w-full py-2 bg-emerald-500 text-white hover:bg-emerald-400 rounded-xl font-bold text-xs uppercase tracking-wider transition-all disabled:opacity-50 flex items-center justify-center gap-1.5"
                    >
                      {bigshipLoading && <Loader2 className="w-3 h-3 animate-spin" />}
                      <span>Manifest & Book Shipment</span>
                    </button>
                  </div>
                ) : (
                  /* STEP 3: SHIPPED & TRACKING / DOCUMENTS */
                  <div className="space-y-4">
                    <div className="flex justify-between items-center text-xs border-b border-white/5 pb-2">
                      <div>
                        <span className="text-white/40 block text-[10px]">AWB Tracking Number</span>
                        <strong className="font-mono text-[#E7977D] text-sm">{selectedOrder.tracking_number}</strong>
                      </div>
                      <span className="text-emerald-400 font-bold bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded text-[10px] uppercase">
                        Booked
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-center">
                      <button
                        onClick={() => handleDownloadDoc(selectedOrder.id, 'label')}
                        className="py-2 bg-white/5 border border-white/10 text-white rounded-lg text-xs font-bold hover:bg-[#E7977D]/10 hover:border-[#E7977D] transition-all"
                      >
                        Download Label
                      </button>
                      <button
                        onClick={() => handleDownloadDoc(selectedOrder.id, 'invoice')}
                        className="py-2 bg-white/5 border border-white/10 text-white rounded-lg text-xs font-bold hover:bg-[#E7977D]/10 hover:border-[#E7977D] transition-all"
                      >
                        Download Invoice
                      </button>
                    </div>

                    {/* Tracking Timeline */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <label className="block text-[10px] uppercase text-[#5A8B73] font-bold tracking-wider">
                          Live Tracking Checkpoints
                        </label>
                        <button 
                          onClick={() => fetchTracking(selectedOrder.id)}
                          disabled={trackingLoading}
                          className="text-[9px] text-[#E7977D] uppercase font-bold hover:underline"
                        >
                          Refresh
                        </button>
                      </div>

                      {trackingLoading ? (
                        <div className="flex items-center justify-center py-4 text-xs text-white/40">
                          <Loader2 className="w-4 h-4 animate-spin text-[#E7977D] mr-1.5" />
                          Updating status...
                        </div>
                      ) : trackingTimeline ? (
                        <div className="bg-[#0b1a15] rounded-xl p-3 border border-white/5 text-xs max-h-36 overflow-y-auto space-y-3">
                          <div className="flex justify-between text-[10px] text-white/40 border-b border-white/5 pb-1">
                            <span>Status: <strong className="text-white">{trackingTimeline.order_status || 'In Transit'}</strong></span>
                            <span>ETA: {trackingTimeline.latest_checkpoint_time ? new Date(trackingTimeline.latest_checkpoint_time).toLocaleDateString() : 'N/A'}</span>
                          </div>
                          
                          {trackingTimeline.tracking_histories && trackingTimeline.tracking_histories.length > 0 ? (
                            <div className="relative pl-4 border-l border-white/10 space-y-3">
                              {trackingTimeline.tracking_histories.map((hist: any, hIdx: number) => (
                                <div key={hIdx} className="relative">
                                  <span className="absolute -left-[21px] top-1.5 w-2.5 h-2.5 rounded-full bg-[#E7977D] border-2 border-[#0b1a15]" />
                                  <div className="text-white font-semibold">{hist.message || hist.tag}</div>
                                  <div className="text-[10px] text-white/40">
                                    {hist.checkpoint_time ? new Date(hist.checkpoint_time).toLocaleString() : ''}
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p className="text-white/40 italic text-[11px]">No tracking checkpoints returned yet.</p>
                          )}
                        </div>
                      ) : (
                        <p className="text-white/40 italic text-[11px]">Click refresh to fetch live tracking history.</p>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Manual/Fallback form toggle */}
              <details className="text-xs text-white/60">
                <summary className="cursor-pointer hover:text-white transition-colors py-1 select-none font-medium">
                  Show Manual Courier Logging (Fallback)
                </summary>
                <div className="pt-3 space-y-4 border-t border-white/5 mt-2">
                  <form onSubmit={handleOrderShippingSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs uppercase text-[#5A8B73] font-bold tracking-wider mb-1.5">Fulfillment Status</label>
                      <select 
                        value={orderShippingForm.shipping_status}
                        onChange={(e) => setOrderShippingForm({ ...orderShippingForm, shipping_status: e.target.value })}
                        className="w-full bg-[#0b1a15] border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[#E7977D]"
                      >
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped (Dispatched)</option>
                        <option value="delivered">Delivered</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs uppercase text-[#5A8B73] font-bold tracking-wider mb-1.5">Courier Partner Name</label>
                      <input 
                        type="text" 
                        placeholder="e.g. Delhivery, Blue Dart"
                        value={orderShippingForm.courier_partner}
                        onChange={(e) => setOrderShippingForm({ ...orderShippingForm, courier_partner: e.target.value })}
                        className="w-full bg-[#0b1a15] border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-white/20 focus:outline-none focus:border-[#E7977D]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase text-[#5A8B73] font-bold tracking-wider mb-1.5">Tracking Number</label>
                      <input 
                        type="text" 
                        placeholder="e.g. TRACK981240129"
                        value={orderShippingForm.tracking_number}
                        onChange={(e) => setOrderShippingForm({ ...orderShippingForm, tracking_number: e.target.value })}
                        className="w-full bg-[#0b1a15] border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-white/20 focus:outline-none focus:border-[#E7977D]"
                      />
                    </div>

                    <div className="pt-2 flex gap-3">
                      <button 
                        type="submit"
                        disabled={actionLoading}
                        className="flex-grow py-2.5 bg-white/10 text-white hover:bg-white/20 rounded-xl font-bold text-xs uppercase tracking-wider transition-all disabled:opacity-50 flex items-center justify-center gap-1.5"
                      >
                        {actionLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : null}
                        <span>Save Manual Details</span>
                      </button>
                    </div>
                  </form>
                </div>
              </details>

              <div className="pt-2 border-t border-white/5">
                <button 
                  type="button" 
                  onClick={() => setSelectedOrder(null)}
                  className="w-full py-2.5 border border-white/15 text-white/85 hover:text-white rounded-full font-bold text-xs uppercase tracking-wider transition-all"
                >
                  Close Panel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
