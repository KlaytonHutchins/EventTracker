-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema financedb
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `financedb` ;

-- -----------------------------------------------------
-- Schema financedb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `financedb` DEFAULT CHARACTER SET utf8 ;
USE `financedb` ;

-- -----------------------------------------------------
-- Table `user_portfolio`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `user_portfolio` ;

CREATE TABLE IF NOT EXISTS `user_portfolio` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(45) NULL,
  `last_name` VARCHAR(45) NULL,
  `email` VARCHAR(45) NULL,
  `password` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `bank_account`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `bank_account` ;

CREATE TABLE IF NOT EXISTS `bank_account` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `institution_name` VARCHAR(45) NULL,
  `balance` DECIMAL(12,2) NULL,
  `user_portfolio_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_bank_account_user_portfolio1_idx` (`user_portfolio_id` ASC),
  CONSTRAINT `fk_bank_account_user_portfolio1`
    FOREIGN KEY (`user_portfolio_id`)
    REFERENCES `user_portfolio` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `withdrawal`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `withdrawal` ;

CREATE TABLE IF NOT EXISTS `withdrawal` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `amount` DECIMAL(12,2) NULL,
  `description` VARCHAR(45) NULL,
  `timestamp` DATETIME NULL,
  `account_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_withdrawal_account1_idx` (`account_id` ASC),
  CONSTRAINT `fk_withdrawal_account1`
    FOREIGN KEY (`account_id`)
    REFERENCES `bank_account` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `deposit`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `deposit` ;

CREATE TABLE IF NOT EXISTS `deposit` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `amount` DECIMAL(12,2) NULL,
  `description` VARCHAR(45) NULL,
  `timestamp` DATETIME NULL,
  `account_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_deposit_account_idx` (`account_id` ASC),
  CONSTRAINT `fk_deposit_account`
    FOREIGN KEY (`account_id`)
    REFERENCES `bank_account` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `credit_card`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `credit_card` ;

CREATE TABLE IF NOT EXISTS `credit_card` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `institution_name` VARCHAR(45) NULL,
  `balance` DECIMAL(12,2) NULL,
  `user_portfolio_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_credit_card_user_portfolio1_idx` (`user_portfolio_id` ASC),
  CONSTRAINT `fk_credit_card_user_portfolio1`
    FOREIGN KEY (`user_portfolio_id`)
    REFERENCES `user_portfolio` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `payment`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `payment` ;

CREATE TABLE IF NOT EXISTS `payment` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `amount` DECIMAL(12,2) NULL,
  `description` VARCHAR(45) NULL,
  `timestamp` DATETIME NULL,
  `credit_card_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_payment_credit_card1_idx` (`credit_card_id` ASC),
  CONSTRAINT `fk_payment_credit_card1`
    FOREIGN KEY (`credit_card_id`)
    REFERENCES `credit_card` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `purchase`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `purchase` ;

CREATE TABLE IF NOT EXISTS `purchase` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `amount` DECIMAL(12,2) NULL,
  `description` VARCHAR(45) NULL,
  `timestamp` DATETIME NULL,
  `credit_card_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_purchase_credit_card1_idx` (`credit_card_id` ASC),
  CONSTRAINT `fk_purchase_credit_card1`
    FOREIGN KEY (`credit_card_id`)
    REFERENCES `credit_card` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

SET SQL_MODE = '';
DROP USER IF EXISTS finance@localhost;
SET SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
CREATE USER 'finance'@'localhost' IDENTIFIED BY 'financeapp';

GRANT SELECT, INSERT, TRIGGER, UPDATE, DELETE ON TABLE * TO 'finance'@'localhost';

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `user_portfolio`
-- -----------------------------------------------------
START TRANSACTION;
USE `financedb`;
INSERT INTO `user_portfolio` (`id`, `first_name`, `last_name`, `email`, `password`) VALUES (1, 'Jack', 'Ramirez', 'jack@gmail.com', 'iLoveFish');

COMMIT;


-- -----------------------------------------------------
-- Data for table `bank_account`
-- -----------------------------------------------------
START TRANSACTION;
USE `financedb`;
INSERT INTO `bank_account` (`id`, `institution_name`, `balance`, `user_portfolio_id`) VALUES (1, 'Wells Fargo', 13.25, 1);

COMMIT;


-- -----------------------------------------------------
-- Data for table `credit_card`
-- -----------------------------------------------------
START TRANSACTION;
USE `financedb`;
INSERT INTO `credit_card` (`id`, `institution_name`, `balance`, `user_portfolio_id`) VALUES (1, 'Capital One', 23.00, 1);

COMMIT;

