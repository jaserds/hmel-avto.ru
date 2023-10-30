-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: 194.67.90.5    Database: db_cars
-- ------------------------------------------------------
-- Server version	8.0.34-0ubuntu0.22.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `bodytypes`
--

DROP TABLE IF EXISTS `bodytypes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bodytypes` (
  `BodyID` int NOT NULL AUTO_INCREMENT,
  `BodyName` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`BodyID`)
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bodytypes`
--

LOCK TABLES `bodytypes` WRITE;
/*!40000 ALTER TABLE `bodytypes` DISABLE KEYS */;
INSERT INTO `bodytypes` VALUES (1,'Седан'),(2,'Купе'),(3,'Кроссовер'),(4,'Внедорожник'),(5,'Хэтчбек'),(6,'Универсал'),(7,'Пикап'),(8,'Лифтбек'),(9,'Кабриолет'),(10,'Родстер'),(11,'Купе-кабриолет'),(12,'Фургон'),(13,'Микроавтобус'),(14,'Легковой фургон'),(15,'Пассажирский фургон'),(16,'Лимузин'),(17,'Спорткар'),(18,'Четырехдверный купе'),(19,'Трехдверный хэтчбек'),(20,'Шасси'),(21,'Электрический автомобиль'),(43,'Минивэн'),(44,'Минивен'),(45,'Внедорожник 5-дверный');
/*!40000 ALTER TABLE `bodytypes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `brand`
--

DROP TABLE IF EXISTS `brand`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `brand` (
  `BrandID` int NOT NULL AUTO_INCREMENT,
  `BrandName` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`BrandID`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `brand`
--

LOCK TABLES `brand` WRITE;
/*!40000 ALTER TABLE `brand` DISABLE KEYS */;
INSERT INTO `brand` VALUES (1,'Audi'),(2,'Opel'),(3,'BMW'),(36,'Volkswagen'),(41,'Toyota'),(42,'Mercedes-Benz');
/*!40000 ALTER TABLE `brand` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cars`
--

DROP TABLE IF EXISTS `cars`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cars` (
  `carID` int NOT NULL AUTO_INCREMENT,
  `VIN` varchar(20) NOT NULL,
  `BrandID` int DEFAULT NULL,
  `ModelID` int DEFAULT NULL,
  `generation` int DEFAULT NULL,
  `BodyID` int DEFAULT NULL,
  `EnginTypeID` int DEFAULT NULL,
  `TranssmissnionTypeID` int DEFAULT NULL,
  `rule` varchar(45) DEFAULT NULL,
  `ColorCarID` int DEFAULT NULL,
  `DriveUnitID` int DEFAULT NULL,
  `VolumeEngine` float DEFAULT NULL,
  `EnginePower` int DEFAULT NULL,
  `Mileage` int DEFAULT NULL,
  `QtyPerson` int DEFAULT NULL,
  `Age` int DEFAULT NULL,
  `Price` int DEFAULT NULL,
  `Customs` tinyint DEFAULT NULL,
  `PTS` tinyint DEFAULT NULL,
  `DescriptionOfDefects` longtext,
  `State` tinyint DEFAULT NULL,
  `phone` varchar(12) DEFAULT NULL,
  `City` int DEFAULT NULL,
  `UserId` int DEFAULT NULL,
  `isSite` int DEFAULT '1',
  PRIMARY KEY (`carID`,`VIN`),
  KEY `ModelID_fk_idx` (`ModelID`),
  KEY `cars_BodyID_fk_idx` (`BodyID`),
  KEY `cars_EnginTypeID_fk_idx` (`EnginTypeID`),
  KEY `cars_tr_mod_fk_idx` (`TranssmissnionTypeID`),
  KEY `cars_colors_car_fk_idx` (`ColorCarID`),
  KEY `cars_driveunit_fk_idx` (`DriveUnitID`),
  KEY `cars_generation_fk_idx` (`generation`),
  KEY `Cars_from_Cities_idx` (`City`),
  KEY `cars_userId_fk_idx` (`UserId`),
  CONSTRAINT `cars_BodyID_fk` FOREIGN KEY (`BodyID`) REFERENCES `modelandbody` (`id`),
  CONSTRAINT `cars_colors_car_fk` FOREIGN KEY (`ColorCarID`) REFERENCES `colors_car` (`ColorID`),
  CONSTRAINT `cars_driveunit_fk` FOREIGN KEY (`DriveUnitID`) REFERENCES `driveunit_model` (`id`),
  CONSTRAINT `cars_EnginTypeID_fk` FOREIGN KEY (`EnginTypeID`) REFERENCES `enginetypes` (`EngineID`),
  CONSTRAINT `Cars_from_Cities` FOREIGN KEY (`City`) REFERENCES `cities` (`idCity`),
  CONSTRAINT `cars_tr_mod_fk` FOREIGN KEY (`TranssmissnionTypeID`) REFERENCES `transsmission_model` (`id`),
  CONSTRAINT `cars_userId_fk` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`),
  CONSTRAINT `ModelID_fk` FOREIGN KEY (`ModelID`) REFERENCES `models` (`ModelID`)
) ENGINE=InnoDB AUTO_INCREMENT=140 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cars`
--

LOCK TABLES `cars` WRITE;
/*!40000 ALTER TABLE `cars` DISABLE KEYS */;
INSERT INTO `cars` VALUES (139,'WDC113SDF2D2SDFR2',42,58,42,31,2,20,'Левый',6,19,3,249,141000,1,2016,5550000,1,1,'<p>MERCEDES-ВENZ GLS 350 D 4МАТIС</p><p>249л.с. 7 мeст.</p><p>Aвтомoбиль дилеpский, пoкупaлcя нoвым 04.2017г. в ПAHABTО.</p><p>Было бoльшoе ТО с зaмeнoй тоpмoзных диcков, зaмена маcла в акпп и тд.</p><p>Aвтoмобиль в одних берeжныx pукaх!</p><p>Coстoяниe нa 5. Вложений ни какиx не требуется.</p><ul><li>Панорамный сдвижной люк; бесключевой доступ; АМG пакет;</li><li>премиальная аудиосистема hаrmаn/kаrdоn; вентиляция сидений;</li><li>память сидений и многое другое.</li></ul><p>Возможна продажа в кредит, лизинг, наличные. 4 этаж</p>',0,'88982314543',2,70,1);
/*!40000 ALTER TABLE `cars` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cities`
--

DROP TABLE IF EXISTS `cities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cities` (
  `idCity` int NOT NULL AUTO_INCREMENT,
  `CityName` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idCity`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cities`
--

LOCK TABLES `cities` WRITE;
/*!40000 ALTER TABLE `cities` DISABLE KEYS */;
INSERT INTO `cities` VALUES (1,'Ростов-на-Дону'),(2,'Москва'),(4,'Самара');
/*!40000 ALTER TABLE `cities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `colors_car`
--

DROP TABLE IF EXISTS `colors_car`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `colors_car` (
  `ColorID` int NOT NULL AUTO_INCREMENT,
  `ColorName` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`ColorID`)
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `colors_car`
--

LOCK TABLES `colors_car` WRITE;
/*!40000 ALTER TABLE `colors_car` DISABLE KEYS */;
INSERT INTO `colors_car` VALUES (1,'Белый'),(2,'Черный'),(3,'Серый'),(4,'Серебристый'),(5,'Красный'),(6,'Синий'),(7,'Зеленый'),(8,'Желтый'),(9,'Оранжевый'),(10,'Фиолетовый'),(11,'Бежевый'),(12,'Коричневый'),(13,'Золотистый'),(14,'Розовый'),(15,'Темно-синий'),(16,'Светло-серый'),(17,'Светло-зеленый'),(18,'Темно-зеленый'),(19,'Темно-серый'),(20,'Серо-голубой'),(21,'Бирюзовый'),(22,'Бордовый'),(23,'Голубой'),(24,'Лаймовый'),(25,'Мандариновый'),(26,'Мокрый асфальт'),(27,'Мокрый песок'),(28,'Оливковый'),(29,'Пастельный'),(30,'Песочный'),(31,'Светло-голубой'),(32,'Светло-розовый'),(33,'Сиреневый'),(34,'Темно-красный'),(35,'Темно-коричневый'),(36,'Темно-серебристый'),(37,'Хаки'),(38,'Шоколадный'),(39,'Ярко-зеленый'),(40,'Ярко-желтый'),(41,'Черный металик');
/*!40000 ALTER TABLE `colors_car` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `documents`
--

DROP TABLE IF EXISTS `documents`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `documents` (
  `documentID` int NOT NULL AUTO_INCREMENT,
  `documentName` text,
  `carID` int NOT NULL,
  PRIMARY KEY (`documentID`),
  KEY `document_car__fk_carID_idx` (`carID`),
  CONSTRAINT `document_car__fk_carID` FOREIGN KEY (`carID`) REFERENCES `cars` (`carID`)
) ENGINE=InnoDB AUTO_INCREMENT=250 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `documents`
--

LOCK TABLES `documents` WRITE;
/*!40000 ALTER TABLE `documents` DISABLE KEYS */;
INSERT INTO `documents` VALUES (249,'document_e4890c696f710c35.jpeg',139);
/*!40000 ALTER TABLE `documents` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `driveunit`
--

DROP TABLE IF EXISTS `driveunit`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `driveunit` (
  `id` int NOT NULL AUTO_INCREMENT,
  `DriveUnitName` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `driveunit`
--

LOCK TABLES `driveunit` WRITE;
/*!40000 ALTER TABLE `driveunit` DISABLE KEYS */;
INSERT INTO `driveunit` VALUES (1,'Передний'),(2,'Задний'),(3,'Полный'),(5,'Автомат');
/*!40000 ALTER TABLE `driveunit` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `driveunit_model`
--

DROP TABLE IF EXISTS `driveunit_model`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `driveunit_model` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ModelID` int DEFAULT NULL,
  `DriveUnitID` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `driveunit_model_model_fk_idx` (`ModelID`),
  KEY `driveunit_model_driveunit_idx` (`DriveUnitID`),
  CONSTRAINT `driveunit_model_driveunit` FOREIGN KEY (`DriveUnitID`) REFERENCES `driveunit` (`id`),
  CONSTRAINT `driveunit_model_model_fk` FOREIGN KEY (`ModelID`) REFERENCES `models` (`ModelID`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `driveunit_model`
--

LOCK TABLES `driveunit_model` WRITE;
/*!40000 ALTER TABLE `driveunit_model` DISABLE KEYS */;
INSERT INTO `driveunit_model` VALUES (19,58,3);
/*!40000 ALTER TABLE `driveunit_model` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `enginetypes`
--

DROP TABLE IF EXISTS `enginetypes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `enginetypes` (
  `EngineID` int NOT NULL AUTO_INCREMENT,
  `EnginTypeName` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`EngineID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `enginetypes`
--

LOCK TABLES `enginetypes` WRITE;
/*!40000 ALTER TABLE `enginetypes` DISABLE KEYS */;
INSERT INTO `enginetypes` VALUES (1,'Бензин'),(2,'Дизель'),(3,'Электро'),(4,'Гибридный'),(5,'ГБО');
/*!40000 ALTER TABLE `enginetypes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `expenses`
--

DROP TABLE IF EXISTS `expenses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `expenses` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ExpensesName` varchar(120) DEFAULT NULL,
  `ExpensesDataTime` datetime(6) DEFAULT NULL,
  `ExpensesSumm` int DEFAULT NULL,
  `CarID` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `Expenses_CarID__cars_carID_fk_idx` (`CarID`),
  CONSTRAINT `Expenses_CarID__cars_carID_fk` FOREIGN KEY (`CarID`) REFERENCES `cars` (`carID`)
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `expenses`
--

LOCK TABLES `expenses` WRITE;
/*!40000 ALTER TABLE `expenses` DISABLE KEYS */;
INSERT INTO `expenses` VALUES (46,'Химчистка','2023-10-16 14:24:00.000000',9500,139),(47,'Mercedes-Benz GLS-класс X166','2023-10-10 18:49:00.000000',4500000,139);
/*!40000 ALTER TABLE `expenses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `generation`
--

DROP TABLE IF EXISTS `generation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `generation` (
  `GenerationID` int NOT NULL AUTO_INCREMENT,
  `GenerationName` varchar(100) NOT NULL,
  `GenerationAge` varchar(45) NOT NULL,
  `ModelID` int DEFAULT NULL,
  PRIMARY KEY (`GenerationID`),
  KEY `generation_model_fk_idx` (`ModelID`),
  CONSTRAINT `generation_model_fk` FOREIGN KEY (`ModelID`) REFERENCES `models` (`ModelID`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `generation`
--

LOCK TABLES `generation` WRITE;
/*!40000 ALTER TABLE `generation` DISABLE KEYS */;
INSERT INTO `generation` VALUES (42,'X166','2015 - 2019',58);
/*!40000 ALTER TABLE `generation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `modelandbody`
--

DROP TABLE IF EXISTS `modelandbody`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `modelandbody` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ModelID` int DEFAULT NULL,
  `BodyID` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `mab_ModelID_fk_idx` (`ModelID`),
  KEY `mab_BodyID_fk_idx` (`BodyID`),
  CONSTRAINT `mab_BodyID_fk` FOREIGN KEY (`BodyID`) REFERENCES `bodytypes` (`BodyID`),
  CONSTRAINT `mab_ModelID_fk` FOREIGN KEY (`ModelID`) REFERENCES `models` (`ModelID`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `modelandbody`
--

LOCK TABLES `modelandbody` WRITE;
/*!40000 ALTER TABLE `modelandbody` DISABLE KEYS */;
INSERT INTO `modelandbody` VALUES (31,58,45);
/*!40000 ALTER TABLE `modelandbody` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `models`
--

DROP TABLE IF EXISTS `models`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `models` (
  `ModelID` int NOT NULL AUTO_INCREMENT,
  `ModelName` varchar(100) DEFAULT NULL,
  `BrandID` int DEFAULT NULL,
  PRIMARY KEY (`ModelID`),
  KEY `brand_fk_idx` (`BrandID`),
  CONSTRAINT `brand_fk` FOREIGN KEY (`BrandID`) REFERENCES `brand` (`BrandID`)
) ENGINE=InnoDB AUTO_INCREMENT=59 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `models`
--

LOCK TABLES `models` WRITE;
/*!40000 ALTER TABLE `models` DISABLE KEYS */;
INSERT INTO `models` VALUES (58,'GLS-класс',42);
/*!40000 ALTER TABLE `models` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `photocars`
--

DROP TABLE IF EXISTS `photocars`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `photocars` (
  `photoID` int NOT NULL AUTO_INCREMENT,
  `fileName` text,
  `carID` int DEFAULT NULL,
  PRIMARY KEY (`photoID`),
  KEY `cars_photo_fk_idx` (`carID`),
  CONSTRAINT `cars_photo_fk` FOREIGN KEY (`carID`) REFERENCES `cars` (`carID`)
) ENGINE=InnoDB AUTO_INCREMENT=927 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `photocars`
--

LOCK TABLES `photocars` WRITE;
/*!40000 ALTER TABLE `photocars` DISABLE KEYS */;
INSERT INTO `photocars` VALUES (902,'image_2942fb9f42e86a8e.jpeg',139),(903,'image_51237bb419bb5ef5.jpeg',139),(904,'image_d3425409a61ce0d0.jpeg',139),(905,'image_87392ce4905d3ced.jpeg',139),(906,'image_eb0bf3bbc8d901e1.jpeg',139),(907,'image_8cfc92cf7f934eec.jpeg',139),(908,'image_351aa8b278d8c0f0.jpeg',139),(909,'image_22a703b002857942.jpeg',139),(910,'image_72d33f6f039b487e.jpeg',139),(911,'image_648a3100cec9af4d.jpeg',139),(912,'image_652cf3ec91cc1d5b.jpeg',139),(913,'image_60712cc32cff7397.jpeg',139),(914,'image_ecd984f1057e2640.jpeg',139),(915,'image_3d9d05c13d46fad3.jpeg',139),(916,'image_4af27a66cd516225.jpeg',139),(917,'image_f5c1734479310dd1.jpeg',139),(918,'image_0e8c06c353945543.jpeg',139),(920,'image_369f7f1942a4e45a.jpeg',139),(921,'image_92013714e0c46841.jpeg',139),(922,'image_0fc6d8ec5df08ee2.jpeg',139),(923,'image_feae3c54268bddee.jpeg',139),(924,'image_0fd68c437611ebad.jpeg',139),(925,'image_594fde027d966451.jpeg',139),(926,'image_443074a25fd71b45.jpeg',139);
/*!40000 ALTER TABLE `photocars` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tokenschema`
--

DROP TABLE IF EXISTS `tokenschema`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tokenschema` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userID` int DEFAULT NULL,
  `refreshToken` text NOT NULL,
  PRIMARY KEY (`id`),
  KEY `token_users_fk_idx` (`userID`),
  CONSTRAINT `token_users_fk` FOREIGN KEY (`userID`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=309 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tokenschema`
--

LOCK TABLES `tokenschema` WRITE;
/*!40000 ALTER TABLE `tokenschema` DISABLE KEYS */;
INSERT INTO `tokenschema` VALUES (308,70,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaW8iOiLQodCw0LPQuNC9INCh0LXRgNCz0LXQuSDQodC10YDQs9C10LXQstC40YciLCJlbWFpbCI6IjUyNjQwc2VyQGdtYWlsLmNvbSIsImlkIjo3MCwicm9sZSI6Ik1hbmFnZXIiLCJpYXQiOjE2OTg2NjMzNDcsImV4cCI6MTY5OTA5NTM0N30.Y4KCM6Jhh8sAtzcshzS1-k5NBBNUu0Ye3QknAVhMxgU');
/*!40000 ALTER TABLE `tokenschema` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transsmission_model`
--

DROP TABLE IF EXISTS `transsmission_model`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transsmission_model` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ModelID` int NOT NULL,
  `TranssmissionID` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `tr_mod_mod_fr_idx` (`ModelID`),
  KEY `tr_mod_trans_fk_idx` (`TranssmissionID`),
  CONSTRAINT `tr_mod_mod_fk` FOREIGN KEY (`ModelID`) REFERENCES `models` (`ModelID`),
  CONSTRAINT `tr_mod_trans_fk` FOREIGN KEY (`TranssmissionID`) REFERENCES `transsmissions` (`TransID`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transsmission_model`
--

LOCK TABLES `transsmission_model` WRITE;
/*!40000 ALTER TABLE `transsmission_model` DISABLE KEYS */;
INSERT INTO `transsmission_model` VALUES (20,58,1);
/*!40000 ALTER TABLE `transsmission_model` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transsmissions`
--

DROP TABLE IF EXISTS `transsmissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transsmissions` (
  `TransID` int NOT NULL AUTO_INCREMENT,
  `TranssmissionsName` varchar(65) DEFAULT NULL,
  PRIMARY KEY (`TransID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transsmissions`
--

LOCK TABLES `transsmissions` WRITE;
/*!40000 ALTER TABLE `transsmissions` DISABLE KEYS */;
INSERT INTO `transsmissions` VALUES (1,'Автомат'),(2,'Механическая'),(3,'Вариатор'),(4,'Робот');
/*!40000 ALTER TABLE `transsmissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `fio` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(11) NOT NULL,
  `password` varchar(150) NOT NULL,
  `isActivated` tinyint DEFAULT '0',
  `activatedLink` text,
  `Role` varchar(45) NOT NULL,
  `inn` varchar(12) DEFAULT NULL,
  `OrganizationName` varchar(100) DEFAULT NULL,
  `JobTitle` varchar(45) DEFAULT NULL,
  `UserAvatar` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=83 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (70,'Сагин Сергей Сергеевич','52640ser@gmail.com','89515309779','$2b$05$b76UlNndiYsS5I26lgmsge/sbh00JB8G3lf4jXYtcoLd36xevbaFO',1,'440812e9-700e-4bf2-9472-e9c15745cf85','Manager','6016558877','ИП Сагин С.С.','Менеджер',NULL),(77,'Хмелева Любовь Юрьевна','lyubochka88@rambler.ru','79604606808','$2b$05$V2BFafSZtkURiknSrXcy/el9h1eYh6hv2T7NWoQfbVaZyvUfsbTbu',1,'1fe81ce3-1494-4278-9516-228c196ecdbe','Manager',NULL,NULL,NULL,NULL),(78,'Федоров Дмитрий Антонович','d144145@mail.ru','89895995871','$2b$05$xvuBeGp8r8wtmcxFsq5gUu0wi.jvSXVwR5YSwevV/9mtWUUWbVBya',1,'38ea7943-351b-4478-9581-f82731ab164c','Manager',NULL,NULL,NULL,NULL),(79,'Зинина Екатерина Владиславовна','pusya666@bk.ru','79281777212','$2b$05$aIPJa624aXt9p/f0u0mhRO8aF1SUwFSCzx/o3TQ4kT8.BP7gM2W42',1,'dda73b17-03cb-4ebc-8134-95ff9ab66386','User',NULL,NULL,NULL,NULL),(80,'Тимошенко Дмитрий Сергеевич','dima.timoshenko.22@mail.tu','89895796678','$2b$05$.aFvvu8CibUR/EVjhJM4lOEnn0NLpZ.SSg2v93iGfdRGwQzaxNfjG',1,'52edc4e6-13c8-46ba-a2a5-7c82ad595988','Manager',NULL,NULL,NULL,NULL),(82,'Секунов Антон Мальбертович','52640serge@gmail.com','89613324345','$2b$05$.m5becqcLtOQwz7RnRvPCOf6WfP18zh9vVcb1Q1tTj4TZJAqroVyu',0,'f0bc9c7e-08e2-4013-a880-708ef7b24b46','User',NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usertocars`
--

DROP TABLE IF EXISTS `usertocars`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usertocars` (
  `id` int NOT NULL AUTO_INCREMENT,
  `UserID` int DEFAULT NULL,
  `CarID` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `UserID_User_idx` (`UserID`),
  KEY `CarID_car_idx` (`CarID`),
  CONSTRAINT `CarID_car` FOREIGN KEY (`CarID`) REFERENCES `cars` (`carID`),
  CONSTRAINT `UserID_User` FOREIGN KEY (`UserID`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usertocars`
--

LOCK TABLES `usertocars` WRITE;
/*!40000 ALTER TABLE `usertocars` DISABLE KEYS */;
/*!40000 ALTER TABLE `usertocars` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-10-30 14:01:41
