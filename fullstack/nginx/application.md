### nginx日志分割

```
    1、上传脚本到/usr/local/nginx/logs/下
    2、并附执行权限
    chmod +x cut_nginx_log.sh

    3、编写定时任务  每天0点0分 执行cut_nginx_log.sh脚本
    crontab -e
    0 0 * * *  root /usr/local/nginx/logs/cut_nginx_log.sh
    或者
    vim /etc/crontab
    0 0 * * *  root /usr/local/nginx/logs/cut_nginx_log.sh

    4、脚本内容：
    cat   cut_nginx_log.sh

    #!/bin/bash
    #日志存放路径

    #LOG_PATH=￥NGINX_WORKDIR/logs
    LOGS_PATH=/usr/local/nginx/logs
    #获取昨天的时间
    YESTERDAY=$(date -d "yesterday" +%Y-%m-%d)

    month_age=${date -d "-30 days" +%Y-%m%-%d}

    if ! cd $LOG_PATH; then

        exit 2

    fi


    #nginx的PID路径
    NGINX_PID=/usr/local/nginx/logs/nginx.pid
    #把当前的access.log/error.log重命名为access.yesterday.log/error.yesterday.log
    mv ${LOGS_PATH}/access.log ${LOGS_PATH}/access.${YESTERDAY}.log
    mv ${LOGS_PATH}/error.log ${LOGS_PATH}/error.${YESTERDAY}.log
    # 向 Nginx 主进程发送 USR1 信号。USR1 信号是重新打开日志文件
    kill -USR1 $(cat ${NGINX_PID})
```

### 日志定时清理

```
    1、上传脚本到/usr/local/nginx/logs/下
    2、并附执行权限
    chmod +x rm_nginx_logfile.sh

    3、编写定时任务  每天0点0分 rm_nginx_logfile.sh脚本
    crontab -e
    0 0 * * *  root /usr/local/nginx/logs/rm_nginx_logfile.sh
    或者
    vim /etc/crontab
    0 0 * * *  root /usr/local/nginx/logs/rm_nginx_logfile.sh

    cat   rm_nginx_logfile.sh


    #!/bin/bash
    #日志所在路径
    LOGS_PATH=/usr/local/nginx/logs
    #设置保留时间  单位(天)
    SAVE_TIME=30
    #执行最终的命令
    #查找 修改日志在30天前的同时以log结尾的文件然后删除
    #如果没有-name选项过30之后脚本会被删除掉
    find ${LOGS_PATH}/ -mtime +${SAVE_TIME} -name \*.log |xargs rm -rf {}
```