# 路由和菜单 {#index}

路由和菜单是组织起一个后台应用的关键骨架。

本项目 `UniversalLayout` 中的菜单是 和 UniversalLayout路由(`UniversalLayout/routes.ts`)绑定在一起的，所以你只要在 `@/layouts/UniversalLayout/routes.ts` 内配置对应的路由，菜单就能动态的生成了。大大减轻了手动重复编辑菜单的工作量。当然这样就需要在配置路由的时候遵循一些约定的规则。

## 配置参数 {#config}

首先我们了解一些本项目配置路由时提供了哪些配置项。

```ts{68-74}
/**
 * 路由 ts定义
 * @author LiQingSong
 */
import { Location } from 'react-router-dom';

/**
 * 面包屑类型
 */
export interface BreadcrumbType {
  // 标题，路由在菜单、浏览器title 或 面包屑中展示的文字
  title: string;
  // 路由地址或外链
  path: string;
}

/**
 * tab导航存储规则类型
 */
export type TabNavType = 'path' | 'querypath';

/**
 * meta 自定义
 */
export interface IRouteMeta {
  // 标题，路由在菜单、浏览器title 或 面包屑中展示的文字
  title?: string;
  // 菜单中是否隐藏
  hidden?: boolean;
  // 图标的名称，显示在菜单标题前
  icon?: string;
  // 权限控制，页面角色(您可以设置多个角色)
  roles?: string[];
  /**
   * 面包屑自定义内容：
   *     1、默认不配置按照路由自动读取；
   *     2、设置为 false , 按照路由自动读取并不读当前自己；
   *     3、配置对应的面包屑格式如下：
   */
  breadcrumb?: BreadcrumbType[] | false;
  /**
   * 左侧菜单选中，如果设置路径，侧栏将突出显示你设置的路径对应的侧栏导航
   *   1、（默认 route.path），此参数是为了满足特殊页面特殊需求，
   *   2、如：详情页等选中侧栏导航或在模块A下面的页面，想选模块B为导航选中状态
   */
  selectLeftMenu?: string;
  // 所有父元素的path,下标key按照父元素的顺序
  parentPath?: string[];

  /**
   * 设置tab导航存储规则类型
   *    1、默认不配置按照path(route.path)规则
   *    2、querypath：path + query (route.path+route.query) 规则
   */
  tabNavType?: TabNavType;
  /**
   * 设置该字段，则在关闭当前tab页时，作为关闭前的钩子函数
   * @param close 关闭回调函数
   */
  tabNavCloseBefore?: (close: () => void) => void;
}

export type RouteComponent = React.FC<BrowserRouterProps> | (() => any);

/**
 * 路由类型
 */
export interface IRouter {
  path: string;
  meta?: IRouteMeta;
  redirect?: string;
  component?: RouteComponent;
  children?: IRouter[];
}


```

**示例：**

```ts
/**
 * UniversalLayout 路由配置 入口
 * @author LiQingSong
 */

import { lazy } from 'react';
import { IRouter } from '@/@types/router.d';

const universalLayoutRotes: IRouter[] = [
  {
    path: '/home',
    meta: {
      icon: 'home',
      title: 'universal-layout.menu.home',
    },
    redirect: '/home/workplace',
    children: [
      {
        path: 'workplace',
        meta: {
          icon: 'control',
          title: 'universal-layout.menu.home.workplace',
        },
        component: lazy(() => import('@/pages/Home')),
      },
      {
        path: 'custombreadcrumbs',
        meta: {
          icon: 'edit',
          title: 'universal-layout.menu.home.custom-breadcrumbs',
          breadcrumb: [
            {
              title: 'universal-layout.menu.home.custom-breadcrumbs',
              path: '/home/custombreadcrumbs',
            },
            {
              title: 'universal-layout.menu.home',
              path: '/home',
            },
            {
              title: 'universal-layout.menu.home.custom-breadcrumbs.liqingsong.cc',
              path: 'http://liqingsong.cc',
            },
          ],
          tabNavCloseBefore: (close: () => void): void => {
            // eslint-disable-next-line no-alert
            if (window.confirm('确认关闭吗')) {
              close();
            }
          },
        },
        component: lazy(() => import('@/pages/CustomBreadcrumbs')),
      },
      {
        path: 'http://admin-antd-react.liqingsong.cc/',
        meta: {
          icon: 'detail',
          title: 'universal-layout.menu.home.docs',
          selectLeftMenu: '/home',
        },
      },
    ],
  },
  
];

export default universalLayoutRotes;
```

## 路由 {#router}

本项目设计了一个路由入口配置文件 `@/config/routes.ts`，然后分别把路由拆分到了不同的`@/layouts`中去配置，这样做的原因：一是在入口文件方便集中处理重新格式化；二是模块化更规范。

关于`UniversalLayout`具体的菜单动态判断会在 [权限验证](/guide/essentials/permission.md) 页面介绍。


## 菜单 {#menu}

本项目 `UniversalLayout` **菜单** 主要基于 `Ant Design` 的 `Menu` 改造。

前面也介绍了，菜单是通过读取路由并结合权限判断而动态生成的，而且还需要支持路由无限嵌套，所以这里还使用到了递归。

一般菜单有两种形式即：`SubMenu` 和 直接 `Menu.Item`。 一个是嵌套子菜单，另一个则是直接一个链接。如下图：

![](http://admin-element-vue.liqingsong.cc/tsv2/images/menu-demo.png)


## 菜单外链 {#menu-link}

你也可以在侧边栏中配置一个外链，只要你在 `path` 中填写了合法的 url 路径，当你点击侧边栏的时候就会帮你新开这个页面。

例如：

```js
{
    path: 'http://liqingsong.cc',
}
```

## 多级目录(嵌套路由) {#dir}

如果你的路由是多级目录，如本项目 `UniversalLayout` 中那样，有三级路由或更多嵌套的情况下 用法如下样例：

```ts
/**
 * UniversalLayout 路由配置 入口
 * @author LiQingSong
 */

import { lazy } from 'react';
import { IRouter } from '@/@types/router.d';

const universalLayoutRotes: IRouter[] = [
  {
    path: '/component',
    redirect: '/component/icon/svg',
    meta: {
      icon: 'components',
      title: 'universal-layout.menu.component',
    },
    children: [
      {
        path: 'icon',
        redirect: '/component/icon/svg',
        meta: {
          icon: 'icon',
          title: 'universal-layout.menu.component.icon',
        },
        children: [
          {
            path: 'svg',
            meta: {
              title: 'universal-layout.menu.component.icon.svg',
            },
            component: lazy(() => import('@/pages/component/icon/svg')),
          },
        ],
      },
      {
        path: 'editor',
        redirect: '/component/editor/tuieditor',
        meta: {
          icon: 'editor',
          title: 'universal-layout.menu.component.editor',
        },
        children: [
          {
            path: 'tuieditor',
            meta: {
              title: 'universal-layout.menu.component.editor.tui-editor',
            },
            component: lazy(() => import('@/pages/component/editor/TuiEditor')),
          },
          {
            path: 'ckeditor',
            meta: {
              title: 'universal-layout.menu.component.editor.ckeditor',
            },
            component: lazy(() => import('@/pages/component/editor/ckeditor')),
          },
        ],
      },
    ],
  },
  
];

export default universalLayoutRotes;
```
::: tip 说明
也就是只要最后一级的路由配置 `component: lazy(() => import('@/pages/component/editor/ckeditor'))`。
:::

## 面包屑 {#breadcrumb}


本项目 `UniversalLayout` 中封装了一个面包屑导航，它是通过监听路由变化动态生成的。它和 menu 也一样，也可以通过之前那些配置项控制一些路由在面包屑中的展现。你可以结合自己的业务需求增改这些自定义属性。参照 [配置参数](#config) 中的 `breadcrumb` 参数

![](http://admin-element-vue.liqingsong.cc/tsv2/images/breadcrumb.png)
![](http://admin-element-vue.liqingsong.cc/tsv2/images/breadcrumb-cus.png)


**样例：**
```ts {31-44}
 /**
 * UniversalLayout 路由配置 入口
 * @author LiQingSong
 */

import { lazy } from 'react';
import { IRouter } from '@/@types/router.d';

const universalLayoutRotes: IRouter[] = [
  {
    path: '/home',
    meta: {
      icon: 'home',
      title: 'universal-layout.menu.home',
    },
    redirect: '/home/workplace',
    children: [
      {
        path: 'workplace',
        meta: {
          icon: 'control',
          title: 'universal-layout.menu.home.workplace',
        },
        component: lazy(() => import('@/pages/Home')),
      },
      {
        path: 'custombreadcrumbs',
        meta: {
          icon: 'edit',
          title: 'universal-layout.menu.home.custom-breadcrumbs',
          breadcrumb: [
            {
              title: 'universal-layout.menu.home.custom-breadcrumbs',
              path: '/home/custombreadcrumbs',
            },
            {
              title: 'universal-layout.menu.home',
              path: '/home',
            },
            {
              title: 'universal-layout.menu.home.custom-breadcrumbs.liqingsong.cc',
              path: 'http://liqingsong.cc',
            },
          ],
          tabNavCloseBefore: (close: () => void): void => {
            // eslint-disable-next-line no-alert
            if (window.confirm('确认关闭吗')) {
              close();
            }
          },
        },
        component: lazy(() => import('@/pages/CustomBreadcrumbs')),
      },
      {
        path: 'http://admin-antd-react.liqingsong.cc/',
        meta: {
          icon: 'detail',
          title: 'universal-layout.menu.home.docs',
          selectLeftMenu: '/home',
        },
      },
    ],
  },
  
];

export default universalLayoutRotes;

```



## TabNav {#tabnav}


本项目 `UniversalLayout` 中封装了一个`TabNav`，它是通过监听路由变化动态生成的。它可以通过配置项控制存储规则和关闭回调。你可以结合自己的业务需求增改这些自定义属性。参照 [配置参数](#config) 中的 `tabNavType` 和 `tabNavCloseBefore` 参数

![](http://admin-element-vue.liqingsong.cc/tsv2/images/tabnav.png)

**样例：**

```ts {45-50,84}
 /**
 * UniversalLayout 路由配置 入口
 * @author LiQingSong
 */

import { lazy } from 'react';
import { IRouter } from '@/@types/router.d';

const universalLayoutRotes: IRouter[] = [
  {
    path: '/home',
    meta: {
      icon: 'home',
      title: 'universal-layout.menu.home',
    },
    redirect: '/home/workplace',
    children: [
      {
        path: 'workplace',
        meta: {
          icon: 'control',
          title: 'universal-layout.menu.home.workplace',
        },
        component: lazy(() => import('@/pages/Home')),
      },
      {
        path: 'custombreadcrumbs',
        meta: {
          icon: 'edit',
          title: 'universal-layout.menu.home.custom-breadcrumbs',
          breadcrumb: [
            {
              title: 'universal-layout.menu.home.custom-breadcrumbs',
              path: '/home/custombreadcrumbs',
            },
            {
              title: 'universal-layout.menu.home',
              path: '/home',
            },
            {
              title: 'universal-layout.menu.home.custom-breadcrumbs.liqingsong.cc',
              path: 'http://liqingsong.cc',
            },
          ],
          tabNavCloseBefore: (close: () => void): void => {
            // eslint-disable-next-line no-alert
            if (window.confirm('确认关闭吗')) {
              close();
            }
          },
        },
        component: lazy(() => import('@/pages/CustomBreadcrumbs')),
      },
      {
        path: 'http://admin-antd-react.liqingsong.cc/',
        meta: {
          icon: 'detail',
          title: 'universal-layout.menu.home.docs',
          selectLeftMenu: '/home',
        },
      },
    ],
  },

   {
    path: '/pages',
    redirect: '/pages/detail/basic',
    meta: {
      icon: 'page',
      title: 'universal-layout.menu.pages',
    },
    children: [      
      {
        path: 'detail',
        meta: {
          icon: 'detail',
          title: 'universal-layout.menu.pages.detail',
        },
        children: [
          {
            path: 'basic',
            meta: {
              title: 'universal-layout.menu.pages.detail.basic',
              tabNavType: 'querypath',
            },
            component: lazy(() => import('@/pages/pagesample/detail/basic')),
          },
          
         
        ],
      },
    ],
  },
  
];

export default universalLayoutRotes;

```

::: tip 
`tabNavType`：有两个参数值`path`与`querypath`；默认`path`,比如列表页、发布页；`querypath`一般用于详情页、编辑页，因为需要打开多个Tab。

`tabNavCloseBefore`：关闭TabNav前置，比如关闭前行你需要提示用户是否关闭，一般会在编辑页或者比较重要的页面关闭提示。
:::




