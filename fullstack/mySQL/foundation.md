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


