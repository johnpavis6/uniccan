-- MySQL dump 10.13  Distrib 5.7.25, for Linux (x86_64)
--
-- Host: localhost    Database: uniccan
-- ------------------------------------------------------
-- Server version	5.7.25-0ubuntu0.18.04.2

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `messages`
--

DROP TABLE IF EXISTS `messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `messages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `_from` varchar(100) NOT NULL,
  `_to` varchar(100) NOT NULL,
  `message` text NOT NULL,
  `datetime` text NOT NULL,
  `seenstatus` int(1) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `_from` (`_from`),
  KEY `_to` (`_to`),
  CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`_from`) REFERENCES `users` (`email`),
  CONSTRAINT `messages_ibfk_2` FOREIGN KEY (`_to`) REFERENCES `users` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `messages`
--

LOCK TABLES `messages` WRITE;
/*!40000 ALTER TABLE `messages` DISABLE KEYS */;
INSERT INTO `messages` VALUES (1,'rosepavis1997@gmail.com','johnpavis6@gmail.com','hey','Wed Mar 20 2019 22:16:31 GMT+0530 (IST)',1),(2,'johnpavis6@gmail.com','rosepavis1997@gmail.com','uiii','Wed Mar 20 2019 22:24:17 GMT+0530 (IST)',1),(3,'johnpavis6@gmail.com','rosepavis1997@gmail.com','hello','Wed Mar 20 2019 22:24:30 GMT+0530 (IST)',1),(4,'rosepavis1997@gmail.com','johnpavis6@gmail.com','yes','Wed Mar 20 2019 22:24:38 GMT+0530 (IST)',1),(5,'johnpavis6@gmail.com','a@b.com','okie','Wed Mar 20 2019 22:26:35 GMT+0530 (IST)',1),(6,'johnpavis6@gmail.com','a@b.com','ex','Wed Mar 20 2019 22:32:38 GMT+0530 (IST)',1),(7,'johnpavis6@gmail.com','a@b.com','mmm','Wed Mar 20 2019 22:35:26 GMT+0530 (IST)',1),(8,'rosepavis1997@gmail.com','johnpavis6@gmail.com','mmm','Wed Mar 20 2019 22:39:26 GMT+0530 (IST)',1),(9,'rosepavis1997@gmail.com','johnpavis6@gmail.com','there?','Wed Mar 20 2019 22:41:37 GMT+0530 (IST)',0),(10,'johnpavis6@gmail.com','a@b.com','yes','Wed Mar 20 2019 22:42:25 GMT+0530 (IST)',1);
/*!40000 ALTER TABLE `messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `socket_mapping`
--

DROP TABLE IF EXISTS `socket_mapping`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `socket_mapping` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(100) DEFAULT NULL,
  `socketID` varchar(100) DEFAULT NULL,
  `talking_with` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`,`talking_with`),
  KEY `talking_with` (`talking_with`),
  CONSTRAINT `socket_mapping_ibfk_1` FOREIGN KEY (`email`) REFERENCES `users` (`email`),
  CONSTRAINT `socket_mapping_ibfk_2` FOREIGN KEY (`talking_with`) REFERENCES `users` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `socket_mapping`
--

LOCK TABLES `socket_mapping` WRITE;
/*!40000 ALTER TABLE `socket_mapping` DISABLE KEYS */;
/*!40000 ALTER TABLE `socket_mapping` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` text NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` text NOT NULL,
  `gender` varchar(6) NOT NULL,
  `mobile_no` varchar(10) NOT NULL,
  `dob` text NOT NULL,
  `education` text,
  `work_experience` int(2) DEFAULT NULL,
  `work_company_name` text,
  `work_position` text,
  `hobbies` text,
  `extra_curricular_activities` text,
  `involvements` text,
  `skills` text,
  `last_seen` text,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `mobile_no` (`mobile_no`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Sangameswaran A','johnpavis6@gmail.com','$2b$10$f8K2lvGK80UhH0CN2U5Rteh9NNqoxyR/wnA1js4x.k3d1OTs2JY/2','male','9500189355','2019-02-28T18:30:00.000Z',NULL,NULL,NULL,NULL,'[]','[]',NULL,'[\"c++\",\"java\"]','Wed Mar 20 2019 22:43:40 GMT+0530 (IST)'),(2,'roshan','rosepavis1997@gmail.com','$2b$10$w9VFhGyntb78qFyUNUQaXO0jQYx.IH53aERX7mukkNESJX1kG/MEq','female','9500189354','2019-03-03T00:00:00.000Z',NULL,NULL,NULL,NULL,'[]','[]',NULL,'[\"c++\",\"python\"]','Wed Mar 20 2019 22:43:41 GMT+0530 (IST)'),(3,'Navin','a@b.com','$2b$10$l4v6QpaMpoXcnCR8bCXQ5.ZwCiLPu1lk7bf6V0DKyUxquZDJTDmx6','male','1234567890','2019-03-01T00:00:00.000Z',NULL,NULL,NULL,NULL,'[]','[]',NULL,'[\"java\"]','Wed Mar 20 2019 22:43:38 GMT+0530 (IST)');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-03-20 22:44:16
