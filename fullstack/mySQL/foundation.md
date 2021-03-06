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
      DECIMAL(M,D): 压缩的严格定点数,是数值的总位数，D是小数保留位数，默认(10,0)，能显示小数点位数和DOUBLE接近，适用货币，科学数据，数据比较
   ```

   + 日期/时间类型：
   ```
      YEAR：YYYY，1901 ~ 2155
      TIME：HH:MM:SS，-838:59:59 ~ 838:59:59
      DATE：YYYY-MMM-DD，1000-01-01 ~ 9999-12-3
      DATETIME：YYYY-MM-DD，1000-01-01 00:00:00 ~ 9999-12-31 23:59:59
      TIMESTAMP：YYYY-MM-DD，1970-01-01 00:00:01 UTC ~ 2038-01-19 03:14:07 UTC，跟时区有关
   ```

   + 二进制类型：
   ```
      BIT(M)：M表示插入值位数，最大64位，默认值1，如果小于M位，左边用0填充
      BINARY(M)：固定长度
      VARBINARY：可变长度
      BLOB：存储图像，音频文件
   ```

   + 字符串类型：
   ```
      CHAR(M): 固定长度字符串,M是实际存储空间的值，当插入数据少于M位，存储空间不变，多余的用空格补齐，输出时空格将被删除不输出。M最大255字节，浪费存储空间，处理速度快
      VARCHAR(M)：根据实际大小值确定存储空间大小，它会多用一个字节来存储长度，M最大为65535字节，节省存储空间
      TINYTEXT：255字节
      TEXT： 65535字节，非二进制字符串，存储文本文件
      MEDIUMTEXT：16777215字节
      LONGTEXT：4294967295字节，大概4GB
      ENUM('value1','value2','value3'...,'valuen')：枚举，限制字段上值的取值范围，只能取规定的值，n最多65535，只能取单值
      SET('value1','value2','value3'...,'valuen')：设置，n最大64，插入SET字段中的值如果有重复，则会自动删除重复的值，插入SET字段中的值会按顺序排列，规则是按照SET中的值的排列优先顺序，如果插入不输入SET中的值，就会报错。可以取多值，
   ```

* 优化原则

   ```
      // 更小的通常越好
      尽量选择使用可以正确存储数据的最小数据类型。更小的数据类型通常更快，
      因为它们占用更少的磁盘、内存和 CPU 缓存，并且处理时需要的 CPU 周期也更少；

      // 简单最好
      整型比字符型要好，两个例子，应该使用 MySQL 内建的类型来存储日期而不是字符串；
      使用整形存储 IP 地址。因为字符的校对、排序规则要复杂。

      // 尽量避免 NULL
      通常情况下最好指定列为 NOT NULL，除非真的需要存储 NULL 值；
      如果查询中包含可为 NULL 的列，对 MySQL 来说更难优化，
      因为可为 NULL 的列是的索引、索引统计和值比较，都更为复杂。
      允许为 NULL 的列，存储空间上占用更多，同时 MySQL 还需要对它特殊处理。

      整数类型：

         可以使用的几种整数类型：TINYINT，SMALLINT，MEDIUMINT，INT，BIGINT
         分别使用8，16，24，32，64位存储空间。

         整数类型有可选的 UNSIGNED 属性，表示不允许负值，这大致可以使正数的上限提高一倍。
         整数计算一般使用 64 位的 BIGINT 整数，即使 32 位环境也是如此（一些聚合函数是例外，他们使用DECIMAL或DOUBLE进行计算）。

         MySQL 可以为整数类型指定宽度，例如 INT(11)，对大多数应用这是没有意义的；
         它并不会限制值的合法范围。
         对于存储和计算来说，INT(1) 和 INT(20) 是相同的。
         int类型，占用字节数为 4 byte=32bit,int(M)可以理解为：这个长度M是为了告诉MYSQL数据库，这个字段的存储的数据的宽度为M位数, 当然如果你不是M位数（只要在该类型的存储范围之内）MYSQL也能正常存储。

      实数类型：

         FLOAT 和 DOUBLE 类型支持使用标准的浮点运算进行近似计算。
         DECIMAL 类型用于存储精确的小数，MySQL 服务器自身实现了 DECIMAL 的高精度计算，
         相对而言，CPU直接支持原生浮点计算，所以浮点计算明显更快。

         浮点和 DECIMAL 类型都可以指定精度，对于 DECIMAL 可以指定小数点前后所允许的最大位数，
         这会影响列的空间消耗。浮点类型在存储同样范围的值时，
         通常比 DECIMAL 使用更少的空间，所以应该尽量只在对小数进行精确计算时才使用。

         DECIMAL(18, 9) 小数点两点各存储 9 个数字，一共使用 9 个字节；
         DECIMAL 可以存储的整数比 BIGINT 还要大；

         浮点型以及 DECIMAL 在存取时，都需要额外的空间和计算的开销，
         所以应该尽量只对小数进行精确计算时才使用 DECIAML；
         如果数据量比较大的时候，可以考虑使用 BIGINT 代替 DECIAML。
         这就是为什么微信的数据库（猜的因为接口都是分为单位）使用 BIGINT 来做处理，目的就是为了节省 MySQL 计算带来的额外损耗；

      字符串类型：

         VARCHAR 存储可变长字符串。 当列的更新很少，使用了像 UTF-8 这样复杂的字符集时，使用 VARCHAR 存储。
         CHAR 类型是定长的，当存储 MD5 值，定长的值，或经常变更的数据时，用 CHAR 存储，因为这样不容易产生碎片。

         VARCHAR 类型存储可变长字符串，他比定长类型更节省空间，VARCHAR 节省了存储空间，所以对性能也有帮助，但由于是变长的，
         在 UPDATE 时可能使行变得比原来长，这就导致需要做额外的工作。

         存储引擎存储 CHAR 或者 VARCHAR 值的方式在内存中和硬盘上可能不一样。
         如果一个行占用的空间增长，并在业内没有更多足够的空间可以存储时，
         MyISAM 存储引擎会将拆分成不同的片段存储；而 InnerDB 则需要分裂页放进页内才行；

      BLOB 和 TEXT 类型

         MySQL 把每个 BLOB 和 TEXT 值当作一个独立的对象处理。
         两者都是为了存储很大数据而设计的字符串类型，分别采用二进制和字符方式存储。

      ENUM 枚举类型：

         有时候可以使用枚举代替常用的字符串类型，枚举把一些不重复的字符串存储成一个预定义的集合。
         枚举在保存时是（数字-字符串）的形式。
         将可优化的数据类型字段改为 ENUM 枚举类型后，关联查询性能可提升将近一倍。（书中列子暂不细说）

         SELECT SQL_NO_CACHE COUNT(*) FROM tables
         JOIN tables2 USING(day, account...);

      日期和时间类型：

         MySQL 使用许多类型保存日期和时间值，例如 Year 和 Date，MySQL 能存储的最小时间粒度为秒。

         MySQL 提供两种相似的日期类型：DATETIME 和 TIMESTAMP，
         在某些场合一个比另一个工作的更好。
         DATETIME 这个类型保存的最大值从1001到9999年，精度为秒。
         TIMESTAMP 使用 4 个字节保持日期，默认 NOT NULL。

         除了特殊行为之外，通常也应该尽量使用 TIMESTAMP 类型。

      位类型：

         BIT 最大长度 64 个位。MySQL 把 BIT 当作字符串类型，而不是数字类型。
         // 很多开发人员喜欢使用 BIT 作为 BOOL 类型来存储某些数据，true/false 这种，但是最好避免使用 BIT 类型。

         如果想在一个 bit 的存储空间中存储一个 true/false 的话，建议使用一个可以为空的 CHAR(0) 类型。

         同时也可以考虑使用 SET 类型，SET 类型 MySQL 内部是以一系列打包位的集合来表示的，
         MySQL 有像 FIND_IN_SET 和 FIELD 这样的函数，方便在查询中使用。
         他的主要缺点是改变列的代价太高，也无法在SET上通过索引查找。
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

   > 获取全局变量： select @@global;

   > 获取会话变量： select @@session;

   > 当前时间： select now();

   > 打印年月日： select day/month/year(current_date);

   > 查看表结构： desc <table_name>;

   > 查看运行的线程： show processlist;

   > 查看所有连接的详细情况： show full processlist;

   > 查看状态： show status;

   > 获取全局变量： show global variables;

   > 获取timeout变量： show global variables like "%timeout%";

   > 获取meta信息，线程等： select * from information_schema.innodb_trx;

   > 复制表结构： create table table2 like table1;

   > 复制数据： insert into table1 select * from table;

   > 启动： service mysqld start

   > 重启： service mysqld restart

   > 停止： service mysqld stop

   > 查索引： SHOW INDEX FROM <表名> [ FROM <数据库名>]

### mySQL设置global变量和session变量

   ```
   1、修改my.ini配置文件，在[mysqld]栈下添加全局变量，
   ```


### mac下mysql操作
   ```
   启动MySQL服务
   sudo /usr/local/MySQL/support-files/mysql.server start

   停止MySQL服务
   sudo /usr/local/mysql/support-files/mysql.server stop

   重启MySQL服务
   sudo /usr/local/mysql/support-files/mysql.server restart
   ```

### mysql导出

   ```
   导出所有表结构：mysqldump -h10.128.0.34 -ubos -pBos@2018 -d -P3308 --all-databases > /home/archforce/mysql/all.sql
   导出所有表数据：mysqldump -h10.128.0.34 -ubos -pBos@2018 -t -P3308 --all-databases > /home/archforce/mysql/all.sql
   导出所有表结构及数据：mysqldump -h10.128.0.34 -ubos -pBos@2018 -P3308 --all-databases > /home/archforce/mysql/all.sql
   ```

### mysql 授权
   ```
   bear使用mypassword从任何主机连接到mysql服务器，且只能操作testdb库
   GRANT ALL PRIVILEGES ON testdb.* TO 'bear'@'%' IDENTIFIED BY 'mypassword' WITH GRANT OPTION; 
   FLUSH PRIVILEGES; 
   flush privileges 命令本质上的作用是将当前user和privilige表中的用户信息/权限设置从mysql库(MySQL数据库的内置库)中提取到内存里。MySQL用户数据和权限有修改后，希望在"不重启MySQL服务"的情况下直接生效，那么就需要执行这个命令。通常是在修改ROOT帐号的设置后，怕重启后无法再登录进来，那么直接flush之后就可以看权限设置是否生效。而不必冒太大风险。
   ```

### mysql查看数据量最大的表
   ```
   select table_name,table_rows from information_schema.tables order by table_rows desc limit 10;
   ```

### mysql事务

   ```
   事务定义：一个最小的不可再分的工作单元；通常一个事务对应一个完整的业务。在事物进行过程中，未结束之前，DML语句是不会更改底层数据，只是将历史操作记录一下，在内存中完成记录。只有在事物结束的时候，而且是成功的结束的时候，才会修改底层硬盘文件中的数据
   事务特征(ACID)：原子性(A)：事务是最小单位，不可再分
                  一致性(C)：事务要求所有的DML语句操作的时候，必须保证同时成功或者同时失败
                  事务A和事务B之间具有隔离性
   事务术语：开启事务：Start Transaction
            事务结束：End Transaction
            提交事务：Commit Transaction
            回滚事务：Rollback Transaction
   事务开启：
            - 任何一条DML语句(insert、update、delete)执行，标志事务的开启
   事务结束：
            -  提交：成功的结束，将所有的DML语句操作历史记录和底层硬盘数据来一次同步
            -  回滚：失败的结束，将所有的DML语句操作历史记录全部清空
   事务隔离性的隔离级别：
            读未提交：read uncommitted
            读已提交：read committed(Oracle)
            可重复读：repeatable read(mysql)
            串行化：serializable
   设置事务隔离级别：SET [GLOBAL | SESSION] TRANSACTION ISOLATION LEVEL <isolation-level>;
            其中<isolation-level>取值是READ UNCOMMITTED、READ COMMITTED、REPEATABLE READ、SERIALIZABLE
   
   ```

### mysql 查询流程
   ```
   1、客户端与连接器建立连接、获取权限   mysql -h$host -P$port -u$user -p

   2、查询缓存：命中则取缓存，没有则执行后的，执行完后缓存结果   MySQL 8.0删除此功能

   3、分析器：词法分析(识别关键字)===>语法分析

   4、优化器：多个索引时决定使用哪个索引，多表关联时决定各个表连接顺序

   5、执行器：先判断一下你对这个表 T 有没有执行查询的权限，如果没有，就会返回没有权限的错误，如果有就继续执行，根据表引擎定义，执行器根据条件返回对应结果
   ```

### mysql创建用户及授权
   1、创建：CREATE USER 'username'@'host' IDENTIFIED BY 'password';
   2、授权：GRANT privileges ON databasename.tablename TO 'username'@'host';
