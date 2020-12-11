1、ps -ef |grep 输出的具体含义

  ```
    UID   PID   PPID    C STIME   TTY    TIME        CMD
    root  18887 18828   0 08:09   pts/0  00:00:00    grep nginx

    ps    ==>> 将某个进程显示出来
    -A 　 ==>> 显示所有程序
    -e 　 ==>> 此参数的效果和指定"A"参数相同
    -f 　 ==>> 显示UID,PPIP,C与STIME栏位
    UID   ==>> 程序被该 UID 所拥有
    PID   ==>> 就是这个程序的 ID 
    PPID  ==>> 则是其上级父程序的ID
    C     ==>> CPU 使用的资源百分比
    STIME ==>> 系统启动时间
    TTY   ==>> 登入者的终端机位置
    TIME  ==>> 使用掉的 CPU 时间
    CMD   ==>> 所下达的指令为何
  ```

