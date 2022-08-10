# 状态管理(Recoil) {#index}

## 介绍 {#intro}

在实际的项目开发中，**状态管理**必不可少，为了方便开发与统一维护，项目集成了`Recoil`。

## Recoil 说明 {#recoil-illustrate}

[Recoil](https://recoiljs.org/) 是 React 的状态管理库，使用 Recoil 会为你创建一个数据流向图，从 atom（共享状态）到 selector（纯函数），再流向 React 组件。Atom 是组件可以订阅的 state 单位。selector 可以同步或异步改变此 state。


## Recoil 使用 {#recoil-use}

你可以在 `@/store` 下创建文件，或者在每个页面目录下创建文件，如下样列：

**@/store/user.ts** 中定义

```ts
import { atom, selector } from 'recoil';
import { queryMessage } from '@/services/user';
import { ResponseData } from '@/utils/request';

export interface CurrentUser {
  id: number;
  name: string;
  avatar: string;
  roles: string[];
}

export const initialState: CurrentUser = {
  id: 0,
  name: '',
  avatar: '',
  roles: [],
};

export const userState = atom({
  key: 'userState',
  default: initialState,
});

export const userMessageState = selector({
  key: 'userMessageState',
  get: async () => {
    const response: ResponseData<number> = await queryMessage();
    const { data, code } = response;
    if (code !== 0) {
      throw response.msg;
    }
    return data || 0;
  },
});


```



**@/layouts/UniversalLayout** 中使用

```tsx{5-9,26-28}
import { memo, useEffect, useMemo } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import classnames from 'classnames';

import { useRecoilValue } from 'recoil';
import { globalState } from '@/store/global';
import { userState } from '@/store/user';
import { useI18n } from '@/store/i18n';
import locales from './locales';

import { formatRoutes, getBreadcrumbRoutes } from '@/utils/router';

import Permission from '@/components/Permission';
import LeftSider from './components/LeftSider';
import RightTop from './components/RightTop';
import RightFooter from './components/RightFooter';
import layoutRotes from './routes';

import useTitle from '@/hooks/useTitle';

import './css/index.less';

export default memo(() => {
  const location = useLocation();

  const t = useRecoilValue(useI18n(locales));
  const global = useRecoilValue(globalState);
  const user = useRecoilValue(userState);

  // 框架所有菜单路由 与 patch key格式的所有菜单路由
  const routerPathKeyRouter = useMemo(() => formatRoutes(layoutRotes), []);

  // 当前路由item
  const routeItem = useMemo(() => routerPathKeyRouter.pathKeyRouter[location.pathname], [location]);

  // 面包屑导航
  const breadCrumbs = useMemo(
    () =>
      getBreadcrumbRoutes(location.pathname, routerPathKeyRouter.pathKeyRouter).map((item) => ({
        ...item,
        title: t(item.title),
      })),
    [location, routerPathKeyRouter, t],
  );

  // 设置title
  useTitle(t(routeItem?.meta?.title || ''));

  useEffect(() => {
    console.log('location', location, routeItem);
  }, [location]);

  return (
    <div id='universallayout' className={classnames({ light: global.theme === 'light' })}>
      {global.navMode === 'inline' && (
        <LeftSider
          collapsed={global.collapsed}
          userRoles={user.roles}
          menuData={routerPathKeyRouter.router}
          routeItem={routeItem}
          theme={global.theme}
          leftSiderFixed={global.leftSiderFixed}
        />
      )}
      <div id='universallayout-right'>
        <RightTop
          userRoles={user.roles}
          menuData={routerPathKeyRouter.router}
          jsonMenuData={routerPathKeyRouter.pathKeyRouter}
          routeItem={routeItem}
          breadCrumbs={breadCrumbs}
        />
        <div id='universallayout-right-main'>
          <Permission role={routeItem?.meta?.roles}>
            <Outlet />
          </Permission>
          <RightFooter />
        </div>
      </div>
    </div>
  );
});

```

::: tip 
详细规则请查看 [Recoil 官方文档](https://recoiljs.org/)。
:::





