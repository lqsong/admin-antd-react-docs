# 布局

页面整体布局是一个产品最外层的框架结构，往往会包含导航、侧边栏、面包屑以及内容等。想要了解一个后台项目，先要了解它的基础布局。

## IndexLayout

::: tip 对应代码
[@/layouts/IndexLayout](https://github.com/lqsong/admin-antd-react/tree/main/src/layouts/IndexLayout)
:::

IndexLayout 采用的是 **Flex 布局**，`@/layouts/IndexLayout` 目录内容如下：


```bash
IndexLayout        # 项目默认主 Layout
├── components     # IndexLayout 公共组件
├── hooks          # IndexLayout React hooks
├── locales        # IndexLayout 国际化，主要为路由菜单
├── index.tsx      # IndexLayout 入口
├── routes.ts      # 使用 IndexLayout 的页面路由配置
└── style.less     # IndexLayout CSS 样式
```

:::warning 重要：
如何使用 `IndexLayout` 主要在于 `IndexLayout/routes.ts` 页面路由配置文件。
:::

### 配置路由导航

> 比如：`@/pages/home` 页面，想使用 `IndexLayout`，你就可以在 `IndexLayout/routes.ts` 中做出如下配置：


```ts
import { RoutesDataItem } from '@/utils/routes';

/**
 * Index Layout 路由页面
 */
const IndexLayoutRoutes: RoutesDataItem[] = [
  {
    icon: 'home',
    title: 'index-layout.menu.home',
    path: '/home',
    component: '@/pages/home',
  },
];
export default IndexLayoutRoutes;
```

这样你访问 `http://localhost:8000/#/home` 就可以看到一个使用了 `IndexLayout` 的页面了。

:::tip 重点：
`IndexLayout/routes.ts` 路由配置对应参数说明请查看 [路由和菜单](/guide/basis/router-and-menu.md)
:::

> `IndexLayout` 通过 [配置/站点配置](/guide/basis/config.md#站点配置) 中的 **顶部菜单开启** 配置项，可以设置为：有/无顶部导航等情况，如下：

### 有顶部导航

![有顶部导航](https://gitee.com/lqsong/public/raw/master/admin-antd-react/home.png)

### 无顶部导航

![无顶部导航](https://gitee.com/lqsong/public/raw/master/admin-antd-react/home2.png)

## UserLayout

> 不是所有页面都会用到 `IndexLayout` , 比如**登录** 、 **注册** 等页面，所以本项目增加了 `UserLayout`。

::: tip 对应代码
[@/layouts/UserLayout](https://github.com/lqsong/admin-antd-react/tree/main/src/layouts/UserLayout)
:::

`UserLayout` 与 `IndexLayout` 目录内容基本一致，`@/layouts/UserLayout` 目录内容如下：

```bash
UserLayout         # 项目 UserLayout
├── locales        # UserLayout 国际化，主要为路由菜单
├── index.tsx      # UserLayout 入口
├── routes.ts      # 使用 UserLayout 的页面路由配置
└── style.less     # UserLayout CSS 样式
```


:::warning 重要：
与 `IndexLayout` 类似, 如何使用 `UserLayout` 主要在于 `UserLayout/routes.ts` 页面路由配置文件。
:::

### 配置路由导航

> 比如：登录页[`@/pages/user/login`]、注册页[`@/pages/user/register`]，想使用 `UserLayout`，你就可以在 `UserLayout/routes.ts` 中做出如下配置：


```ts
import { RoutesDataItem } from '@/utils/routes';

/**
 * User Layout 路由页面
 */
const UserLayoutRoutes: RoutesDataItem[] = [
  {
    title: 'user-layout.menu.login',
    path: '/user/login',
    component: '@/pages/user/login',
  },
  {
    title: 'user-layout.menu.register',
    path: '/user/register',
    component: '@/pages/user/register',
  },
];

export default UserLayoutRoutes;

```

这样你访问 `http://localhost:8000/#/user/login` 、 `http://localhost:8000/#/user/register` 就可以看到一个使用了 `UserLayout` 的登录、注册页面了。

:::tip 重点：
与 `IndexLayout` 一致, `UserLayout/routes.ts` 路由配置对应参数说明请查看 [路由和菜单](/guide/basis/router-and-menu.md)
:::



## 自定义Layout

> 在实际的项目开发中，以上 Layout 并不一定能满足要求，这就需要我们自定义新增 Layout 了。比如我们自定义一个 `MemberLayout`，步骤如下：

### 一、创建目录结构

在目录 `@/layouts` 下创建 `MemberLayout` 文件夹，目录如下，

```bash
MemberLayout       # MemberLayout
├── locales        # MemberLayout 国际化，主要为路由菜单
├── index.tsx      # MemberLayout 入口
├── routes.ts      # 使用 MemberLayout 的页面路由配置
└── style.less     # MemberLayout CSS 样式
```

以上文件对应的代码可以参照  `UserLayout` 修改和删减。

### 二、导入框架路由

`MemberLayout` 创建完成后，需要保证可以路由使用，所以就需要把 `MemberLayout/routes.ts` 导入 `@/config/routes.ts` 中， `@/config/routes.ts` 新增如下代码：

```ts
import { RoutesDataItem, umiRoutes,  getNotFoundRoute } from '../src/utils/routes';

/**
 * Member Layout 路由页面
 */
import MemberLayoutRoutes from '../src/layouts/MemberLayout/routes'; // 新增代码


/**
 * User Layout 路由页面
 */
import UserLayoutRoutes from '../src/layouts/UserLayout/routes';

/**
 * Index Layout 路由页面
 */
import IndexLayoutRoutes from '../src/layouts/IndexLayout/routes';

/**
 * config routes 配置
 * docs: http://admin-antd-react.liqingsong.cc/guide/basis/router-and-menu.html
 */
export const routes: RoutesDataItem[] = [
  /* 新增代码 S */
  {
    title: '',
    path: '/member',
    component: '@/layouts/MemberLayout',
    routes: [
      ...umiRoutes(MemberLayoutRoutes, '/member', '/member'),
      {
        title: '',
        path: '/member',
        redirect: '指定跳转需要访问的路由',
      },
      getNotFoundRoute(),
    ],
  },
  /* 新增代码 E */
  {
    title: '',
    path: '/user',
    component: '@/layouts/UserLayout',
    routes: [
      ...umiRoutes(UserLayoutRoutes, '/user', '/user'),
      {
        title: '',
        path: '/user',
        redirect: '/user/login',
      },
      getNotFoundRoute(),
    ],
  },
  {
    title: '',
    path: '/',
    component: '@/layouts/SecurityLayout',
    routes: [
      {
        title: '',
        path: '/',
        component: '@/layouts/IndexLayout',
        routes: [
          ...umiRoutes(IndexLayoutRoutes),
          {
            title: '',
            path: '/',
            redirect: '/home',
          },
          getNotFoundRoute(),
        ],
      },
      getNotFoundRoute(),
    ],
  },
  getNotFoundRoute(),
];
```

### 三、导入框架国际化

`MemberLayout` 创建完成后，因为 `MemberLayout/routes.ts` 中配置参数 `title` 的需求，你需要把 `MemberLayout/locales` 下不同的语言文件导入 `@/locales` 下对应的语言文件中。

比如：`@/locales/zh-CN.ts` 新增代码如下：

```ts
import IndexLayoutLocales from '@/layouts/IndexLayout/locales/zh-CN';
import UserLayoutLocales from '@/layouts/UserLayout/locales/zh-CN';
import MemberLayoutLocales from '@/layouts/MemberLayout/locales/zh-CN'; // 新增代码
import components from './zh-CN/components';

export default {
  'app.global.form.validatefields.catch': '验证不通过，请检查输入',
  ...IndexLayoutLocales,
  ...UserLayoutLocales,
  ...MemberLayoutLocales, // 新增代码
  ...components,
};

```

>  `@/locales/zh-TW.ts` 、`@/locales/en-US.ts` 新增代码同理，如果自己新增了其他语言同理。

:::tip 至此新增自定义Layout完成：
使用方法与 `UserLayout` 、 `IndexLayout` 一致。
:::

