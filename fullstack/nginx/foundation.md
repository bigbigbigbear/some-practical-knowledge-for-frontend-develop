## nginx学习笔记

### Windows环境下nginx常用命令
   ```
   启动：start nginx
   版本：nginx -V
   验证配置： nginx -t
   强制停止： nginx -s stop
   正常停止： nginx -s quit
   重启： nginx -s reload
   ```

### linux环境下nginx常用命令
   ```
   启动：nginx -c /usr/local/nginx/conf/nginx.conf
   停止： ps -ef | grep nginx 找到master里主进程号， kill -QUIT PID(从容停止), kill -9 pid(强制停止)
   重启： /usr/local/sbin/nginx -s reload
   ```

### redis常用命令
   ```
   启动：./redis-server /path/to/redis.conf
   关闭：redis-cli -h 127.0.0.1 -p 6379 shutdown
   ```