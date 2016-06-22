CREATE TABLE `photo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `unique_id` varchar(64) NOT NULL,
  `image` varchar(100) NOT NULL,
  `name` varchar(64) NOT NULL,
  `scene_name` varchar(64) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE `product` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `unique_id` varchar(64) NOT NULL,
  `product_id` varchar(64) NOT NULL,
  `name` varchar(64) NOT NULL,
  `num` int(11) NOT NULL,
  `unit_price` double NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE `order` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `unique_id` varchar(64) NOT NULL,
  `order_num` varchar(64) NOT NULL,
  `customer_name` varchar(32) NOT NULL,
  `customer_phone` varchar(32) NOT NULL,
  `studio_name` varchar(64) NOT NULL,
  `studio_phone` varchar(32) NOT NULL,
  `scene_name` varchar(64) NOT NULL,
  `access_path` varchar(64) NOT NULL,
  `modify_note` varchar(1024) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_id` (`unique_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE `photo_pick` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `unique_id` varchar(64) NOT NULL,
  `product_id` int(11) NOT NULL,
  `photo_id` int(11) NOT NULL,
  `pick_num` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `photo_pick_product_id` (`product_id`),
  KEY `photo_pick_photo_id` (`photo_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `sample_pick` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `unique_id` varchar(64) NOT NULL,
  `photo_id` int(11) NOT NULL,
  `modify` tinyint(2) NOT NULL DEFAULT 1 COMMENT '1已确认，2待修改',
  `modify_note` varchar(1024) NULL DEFAULT NULL COMMENT '修改意见',
  PRIMARY KEY (`id`),
  KEY `sample_pick_unique_id` (`unique_id`),
  KEY `sample_pick_photo_id` (`photo_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;