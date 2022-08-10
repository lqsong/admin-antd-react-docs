# 异常处理 {#index}

## 页面 404 / 500 {#404-exce}


```ts{22-29}
// /@/config/routes.ts

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
    path: '/404',
    component: lazy(() => import('@/pages/404')),
  },
  {
    path: '*',
    component: lazy(() => import('@/pages/500')),
  },
];

```

::: warning 注意事项
 这里有一个需要非常注意的地方就是 `404`、 `500` 页面路由一定要在所有路由最后
:::


## 请求

项目里所有的请求都会走 `@/utils/request.ts` 里面创建的的 `Axios` 实例，它统一做了错误处理。

你可以在`errorHandler` 中根据自己的实际业务统一针对不同的状态码或者根据自定义 code 来做错误处理。如：

```ts
/**
 * 异常处理程序
 */
const errorHandler = (error: any) => {
  const { response, message } = error;
  if (message === 'CustomError') {
    // 自定义错误
    const { config, data } = response;
    const { url, baseURL } = config;
    const { code, msg } = data;
    const reqUrl = url.split('?')[0].replace(baseURL, '');
    const noVerifyBool = settings.ajaxResponseNoVerifyUrl.includes(reqUrl);
    if (!noVerifyBool) {
      notification.error({
        message: `提示`,
        description: customCodeMessage[code] || msg || 'Error',
      });

      if (code === 10002) {
        setTimeout(() => {
          window.location.href = '/user/login';
        }, 500);
      }
    }
  } else if (message === 'CancelToken') {
    // 取消请求 Token
    // eslint-disable-next-line no-console
    console.log(message);
  } else if (response && response.status) {
    const errorText = serverCodeMessage[response.status] || response.statusText;
    const { status, request } = response;
    notification.error({
      message: `请求错误 ${status}: ${request.responseURL}`,
      description: errorText,
    });
  } else if (!response) {
    notification.error({
      description: '您的网络发生异常，无法连接服务器',
      message: '网络异常',
    });
  }

  return Promise.reject(error);
};

```



