-- MySQL dump 10.13  Distrib 5.6.25, for osx10.8 (x86_64)
--
-- Host: localhost    Database: voaddit
-- ------------------------------------------------------
-- Server version	5.6.25

SET FOREIGN_KEY_CHECKS=0;

--
-- Table structure for table `community`
--

DROP TABLE IF EXISTS `community`;

CREATE TABLE `community` (
  `idcommunity` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `description` varchar(100) DEFAULT NULL,
  `iduser_fk` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `inactive` tinyint(1) NOT NULL DEFAULT '0',
  `view` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`idcommunity`),
  KEY `iduser_fk_1_idx` (`iduser_fk`),
  CONSTRAINT `iduser_fk_2` FOREIGN KEY (`iduser_fk`) REFERENCES `user` (`iduser`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Table structure for table `post`
--

DROP TABLE IF EXISTS `post`;

CREATE TABLE `post` (
  `idpost` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(45) NOT NULL,
  `content_url` varchar(500) NOT NULL,
  `iduser_fk` int(11) NOT NULL,
  `idcommunity_fk` int(11) NOT NULL,
  `upvoad` int(11) NOT NULL DEFAULT '0',
  `downvoad` int(11) NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `edited_at` timestamp NULL DEFAULT NULL,
  `inactive` tinyint(1) NOT NULL DEFAULT '0',
  `view` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`idpost`),
  KEY `idcommunity_fk_idx` (`idcommunity_fk`),
  KEY `iduser_fk_1_idx` (`iduser_fk`),
  CONSTRAINT `idcommunity_fk_1` FOREIGN KEY (`idcommunity_fk`) REFERENCES `community` (`idcommunity`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `iduser_fk_1` FOREIGN KEY (`iduser_fk`) REFERENCES `user` (`iduser`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `iduser` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(16) NOT NULL,
  `password` varchar(32) NOT NULL,
  `email` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `sign_in_count` int(11) NOT NULL DEFAULT '0',
  `last_sign_in_at` timestamp NULL DEFAULT NULL,
  `last_sign_in_ip` varchar(20) DEFAULT NULL,
  `inactive` tinyint(1) NOT NULL DEFAULT '0',
  `view` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`iduser`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

SET FOREIGN_KEY_CHECKS=1;
