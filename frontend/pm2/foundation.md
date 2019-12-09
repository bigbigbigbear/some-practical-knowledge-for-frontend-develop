## pm2学习笔记

### 常用命令
   ```
   安装：npm install -g pm2
   更新：pm2 update
   运行: pm2 start app.js
   进程：pm2 ls
   监控：pm2 monit
   日志：pm2 logs
   日志位置：cd ~/.pm2/logs
   停止：pm2 stop all
   重启：pm2 restart all
   0秒停机重载：pm2 reload all
   停止指定：pm2 stop 0
   重启指定：pm2 restart 0
   产生init脚本，保持进程活着：pm2 startup
   运行健壮的computer API endpoint：pm2 web
   杀死进程：pm2 delete all
   杀死指定进程：pm2 delete 0
   查看进程信息：pm2 describe 0
   ```

### 运行进程
   ```
    运行进程的不同方式：
    pm2 start app.js --env dev    启动指明环境
    pm2 start app.js -i max # 根据有效CPU数目启动最大进程数目
    pm2 start app.js -i 3 # 启动3个进程
    pm2 start app.js -x #用fork模式启动 app.js 而不是使用 cluster
    pm2 start app.js -x -- -a 23 # 用fork模式启动 app.js 并且传递参数 (-a 23)
    pm2 start app.js --name serverone # 启动一个进程并把它命名为 serverone
    pm2 stop serverone # 停止 serverone 进程
    pm2 start app.json # 启动进程, 在 app.json里设置选项
    pm2 start app.js -i max -- -a 23 #在--之后给 app.js 传递参数
    pm2 start app.js -i max -e err.log -o out.log # 启动 并 生成一个配置文件
    你也可以执行用其他语言编写的app ( fork 模式):
    pm2 start my-bash-script.sh -x --interpreter bash
    pm2 start my-python-script.py -x --interpreter python
   ```

### 配置
   ```
    {
        "apps" : [{
            "name" : "bear", // 应用名称
            "script"    : "server.js",  // 进程名
            "instances" : "max",   // 开启进程数，可为数值，也可为max。与服务器cpu核数相关
            "exec_mode" : "cluster", // 可选：fork(服务器单核推荐) cluster(多核推荐)
            "cwd" : "./", // 当前工作路径
            "watch": [ // 监控变化目录，一旦变化，自动重启
                "bin"
            ],
            "ignore_watch" : [ // 从监控目录中排除
                "logs"
            ],
            "error_file" : "./logs/app-err.log", // 错误日志路径
            "out_file" : "./logs/app-out.log", // 普通日志路径
            "env" : {
                "NODE_ENV" : "production" // 环境参数，当前指定为生产环境
            },
            "env_dev" : {
                "NODE_ENV" : "development" // 环境参数，当前指定为开发环境
            }
        }]
    }
   ```
