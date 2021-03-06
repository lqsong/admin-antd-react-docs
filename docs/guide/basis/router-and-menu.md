# 路由和菜单

路由和菜单是组织起一个后台应用的关键骨架。

本项目 `IndexLayout` 中的顶部菜单、侧边栏菜单是 和 IndexLayout路由(`IndexLayout/routes.ts`)绑定在一起的，所以你只要在 `@/layouts/IndexLayout/routes.ts` 内配置对应的路由，菜单就能动态的生成了。大大减轻了手动重复编辑菜单的工作量。当然这样就需要在配置路由的时候遵循一些约定的规则。

## 配置参数

首先我们了解一些本项目配置路由时提供了哪些配置项。

```ts
/**
 * 路由类型
 */
export interface RoutesDataItem {
  // 菜单中是否隐藏
  hidden?: boolean;
  // 图标的名称，显示在菜单标题前
  icon?: string;
  // 权限控制，页面角色(您可以设置多个角色)
  roles?: string[];
  // 标题，路由在菜单、浏览器title 或 面包屑中展示的文字，目前可以使用locales
  title: string;
  // 路由地址或外链
  path: string;
  // 跳转地址
  redirect?: string;
  // 组件页面
  component?: string;
  // 子集
  routes?: RoutesDataItem[];
  /**
   * 面包屑自定义内容：
   *     1、默认不配置按照路由自动读取；
   *     2、设置为 false , 按照路由自动读取并不读当前自己；
   *     3、配置对应的面包屑格式如下：
   */
  breadcrumb?: RoutesDataItem[] | false;
  /**
   * 左侧菜单选中，如果设置路径，侧栏将突出显示你设置的路径对应的侧栏导航
   *   1、（默认 route.path），此参数是为了满足特殊页面特殊需求，
   *   2、如：详情页等选中侧栏导航或在模块A下面的页面，想选模块B为导航选中状态
   */
  selectLeftMenu?: string;
  /**
   * 所属顶级菜单,当顶级菜单存在时，用于选中顶部菜单，与侧栏菜单切换
   *   1、三级路由此参数的作用是选中顶级菜单
   *   2、二级路由此参数的作用是所属某个顶级菜单的下面，两个层级的必须同时填写一致，如果path设置的是外链，此参数必填
   *   3、(默认不设置 path.split('/')[0])，此参数是为了满足特殊页面特殊需求
   */
  belongTopMenu?: string;
}
```

<br/>

**示例：**

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
    redirect: '/home/workplace',
    routes: [
      {
        icon: 'control',
        title: 'index-layout.menu.home.workplace',
        path: 'workplace',
        component: '@/pages/home',
      },
      {
        icon: 'edit',
        title: 'index-layout.menu.home.custom-breadcrumbs',
        path: 'custombreadcrumbs',
        component: '@/pages/custom-breadcrumbs',
        breadcrumb: [
          {
            title: 'index-layout.menu.home.custom-breadcrumbs',
            path: '/home/custombreadcrumbs',
          },
          {
            title: 'index-layout.menu.home',
            path: '/home',
          },
          {
            title: 'index-layout.menu.home.custom-breadcrumbs.liqingsong.cc',
            path: 'http://liqingsong.cc',
          },
        ],
      },
      {
        icon: 'detail',
        title: 'index-layout.menu.home.docs',
        path: 'http://admin-antd-react.liqingsong.cc/',
        belongTopMenu: '/home',
      },
    ],
  },
]
```

## 路由

本项目设计了一个路由入口配置文件 `@/config/routes.ts`，然后分别把路由拆分到了不同的`@/layouts`中去配置，这样做的原因：一是在入口文件方便集中处理重新格式化；二是模块化更规范。

::: tip 对应代码
[@/config/routes.ts](https://github.com/lqsong/admin-antd-react/tree/main/src/config/routes.ts)

[@/layouts/IndexLayout/routes.ts](https://github.com/lqsong/admin-antd-react/tree/main/src/layouts/IndexLayout/routes.ts)

[@/layouts/UserLayout/routes.ts](https://github.com/lqsong/admin-antd-react/tree/main/src/layouts/UserLayout/routes.ts)
:::


关于`IndexLayout`具体的菜单动态判断会在 [权限验证](permission.md) 页面介绍。



## 顶部菜单

本项目 `IndexLayout` **顶部菜单** 的出现是为了满足不同用户的需求。

前面也介绍了，菜单是通过读取路由并结合权限判断而动态生成的，当然也包括顶部菜单。

::: tip 代码地址
[@/layouts/IndexLayout/components/RightTop.tsx](https://github.com/lqsong/admin-antd-react/blob/main/src/layouts/IndexLayout/components/RightTop.tsx#L66)

**注意**

顶部菜单必须在 **配置->站点配置** 中配置启用顶部菜单，才会出现，具体见[文档](/guide/basis/config.md#站点配置)
:::


## 侧边栏菜单

本项目 `IndexLayout` **侧边栏菜单** 主要基于 `Ant Design` 的 `Menu` 改造。

前面也介绍了，菜单是通过读取路由并结合权限判断而动态生成的，当然也包括侧边栏菜单，而且还需要支持路由无限嵌套，所以这里还使用到了递归组件。

::: tip 代码地址
[@/layouts/IndexLayout/components/SiderMenu.tsx](https://github.com/lqsong/admin-antd-react/blob/main/src/layouts/IndexLayout/components/SiderMenu.tsx#L30)
:::

::: warning 注意事项
这里有一个非常需要注意的地方就是，如果开启了 **顶部菜单** , 那 **侧边栏菜单** 会按照路由的正常层级，走第二级开始往下递归；如果没有开启，则走第一级开始往下递归。
:::


一般侧边栏有两种形式即：`SubMenu` 和 直接 `Menu.Item`。 一个是嵌套子菜单，另一个则是直接一个链接。如下图：

![](https://gitee.com/lqsong/public/raw/master/admin-element-vue/menu-demo.png)

在 `@/layouts/IndexLayout/components/SiderMenu.tsx` 中已经帮你做了判断，当你一个路由下面的子路由`routes` 声明的路由大于>0 个时，自动会变成嵌套的模式。如果子路由不存在则直接显示一个链接。



## 侧边栏 外链

你也可以在侧边栏中配置一个外链，只要你在 `path` 中填写了合法的 url 路径，当你点击侧边栏的时候就会帮你新开这个页面。

例如：

```js
{
    title: 'index-layout.menu.home.custom-breadcrumbs.liqingsong.cc',
    path: 'http://liqingsong.cc',
}
```

## 多级目录(嵌套路由)

如果你的路由是多级目录，如本项目 `IndexLayout` 中那样，有三级路由或更多嵌套的情况下 用法如下样例：

```ts
const IndexLayoutRoutes: RoutesDataItem[] = [
  {
    icon: 'components',
    title: 'index-layout.menu.component',
    path: '/component',
    redirect: '/component/icon/svg',
    routes: [
      {
        icon: 'icon',
        title: 'index-layout.menu.component.icon',
        path: 'icon',
        redirect: '/component/icon/svg',
        routes: [
          {
            title: 'index-layout.menu.component.icon.svg',
            path: 'svg',
            component: '@/pages/component/icon/svg',
          },
          {
            title: 'index-layout.menu.component.icon.font',
            path: 'font',
            component: '@/pages/component/icon/font',
          },
          {
            title: 'index-layout.menu.component.icon.antd',
            path: 'antd',
            component: '@/pages/component/icon/antd',
          },
        ],
      },
      {
        icon: 'editor',
        title: 'index-layout.menu.component.editor',
        path: 'editor',
        redirect: '/component/editor/tuieditor',
        routes: [
          {
            title: 'index-layout.menu.component.editor.tui-editor',
            path: 'tuieditor',
            component: '@/pages/component/editor/tui-editor',
          },
          {
            title: 'index-layout.menu.component.editor.ckeditor',
            path: 'ckeditor',
            component: '@/pages/component/editor/ckeditor',
          },
        ],
      },
    ],
  },
];
export default IndexLayoutRoutes;
```
::: tip 说明
也就是除了最后一级的路由配置 `component:'@/page/xxx'`，其他父级不要配置 `component`参数。
:::

## 面包屑


本项目 `IndexLayout` 中封装了一个面包屑导航，它是通过监听路由变化动态生成的。它和 menu 也一样，也可以通过之前那些配置项控制一些路由在面包屑中的展现。你可以结合自己的业务需求增改这些自定义属性。参照 [配置参数](#配置参数) 中的 `breadcrumb` 参数

![](https://gitee.com/lqsong/public/raw/master/admin-element-vue/breadcrumb.png)
![](https://gitee.com/lqsong/public/raw/master/admin-element-vue/breadcrumb-cus.png)

::: tip 代码地址
[@/layouts/IndexLayout](https://github.com/lqsong/admin-antd-react/blob/main/src/layouts/IndexLayout/index.tsx#L66)

[@/components/BreadCrumbs](https://github.com/lqsong/admin-antd-react/tree/main/src/components/BreadCrumbs)
:::

**样例：**
```js
 {
    icon: 'edit',
    title: 'index-layout.menu.home.custom-breadcrumbs',
    path: 'custombreadcrumbs',
    component: '@/pages/custom-breadcrumbs',
    breadcrumb: [
        {
            title: 'index-layout.menu.home.custom-breadcrumbs',
            path: '/home/custombreadcrumbs',
        },
        {
            title: 'index-layout.menu.home',
            path: '/home',
        },
        {
            title: 'index-layout.menu.home.custom-breadcrumbs.liqingsong.cc',
            path: 'http://liqingsong.cc',
        },
    ],
}
```




