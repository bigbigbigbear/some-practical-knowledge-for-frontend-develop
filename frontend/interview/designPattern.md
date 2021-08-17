# 设计模式

## 结构型模式

通过识别系统中组件间的简单关系来简化系统的设计

* 外观模式 Facade Pattern

   **把多个子系统中复杂逻辑进行抽象，从而提供一个更统一、更简洁、更易用的API，如JQuery**

* 代理模式 Proxy Pattern

   **增加对一个对象的访问控制；当访问一个对象的过程中需要增加额外的逻辑**

## 创建型模式

根据实际情况使用合适的方式创建对象

* 工厂模式 Factory Pattern

**工厂模式提供一种集中化、统一化的方式，避免了分散创建对象导致的代码重复、灵活性差的问题。使用工厂模式后，不再需要重读引入一个个构造函数，只需要引入工厂对象就可以方便的创建各类对象**

```javascript
// 汽车构造函数
function SuzukiCar(color) {
  this.color = color;
  this.brand = 'Suzuki';
}

// 汽车构造函数
function HondaCar(color) {
  this.color = color;
  this.brand = 'Honda';
}

// 汽车构造函数
function BMWCar(color) {
  this.color = color;
  this.brand = 'BMW';
}

// 汽车品牌枚举
const BRANDS = {
  suzuki: 1,
  honda: 2,
  bmw: 3
}

/**
 * 汽车工厂
 */
function CarFactory() {
  this.create = function (brand, color) {
    switch (brand) {
      case BRANDS.suzuki:
        return new SuzukiCar(color);
      case BRANDS.honda:
        return new HondaCar(color);
      case BRANDS.bmw:
        return new BMWCar(color);
      default:
        break;
    }
  }
}



```

* 单例模式 Singleton Pattern

   ```javascript
  function Singleton() {
      this.name = 'bear'
  }

  Singleton.getInstance = (function() {
      var instance
      return function() {
          if(instance) {
              return instance
          }else {
              instance = new Singleton()
              return instance
          }
      }
  })()

  var bb = Singleton.getInstance()
  // console.log(bb.name)
   ```

### 行为型模式

**用于识别对象之间常见的交互模式并加以实现，如此增加这些交互的灵活性**

* 策略模式 Strategy Pattern
* 迭代器模式 Iterator Pattern
* 观察者模式 Observer Pattern
* 中介者模式 Mediator Pattern
* 访问者模式 Visitor Pattern
