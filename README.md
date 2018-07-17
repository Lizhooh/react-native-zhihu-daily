
## 知乎日报 （非官方）
知乎日报，使用 **React Native** （Android）开发，目前已不更新了。

### 不具备功能
- 与登录账号相关的
- 分享
- 夜间模式

![demo](/resoucre/demo.png)

## Use

``` bash
# install dependencies
npm install

# link
react-native link
# run serve
# open http://127.0.0.1:8081/debugger-ui
react-native start

# run in android
react-native run-android

# run in ios
react-native run-ios

# build
npm run build
```

### code structure

```js
App
├── api               // 网络请求，后端接口
│   ├── get           // 对 http get 进行封装
│   └── index.js      // 导出所有 api
├── common            // 公共模块
├── components        // 组件
├── config            // 用来放置应用的配置项，比如主题颜色
├── functions         // 自定义的一些功能函数，算法
├── lib               // 第三方库
├── redux             // 数据状态管理框架 - redux 相关
│   ├── actions       // 所有 view 的 action 集中管理
│   ├── reducers      // 所有 view 的 reducer 集中管理
│   ├── types.js      // 所有的 action type 集中管理
│   └── store.js      // create store
├── resource          // 资源文件目录
├── storage           // 本地数据储存相关
├── test              // 测试代码
├── views             // 所有视图代码
├── index.js          // 应用入口 --> index.android.js
├── main.js           // 主要文件
└── navigator.js      // 导航器
```

## License
此作品，仅限于个人兴趣与学习。
