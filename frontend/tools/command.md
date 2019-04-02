# 命令行工具

### Windows的CMD命令

   ```
   进入某盘： D:
   查看目录： dir
   查看更多操作：dir /?
   创建目录： md folder_name
   删除目录： rd folder_name
   查看本机ip： ipconfig
   清除： cls
   复制文件： copy 路径\文件名 路径\文件名
   移动文件： move 路径\文件名 路径\文件名
   删除文件： del file_name
   测试网络： ping ip
   查看命令： help
   任务列表： tasklist
   查看端口占用： netstat -ano | findstr "80"
   查看pid对应进程名称： tasklist |findstr "pid号"
   终止进程：taskkill /pid "pid号" /f
   ```

### Git Bash



### XShell
   ```
   查看端口占用： netstat -anop |grep 80
   合并多个sql脚本文件内容到新脚本文件： cat *.sql >> update.sql
   tar压缩文件gz： tar -cvzf filename filedir
   tar查看文件gz： tar -tvzf filename filedir
   tar解压文件gz： tar -xvzf filename filedir
   unzip解压zip文件： unzip file.zip
   zip压缩文件： zip -r file.zip ./*
   查看某程序历史命令记录： history |grep redis
   ```
