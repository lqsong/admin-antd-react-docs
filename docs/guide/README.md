# 介绍

[![React](https://img.shields.io/badge/react-16.12.0-brightgreen.svg)](https://github.com/facebook/react)
[![Ant Design](https://img.shields.io/badge/antd-4.6.2-brightgreen.svg)](https://ant.design)
[![UmiJs](https://img.shields.io/badge/umi-3.2.19-brightgreen.svg)](https://umijs.org)
[![GitHub stars](https://img.shields.io/github/stars/lqsong/admin-antd-react.svg?style=social&label=Stars)](https://github.com/lqsong/admin-antd-react)


[admin-antd-react](http://demo.admin-antd-react.liqingsong.cc/) 是一个后台前端解决方案，它基于 [React](https://github.com/facebook/react) 、[Ant Design](https://ant.design) 和 [UmiJs](https://umijs.org)实现。它使用了最新的前端技术栈、动态路由、权限验证、国际化、Mock 数据等，它可以帮助你快速搭建企业级中后台产品原型。相信不管你的需求是什么，本项目都能帮助到你。


## 功能

```
- 登录 / 注销 / 注册

- 权限验证
  - 页面权限
  - 按钮操作
  - 权限配置

- 全局功能
  - 国际化多语言
  - 动态顶级菜单（支持设置是否启用）
  - 动态侧边栏（支持多级路由嵌套）
  - 动态面包屑（支持自定义配置）
  - Svg Sprite 图标
  - Mock 数据

- 综合实例
  - 引导页
  - 组件示例
    - 编辑器
      - CKEditor
      - tui-editor
    - 图标
      - IconSvg
      - IconFont
      - IconAntd
  - 页面示例
    - 列表页面
      - 标准列表
      - 表格列表
      - 高度自适应表格
      - 搜索列表
    - 表单页面
      - 基础表单
      - 高级表单      
    - 详情页面
      - 基础详情
      - 模块详情
      - 表格详情
  - 权限验证
```

| **[http://demo.admin-antd-react.liqingsong.cc](http://demo.admin-antd-react.liqingsong.cc/)**  |
:-------------------------:
| ![Home](https://gitee.com/lqsong/public/raw/master/admin-antd-react/home.png)  |
| ![Home](https://gitee.com/lqsong/public/raw/master/admin-antd-react/home2.png)  |



## 前序准备

在开始之前，推荐先学习  [React](https://github.com/facebook/react) 、 [ES2015+](http://es6.ruanyifeng.com/) 、 [TypeScript](https://github.com/Microsoft/TypeScript) 、 [Ant Design](https://ant.design) , 了解 [UmiJs](https://umijs.org) 、[Dva](https://dvajs.com) 、[Mock.js](https://github.com/nuysoft/Mock) ，提前了解和学习这些知识会对使用本项目有很大的帮助，因为本项目技术栈都是基于它们。并且你需要在本地安装 [node 版本10.13 或以上](http://nodejs.org/) 和 [git](https://git-scm.com/)。

**本项目不支持低版本浏览器(如 ie)**

## 目录结构

本项目已经为你生成了一个完整的开发框架，下面是整个项目的目录结构。

```bash
├── config                     # 配置
│   │── config.ts              # 配置入口
│   │── routes.ts              # 路由配置入口
│   └── settings.ts            # 站点配置
├── mock                       # Mock文件目录
├── public                     # 静态资源
│   └──  favicon.ico           # favicon图标
├── src                        # 源代码
│   ├── assets                 # 静态资源
│   │   ├── css                # 项目公用 CSS 样式
│   │   ├── iconsvg            # svg icons
│   │   └── images             # 项目图片
│   ├── components             # 全局公用组件
│   ├── hooks                  # 全局 React hooks
│   ├── layout                 # 项目 layout
│   │   ├── IndexLayout        # 项目默认主 Layout
│   │   │   ├── components     # IndexLayout 公共组件
│   │   │   ├── locales        # IndexLayout 国际化，主要为路由菜单
│   │   │   ├── index.tsx      # IndexLayout 入口
│   │   │   ├── routes.ts      # 使用 IndexLayout 的页面路由配置
│   │   │   └── style.less     # IndexLayout CSS 样式
│   │   ├── UserLayout         # 项目 UserLayout
│   │   │   ├── locales        # UserLayout 国际化，主要为路由菜单
│   │   │   ├── index.tsx      # UserLayout 入口
│   │   │   ├── routes.ts      # 使用 UserLayout 的页面路由配置
│   │   │   └── style.less     # UserLayout CSS 样式
│   │   ├── BlankLayout.tsx    # 空 Layout
│   │   └── SecurityLayout.tsx # 认证 Layout
│   ├── locales                # 全局国际化文件目录
│   │   ├── en-US              # 英文配置目录
│   │   │   └── components.ts  # 全局公用组件英文国际化配置
│   │   ├── zh-CN              # 中文简体配置目录
│   │   │   └── components.ts  # 全局公用组件中文简体国际化配置
│   │   ├── zh-TW              # 中文繁体配置目录
│   │   │   └── components.ts  # 全局公用组件中文繁体国际化配置
│   │   ├── ...                # 其他语言配置目录
│   │   │   └── components.ts  # 全局公用组件其他语言国际化配置
│   │   ├── en-US.ts           # 英文国际化配置入口
│   │   ├── zh-CN.ts           # 中文简体国际化配置入口
│   │   ├── zh-TW.ts           # 中文繁体国际化配置入口
│   │   └── xxx.ts             # 其他语言国际化配置入口
│   ├── models                 # 数据模型目录（Dva Models）
│   │   ├── global.ts          # 全局数据模型
│   │   └── user.ts            # user公共数据模型
│   ├── pages                  # 页面组件目录(所有页面放在这里)
│   │   └── home               # 页面-首页(这里作为说明样例)
│   │       ├── components     # 当前页面组件目录(可选)
│   │       ├── locales        # 当前页面国际化目录(可选)
│   │       ├── data.d.ts      # TS 接口类型定义文件(可选)
│   │       ├── index.tsx      # 当前页面入口
│   │       ├── model.ts       # 当前页面数据模型文件(可选)
│   │       ├── service.ts     # 当前页面数据接口文件(可选)
│   │       └── style.less     # 当前页面CSS样式文件(可选)
│   ├── services               # 公共数据接口目录（AJAx 请求）
│   ├── utils                  # 全局工具函数目录
│   ├── document.ejs           # 入口页面
│   └── global.less            # 全局 CSS 样式文件
├── .editorconfig              # 编辑器配置
├── .env                       # 环境变量配置
├── .eslintrc.js               # Git忽略文件配置
├── .gitignore                 # babel-loader 配置
├── .prettierignore            # Prettier忽略文件配置
├── .prettierrc                # Prettier配置
├── package.json               # 项目信息
├── README.md                  # readme
├── tsconfig.json              # TypeScript 配置
└── typings.d.ts               # TypeScript 全局自定义声明文件
```

## 安装

```bash
# 克隆项目
git clone https://github.com/lqsong/admin-antd-react.git

# 进入项目目录
cd admin-antd-react

# 复制文件
copy .env  .env.local # 启用或修改里面的参数

# 安装依赖，推荐使用 yarn 
yarn 
# or
npm install

# 本地开发 启动项目
yarn start
# or
npm run start
```

> 推荐使用 yarn , **[yarn安装与常用命令](http://liqingsong.cc/article/detail/9)** 。


<br/>

启动完成后会，打开浏览器访问 [http://localhost:8000](http://localhost:8000)， 你看到下面的页面就代表操作成功了。

![Home](https://gitee.com/lqsong/public/raw/master/admin-antd-react/home.png)

接下来你可以修改代码进行业务开发了，本项目内建了常见的页面模板、模拟数据、全局路由等等各种实用的功能来辅助开发，你可以继续阅读和探索左侧的其它文档。


## Contribution

本文档项目地址 [admin-antd-react-docs](https://github.com/lqsong/admin-antd-react-docs) 基于 [vuepress](https://github.com/vuejs/vuepress)开发。

有任何修改和建议都可以该项目 pr 和 issue

[admin-antd-react](https://github.com/lqsong/admin-antd-react) 还在持续迭代中，逐步沉淀和总结出更多功能和相应的实现代码，总结中后台产品模板/组件/业务场景的最佳实践。本项目也十分期待你的参与和[反馈](https://github.com/lqsong/admin-antd-react/issues)。

## 捐赠

如果你觉得这个项目帮助到了你，你可以请作者喝咖啡表示鼓励.

**ALIPAY**             |  **WECHAT**
:-------------------------:|:-------------------------:
![Alipay](https://gitee.com/lqsong/public/raw/master/common/Alipay.png)  |  ![Wechat](https://gitee.com/lqsong/public/raw/master/common/Wechat.png)
