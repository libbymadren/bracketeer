
CREATE DATABASE IF NOT EXISTS `bracketeer`;
USE `bracketeer`;

CREATE TABLE IF NOT EXISTS `match` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `tournament_id` int(10) unsigned NOT NULL,
  'participant_one_id' int(10) unsigned NOT NULL,
  'participant_two_id' int(10) unsigned NOT NULL,
  'winner_id' int(10) unsigned,
  'next_match_id' int(10) unsigned
  PRIMARY KEY (`id`),
  FOREIGN KEY ('tournament_id') REFERENCES tournament('id'),
  FOREIGN KEY ('participant_one_id') REFERENCES user('id'),
  FOREIGN KEY ('participant_two_id') REFERENCES user('id'),
  FOREIGN KEY ('winner_id') REFERENCES user('id'),
  FOREIGN KEY ('next_match_id') REFERENCES match('id')
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

DELETE FROM 'match';