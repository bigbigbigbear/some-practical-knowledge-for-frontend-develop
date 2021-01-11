### SSH学习

##### SSH基础
   * 概念: Secure Shell，是一种网络协议，用于加密两台计算机之间的通信，并且支持何种身份验证机制。
   * 安装
     ```
     sudo apt install openssh-client  // ubuntu
     ssh -V
     ```
   * 登录
     ```
     ssh user@hostname
     ssh -l username host
     ssh -p 8821 bear.com   // 默认22端口
     ```
   * 流程：
     1. 验证远程服务器是否为陌生地址
       ```
       ssh-keygen -l -f /etc/ssh/ssh_host_ecdsa_key.pub  //查看公钥指纹
       ```
     2. 客户端就会跟服务器建立连接
     3. 用户输入所要登录账户的密码
     4. 成功登录远程服务器的 Shell
   * 服务器密钥变更
     ```
     ssh-keygen -R hostname  // 把公钥指纹从~/.ssh/known_hosts文件删除
     ```
   * 执行远程命令
      ```
      ssh username@hostname command  // 加入命令会在登录成功后执行
      ```
   * 加密参数：SSH 连接的握手阶段，客户端必须跟服务端约定加密参数集（cipher suite）
      ```
      TLS_RSA_WITH_AES_128_CBC_SHA
      TLS -> 协议
      RSA -> 密钥交换算法
      AES -> 加密算法
      128 -> 加密强度
      CBC -> 加密模式
      SHA -> 数字签名的 Hash 函数
      ```
   * ssh 命令行配置项
      ```
      ssh -c blowfish,3des server.example.com  // -c 参数指定加密算法
      ssh -C server.example.com  // -C 压缩数据传输
      ssh –d 1 foo.com  // 设置debug级别，数值越大输出信息越详细
      ssh -D 1080 server  // 动态端口转发
      ssh -f  //  SSH 连接在后台运行
      ssh -F /usr/local/ssh/other_config  // 指定使用配置文件other_config
      ssh -i my-key server.example.com  // 指定私钥，默认值为~/.ssh/id_dsa
      ssh -l  // 定远程登录的账户名
      ssh  -L 9999:targetServer:80 user@remoteserver // 设置本地端口转发,所有发向本地9999端口的请求，都会经过remoteserver发往 targetServer 的 80 端口
      ssh -m hmac-sha1,hmac-md5 server.example.com  // 指定校验数据完整性的算法
      ssh -o "Keyword Value"  // 指定一个配置命令
      ssh -p // 指定 SSH 客户端连接的服务器端口
      ssh –q  // 安静模式（quiet），不向用户输出任何警告信息
      ssh -R 9999:targetServer:902 local  // 指定远程端口转发
      ssh -vvv server.example.com  // 显示详细信息
      ssh –V  // 输出 ssh 客户端的版本
      ssh -X server.example.com  // 打开 X 窗口转发
      ssh -2 server.example.com  // 指定使用 SSH 2 协议
      ssh -6 server.example.com  // 使用 IPv6 协议,默认4
      ```
   * 客户端配置文件：SSH 客户端的全局配置文件是 ```/etc/ssh/ssh_config``` ，用户个人的配置文件在 ```~/.ssh/config``` ，优先级高于全局配置文件
      ```
      ~/.ssh/id_ecdsa：用户的 ECDSA 私钥
      ~/.ssh/id_ecdsa.pub：用户的 ECDSA 公钥
      ~/.ssh/id_rsa：用于 SSH 协议版本2 的 RSA 私钥
      ~/.ssh/id_rsa.pub：用于SSH 协议版本2 的 RSA 公钥
      ~/.ssh/identity：用于 SSH 协议版本1 的 RSA 私钥
      ~/.ssh/identity.pub：用于 SSH 协议版本1 的 RSA 公钥
      ~/.ssh/known_hosts：包含 SSH 服务器的公钥指纹
      ```
   * 主机设置：用户个人的配置文件 ```~/.ssh/config``` ，可以按照不同服务器，列出各自的连接参数，从而不必每一次登录都输入重复的参数
      ```
      Host *
      Port 2222

      Host remoteserver
      HostName remote.example.com
      User neo
      Port 2112
      ```
   * 配置命令
      ```
      Compression yes
      # 等同于
      Compression = yes
      ```
   * 主要配置
      ```
      AddressFamily inet：表示只使用 IPv4 协议。如果设为inet6，表示只使用 IPv6 协议。
      BindAddress 192.168.10.235：指定本机的 IP 地址（如果本机有多个 IP 地址）。
      CheckHostIP yes：检查 SSH 服务器的 IP 地址是否跟公钥数据库吻合。
      Ciphers blowfish,3des：指定加密算法。
      Compression yes：是否压缩传输信号。
      ConnectionAttempts 10：客户端进行连接时，最大的尝试次数。
      ConnectTimeout 60：客户端进行连接时，服务器在指定秒数内没有回复，则中断连接尝试。
      DynamicForward 1080：指定动态转发端口。
      GlobalKnownHostsFile /users/smith/.ssh/my_global_hosts_file：指定全局的公钥数据库文件的位置。
      Host server.example.com：指定连接的域名或 IP 地址，也可以是别名，支持通配符。Host命令后面的所有配置，都是针对该主机的，直到下一个Host命令为止。
      HostKeyAlgorithms ssh-dss,ssh-rsa：指定密钥算法，优先级从高到低排列。
      HostName myserver.example.com：在Host命令使用别名的情况下，HostName指定域名或 IP 地址。
      IdentityFile keyfile：指定私钥文件。
      LocalForward 2001 localhost:143：指定本地端口转发。
      LogLevel QUIET：指定日志详细程度。如果设为QUIET，将不输出大部分的警告和提示。
      MACs hmac-sha1,hmac-md5：指定数据校验算法。
      NumberOfPasswordPrompts 2：密码登录时，用户输错密码的最大尝试次数。
      PasswordAuthentication no：指定是否支持密码登录。不过，这里只是客户端禁止，真正的禁止需要在 SSH 服务器设置。
      Port 2035：指定客户端连接的 SSH 服务器端口。
      PreferredAuthentications publickey,hostbased,password：指定各种登录方法的优先级。
      Protocol 2：支持的 SSH 协议版本，多个版本之间使用逗号分隔。
      PubKeyAuthentication yes：是否支持密钥登录。这里只是客户端设置，还需要在 SSH 服务器进行相应设置。
      RemoteForward 2001 server:143：指定远程端口转发。
      SendEnv COLOR：SSH 客户端向服务器发送的环境变量名，多个环境变量之间使用空格分隔。环境变量的值从客户端当前环境中拷贝。
      ServerAliveCountMax 3：如果没有收到服务器的回应，客户端连续发送多少次keepalive信号，才断开连接。该项默认值为3。
      ServerAliveInterval 300：客户端建立连接后，如果在给定秒数内，没有收到服务器发来的消息，客户端向服务器发送keepalive消息。如果不希望客户端发送，这一项设为0。
      StrictHostKeyChecking yes：yes表示严格检查，服务器公钥为未知或发生变化，则拒绝连接。no表示如果服务器公钥未知，则加入客户端公钥数据库，如果公钥发生变化，不改变客户端公钥数据库，输出一条警告，依然允许连接继续进行。ask（默认值）表示询问用户是否继续进行。
      TCPKeepAlive yes：客户端是否定期向服务器发送keepalive信息。
      User userName：指定远程登录的账户名。
      UserKnownHostsFile /users/smith/.ssh/my_local_hosts_file：指定当前用户的known_hosts文件（服务器公钥指纹列表）的位置。
      VerifyHostKeyDNS yes：是否通过检查 SSH 服务器的 DNS 记录，确认公钥指纹是否与known_hosts文件保存的一致。
      ```

   * 密钥登录的过程
      1. 预备步骤，客户端通过ssh-keygen生成自己的公钥和私钥
         ```
         ssh-keygen -t dsa  // -t 参数用来指定密钥的加密算法
         ls -l ~/.ssh/id_*.pub  // 列出用户所有的公钥
         chmod 600 ~/.ssh/id_rsa  // 需改密钥权限

         ssh-keygen -t rsa -b 4096 -C "your_email@domain.com"  // -b参数指定密钥的二进制位数,-C参数可以为密钥文件指定新的注释
         ssh-keygen -t dsa -f mykey // -f 参数指定生成的私钥文件
         ssh-keygen -F example.com  // -F参数检查某个主机名是否在known_hosts文件里面
         ssh-keygen -t dsa -N secretword  // -N参数用于指定私钥的密码（passphrase）
         ssh-keygen -t dsa -p  // -p重新指定私钥的密码
         ssh-keygen -R example.com  // -R参数将指定的主机公钥指纹移出known_hosts文件
         ```
      2. 手动将客户端的公钥放入远程服务器的指定位置
         ```
         cat ~/.ssh/id_rsa.pub | ssh user@host "mkdir -p ~/.ssh && cat >> ~/.ssh/authorized_keys"
         ```

      3. 客户端向服务器发起 SSH 登录的请求

      4. 服务器收到用户 SSH 登录的请求，发送一些随机数据给用户，要求用户证明自己的身份

      5. 客户端收到服务器发来的数据，使用私钥对数据进行签名，然后再发还给服务器

      6. 服务器收到客户端发来的加密签名后，使用对应的公钥解密，然后跟原始数据比较。如果一致，就允许用户登录


   *  ssh-agent 命令，ssh-add 命令：让用户在整个 Bash 对话（session）之中，只在第一次使用 SSH 命令时输入密码，然后将私钥保存在内存中，后面都不需要再输入私钥的密码
      1. 基本用法
         a. 新建一次命令行对话: 
            ```
            ssh-agent bash
            ```
         b. 新建的 Shell 对话里面，使用ssh-add命令添加默认的私钥（比如~/.ssh/id_rsa，或~/.ssh/id_dsa，或~/.ssh/id_ecdsa，或~/.ssh/id_ed25519）
            ```
            ssh-add my-other-key-file
            ```
         c. 使用 ssh 命令正常登录远程服务器
            ```
            ssh remoteHost
            ```
         d. 退出ssh-agent
            ```
            ssh-agent -k
            ```
      2. ssh-add命令:将私钥加入ssh-agent

         ```
         ssh-add -d name-of-key-file  // -d参数从内存中删除指定的私钥
         ssh-add -D  // 从内存中删除所有已经添加的私钥
         ssh-add -l  // 列出所有已经添加的私钥
         ```
      3. 关闭密码登录

         打开服务器 sshd 的配置文件/etc/ssh/sshd_config，将PasswordAuthentication这一项设为no，修改配置文件以后，不要忘了重新启动 sshd，否则不会生效































