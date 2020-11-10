# 懒加载组件

当打包构建应用时，Javascript 包会变得非常大，影响页面加载速度。如果我们能把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件，这样就更加高效了。

结合 React 的 `Suspense` 和 `React.lazy` 样例如下：

[在线代码](https://github.com/lqsong/admin-antd-react/blob/main/src/pages/home/index.tsx#L8);

```ts
import React, { Suspense } from 'react';
import PageLoading from './components/PageLoading';
const WorksChartCard = React.lazy(() => import('./components/WorksChartCard'));

return () => {
   return (
     <Suspense fallback={<PageLoading />}>
        <WorksChartCard />
      </Suspense>
   )
}

```
