# CSS面试汇总

## BFC（块级格式化上下文）

   具有 BFC 特性的元素可以看作是隔离了的独立容器，容器里面的元素不会在布局上影响到外面的元素，并且 BFC 具有普通容器所没有的一些特性。

* 解决边距margin重叠问题：外面再套一层
* 清除浮动：
  1、overflow:hidden;
  2、clear: both;
  3、.clearfix:after{
        content: "020";
        display: block;
        height: 0;
        clear: both;
        visibility: hidden;
    }
* 阻止普通文档流元素被浮动元素覆盖
* 自适应两栏布局

  ```html
    <style>
        * {
            margin: 0;
            padding: 0;
        }
        .container {
        }
        .float {
            width: 200px;
            height: 100px;
            float: left;
            background: red;
            opacity: 0.3;
        }

        .main {
            background: green;
            height: 100px;
            overflow: hidden;
        }
    </style>

    <div class="container">
        <div class="float">
            浮动元素
        </div>
        <div class="main">
            自适应
        </div>
    </div>
  ```
