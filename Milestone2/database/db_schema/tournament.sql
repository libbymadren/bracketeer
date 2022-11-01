CREATE DATABASE IF NOT EXISTS 'bracketeer';
USE 'bracketeer';

CREATE TABLE IF NOT EXISTS 'tournament' (
    'id' int(10) unsigned NOT NULL AUTO_INCREMENT,
    'picture' varchar(100) NOT NULL, 
    'name'  varchar(100) NOT NULL, 
    'organizer_id' int(10) unsigned NOT NULL,
    'location' varchar(100) NOT NULL, 
    'description' varchar(100) NOT NULL,
    'created' timestamp(100) NOT NULL,
    'start' timestamp(100) NOT NULL,
    'join_id' int(10) unsigned NOT NULL,
    PRIMARY KEY ('id')
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

DELETE FROM 'tournament';