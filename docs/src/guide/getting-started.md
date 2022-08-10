# 快速开始 {#index}


## 安装 {#install}

```bash
# 克隆项目
git clone -b v2.0-vite https://github.com/lqsong/admin-antd-react.git

# 进入项目目录
cd admin-antd-react

# 复制文件
copy .env.development  .env.development.local # 启用或修改里面的参数

# 安装依赖，请使用 pnpm 
pnpm i 

# 本地开发 启动项目
pnpm dev

```

> 推荐使用 pnpm , **[pnpm的安装与使用](http://liqingsong.cc/article/detail/26)** 。


<br/>

启动完成后，打开浏览器访问 [http://127.0.0.1:3000](http://127.0.0.1:3000)， 你看到下面的页面就代表操作成功了。

![Home](/images/home.png)

接下来你可以修改代码进行业务开发了，本项目内建了常见的页面模板、模拟数据、全局路由等等各种实用的功能来辅助开发，你可以继续阅读和探索左侧的其它文档。



## 目录结构 {#directory-structure}

本项目已经为你生成了一个完整的开发框架，下面是整个项目的目录结构。

```bash
├── mock                       # Mock文件目录
├── public                     # 静态资源
│   └──  favicon.ico           # favicon图标
├── src                        # 源代码
│   ├── @types                 # ts 类型定义目录
│   ├── assets                 # 静态资源
│   │   ├── css                # 项目公用 CSS 样式
│   │   ├── iconsvg            # svg icons
│   │   └── images             # 项目图片
│   ├── components             # 全局公用组件
│   ├── config                 # 配置
│   │   │── routes.ts          # 路由配置入口
│   │   └── settings.ts        # 站点配置
│   ├── hooks                  # 全局 React hooks
│   ├── layouts                # 项目 layout
│   │   ├── UniversalLayout    # 项目通用 Layout
│   │   │   ├── components     # UniversalLayout 公共组件
│   │   │   ├── css            # UniversalLayout 样式目录
│   │   │   ├── locales        # UniversalLayout 国际化，主要为路由菜单
│   │   │   ├── index.tsx      # UniversalLayout 入口
│   │   │   └── routes.ts      # 使用 UniversalLayout 的页面路由配置
│   │   ├── UserLayout         # 项目 UserLayout
│   │   │   ├── css            # UserLayout 样式目录
│   │   │   ├── locales        # UserLayout 国际化，主要为路由菜单
│   │   │   ├── index.tsx      # UserLayout 入口
│   │   │   └── routes.ts      # 使用 UserLayout 的页面路由配置
│   │   ├── BlankLayout.tsx    # 空 Layout
│   │   └── SecurityLayout.tsx # 认证 Layout
│   ├── locales                # 全局国际化文件目录
│   │   ├── en-US.ts           # 英文国际化配置
│   │   ├── zh-CN.ts           # 中文简体国际化配置
│   │   ├── zh-TW.ts           # 中文繁体国际化配置
│   │   └── index.ts           # 国际化配置入口
│   ├── pages                  # 页面组件目录(所有页面放在这里)
│   │   └── Home               # 页面-首页(这里作为说明样例)
│   │       ├── components     # 当前页面组件目录(可选)
│   │       ├── hooks          # 当前页面React hooks(可选)
│   │       ├── locales        # 当前页面国际化目录(可选)
│   │       ├── index.module.less # 当前页面css 样式
│   │       ├── data.d.ts      # TS 接口类型定义文件(可选)
│   │       ├── index.tsx      # 当前页面入口
│   │       └── service.ts     # 当前页面数据接口文件(可选)
│   ├── services               # 公共数据接口目录（AJAx 请求）
│   ├── store                  # 数据Store目录（Recoil）
│   │   ├── global.ts          # 全局stroe
│   │   ├── i18n.ts            # 国际化stroe
│   │   └── user.ts            # user公共stroe
│   ├── utils                  # 全局工具函数目录
│   ├── App.tsx                # App
│   └── main.tsx               # 入口
├── .editorconfig              # 编辑器配置
├── .env.development           # 环境变量配置(开发模式)
├── .env.production            # 环境变量配置(生产模式)
├── .eslintignore              # eslint忽略文件配置
├── .eslintrc.js               # eslint配置
├── .gitignore                 # git忽略配置
├── .prettierrc.js             # Prettier配置
├── index.html                 # html模板
├── package.json               # 项目信息
├── README.md                  # readme
├── tsconfig.json              # TypeScript 配置
└── vite.config.ts             # vite 配置
```


