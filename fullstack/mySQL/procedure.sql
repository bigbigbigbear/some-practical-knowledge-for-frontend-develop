DROP PROCEDURE IF EXISTs tradingdb.column_work;

DELIMITER $$;
CREATE PROCEDURE tradingdb.column_work(databaseName varchar(50),tableName varchar(50), columnName varchar(50), cType int, sqlStr varchar(4000))
BEGIN

    DECLARE cntColumn INT;
    DECLARE cntIndex INT;
    DECLARE cntTable INT;
    DECLARE cntPrimary INT;

    SET cntColumn = 0;
    SET cntIndex = 0;
    SET cntTable = 0;
    SET cntPrimary = 0;

    SELECT COUNT(*) INTO cntColumn FROM information_schema.`COLUMNS` 
    WHERE TABLE_SCHEMA = databaseName AND TABLE_NAME = tableName AND COLUMN_NAME = columnName;

    SELECT COUNT(*) INTO cntIndex FROM information_schema.`STATISTICS` 
    WHERE TABLE_SCHEMA = databaseName AND TABLE_NAME = tableName AND INDEX_NAME = columnName;

    SELECT COUNT(*) INTO cntTable FROM (SELECT TABLE_NAME FROM information_schema.`TABLES` 
    WHERE TABLE_SCHEMA = databaseName AND TABLE_NAME = tableName) t;

    SELECT COUNT(*) INTO cntPrimary FROM information_schema.`TABLE_CONSTRAINTS` 
    WHERE TABLE_SCHEMA = databaseName AND TABLE_NAME = tableName AND CONSTRAINT_NAME = 'PRIMARY';

    IF(cType = 1 AND cntColumn <= 0) THEN -- 新增列
        SET sqlStr := CONCAT('ALTER TABLE ', databaseName, '.', tableName, ' ADD COLUMN ', columnName, ' ', sqlStr);
    ELSEIF (cType = 2 AND cntColumn > 0) THEN -- 修改列类型和注释
        SET sqlStr := CONCAT('ALTER TABLE ', databaseName, '.', tableName, ' MODIFY COLUMN ', columnName, ' ', sqlStr);
    ELSEIF (cType = 3 AND cntColumn > 0) THEN -- 修改字段名
        SET sqlStr := CONCAT('ALTER TABLE ', databaseName, '.', tableName, ' CHANGE COLUMN ', columnName, ' ', sqlStr);
    ELSEIF (cType = 4 AND cntColumn > 0) THEN -- 删除列
        SET sqlStr := CONCAT('ALTER TABLE ', databaseName, '.', tableName, ' DROP COLUMN ', columnName);
    ELSEIF (cType = 5 AND cntColumn > 0) THEN -- 删除索引
        SET sqlStr := CONCAT('ALTER TABLE ', databaseName, '.', tableName, ' DROP INDEX ', columnName);
    ELSEIF (cType = 6 AND cntColumn > 0) THEN -- 设置数据库引擎
        SET sqlStr := CONCAT('ALTER TABLE ', databaseName, '.', tableName, ' ENGINE = InnoDB');
    ELSEIF (cType = 7 AND cntColumn > 0) THEN -- 删除外键
        SET sqlStr := CONCAT('ALTER TABLE ', databaseName, '.', tableName, ' DROP FOREIGN KEY ', columnName);
    ELSEIF (cType = 8 AND cntColumn <= 0) THEN -- 创建唯一索引
        SET sqlStr := CONCAT('CREATE UNIQUE INDEX ', columnName, ' ON ', databaseName, '.', tableName, ' ', sqlStr);
    ELSEIF (cType = 9 AND cntPrimary > 0) THEN -- 删除主键
        SET sqlStr := CONCAT('ALTER TABLE ', databaseName, '.', tableName, ' DROP PRIMARY KEY');
    ELSEIF (cType = 10 AND cntPrimary <= 0) THEN -- 新增主键
        SET sqlStr := CONCAT('ALTER TABLE ', databaseName, '.', tableName, ' ADD PRIMARY KEY (', sqlStr, ')');
    ELSEIF (cType = 11 AND cntTable > 0) THEN -- 执行将老表记录复制到新表
        SET sqlStr := CONCAT(sqlStr, '');
    ELSEIF (cType = 12 AND cntTable > 0) THEN -- 删除表
        SET sqlStr := CONCAT('DROP TABLE IF EXISTS ', databaseName, '.', tableName);
    ELSEIF (cType = 13 AND cntTable <= 0) THEN -- 创建表
        SET sqlStr := CONCAT('CREATE TABLE IF NOT EXISTS ', databaseName, '.', tableName, sqlStr);
    ELSEIF (cType = 14 AND cntIndex <= 0) THEN -- 创建表索引
        SET sqlStr := CONCAT('ALTER TABLE ', databaseName, '.', tableName, ' ADD INDEX ', columnName, ' ', sqlStr);
    ELSEIF (cType = 15 AND cntTable > 0) THEN -- 表重命名
        SET sqlStr := CONCAT('RENAME TABLE ', databaseName, '.', tableName, ' TO ', databaseName, '.', sqlStr);
    ELSE
        SET sqlStr := '';
    END IF;

    IF(sqlStr <> '') THEN
        SET @sql1 = sqlStr;
        PREPARE stmt1 FROM @sql1;
        EXECUTE stmt1;
    END IF;

END $$
DELIMITER ;

-- CALL tradingdb.column_work('tradingdb','t_order','sku_id',2,'bigint(20) NOT NULL COMMENT "商品编号"');

DROP PROCEDURE IF EXISTs tradingdb.column_work;