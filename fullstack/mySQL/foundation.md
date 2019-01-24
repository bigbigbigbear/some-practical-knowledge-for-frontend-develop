# SQL(Structure Query Language)

### SQL分类

* DQL(数据查询语言)
   >
   > SELECT <字段名表>
   > FROM <表或视图名>
   > WHERE <查询条件>
   >
* DML(数据操纵语言)
   >
   > 插入：INSERT
   > 更新：UPDATE
   > 删除：DELETE
   >
* DDL(数据定义语言)
   >
   > 用来创建数据库中各种对象---表、视图、索引、同义词、聚簇等
   > CREATE TABLE/VIEW/INDEX/SYN/CLUSTER
   > DDL操作是隐性提交的，不能rollback
   >
* DCL(数据控制语言)

   用来授予或者回收访问数据库的某种特权，并控制数据库操纵事物发生的时间及效果，对数据库实行监视等
   >
   > GRANT：授权
   > ROLLBACK：回滚
   > COMMIT：提交
   >

### mySQL数据类型

* 数值数据类型

   + 整数类型：
   ```
      TINYINT: -128~127, 0~255
      SMALLINT: -32768~32767, 0~65535
      MEDIUMINT: -8388608~8388607(7), 0~16777215(8)
      INT: -2147483648~2147483647(10), 0~4294967295(10)
      BIGINT: -9223372036854775808~9223372036854775808(19), 0~18446744073709551615(20)
   ```

   + 浮点数类型：
   ```
      FLOAT: 单精度浮点数，小数点位大概40多位，默认不指定精度，会有精度问题
      DOUBLE: 双精度浮点数，小数点位大概300多位，默认不指定精度，会有精度问题，比较常用
   ```

   + 定点小数：
   ```
      DECIMAL(M,D): 压缩的严格定点数,是数值的总位数，D是小数保留位数，默认(10,0)，能显示小数点位数和DOUBLE接近，适用货币，科学数据
   ```

   + 日期/时间类型：
   ```
      YEAR：YYYY，1901 ~ 2155
      TIME：HH:MM:SS，-838:59:59 ~ 838:59:59
      DATE：YYYY-MMM-DD，1000-01-01 ~ 9999-12-3
      DATETIME：YYYY-MM-DD，1000-01-01 00:00:00 ~ 9999-12-31 23:59:59
      TIMESTAMP：YYYY-MM-DD，1970-01-01 00:00:01 UTC ~ 2038-01-19 03:14:07 UTC
   ```

   + 二进制类型：
   ```
      BIT
      BINARY
      VARBINARY
      BLOB
   ```

### mySQL命令行

   > 进入： cd /usr/local/mysql/bin
   > 登录： ./mysql -uroot -pxxx
   > 查看数据库： show databases;
   > 连接数据库： use db_name;
   > 查看数据表： show tables;
   > 查询： select * from table_name where xxx and xxx;
   > 当前选择的数据库： select database();
   > 查询mysql版本： select version();
   > 当前时间： select now();
   > 打印年月日： select day/month/year(current_date);
   > 查看表结构： desc <table_name>;
   > 查看所有连接的详细情况： show full processlist;
   > 查看状态： show status;
   > 复制表结构： create table table2 like table1;
   > 复制数据： insert into table1 select * from table;





