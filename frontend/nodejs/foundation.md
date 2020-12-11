### nodejs概念
   Node.js 是一个基于 Chrome V8 引擎的 JavaScript 运行环境。
   简单的说 Node.js 就是运行在服务端的 JavaScript。
   Node.js 使用了一个事件驱动、非阻塞式 I/O 的模型，使其轻量又高效。

### linux下通过n模块命令管理nodejs版本
   * 安装n模块管理nodejs版本：npm install -g n --force
   * 升级nodejs：n stable   /  n latest   /  n 7.8.0

### windows下通过nvm命令管理nodejs版本
   * nvm uninstall <version> ## 删除已安装的指定版本，语法与install类似
   * nvm use <version> ## 切换使用指定的版本node
   * nvm ls ## 列出所有安装的版本
   * nvm ls-remote ## 列出所以远程服务器的版本（官方node version list）
   * nvm current ## 显示当前的版本
   * nvm alias <name> <version> ## 给不同的版本号添加别名
   * nvm unalias <name> ## 删除已定义的别名
   * nvm reinstall-packages <version> ## 在当前版本node环境下，重新全局安装指定版本号的npm包