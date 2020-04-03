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

### 常用知识点
    1、union 与 union all
   ```
    MySQL UNION 操作符用于连接两个以上的 SELECT 语句的结果组合到一个结果集合中。多个 SELECT 语句会删除重复的数据。各 SELECT 语句字段名称可以不同，但字段属性必须一致.第一个 SELECT 语句中被使用的字段名称也被用于结果的字段名称.Union将会按照字段的顺序进行排序.
    
    SELECT expression1, expression2, ... expression_n
    FROM tables
    [WHERE conditions]
    UNION [ALL | DISTINCT]
    SELECT expression1, expression2, ... expression_n
    FROM tables
    [WHERE conditions];

    使用 UNION ALL 的时候，只是单纯的把各个查询组合到一起而不会去判断数据是否重复。因此，当确定查询结果中不会有重复数据或者不需要去掉重复数据的时候，应当使用 UNION ALL 以提高查询效率。

    如果想使用 ORDER BY 或 LIMIT 来对全部 UNION 结果进行分类或限制，则应对单个 SELECT 语句加圆括号，并把 ORDER BY 或 LIMIT 放到最后一个的后面。


    2、性能优化
        1)应尽量避免在 where 子句中使用 or 来连接条件， 否则将导致引擎放弃使用索引而进行全表扫描， 可以 使用UNION合并查询： select id from t where num=10 union all select id from t where num=20
        2)in 和 not in 也要慎用，否则会导致全表扫描，对于连续的数值，能用 between 就不要用 in
        3)尽量使用数字型字段，若只含数值信息的字段尽量不要设计为字符型，这会降低查询和连接的性能，并会增加存储开销。
        4)尽可能的使用 varchar/nvarchar 代替 char/nchar ， 因为首先变长字段存储空间小，可以节省存储空间，其次对于查询来说，在一个相对较小的字段内搜索效率显然要高些。
        5)使用表的别名(Alias)：当在SQL语句中连接多个表时,请使用表的别名并把别名前缀于每个Column上.这样一来,就可以减少解析的时间并减少那些由Column歧义引起的语法错误。
        6)使用“临时表”暂存中间结果:简化SQL语句的重要方法就是采用临时表暂存中间结果，但是，临时表的好处远远不止这些，将临时结果暂存在临时表，后面的查询就在tempdb中了，这可以避免程序中多次扫描主表，也大大减少了程序执行中“共享锁”阻塞“更新锁”，减少了阻塞，提高了并发性能。
        语法：CREATE TEMPORARY TABLE 表名 (…. )
        在创建临时表时声明类型为HEAP，则Mysql会在内存中创建该临时表，即内存表，因为HEAP表存储在内存中，你对它运行的查询可能比磁盘上的临时表快些。如：
        CREATE TEMPORARY TABLE 表名 (。。。。) TYPE = HEAP
        7)尽量将数据的处理工作放在服务器上，减少网络的开销，如使用存储过程。存储过程是编译好、优化过、并且被组织到一个执行规划里、且存储在数据库中的SQL语句，是控制流语言的集合，速度当然快。反复执行的动态SQL,可以使用临时存储过程，该过程（临时表）被放在Tempdb中。
        8)当服务器的内存够多时，配制线程数量 = 最大连接数+5，这样能发挥最大的效率；否则使用 配制线程数量<最大连接数启用SQL SERVER的线程池来解决,如果还是数量 = 最大连接数+5，严重的损害服务器的性能。
        9)尽量使用exists代替select count(1)来判断是否存在记录，count函数只有在统计表中所有行数时使用，而且count(1)比count(*)更有效率,如果某个表上Count（*)用的比较多时，考虑在一个最短的列建立一个单列索引，会极大的提升性能。
        10)当有一批处理的插入或更新时，用批量插入或批量更新，绝不会一条条记录的去更新
       


    3、exists与in效率
    通过使用EXISTS，Oracle会首先检查主查询，然后运行子查询直到它找到第一个匹配项，这就节省了时间。Oracle在执行IN子查询时，首先执行子查询，并将获得的结果列表存放在一个加了索引的临时表中。在执行子查询之前，系统先将主查询挂起，待子查询执行完毕，存放在临时表中以后再执行主查询。in 是把外表和内表作hash 连接，而exists是对外表作loop循环，每次loop循环再对内表进行查询.
        1) select * from T1 where exists(select a from T2 where T1.a=T2.a); // T1数据量小而T2数据量非常大时，T1<<T2 时，1) 的查询效率高。
        2) select * from T1 where T1.a in (select T2.a from T2); // T1数据量非常大而T2数据量小时，T1>>T2 时，2) 的查询效率高。
        3) 无论哪个表大，用not exists都比not in 要快.


    4、查询数据库所有表名
   
        SELECT TABLE_NAME,TABLE_COMMENT FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = '数据库名';

   ```

### 开发遇到问题

    1、去掉联表查询为null的数据
    SELECT g.name,g.type_id,t.type_id,t.type_name FROM game g LEFT JOIN game_type t ON t.type_id=g.type_id where not ISNULL(t.type_name);