# 布局 {#index}

页面整体布局是一个产品最外层的框架结构，往往会包含导航、侧边栏、面包屑以及内容等。想要了解一个后台项目，先要了解它的基础布局。

## UniversalLayout {#universal-layout}

UniversalLayout 采用的是 **Flex 布局**，`@/layouts/UniversalLayout` 目录内容如下：

```bash
UniversalLayout    # 项目通用 Layout
├── components     # UniversalLayout 公共组件
├── css            # UniversalLayout 样式目录
├── locales        # UniversalLayout 国际化，主要为路由菜单
├── index.tsx      # UniversalLayout 入口
└── routes.ts      # 使用 UniversalLayout 的页面路由配置
```

:::warning 重要：
如何使用 `UniversalLayout` 主要在于 `UniversalLayout/routes.ts` 页面路由配置文件。
:::

### 配置路由导航{#universal-layout-router}

> 比如：`@/pages/home` 页面，想使用 `UniversalLayout`，你就可以在 `UniversalLayout/routes.ts` 中做出如下配置：

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
    component: lazy(() => import('@/pages/Home')),
  },  
];

export default universalLayoutRotes;
```

这样你访问 `http://localhost:3000/home` 就可以看到一个使用了 `UniversalLayout` 的页面了。

:::tip 重点：
`UniversalLayout/routes.ts` 路由配置对应参数说明请查看 [路由和菜单](/guide/essentials/router-and-menu.md)
:::


## UserLayout {#user-layout}

> 不是所有页面都会用到 `UniversalLayout` , 比如**登录** 、 **注册** 等页面，所以本项目增加了 `UserLayout`。

`UserLayout` 与 `UniversalLayout` 目录内容基本一致，`@/layouts/UserLayout` 目录内容如下：

```bash
UserLayout         # 项目 UserLayout
├── css            # UserLayout 样式目录
├── locales        # UserLayout 国际化，主要为路由菜单
├── index.tsx      # UserLayout 入口
└── routes.ts      # 使用 UserLayout 的页面路由配置
```

:::warning 重要：
与 `UniversalLayout` 类似, 如何使用 `UserLayout` 主要在于 `UserLayout/routes.ts` 页面路由配置文件。
:::

### 配置路由导航 {#user-layout-router}

> 比如：登录页[`@/pages/user/login`]、注册页[`@/pages/user/register`]，想使用 `UserLayout`，你就可以在 `UserLayout/routes.ts` 中做出如下配置：


```ts
import { lazy } from 'react';
import { IRouter } from '@/@types/router';

const pathPre = '/user';

const UserLayoutRoutes: IRouter[] = [
  {
    path: `${pathPre}/login`,
    meta: {
      title: 'user-layout.menu.login',
    },
    component: lazy(() => import('@/pages/user/login')),
  },
  {
    path: `${pathPre}/register`,
    meta: {
      title: 'user-layout.menu.register',
    },
    component: lazy(() => import('@/pages/user/register')),
  },
];

export default UserLayoutRoutes;

```

这样你访问 `http://localhost:3000/user/login` 、 `http://localhost:3000/user/register` 就可以看到一个使用了 `UserLayout` 的登录、注册页面了。

:::tip 重点：
与 `UniversalLayout` 一致, `UserLayout/routes.ts` 路由配置对应参数说明请查看 [路由和菜单](/guide/essentials/router-and-menu.md)
:::


## 自定义Layout {#cus-layout}

> 在实际的项目开发中，以上 Layout 并不一定能满足要求，这就需要我们自定义新增 Layout 了。比如我们自定义一个 `MemberLayout`，步骤如下：

### 一、创建目录结构 {#cus-layout-dir}

在目录 `@/layouts` 下创建 `MemberLayout` 文件夹，目录如下，

```bash
MemberLayout       # MemberLayout
├── css            # MemberLayout 样式目录
├── locales        # MemberLayout 国际化，主要为路由菜单
├── index.tsx      # MemberLayout 入口
└── routes.ts      # 使用 MemberLayout 的页面路由配置
```

以上文件对应的代码可以参照  `UserLayout` 修改和删减。

### 二、导入框架路由 {#cus-layout-router}

`MemberLayout` 创建完成后，需要保证可以路由使用，所以就需要把 `MemberLayout/routes.ts` 导入 `@/config/routes.tsx` 中， `@/config/routes.tsx` 新增如下代码：

```tsx{26-28,44-48,61,92-99}
/**
 * 路由配置 入口
 * @author LiQingSong
 */

import React, { lazy, memo, Suspense } from 'react';
import { useLocation, useRoutes } from 'react-router-dom';
import { createUseRoutes, pathKeyCreateUseRoutes } from '@/utils/router';

import PageLoading from '@/components/PageLoading';

// BlankLayout
import BlankLayout from '@/layouts/BlankLayout';

// SecurityLayout
import SecurityLayout from '@/layouts/SecurityLayout';

// UniversalLayout
import UniversalLayoutRoutes from '@/layouts/UniversalLayout/routes';
import UniversalLayout from '@/layouts/UniversalLayout';

// UserLayout
import UserLayoutRoutes from '@/layouts/UserLayout/routes';
import UserLayout from '@/layouts/UserLayout';

// MemberLayout
import MemberLayoutRoutes from '@/layouts/MemberLayout/routes';
import MemberLayout from '@/layouts/MemberLayout';

/**
 * 配置所有路由
 */
const routes = createUseRoutes([
  {
    path: '/',
    redirect: '/home',
    children: UniversalLayoutRoutes,
  },
  {
    path: '/user',
    redirect: '/user/login',
    children: UserLayoutRoutes,
  },
  {
    path: '/member',
    redirect: '指定跳转需要访问的路由',
    children: MemberLayoutRoutes,
  },
  {
    path: '*',
    component: lazy(() => import('@/pages/404')),
  },
]);

/**
 * 配置框架对应的路由
 */
const layoutToRoutes = {
  UniversalLayout: pathKeyCreateUseRoutes([routes[0]]),
  UserLayout: pathKeyCreateUseRoutes([routes[1]]),
  MemberLayout:  pathKeyCreateUseRoutes([routes[2]]),
};

export const SuspenseLazy = memo(({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<PageLoading />}>{children}</Suspense>
));

export default memo(() => {
  const routesElement = useRoutes(routes);
  const location = useLocation();

  // 属于 UniversalLayout
  if (layoutToRoutes.UniversalLayout[location.pathname]) {
    return (
      <SecurityLayout>
        <UniversalLayout>
          <SuspenseLazy>{routesElement}</SuspenseLazy>
        </UniversalLayout>
      </SecurityLayout>
    );
  }

  // 属于 UserLayout
  if (layoutToRoutes.UserLayout[location.pathname]) {
    return (
      <UserLayout>
        <SuspenseLazy>{routesElement}</SuspenseLazy>
      </UserLayout>
    );
  }

  // 属于 MemberLayout
  if (layoutToRoutes.MemberLayout[location.pathname]) {
    return (
      <MemberLayout>
        <SuspenseLazy>{routesElement}</SuspenseLazy>
      </MemberLayout>
    );
  }

  // 默认 BlankLayout
  return (
    <BlankLayout>
      <SuspenseLazy>{routesElement}</SuspenseLazy>
    </BlankLayout>
  );
});

```

:::tip 至此新增自定义Layout完成：
使用方法与 `UserLayout` 、 `IndexLayout` 一致。
:::


