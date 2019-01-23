## java基础知识学习
:::
### maven

* maven生命周期lifeCycle

   + clean

   + resources

   + compile

   + install

   + package

   + testResources

   + testCompile

* maven插件plugin

   + maven-clean-plugin
   > 清除工程目录下的target目录

   + maven-resources-plugin

   > 把项目需要的配置文件拷贝到指定目录，默认拷贝src\main\resources目录下的文件到classes目录下，也可自行配置源目录和输出目录

   + maven-compiler-plugin

   > 执行时先调用resources插件，再执行compile插件把src\main\java源码编译成字节码生成class文件，并把编译好的class文件输出到target\classes目录下

   + maven-testCompile-plugin, maven-testResources-plugin

   > 把src\test\java下的代码编译成字节码输出到target\test-classes，同时把src\test\resources下的配置文件拷贝到target\test-classes

   + maven-surefire-plugin

   > 执行单元测试类

   + maven-jar-plugin

   > 把class文件、配置文件打成一个jar包，需要建立lib目录放依赖包，且jar和lib在同级目录

   + maven-install-plugin

   > 把构件号的artifact部署到本地仓库

   + maven-deploy-plugin

   > 将构建好的artifact部署到远程仓库

* maven构建命令

   + mvn clean package

   + mvn clean install

   + mvn clean deploy

   + mvn test


