### git提交规范：type(scope) : subject
   ```
    1、docs：仅仅修改了文档，比如 README, CHANGELOG, CONTRIBUTE 等等
    2、chore：改变构建流程、或者增加依赖库、工具等
    3、feat：新增 feature
    4、fix：修复 bug
    5、merge：合并分支
    6、perf：优化相关，比如提升性能、体验
    7、refactor：代码重构，没有加新功能或者修复 bug
    8、revert：回滚到上一个版本
    9、style：仅仅修改了空格、格式缩进、都好等等，不改变代码逻辑
    10、test：测试用例，包括单元测试、集成测试等
    11、build：改变了build工具 如 grunt换成了 npm

    commitizen：撰写合格commit message的工具，遵循Angular提交规范
    1、全局安装：npm install -g commitizen
    2、项目安装：commitizen init cz-conventional-changelog --save --save-exact
    3、package.json文件增加script脚本：
        "commit": "git-cz"
       然后运行npm run commit
   ```

### git stash

   ```
    git stash 贮藏
    git stash list 贮藏列表
    git stash clear 清除贮藏
    git stash apply @stash{0} 恢复贮藏
    git stash drop @stash{0} 删除贮藏
   ```