-- MySQL dump 10.17  Distrib 10.3.22-MariaDB, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: University_To_Industry
-- ------------------------------------------------------
-- Server version	10.3.22-MariaDB

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
-- Table structure for table `Admin`
--

DROP TABLE IF EXISTS `Admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Admin` (
  `NIC` varchar(12) NOT NULL,
  `Admin_ID` int(11) NOT NULL,
  `Admin_Type` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`NIC`),
  CONSTRAINT `Admin_FK` FOREIGN KEY (`NIC`) REFERENCES `User` (`NIC`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Admin`
--

LOCK TABLES `Admin` WRITE;
/*!40000 ALTER TABLE `Admin` DISABLE KEYS */;
INSERT INTO `Admin` VALUES ('725245622V',1,'Permanent'),('985245622V',2,'Temporary');
/*!40000 ALTER TABLE `Admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Expert`
--

DROP TABLE IF EXISTS `Expert`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Expert` (
  `Employee_ID` varchar(25) NOT NULL,
  `Affiliation` varchar(100) NOT NULL,
  `NIC` varchar(12) NOT NULL,
  PRIMARY KEY (`NIC`),
  UNIQUE KEY `Expert_UN` (`Employee_ID`),
  CONSTRAINT `Expert_FK` FOREIGN KEY (`NIC`) REFERENCES `User` (`NIC`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Expert`
--

LOCK TABLES `Expert` WRITE;
/*!40000 ALTER TABLE `Expert` DISABLE KEYS */;
INSERT INTO `Expert` VALUES ('VT110','Virtusa','199604901120'),('MIT410AI','Milennium Information Technology','199604901121'),('VT102','Virtusa','199925412521');
/*!40000 ALTER TABLE `Expert` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Login_Credentials`
--

DROP TABLE IF EXISTS `Login_Credentials`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Login_Credentials` (
  `UserName` varchar(20) NOT NULL,
  `Password` varchar(100) NOT NULL,
  `AccountType` varchar(10) NOT NULL,
  `NIC` varchar(12) NOT NULL,
  PRIMARY KEY (`UserName`),
  UNIQUE KEY `Login_Credentials_UN` (`NIC`),
  CONSTRAINT `Login_Credentials_FK` FOREIGN KEY (`NIC`) REFERENCES `User` (`NIC`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Login_Credentials`
--

LOCK TABLES `Login_Credentials` WRITE;
/*!40000 ALTER TABLE `Login_Credentials` DISABLE KEYS */;
/*!40000 ALTER TABLE `Login_Credentials` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Resume`
--

DROP TABLE IF EXISTS `Resume`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Resume` (
  `Student_ID` int(11) NOT NULL,
  `NIC` varchar(12) NOT NULL,
  `Job_Category` varchar(100) NOT NULL,
  `Academic_Status` varchar(50) NOT NULL,
  `Academic_Qualification_1` varchar(100) DEFAULT NULL,
  `Academic_Qualification_2` varchar(100) DEFAULT NULL,
  `Academic_Qualification_3` varchar(100) DEFAULT NULL,
  `Academic_Qualification_4` varchar(100) DEFAULT NULL,
  `Academic_Qualification_5` varchar(100) DEFAULT NULL,
  `Professional_Qualification_1` varchar(100) DEFAULT NULL,
  `Professional_Qualification_2` varchar(100) DEFAULT NULL,
  `Professional_Qualification_3` varchar(100) DEFAULT NULL,
  `Professional_Qualification_4` varchar(100) DEFAULT NULL,
  `Professional_Qualification_5` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`NIC`,`Student_ID`),
  KEY `Resume_FK` (`Student_ID`,`NIC`),
  CONSTRAINT `Resume_FK` FOREIGN KEY (`Student_ID`, `NIC`) REFERENCES `Student` (`Student_ID`, `NIC`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Resume`
--

LOCK TABLES `Resume` WRITE;
/*!40000 ALTER TABLE `Resume` DISABLE KEYS */;
INSERT INTO `Resume` VALUES (10014170,'199925412521','Software Engineering','Undergraduate','HND','English Diploma',NULL,NULL,NULL,'6 Months Internship at Omobio','Weather device',NULL,NULL,NULL);
/*!40000 ALTER TABLE `Resume` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Student`
--

DROP TABLE IF EXISTS `Student`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Student` (
  `NIC` varchar(12) NOT NULL,
  `Student_ID` int(11) NOT NULL,
  `Affiliation` varchar(100) NOT NULL,
  PRIMARY KEY (`Student_ID`,`NIC`),
  KEY `Student_FK` (`NIC`),
  CONSTRAINT `Student_FK` FOREIGN KEY (`NIC`) REFERENCES `User` (`NIC`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Student`
--

LOCK TABLES `Student` WRITE;
/*!40000 ALTER TABLE `Student` DISABLE KEYS */;
INSERT INTO `Student` VALUES ('199925412521',10014170,'NSBM'),('200025412444',10014175,'NSBM'),('200025412563',10635585,'Plymouth'),('199821547412',10638300,'Plymouth'),('199604901122',10638366,'Plymouth');
/*!40000 ALTER TABLE `Student` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `User`
--

DROP TABLE IF EXISTS `User`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `User` (
  `NIC` varchar(12) NOT NULL,
  `First_Name` varchar(20) DEFAULT NULL,
  `Last_Name` varchar(20) DEFAULT NULL,
  `DOB` date DEFAULT NULL,
  `Address_Line_1` varchar(100) DEFAULT NULL,
  `Address_Line_2` varchar(100) DEFAULT NULL,
  `Email` varchar(100) DEFAULT NULL,
  `Contact_No` int(11) DEFAULT NULL,
  PRIMARY KEY (`NIC`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `User`
--

LOCK TABLES `User` WRITE;
/*!40000 ALTER TABLE `User` DISABLE KEYS */;
INSERT INTO `User` VALUES ('188025842512','Hashan','Maduranga','1880-05-25','Hell Straight','to Hell','hashan@gmail.com',785542154),('199604901120','Ayesh','Don','1995-02-18','Kuliyapitiya','Negombo','ayesh@hotmail.com',768336669),('199604901121','Jehan','Rajapaksha','1997-02-20','Kandy Road','Kandy','jehan@gmail.com',718654725),('199604901122','Asiri','Iroshan','1996-02-18','38, Pathum Uyana','Veyangoda','asiriiroshan@hotmail.com',768386669),('199821547412','Greyson','Springfalls','1998-05-25','85, Falls Street','Spring Mountain','gs@gmail.com',785542154),('199925412521','Sahan','Samarasinghe','1999-05-25','85, Samarasinghe Street','Samara Villa','samara@gmail.com',785662154),('200025412444','Josie','Anjana','2000-12-31','72, Hamster Street','Colombo 7','josie@gmail.com',768542154),('200025412563','Charlie','Chippies','2000-01-01','125, Kandy Road','Kandy','charlie@gmail.com',857821542),('725245622V','Jason','Stathems','1972-05-20','125/D, Garden Wall','PRD Correctional Facility','jasonstathems@gmail.com',857421542),('985245622V','Jonson','Fernando','1987-05-19','65, Nittambuwa Road','Udammita','jonsonfernando@gmail.com',718658547);
/*!40000 ALTER TABLE `User` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tester`
--

DROP TABLE IF EXISTS `tester`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tester` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `age` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tester`
--

LOCK TABLES `tester` WRITE;
/*!40000 ALTER TABLE `tester` DISABLE KEYS */;
INSERT INTO `tester` VALUES (8,'Asiri Iroshan',24),(9,'Asiri Iroshan',24),(10,'Asiri Iroshan',24),(11,'David',2),(12,'David',2);
/*!40000 ALTER TABLE `tester` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-04-18 23:35:10
