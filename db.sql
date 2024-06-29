CREATE TABLE `products` (
	`id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
	`category_id` INT(10) UNSIGNED NOT NULL,
	`name` VARCHAR(50) NOT NULL COLLATE 'latin1_swedish_ci',
	`value` VARCHAR(50) NOT NULL COLLATE 'latin1_swedish_ci',
	`keys` LONGTEXT NOT NULL DEFAULT '[]' COLLATE 'latin1_swedish_ci',
	PRIMARY KEY (`id`) USING BTREE,
	INDEX `FK_products_categories` (`category_id`) USING BTREE,
	CONSTRAINT `FK_products_categories` FOREIGN KEY (`category_id`) REFERENCES `purity-db`.`categories` (`id`) ON UPDATE NO ACTION ON DELETE NO ACTION
)
COLLATE='latin1_swedish_ci'
ENGINE=InnoDB
AUTO_INCREMENT=2
;
CREATE TABLE `categories` (
	`id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
	`name` VARCHAR(50) NOT NULL COLLATE 'latin1_swedish_ci',
	PRIMARY KEY (`id`) USING BTREE
)
COLLATE='latin1_swedish_ci'
ENGINE=InnoDB
AUTO_INCREMENT=5
;
CREATE TABLE `sales` (
	`id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
	`status` ENUM('pending','canceled','approved') NOT NULL DEFAULT 'pending' COLLATE 'latin1_swedish_ci',
	`product_id` INT(10) UNSIGNED NOT NULL DEFAULT '0',
	`payment_id` VARCHAR(255) NOT NULL DEFAULT '0' COLLATE 'latin1_swedish_ci',
	`email` VARCHAR(255) NOT NULL COLLATE 'latin1_swedish_ci',
	`name` VARCHAR(255) NOT NULL COLLATE 'latin1_swedish_ci',
	`keys` LONGTEXT NOT NULL DEFAULT '[]' COLLATE 'latin1_swedish_ci',
	PRIMARY KEY (`id`) USING BTREE,
	INDEX `FK_products` (`product_id`) USING BTREE,
	CONSTRAINT `FK_products` FOREIGN KEY (`product_id`) REFERENCES `purity-db`.`products` (`id`) ON UPDATE NO ACTION ON DELETE NO ACTION
)
COLLATE='latin1_swedish_ci'
ENGINE=InnoDB
AUTO_INCREMENT=5
;
