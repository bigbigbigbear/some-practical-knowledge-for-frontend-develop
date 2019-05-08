

### 常规操作

   * 新建目录A： mkdir A
   * 将目录A重命名为B： mv A B
   * 将目录A移动到目录B下，并重命名为C： mv /A /B/C
   * 查看磁盘容量： df -h
   * 查看某个程序进程： ps -ef | grep java
   * 查看某程序状态： ps -aux | grep java
   * 查看端口占用： netstat -anp | grep 8080
   * 杀死进程： kill -9 pid
   * 改为读写权限： sudo chmod 666 file
   * 改为只读权限： sudo chmod 664 file

### redis常用命令
   ```
   启动：./redis-server /path/to/redis.conf
   关闭：redis-cli -h 127.0.0.1 -p 6379 shutdown
   查看redis查询历史记录： history |grep redis
   ```