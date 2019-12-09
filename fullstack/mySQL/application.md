### 字符ddl
    `code` varchar(20) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL COMMENT '唯一码'
    CHARACTER SET utf8：设置数据库的默认编码为utf8，utf8中间不要"-"；
    utf8_bin将字符串中的每一个字符用二进制数据存储，区分大小写。

### 数据储存
    1 判断字段是否存在
    DROP PROCEDURE IF EXISTS schema_change;  
    DELIMITER //
    CREATE PROCEDURE schema_change() BEGIN 
    DECLARE  CurrentDatabase VARCHAR(100);
    SELECT DATABASE() INTO CurrentDatabase;
    IF NOT EXISTS (SELECT * FROM information_schema.columns WHERE table_schema=CurrentDatabase AND table_name = 'rtc_order' AND column_name = 'IfUpSend') THEN  
        ALTER TABLE rtc_order
        ADD COLUMN `IfUpSend` BIT  NOT NULL  DEFAULT 0 COMMENT '是否上传 是否上传';
    END IF;
    END//  
    DELIMITER ;  
    CALL schema_change();

    2 判断索引是否存在
    DROP PROCEDURE IF EXISTS schema_change;  
    DELIMITER //
    CREATE PROCEDURE schema_change() BEGIN 
    DECLARE  CurrentDatabase VARCHAR(100);
    SELECT DATABASE() INTO CurrentDatabase;
    IF NOT EXISTS (SELECT * FROM information_schema.statistics WHERE table_schema=CurrentDatabase AND table_name = 'rtc_phototype' AND index_name = 'index_name') THEN  
    ALTER TABLE `rtc_Phototype` ADD INDEX index_name ( `imgtype` );
    END IF;  
    END//  
    DELIMITER ;  
    CALL schema_change();