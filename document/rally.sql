/*
SQLyog Professional v10.42 
MySQL - 5.6.25-log : Database - rally
*********************************************************************
*/


/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`rally` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `rally`;


-- -----------------------------------------------------
-- Table `rally`.`release`
-- -----------------------------------------------------

/*Table structure for table `tbl_release` */

DROP TABLE IF EXISTS `tbl_release`;

CREATE TABLE `tbl_release` (
    `id` BIGINT(20) NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(128) NOT NULL,
    `start_date` DATE NOT NULL,
    `end_date` DATE NULL,
    `create_time` DATETIME NULL,
    `update_time` DATETIME NULL,
    PRIMARY KEY (`id`),
    UNIQUE INDEX `id_UNIQUE` (`id` ASC)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;


-- -----------------------------------------------------
-- Table `rally`.`project`
-- -----------------------------------------------------

/*Table structure for table `tbl_project` */

DROP TABLE IF EXISTS `tbl_project`;

CREATE TABLE `tbl_project` (
  `id` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `team_id` BIGINT(20) NOT NULL,
  `name` VARCHAR(45) NULL,
  `status` INT NULL COMMENT '0: set up\n1 : run\n2 : abort',
  `current_release_id` BIGINT(20) NULL,
  `release_interval` INT NULL COMMENT 'release interval : int type',
  `release_unit` INT NULL COMMENT '0: day\n1: week\n2: month\n3: year //no use',
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- -----------------------------------------------------
-- Table `rally`.`story`
-- -----------------------------------------------------

/*Table structure for table `tbl_story` */

DROP TABLE IF EXISTS `tbl_story`;

CREATE TABLE `tbl_story` (
  `id` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(128) NOT NULL COMMENT 'title of story',
  `create_time` DATETIME NULL,
  `update_time` DATETIME NULL,
  `desc` TEXT NULL,
  `notes` TEXT NULL,
  `files` VARCHAR(1024) NULL COMMENT 'file path',
  `status` BIGINT(20) NULL COMMENT '0: init\n1: ready\n2: developing\n3: developed\n4: testing\n5: tested\n6: accept',
  `est` FLOAT NULL,
  `todo` FLOAT NULL,
  `task_est` FLOAT NULL,
  `start_date` DATE NULL,
  `end_date` DATE NULL,
  `qa` BIGINT(20) NULL,
  `pm` BIGINT(20) NULL,
  `fe` BIGINT(20) NULL,
  `dev` BIGINT(20) NULL,
  `release_id` BIGINT(20) NOT NULL,
  `project_id` BIGINT(20) NOT NULL,
  `pid` BIGINT(20) NOT NULL,
  PRIMARY KEY (`id`, `project_id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- -----------------------------------------------------
-- Table `rally`.`member`
-- -----------------------------------------------------
/*Table structure for table `tbl_member` */

DROP TABLE IF EXISTS `tbl_member`;

CREATE TABLE `tbl_member` (
  `id` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(128) NOT NULL,
  `introduction` TEXT NULL,
  `team_id` BIGINT(20) NULL,
  `role_id` BIGINT(20) NULL,
  `create_time` DATETIME NULL,
  `update_time` DATETIME NULL,
  PRIMARY KEY (`id`)
)ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;


-- -----------------------------------------------------
-- Table `rally`.`story_member`
-- -----------------------------------------------------
/*Table structure for table `tbl_story_member` */

DROP TABLE IF EXISTS `tbl_story_member`;

CREATE TABLE `tbl_story_member` (
  `id` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `create_time` DATETIME NULL,
  `update_time` DATETIME NULL,
  `story_id` BIGINT(20) NOT NULL,
  `member_id` BIGINT(20) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC)
)ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;


-- -----------------------------------------------------
-- Table `rally`.`team`
-- -----------------------------------------------------
/*Table structure for table `tbl_team` */

DROP TABLE IF EXISTS `tbl_team`;

CREATE TABLE `tbl_team` (
  `id` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(128) NULL,
  `desc` TEXT NULL,
  `create_time` DATETIME NULL,
  `update_time` DATETIME NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC)
)ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;



-- -----------------------------------------------------
-- Table `rally`.`role`
-- -----------------------------------------------------
/*Table structure for table `tbl_role` */

DROP TABLE IF EXISTS `tbl_role`;

CREATE TABLE `tbl_role` (
  `id` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  `introduction` VARCHAR(128) NULL,
  `create_time` DATETIME NULL,
  `update_time` DATETIME NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC)
)ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;


-- -----------------------------------------------------
-- Table `rally`.`test_case`
-- -----------------------------------------------------
/*Table structure for table `tbl_test_case` */

DROP TABLE IF EXISTS `tbl_test_case`;

CREATE TABLE `tbl_test_case` (
  `id` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(128) NULL,
  `desc` TEXT NULL COMMENT 'step for test case',
  `status` INT NULL COMMENT '0: ready\n1: testing\n2: tested',
  `flag` TINYINT(1) NULL COMMENT 'true : pass\nfalse : fail',
  `files` VARCHAR(1024) NULL COMMENT 'upload file path',
  `create_time` DATETIME NULL,
  `udpate_time` DATETIME NULL,
  `story_id` BIGINT(20) NOT NULL,
  `owner_id` BIGINT(20) NOT NULL,
  PRIMARY KEY (`id`, `story_id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC)
)ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;



-- -----------------------------------------------------
-- Table `rally`.`task`
-- -----------------------------------------------------
/*Table structure for table `tbl_task` */

DROP TABLE IF EXISTS `tbl_task`;

CREATE TABLE `tbl_task` (
  `id` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(128) NULL,
  `desc` TEXT NULL,
  `status` INT NULL COMMENT '0: init\n1: ready\n2: developing\n3: finished',
  `create_time` DATETIME NULL,
  `update_time` DATETIME NULL,
  `owner_id` BIGINT(20) NULL,
  `est` FLOAT NULL,
  `todo` FLOAT NULL,
  `story_id` BIGINT(20) NOT NULL,
  PRIMARY KEY (`id`, `story_id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC)
)ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;


-- -----------------------------------------------------
-- Table `rally`.`bug`
-- -----------------------------------------------------
/*Table structure for table `tbl_bug` */

DROP TABLE IF EXISTS `tbl_bug`;

CREATE TABLE `tbl_bug` (
  `id` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(128) NOT NULL COMMENT '0: open\n1 : local fixed\n2 : ',
  `desc` TEXT NULL,
  `file` VARCHAR(1024) NULL COMMENT 'file path',
  `status` INT NOT NULL COMMENT '0 : open\n1 : local fixed\n2 : closed',
  `reopen` TINYINT(1) NULL COMMENT 'reopen times',
  `reopen_reason` VARCHAR(1024) NULL COMMENT 'true : reopen',
  `create_time` DATETIME NULL,
  `update_time` DATETIME NULL,
  `owner_id` BIGINT(20) NULL,
  `pm_id` BIGINT(20) NULL,
  `dev_id` BIGINT(20) NULL,
  `story_id` BIGINT(20) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC)
)ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;


-- -----------------------------------------------------
-- Table `rally`.`change_log`
-- -----------------------------------------------------
/*Table structure for table `tbl_change_log` */

DROP TABLE IF EXISTS `tbl_change_log`;

CREATE TABLE `tbl_change_log` (
  `id` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `content` VARCHAR(1024) NULL,
  `create_time` DATETIME NULL,
  `update_time` DATETIME NULL,
  `owner_id` BIGINT(20) NOT NULL,
  `story_id` BIGINT(20) NOT NULL,
  PRIMARY KEY (`id`, `story_id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC)
)ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;



-- -----------------------------------------------------
-- Table `rally`.`story_change_log`
-- -----------------------------------------------------
/*Table structure for table `tbl_story_change_log` */

DROP TABLE IF EXISTS `tbl_story_change_log`;

CREATE TABLE `tbl_story_change_log` (
  `id` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `story_id` BIGINT(20) NOT NULL,
  `change_log_id` BIGINT(20) NOT NULL,
  `create_time` DATETIME NULL,
  `update_time` DATETIME NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC)
)ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;


-- -----------------------------------------------------
-- Table `rally`.`member_has_role`
-- -----------------------------------------------------
/*Table structure for table `tbl_member_has_role` */

DROP TABLE IF EXISTS `tbl_member_has_role`;

CREATE TABLE `tbl_member_has_role` (
  `member_id` BIGINT(20) NOT NULL,
  `role_id` BIGINT(20) NOT NULL,
  PRIMARY KEY (`member_id`, `role_id`)
)ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- -----------------------------------------------------
-- Table `rally`.`member_has_team`
-- -----------------------------------------------------
/*Table structure for table `tbl_member_has_team` */

DROP TABLE IF EXISTS `tbl_member_has_team`;

CREATE TABLE `tbl_member_has_team` (
  `member_id` BIGINT(20) NOT NULL,
  `team_id` BIGINT(20) NOT NULL,
  PRIMARY KEY (`member_id`, `team_id`)
)ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;


/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
