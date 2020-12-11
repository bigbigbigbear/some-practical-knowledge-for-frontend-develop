1、delete from euser where age > 30 limit 200;
   ```
    1. 降低写错 SQL 的代价，就算删错了，比如 limit 500, 那也就丢了 500 条数据，并不致命，通过 binlog 也可以很快恢复数据。

    2. 避免了长事务，delete 执行时 MySQL 会将所有涉及的行加写锁和 Gap 锁（间隙锁），所有 DML 语句执行相关行会被锁住，如果删除数量大，会直接影响相关业务无法使用。

    3. delete 数据量大时，不加 limit 容易把 cpu 打满，导致越删越慢。
   ```

2、复制表：CREATE TABLE test_copy SELECT * FROM test WHERE 1=2;

3、delete、truncate、drop区别
   ```
    1. DELETE

    DELETE from TABLE_NAME where xxx 
    1) DELETE属于数据库DML操作语言，只删除数据不删除表的结构，会走事务，执行时会触发trigger；

    2) 在 InnoDB 中，DELETE其实并不会真的把数据删除，mysql 实际上只是给删除的数据打了个标记为已删除，因此 delete 删除表中的数据时，表文件在磁盘上所占空间不会变小，存储空间不会被释放，只是把删除的数据行设置为不可见。虽然未释放磁盘空间，但是下次插入数据的时候，仍然可以重用这部分空间（重用 → 覆盖）。

    3) DELETE执行时，会先将所删除数据缓存到rollback segement中，事务commit之后生效;

    4) delete from table_name删除表的全部数据,对于MyISAM 会立刻释放磁盘空间，InnoDB 不会释放磁盘空间;

    5) 对于delete from table_name where xxx 带条件的删除, 不管是InnoDB还是MyISAM都不会释放磁盘空间;

    6) delete操作以后使用 optimize table table_name 会立刻释放磁盘空间。不管是InnoDB还是MyISAM 。所以要想达到释放磁盘空间的目的，delete以后执行optimize table 操作。

    7) delete 操作是一行一行执行删除的，并且同时将该行的的删除操作日志记录在redo和undo表空间中以便进行回滚（rollback）和重做操作，生成的大量日志也会占用磁盘空间。

    2. truncate

    Truncate table TABLE_NAME 
    1) truncate：属于数据库DDL定义语言，不走事务，原数据不放到 rollback segment 中，操作不触发 trigger。执行后立即生效，无法找回

    2) truncate table table_name 立刻释放磁盘空间 ，不管是 InnoDB和MyISAM 。truncate table其实有点类似于drop table 然后creat,只不过这个create table 的过程做了优化，比如表结构文件之前已经有了等等。所以速度上应该是接近drop table的速度;

    3) truncate能够快速清空一个表。并且重置auto_increment的值。

    3. drop

    Drop table Tablename 
    1) drop：属于数据库DDL定义语言，同Truncate；执行后立即生效，无法找回
    2) drop table table_name 立刻释放磁盘空间 ，不管是 InnoDB 和 MyISAM; drop 语句将删除表的结构被依赖的约束(constrain)、触发器(trigger)、索引(index);  依赖于该表的存储过程/函数将保留,但是变为 invalid 状态。
   ```