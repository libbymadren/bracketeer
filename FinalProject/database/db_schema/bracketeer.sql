CREATE DATABASE IF NOT EXISTS `bracketeer`;
USE `bracketeer`;

CREATE TABLE IF NOT EXISTS `user` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(100) NOT NULL,
  `salt` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `profile_picture` MEDIUMBLOB,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


CREATE TABLE IF NOT EXISTS `tournament` (
    `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
    `picture` MEDIUMBLOB, 
    `name`  varchar(100) NOT NULL, 
    `organizer_id` int(10) unsigned NOT NULL,
    `location` varchar(100) NOT NULL, 
    `description` varchar(100) NOT NULL,
    `created` varchar(100) NOT NULL,
    `start` DATETIME NOT NULL,
    `end` DATETIME NOT NULL,
    `join_id` varchar(25) NOT NULL,
    `matches_generated` BOOLEAN NOT NULL DEFAULT 0,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `match` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `tournament_id` int(10) unsigned NOT NULL,
  `participant_one_id` int(10) unsigned,
  `participant_two_id` int(10) unsigned,
  `winner_id` int(10) unsigned,
  `number` int(10) unsigned NOT NULL,
  `round` int(10) unsigned NOT NULL,
  `next_match_number` int(10) unsigned,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`tournament_id`) REFERENCES tournament(`id`),
  CONSTRAINT fk_match_user_one FOREIGN KEY (`participant_one_id`) REFERENCES user(`id`),
  CONSTRAINT fk_match_user_two FOREIGN KEY (`participant_two_id`) REFERENCES user(`id`),
  CONSTRAINT fk_match_user_winner FOREIGN KEY (`winner_id`) REFERENCES user(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


CREATE TABLE IF NOT EXISTS tournament_user (
    `user_id` int(10) unsigned NOT NULL,
    `tournament_id` int(10) unsigned NOT NULL,
    CONSTRAINT fk_user FOREIGN KEY (`user_id`) REFERENCES user(`id`),
    CONSTRAINT fk_tournament FOREIGN KEY (`tournament_id`) REFERENCES tournament(`id`)
)