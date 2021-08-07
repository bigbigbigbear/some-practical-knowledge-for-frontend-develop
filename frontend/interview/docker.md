# docker

## 操作

* 登录一层
    ssh -J bear@10.129.1.20 root@10.120.15.0

* 启动
    docker start `docker ps -a | sed '1d' | awk '{print $1}'`

* 镜像
    docker images

* 容器
    docker ps

* 停止
    docker stop `docker ps -a |egrep -v "^CONTAINER" |awk '{print $1}'`

* 登录
    docker login http://xxx.xxx.xxx

* 保存镜像

* 启动镜像文件
    dos2unix docker-compose.xml
    export NAME=bear_v1.0.0_release
    docker-compose -f /workspace/docker-compose.yml up -d
