# 配置 {#index}

配置是开发一个后台项目的重要环节，它是一个后台项目的基础。想要了解一个后台项目，先要了解它的配置。

## 站点配置 {#site}

`admin-antd-react-vite` 内置了一个站点配置文件 `@/config/settings.ts`。

```ts
/**
 * 站点配置
 * @author LiQingSong
 */
import { SettingsType } from '@/@types/settings.d';

const settings: SettingsType = {
  siteTitle: 'ADMIN-ANTD-REACT',

  siteTokenKey: 'admin_antd_react_token',
  ajaxHeadersTokenKey: 'x-token',
  ajaxResponseNoVerifyUrl: [
    '/user/login', // 用户登录
    '/user/info', // 获取用户信息
  ],

  /* 以下是针对所有 Layout 扩展字段 */
  headFixed: true,
  theme: 'dark',
  leftSiderFixed: true,

  /* 以下是针对 UniversalLayout 扩展字段 */
  tabNavEnable: true,
  tabNavHomePath: '/home/workplace',
  navMode: 'inline',
};

export default settings;

```

## 路由入口配置文件 {#router}

`admin-antd-react-vite` 独立出了一个路由入口配置文件 `@/config/routes.ts`，其目的主要是：统一引入`@/layouts`下不同`layout`的路由，集中处理重新格式化路由。

目前 `@/config/routes.ts` 的内容为：

```ts
/**
 * 路由配置 入口
 * @author LiQingSong
 */

import { lazy } from 'react';
import { useRoutes } from 'react-router-dom';
import { createUseRoutes } from '@/utils/router';
import { IRouter } from '@/@types/router.d';

import SecurityLayout from '@/layouts/SecurityLayout';

import UniversalLayoutRoutes from '@/layouts/UniversalLayout/routes';
import UniversalLayout from '@/layouts/UniversalLayout';

import UserLayoutRoutes from '@/layouts/UserLayout/routes';
import UserLayout from '@/layouts/UserLayout';

export const routes: IRouter[] = [
  {
    path: '/',
    component: SecurityLayout,
    children: [
      {
        path: '/',
        redirect: '/home',
        component: UniversalLayout,
        children: UniversalLayoutRoutes,
      },
    ],
  },
  {
    path: '/user',
    redirect: '/user/login',
    component: UserLayout,
    children: UserLayoutRoutes,
  },
  {
    path: '*',
    component: lazy(() => import('@/pages/404')),
  },
];

export default () => useRoutes(createUseRoutes(routes));

```

::: tip 说明：
详细文档请查看：[路由和菜单](/guide/essentials/router-and-menu.md)
:::



## vite 配置 {#vite}

`admin-antd-react-vite` 基于 `vite`来进行构建，所以有个 vite配置文件 `/vite.config.ts`。

[官方文档](https://cn.vitejs.dev/config/)


## 环境变量 {#env}
`admin-antd-react-vite` 基于 `vite`来进行构建，所以有环境变量配置文件 `/.env.development`、`/.env.production`。

[官方文档](https://cn.vitejs.dev/guide/env-and-mode.html)

