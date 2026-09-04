-- Database Configuration Script for Ayurmor
-- Copy and paste this directly into XAMPP phpMyAdmin (MySQL Console)

CREATE DATABASE IF NOT EXISTS `ayurmor` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `ayurmor`;

-- --------------------------------------------------------
-- Table structure for table `products`
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `category` varchar(100) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `rating_count` int(11) DEFAULT 0,
  `tag` varchar(50) DEFAULT NULL,
  `svg_type` varchar(50) NOT NULL,
  `image` LONGTEXT DEFAULT NULL,
  `description` TEXT DEFAULT NULL,
  `ingredients` TEXT DEFAULT NULL,
  `usage_instructions` TEXT DEFAULT NULL,
  `nutrition` TEXT DEFAULT NULL,
  `benefits` TEXT DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Seed data for table `products`
INSERT INTO `products` (`id`, `title`, `category`, `price`, `rating_count`, `tag`, `svg_type`, `image`) VALUES
(1, 'Moringa Premix Soup Powder', 'Premix Soups', 299.00, 124, 'Best Seller', 'moringa', '/product1.png'),
(2, 'ABC Latte Mix (Malt) Powder', 'Superfood Malts', 299.00, 98, NULL, 'abc', '/product3.png'),
(3, 'Choco Multigrain Millet Malt Mix', 'Superfood Malts', 299.00, 182, NULL, 'choco', '/product2.png'),
(4, 'Mushroom Premix Soup Powder', 'Premix Soups', 299.00, 110, 'New Launch', 'mushroom', '/Mushroom3.jpeg')
ON DUPLICATE KEY UPDATE 
`title`=VALUES(`title`), `category`=VALUES(`category`), `price`=VALUES(`price`), `rating_count`=VALUES(`rating_count`), `tag`=VALUES(`tag`), `svg_type`=VALUES(`svg_type`), `image`=VALUES(`image`);

-- --------------------------------------------------------
-- Table structure for table `hero_slides`
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `hero_slides` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `category` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `subtitle` varchar(255) NOT NULL,
  `tagline` text NOT NULL,
  `badge` varchar(255) DEFAULT NULL,
  `bg_color` varchar(255) DEFAULT 'from-[#FFEBE5] via-[#FFCFC0] to-[#E7977D]',
  `image` LONGTEXT DEFAULT NULL,
  `elements` varchar(255) DEFAULT '[]',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Seed data for table `hero_slides`
INSERT INTO `hero_slides` (`id`, `category`, `title`, `subtitle`, `tagline`, `badge`, `bg_color`, `image`, `elements`) VALUES
(1, 'Daily Cellular Energy', 'Nourish from Within', 'ABC Malt Powder', 'Our signature ABC Malt Powder merges the biological goodness of fresh apples, organic beetroots, and crisp carrots. Fortified with premium almonds and raw cashews for sustained vigor.', 'Rich in Iron', 'from-[#FFEBE5] via-[#FFCFC0] to-[#E7977D]', '/product3.png', '["apple", "beetroot", "carrot"]'),
(2, 'Detoxification & Immunity', 'Pure Green Vitality', 'Moringa Premix Soup', 'Cold-process milled moringa leaves blended into an instant herbal soup. Restore metabolic equilibrium, flush out toxins, and activate clean cellular energy in 10 seconds.', '100% Wild-Crafted', 'from-[#EEF5F1] via-[#D0E2D7] to-[#88B29C]', '/product1.png', '["leaf1", "leaf2", "steam"]'),
(3, 'Family Active Nutrition', 'Rich Cocoa Strength', 'Choco Multigrain Millet Malt', 'A luxurious blend of premium dark cocoa and sprouted ancient grains. Sweetened naturally, packed with essential minerals, and designed for active minds of all ages.', 'Zero Refined Sugar', 'from-[#FDFBF7] via-[#EADBCE] to-[#AC8C7D]', '/product2.png', '["almond", "cocoa", "millet"]'),
(4, 'Comforting Evening Nutrition', 'Creamy & Nourishing', 'Mushroom Premix Soup', 'Rich gourmet oyster mushroom soup with garlic and aromatic herbs. Enjoy deep restaurant-quality comfort in 60 seconds with zero added MSG.', 'New Launch', 'from-[#FBF8F3] via-[#EFE6DB] to-[#D5C2AF]', '/Mushroom3.jpeg', '["mushroom", "garlic", "herbs"]')
ON DUPLICATE KEY UPDATE 
`category`=VALUES(`category`), `title`=VALUES(`title`), `subtitle`=VALUES(`subtitle`), `tagline`=VALUES(`tagline`), `badge`=VALUES(`badge`), `bg_color`=VALUES(`bg_color`), `image`=VALUES(`image`), `elements`=VALUES(`elements`);

-- --------------------------------------------------------
-- Table structure for table `orders`
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `orders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `order_number` varchar(50) NOT NULL,
  `customer_name` varchar(255) NOT NULL,
  `customer_email` varchar(255) NOT NULL,
  `customer_phone` varchar(50) NOT NULL,
  `shipping_address` text NOT NULL,
  `total_amount` decimal(10,2) NOT NULL,
  `payment_status` varchar(50) DEFAULT 'pending',
  `payment_id` varchar(100) DEFAULT NULL,
  `order_date` varchar(50) DEFAULT NULL,
  `shipping_status` varchar(50) DEFAULT 'processing',
  `courier_partner` varchar(100) DEFAULT NULL,
  `tracking_number` varchar(100) DEFAULT NULL,
  `items_json` text DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------
-- Table structure for table `contacts`
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `contacts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `message` text NOT NULL,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------
-- Table structure for table `admin_users`
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `admin_users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL UNIQUE,
  `password_hash` varchar(255) NOT NULL,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Default admin user (email: admin@ayurmor.com)
INSERT INTO `admin_users` (`id`, `email`, `password_hash`) VALUES
(1, 'admin@ayurmor.com', '$2b$10$YourHashedPasswordHere')
ON DUPLICATE KEY UPDATE `email`=`email`;

