### docker相关
    Docker 是一个开源的应用容器引擎，让开发者可以打包他们的应用以及依赖包到一个可移植的容器中，然后发布到任何流行的 Linux 机器上。

### linux docker相关
   * docker卸载：yum -y  remove  docker  docker-common  docker-selinux  docker-engine
   * 安装docker依赖：yum   install    -y   yum-utils   lvm2    device-mapper-persistent-data
   * 配置docker源：yum-config-manager   --add-repo   https://download.docker.com/linux/centos/docker-ce.repo
   * 查看仓库docker版本： yum   list   docker-ce --showduplicates   |   sort   -r
   * 安装docker：yum  -y install  docker-ce
   * 开机启动docker：chkconfig docker on
   * 启动docker：service docker start /  systemctl start docker
   * docker中启动所有的容器命令:docker start $(docker ps -a | awk '{ print $1}' | tail -n +2)
   * docker中关闭所有的容器命令:docker stop $(docker ps -a | awk '{ print $1}' | tail -n +2)
   * docker中删除所有的容器命令:docker rm $(docker ps -a | awk '{ print $1}' | tail -n +2)
   * docker中删除所有的镜像:docker rmi $(docker images | awk '{print $3}' |tail -n +2)
  
### 安装mysql
   * docker search mysql
   * docker pull mysql:5.7
   * docker run -d -p 3306:3306  -e MYSQL_ROOT_PASSWORD=123456 --name cmysql -v /home/chy/mysql/config/my.cnf:/etc/mysql/my.cnf -v /home/chy/mysql/db:/var/lib/mysql mysql:5.7
   * 各个参数说明
        run：运行一个容器
        -d：看做做守护线程(Daemon)
        -p：进行端口映射，用于暴露给外界让其访问
        -e：初始化root用户的密码
        --restar=always：自动重启，比如服务器突然断电，重启服务器之后不需要你重新手动启动
        --name：自定义容器名称
        -v：挂载。容器里面的数据你是不能直接访问的，但是你可以将可见目录挂载上去，这样就可以访问了（解释的不咋到位）