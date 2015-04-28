DROP TABLE IF EXISTS `Comments`;
DROP TABLE IF EXISTS `Tags`;
DROP TABLE IF EXISTS `Articles`;
DROP TABLE IF EXISTS `Category`;
DROP TABLE IF EXISTS `Archives`;
DROP TABLE IF EXISTS `Auth`;

CREATE TABLE `Category` 
(
	`name` VARCHAR(30) NOT NULL,
	`description` VARCHAR(100) NOT NULL,
	PRIMARY KEY (`name`)
);

CREATE TABLE `Articles` 
(
	`articleId` VARCHAR(70) NOT NULL,
	`category` VARCHAR(30) NOT NULL,
	`title` VARCHAR(100) NOT NULL,
	`content` TEXT NOT NULL,
	`author` VARCHAR(30) NOT NULL,
	`date` INT UNSIGNED NOT NULL,
	`tags` VARCHAR(70) NOT NULL,
	PRIMARY KEY (`articleId`),
	FOREIGN KEY (`category`) REFERENCES `Category` (`name`) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE `Tags` 
(
	`tagId` INT UNSIGNED NOT NULL AUTO_INCREMENT,
	`articleId` VARCHAR(70) NOT NULL,
	`tag` VARCHAR(30) NOT NULL,
	PRIMARY KEY (`tagId`),
	FOREIGN KEY (`articleId`) REFERENCES `Articles` (`articleId`) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE `Comments` 
(
	`commentId` INT UNSIGNED NOT NULL AUTO_INCREMENT,
	`articleId` VARCHAR(70) NOT NULL,
	`user` VARCHAR(50) NOT NULL,
	`email` VARCHAR(100) NOT NULL,
	`content` VARCHAR(300) NOT NULL,
	`date` INT UNSIGNED NOT NULL,
	PRIMARY KEY (`commentId`),
	FOREIGN KEY (`articleId`) REFERENCES `Articles` (`articleId`) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE `Archives` 
(
	`archiveId` INT UNSIGNED NOT NULL,
	`rss` TEXT NOT NULL
);

CREATE TABLE `Auth` 
(
	`id` VARCHAR(30) NOT NULL,
	`password` VARCHAR(100) NOT NULL
);

INSERT INTO `Category` (`name`, `description`) 
VALUES ('Football news', 'Mostly like sport.');
INSERT INTO `Category` (`name`, `description`) 
VALUES ('Mathematics Study', 'My Study on Mathematics.');
INSERT INTO `Category` (`name`, `description`) 
VALUES ('Economics Study', 'My Study on Economics.');

INSERT INTO `Auth` (`id`, `password`)
VALUES ('admin', 'VMvTJUB0nu6d97b6ad7d23723c993eb325fb34f3a6');