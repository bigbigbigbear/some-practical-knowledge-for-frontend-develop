

### 常规操作

   * 新建目录A： mkdir A
   * 新建带权限的目录：mkdir -m 777 A
   * 将目录A重命名为B： mv A B
   * 新建文件： touch a.md
   * 将目录A移动到目录B下，并重命名为C： mv /A /B/C
   * 查看磁盘容量： df -h
   * 查看某个程序进程： ps -ef | grep java
   * 查看某程序状态： ps -aux | grep java
   * 查看端口占用： netstat -anp | grep 8080
   * 根据进程pid查端口：netstat -nap | grep pid
   * 查看端口所在进程：lsof -i:port
   * 杀死进程： kill -9 pid
   * 改为读写权限： sudo chmod 666 file
   * 改为只读权限： sudo chmod 664 file
   * 当前目录文件夹大小： du --max-depth=1 -h
   * 当前目录文件大小： du -sh ./*
   * 内存使用: free -m
   * 按文件名查找文件： find ./ -name '*bear*'
   * 查找文件： find ./ -name '*bear*' -depth -print 首先查找当前目录中的文件，然后再在其子目录中查找
   * 查找当前目录下所有 c 代码文件，统计总行数: find . -type f -name "*.c" | xargs wc -l
   * 程序名搜索： whereis java
   * 查看系统命令是否存在及位置： which nginx
   * 查看unix版本：uname -r
   * 查看内存：free -mh
   * 拷贝远程文件到当前目录：scp remote@www.abc.com:/usr/local/sin.sh /home/administrator/
   * 拷贝远程文件夹到当前目录：scp -r remote@www.abc.com:/usr/local/sin.sh /home/administrator/
   * 杀掉某个用户全部进程：pkill -u xxx    ||    killall -u xxx
   * 打包压缩：tar -zcvf test.tar.gz test.log
   * 解压：tar -zxvf test.tar.gz

### redis常用命令
   ```
   启动：./redis-server /path/to/redis.conf
   关闭：redis-cli -h 127.0.0.1 -p 6379 shutdown
   登录：./redis-cli -h 127.0.0.1 -p 6379 -a myPassword
   查看redis查询历史记录： history |grep redis
   ```

### 批量查找替换
   ```
   sed -i “s/查找字段/替换字段/g” grep 查找字段 -rl 路径
   sed -i “s/oldstring/newstring/g” 1.txt    //当前文件查找替换
   ```

### 登录后显示的-bash-4.2解决
   ```
   1、vi ~/.bash_profile
   在文件末尾追加：export PS1='[\u@\h \W]$ '
   2、执行以下指令，使更改生效：
   source ~/.bash_profile
   3、在.bashrc文件中加入如下内容：
   # Source global definitions
   if [ -f /etc/bashrc ]; then
         . /etc/bashrc
   fi

   PS1变量中提示符各项含义:
   \d ：代表日期，格式为weekday month date，例如：Wed Dec 12
   \H ：完整的主机名称。例如：hostname是debian.linux
   \h ：仅取主机的第一个名字，如上例，则为debian，.linux则被省略
   \t ：显示时间为24小时格式，如：HH：MM：SS
   \T ：显示时间为12小时格式
   \A ：显示时间为24小时格式：HH：MM
   \u ：当前用户的账号名称 如：root
   \v ：BASH的版本信息  如:3.2
   \w ：完整的工作目录名称。家目录会以 ~代替 如显示/etc/default/
   \W ：利用basename取得工作目录名称，所以只会列出最后一个目录 如上例则只显示default
   \# ：下达的第几个命令
   \$ ：提示字符，如果是root时，提示符为：# ，普通用户则为：$
   ```
