#!/bin/bash
#backup  all tables of database except system'tables and delete databasesbackup before 20

PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:~/bin

#数据库用户名
user="root"
#数据库密码
passwd="aaa12345"
#备份文件存放目录
backupdir="/data/backup/"
#备份数据库名
dbname="employees"
#备份表名

dbname=$(mysql -u$user -p$passwd -ss -e "show databases;")

#当前时间
date=$(date +%Y%m%d%H%M%S)

#过期时间
outtime=20
#判断备份目录是否存在
if [ ! -d $backupdir ];then
mkdir -p $backupdir
fi
for databasename in $dbname

do
#判断是否为系统表
if [ $databasename != "mysql" ] && [ $databasename != "information_schema" ] && [ $databasename != "test" ];then
#备份出来的文件名
backfile=$databasename'_'$date.sql
#压缩后的文件名
tarfile=$backfile.tar.bz2

mysqldump -u$user -p$passwd $dbname $tablename > $backupdir$backfile
#tar
if [ $backfile ];then
tar -jcvf $tarfile $backupdir$backfile
rm -f $backfile
fi
fi
done
#delete before 20
#find $backupdir -name *.tar.bz2 -mtime +$outtime |xargs rm -rf
find $backupdir -name *.tar.bz2 -mtime +$outtime -exec rm -f {} \;
###自动每天备份
#[root@gyf backup]# crontab -e 01 12 * * *  sh /data/backup/databases.sh
#重启生效
#[root@gyf backup]# /etc/init.d/crond restart