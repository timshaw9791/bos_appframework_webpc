# bos_appframework_webpc

## 在前端项目中使用方式
```
  在element.js里输入
  import install from 'testpro-project1/src/index' // 全部引入
  Vue.use(install)
  按需导入可以看src下index.js里的components
  import defineTextarea from 'testpro-project1/src/index'
  Vue.use(defineTextarea)
```

## 在测试项目中如何使用？
```
npm i bosappframework_webpc --save
const locator = require('bosappframework_webpc/src/test');

```
## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```



