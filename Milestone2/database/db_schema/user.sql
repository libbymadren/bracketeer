CREATE DATABASE IF NOT EXISTS `bracketeer` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;
USE `bracketeer`;

CREATE TABLE IF NOT EXISTS `user` (
  `user_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_username` varchar(100) NOT NULL,
  `user_salt` varchar NOT NULL,
  `user_password` varchar NOT NULL,
  `user_profile_picture` varchar NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

DELETE FROM `user`;