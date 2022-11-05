CREATE DATABASE IF NOT EXISTS `bracketeer` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;
USE `bracketeer`;

CREATE TABLE IF NOT EXISTS `user` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(100) NOT NULL,
  `salt` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `profile_picture` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


CREATE TABLE IF NOT EXISTS `tournament` (
    `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
    `picture` varchar(100) NOT NULL, 
    `name`  varchar(100) NOT NULL, 
    `organizer_id` int(10) unsigned NOT NULL,
    `location` varchar(100) NOT NULL, 
    `description` varchar(100) NOT NULL,
    `created` varchar(100) NOT NULL,
    `start` varchar(100) NOT NULL,
    `join_id` varchar(10) NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


CREATE TABLE IF NOT EXISTS `match` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `tournament_id` int(10) unsigned NOT NULL,
  `participant_one_id` int(10) unsigned NOT NULL,
  `participant_two_id` int(10) unsigned NOT NULL,
  `winner_id` int(10) unsigned,
  `next_match_id` int(10) unsigned,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`tournament_id`) REFERENCES tournament(`id`),
  CONSTRAINT fk_match_user_one FOREIGN KEY (`participant_one_id`) REFERENCES user(`id`),
  CONSTRAINT fk_match_user_two FOREIGN KEY (`participant_two_id`) REFERENCES user(`id`),
  CONSTRAINT fk_match_user_winner FOREIGN KEY (`winner_id`) REFERENCES user(`id`),
  CONSTRAINT fk_next_match FOREIGN KEY (`next_match_id`) REFERENCES `match` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


CREATE TABLE IF NOT EXISTS `tournament_user` (
    `user_id` int(10) unsigned NOT NULL,
    `tournament_id` int(10) unsigned NOT NULL,
    CONSTRAINT fk_user FOREIGN KEY (`user_id`) REFERENCES user(`id`),
    CONSTRAINT fk_tournament FOREIGN KEY (`tournament_id`) REFERENCES tournament(`id`)
)