# git实践总结

## 修改git历史提交的commit内容

   ```text
    1、git log
    2、git rebase -i HEAD~5  // 查看过去的五条提交记录
    3、把需要修改的日志前的pick改为edit并保存退出
    4、git commit --amend
    5、修改日志并保存退出
    6、git rebase --continue
    7、反复执行4-6 步，直到改完所有的内容、出现successful
    8、git push
   ```

##  mac下pull代码报：SSL_ERROR_SYSCALL in connection to github.com:443

   ```shell
   git config --global http.sslBackend "openssl"
   ```
