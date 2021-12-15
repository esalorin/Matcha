-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: 15.12.2021 klo 10:01
-- Palvelimen versio: 8.0.21
-- PHP Version: 7.3.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `matcha`
--
CREATE DATABASE IF NOT EXISTS `matcha` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `matcha`;

-- --------------------------------------------------------

--
-- Rakenne taululle `blocks`
--

DROP TABLE IF EXISTS `blocks`;
CREATE TABLE IF NOT EXISTS `blocks` (
  `block_id` int NOT NULL AUTO_INCREMENT,
  `blocked_user` int NOT NULL,
  `blocked_by` int NOT NULL,
  `reason` varchar(500) NOT NULL,
  `block_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`block_id`),
  KEY `blocked-user` (`blocked_user`),
  KEY `blocker-user` (`blocked_by`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Rakenne taululle `chats`
--

DROP TABLE IF EXISTS `chats`;
CREATE TABLE IF NOT EXISTS `chats` (
  `chat_id` int NOT NULL AUTO_INCREMENT,
  `user1` int NOT NULL,
  `user2` int NOT NULL,
  `date_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`chat_id`),
  KEY `user1` (`user1`),
  KEY `user2` (`user2`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Rakenne taululle `likes`
--

DROP TABLE IF EXISTS `likes`;
CREATE TABLE IF NOT EXISTS `likes` (
  `like_id` int NOT NULL AUTO_INCREMENT,
  `sender` int NOT NULL,
  `receiver` int NOT NULL,
  `like_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`like_id`),
  KEY `receiver-profile` (`receiver`),
  KEY `sender-profile` (`sender`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Rakenne taululle `matches`
--

DROP TABLE IF EXISTS `matches`;
CREATE TABLE IF NOT EXISTS `matches` (
  `match_id` int NOT NULL AUTO_INCREMENT,
  `user1` int NOT NULL,
  `user2` int NOT NULL,
  `match_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`match_id`),
  KEY `user1-profile` (`user1`),
  KEY `user2-profile` (`user2`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Rakenne taululle `messages`
--

DROP TABLE IF EXISTS `messages`;
CREATE TABLE IF NOT EXISTS `messages` (
  `message_id` int NOT NULL AUTO_INCREMENT,
  `chat_id` int NOT NULL,
  `message` text NOT NULL,
  `sender_id` int NOT NULL,
  `send_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`message_id`),
  KEY `chat` (`chat_id`),
  KEY `sender` (`sender_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Rakenne taululle `notifications`
--

DROP TABLE IF EXISTS `notifications`;
CREATE TABLE IF NOT EXISTS `notifications` (
  `notification_id` int NOT NULL AUTO_INCREMENT,
  `receiver` int NOT NULL,
  `type` enum('like','unlike','match','visitor','message') NOT NULL COMMENT 'What type of notification.',
  `link` varchar(50) NOT NULL COMMENT 'Link to chat or profile.',
  `read_status` enum('0','1') NOT NULL DEFAULT '0',
  `notification_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`notification_id`),
  KEY `receiver` (`receiver`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Rakenne taululle `pictures`
--

DROP TABLE IF EXISTS `pictures`;
CREATE TABLE IF NOT EXISTS `pictures` (
  `picture_id` int NOT NULL AUTO_INCREMENT,
  `profile_id` int NOT NULL,
  `source` varchar(255) NOT NULL,
  `is_profile` enum('0','1') NOT NULL DEFAULT '0',
  `order_in_profile` enum('1','2','3','4') NOT NULL,
  `upload_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`picture_id`),
  KEY `profile-picture` (`profile_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Rakenne taululle `profiles`
--

DROP TABLE IF EXISTS `profiles`;
CREATE TABLE IF NOT EXISTS `profiles` (
  `profile_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `gender` enum('male','female','other') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `sexual_preference` enum('heterosexual','homosexual','bisexual') CHARACTER SET utf8mb4 DEFAULT NULL,
  `age` int DEFAULT NULL,
  `location` varchar(255) CHARACTER SET utf8mb4 DEFAULT NULL,
  `fame_rating` tinyint NOT NULL DEFAULT '0',
  `bio` varchar(500) CHARACTER SET utf8mb4 DEFAULT NULL,
  `active` enum('0','1') NOT NULL DEFAULT '0',
  `activation_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`profile_id`),
  KEY `user-profile` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Rakenne taululle `reports`
--

DROP TABLE IF EXISTS `reports`;
CREATE TABLE IF NOT EXISTS `reports` (
  `report_id` int NOT NULL AUTO_INCREMENT,
  `reported_user` int NOT NULL,
  `reported_by` int NOT NULL,
  `reason` varchar(500) NOT NULL,
  `report_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`report_id`),
  KEY `reported-user` (`reported_user`),
  KEY `reporter-user` (`reported_by`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Rakenne taululle `sessions`
--

DROP TABLE IF EXISTS `sessions`;
CREATE TABLE IF NOT EXISTS `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 NOT NULL,
  `expires` int UNSIGNED NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  PRIMARY KEY (`session_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Rakenne taululle `tags`
--

DROP TABLE IF EXISTS `tags`;
CREATE TABLE IF NOT EXISTS `tags` (
  `tag_id` int NOT NULL AUTO_INCREMENT,
  `tag` varchar(50) NOT NULL,
  PRIMARY KEY (`tag_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;

--
-- Vedos taulusta `tags`
--

INSERT INTO `tags` (`tag_id`, `tag`) VALUES
(3, 'ruoka'),
(4, 'bilettäminen');

-- --------------------------------------------------------

--
-- Rakenne taululle `tags_in_use`
--

DROP TABLE IF EXISTS `tags_in_use`;
CREATE TABLE IF NOT EXISTS `tags_in_use` (
  `tag_id` int NOT NULL,
  `user_id` int NOT NULL,
  KEY `tag` (`tag_id`),
  KEY `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Rakenne taululle `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(16) NOT NULL,
  `email` varchar(50) NOT NULL,
  `fname` varchar(50) NOT NULL,
  `lname` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `verified` enum('0','1') NOT NULL DEFAULT '0',
  `otp` varchar(50) CHARACTER SET utf8mb4 DEFAULT NULL,
  `register_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Rakenne taululle `visitors`
--

DROP TABLE IF EXISTS `visitors`;
CREATE TABLE IF NOT EXISTS `visitors` (
  `visit_id` int NOT NULL AUTO_INCREMENT,
  `profile_id` int NOT NULL,
  `stalker_id` int NOT NULL,
  `visit_time` datetime NOT NULL,
  PRIMARY KEY (`visit_id`),
  KEY `profile` (`profile_id`),
  KEY `visitor` (`stalker_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Rajoitteet vedostauluille
--

--
-- Rajoitteet taululle `blocks`
--
ALTER TABLE `blocks`
  ADD CONSTRAINT `blocked-user` FOREIGN KEY (`blocked_user`) REFERENCES `profiles` (`profile_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `blocker-user` FOREIGN KEY (`blocked_by`) REFERENCES `profiles` (`profile_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Rajoitteet taululle `chats`
--
ALTER TABLE `chats`
  ADD CONSTRAINT `user1` FOREIGN KEY (`user1`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `user2` FOREIGN KEY (`user2`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Rajoitteet taululle `likes`
--
ALTER TABLE `likes`
  ADD CONSTRAINT `receiver-profile` FOREIGN KEY (`receiver`) REFERENCES `profiles` (`profile_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `sender-profile` FOREIGN KEY (`sender`) REFERENCES `profiles` (`profile_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Rajoitteet taululle `matches`
--
ALTER TABLE `matches`
  ADD CONSTRAINT `user1-profile` FOREIGN KEY (`user1`) REFERENCES `profiles` (`profile_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `user2-profile` FOREIGN KEY (`user2`) REFERENCES `profiles` (`profile_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Rajoitteet taululle `messages`
--
ALTER TABLE `messages`
  ADD CONSTRAINT `chat` FOREIGN KEY (`chat_id`) REFERENCES `chats` (`chat_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `sender` FOREIGN KEY (`sender_id`) REFERENCES `users` (`user_id`);

--
-- Rajoitteet taululle `notifications`
--
ALTER TABLE `notifications`
  ADD CONSTRAINT `receiver` FOREIGN KEY (`receiver`) REFERENCES `profiles` (`profile_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Rajoitteet taululle `pictures`
--
ALTER TABLE `pictures`
  ADD CONSTRAINT `profile-picture` FOREIGN KEY (`profile_id`) REFERENCES `profiles` (`profile_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Rajoitteet taululle `profiles`
--
ALTER TABLE `profiles`
  ADD CONSTRAINT `user-profile` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Rajoitteet taululle `reports`
--
ALTER TABLE `reports`
  ADD CONSTRAINT `reported-user` FOREIGN KEY (`reported_user`) REFERENCES `profiles` (`profile_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `reporter-user` FOREIGN KEY (`reported_by`) REFERENCES `profiles` (`profile_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Rajoitteet taululle `tags_in_use`
--
ALTER TABLE `tags_in_use`
  ADD CONSTRAINT `tag` FOREIGN KEY (`tag_id`) REFERENCES `tags` (`tag_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `user` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Rajoitteet taululle `visitors`
--
ALTER TABLE `visitors`
  ADD CONSTRAINT `profile` FOREIGN KEY (`profile_id`) REFERENCES `profiles` (`profile_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `visitor` FOREIGN KEY (`stalker_id`) REFERENCES `profiles` (`profile_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
