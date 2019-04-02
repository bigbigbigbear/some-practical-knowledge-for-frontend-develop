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

### jdk

   ```
      JDK 安装目录下具有多个子目录和一些网页文件，其中重要目录和文件的说明如下:
      bin：提供 JDK 工具程序，包括 javac、java、javadoc、appletviewer 等可执行程序。
      include：存放用于本地访问的文件。
      jre：存放 Java 运行环境文件。
      lib：存放 Java 的类库文件，工具程序实际上使用的是 Java 类库。JDK 中的工具程序，大多也由 Java 编写而成。
      src.zip：Java 提供的 API 类的源代码压缩文件。如果需要查看 API 的某些功能是如何实现的，可以査看这个文件中的源代码内容。
   ```


### java api学习

   > java.io.Serializable

   ```
      // Serializable 标识此接口的实现类可以被序列化和反序列化，implements声明自己使用一个或者多个接口
      public class A implements Serializable {
         // serialVersionUID 是很重要的字段，因为java的序列化机制是通过在运行时判断类的serialVersionUID，来验证版本一致性的。在进行反序列化时，JVM 会把传来的字节流中的serialVersionUID与本地相应实体（类）的serialVersionUID进行比较，如果相同就认为是一致的，可以进行反序列化，否则就会出现序列化版本不一致的异常。

         // 一般来说，定义serialVersionUID的方式有两种，分别为：
            采用默认的1L，具体为private static final long serialVersionUID = 1L;
            根据类名、接口名、成员方法及属性等来生成一个64位的哈希字段，例如 private static final long serialVersionUID = XXXL;

         // 而 Java 类进行序列化也两个主要目的，分别为：
            把对象的字节序列永久地保存到硬盘上，通常存放在一个文件中；
            在网络上传送对象的字节序列。

         private static final long serialVersionUID = 1L;
      }

      IDEA设置自动生成serialVersionUID：
      Preferences -> Inspections -> Serialization issues -> Serialization class without 'serialVersionUID' 打上勾，点击类名，alt + Enter生成
   ```

