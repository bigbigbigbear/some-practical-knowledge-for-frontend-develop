## Redis学习笔记

#### 概念
   Redis 是一个开源（BSD许可）的，内存中的数据结构存储系统，它可以用作数据库、缓存和消息中间件

#### 特性

   * KV型NoSQL缓存产品
   * 10次/s读写速度

#### 可执行文件

    ./redis-benchmark //用于进行redis性能测试的工具
    ./redis-check-dump //用于修复出问题的dump.rdb文件
    ./redis-cli //redis的客户端
    ./redis-server //redis的服务端
    ./redis-check-aof //用于修复出问题的AOF文件
    ./redis-sentinel //用于集群管理,哨兵模式

#### 命令

   * 启动： ./redis-server XXX/redis.conf   默认端口6379
   * 客户端连接： ./redis-cli -h 127.0.0.1 -p 7000 -a password
   * 检查密码：CONFIG get requirepass
   * 设置密码：CONFIG set requirepass
   * redis-cli info #查看redis数据库信息
   * redis-cli info replication #查看redis的复制授权信息
   * redis-cli info sentinel   #查看redis的哨兵信息

#### 数据结构

   * 字符串（strings）
        ```
        set 　　                    设置key
        get                         获取key
        append                      追加string
        mset                        设置多个键值对
        mget                        获取多个键值对
        del                         删除key
        incr                        递增+1
        decr                        递减-1
        ```
   * 散列（hashes）

        ```
        hset                        设置散列值
        hget                        获取散列值
        hmset                       设置多对散列值
        hmget                       获取多对散列值
        hsetnx                      如果散列已经存在，则不设置（防止覆盖key）
        hkeys                       返回所有keys
        hvals                       返回所有values
        hlen                        返回散列包含域（field）的数量
        hdel                        删除散列指定的域（field）
        hexists                     判断是否存在
        ```
   * 列表（lists）

        ```
        lpush                       从列表左边插
        rpush                       从列表右边插
        lrange                      获取一定长度的元素  lrange key  start stop
        ltrim                       截取一定长度列表
        lpop                        删除最左边一个元素
        rpop                        删除最右边一个元素
        lpushx/rpushx               key存在则添加值，不存在不处理
        ```
   * 集合（sets）

        ```
        sadd/srem                   添加/删除 元素
        sismember                   判断是否为set的一个元素
        smembers                    返回集合所有的成员
        sdiff                       返回一个集合和其他集合的差异
        sinter                      返回几个集合的交集
        sunion                      返回几个集合的并集
        ```
   * 有序集合（sorted sets）

#### redis.conf配置

    protected-mode yes   #打开保护模式
    port 6380  #更改默认启动端口
    requirepass xxxxxx   #设置redis启动密码，xxxx是自定义的密码

#### 发布/订阅

    PUBLISH channel msg
    将信息 message 发送到指定的频道 channel

    SUBSCRIBE channel [channel ...]
        订阅频道，可以同时订阅多个频道

    UNSUBSCRIBE [channel ...]
        取消订阅指定的频道, 如果不指定频道，则会取消订阅所有频道
    PSUBSCRIBE pattern [pattern ...]
        订阅一个或多个符合给定模式的频道，每个模式以 * 作为匹配符，比如 it* 匹配所    有以 it 开头的频道( it.news 、 it.blog 、 it.tweets 等等)， news.* 匹配所有    以 news. 开头的频道( news.it 、 news.global.today 等等)，诸如此类
    PUNSUBSCRIBE [pattern [pattern ...]]
        退订指定的规则, 如果没有参数则会退订所有规则
    PUBSUB subcommand [argument [argument ...]]
        查看订阅与发布系统状态
    注意：使用发布订阅模式实现的消息队列，当有客户端订阅channel后只能收到后续发布到该频道的消息，之前发送的不会缓存，必须Provider和Consumer同时在线。

#### redis-sentinel [哨兵模式](https://www.cnblogs.com/xintiao-/p/10414742.html)

#### redis-cluster [redis集群](https://www.cnblogs.com/xintiao-/p/10414797.html)

#### [redis主从同步](https://www.cnblogs.com/xintiao-/p/10414777.html)

#### [redis持久化RDB与AOF](https://www.cnblogs.com/xintiao-/p/10414758.html)
