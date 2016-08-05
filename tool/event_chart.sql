/*
SQLyog Professional v10.42 
MySQL - 5.6.25-log : Database - rally
*********************************************************************
*/

/*!40101 SET NAMES utf8***REMOVED***;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0***REMOVED***;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0***REMOVED***;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO'***REMOVED***;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0***REMOVED***;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`rally` /*!40100 DEFAULT CHARACTER SET utf8***REMOVED***;

USE `rally`;

/*Table structure for table `tbl_event_chart`***REMOVED***

DROP TABLE IF EXISTS `tbl_event_chart`;

CREATE TABLE `tbl_event_chart` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `parent_id` bigint(20) NOT NULL,
  `name` varchar(128) NOT NULL,
  `create_time` datetime DEFAULT NULL COMMENT '创建日期',
  `update_time` datetime DEFAULT NULL COMMENT '更新日期',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE***REMOVED***;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS***REMOVED***;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS***REMOVED***;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES***REMOVED***;
