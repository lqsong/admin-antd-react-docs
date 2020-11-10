# 错误处理

## 页面

**404**

页面级的错误处理基于 `react-router` 自定义的 `umiRoutes` 与`getNotFoundRoute` 方法，统一处理，所有匹配不到正确路由的页面都会进 `404`页面。

```ts
/**
 * 返回404路由
 */
export const getNotFoundRoute = (): RoutesDataItem => {
  return {
    hidden: true,
    title: '',
    path: '*',
    component: settings.notFoundComponent,
  };
};
```

::: warning 注意事项
`/config/settings.ts` 中配置 `notFoundComponent: '@/pages/404'` 参数设置404页面。
:::

## 请求

项目里所有的请求都会走 `@/utils/request.ts` 里面创建的的 `umi-request` 实例，它统一做了错误处理，[完整代码](https://github.com/lqsong/admin-antd-react/blob/main/src/utils/request.ts)。

你可以在`errorHandler` 中根据自己的实际业务统一针对不同的状态码或者根据自定义 code 来做错误处理。如：

```ts
/**
 * 异常处理程序
 */
const errorHandler = (error: {
  response: Response;
  message: string;
  data: any;
}) => {
  const { response, message, data } = error;

  if (message === 'CustomError') {
    // 自定义错误

    const { req, res } = data;
    const { url } = req;
    const { code } = res;

    const reqUrl = url.split('?')[0].replace(API_HOST, '');
    const noVerifyBool = settings.ajaxResponseNoVerifyUrl.includes(reqUrl);
    if (!noVerifyBool) {
      notification.error({
        message: `提示`,
        description: customCodeMessage[code] || res.msg || 'Error',
      });

      if (code === 10002) {
        history.replace({
          pathname: '/user/login',
        });
      }
    }
  } else if (message === 'CancelToken') {
    // 取消请求 Token
    // eslint-disable-next-line no-console
    console.log(message);
  } else if (response && response.status) {
    const errorText = serverCodeMessage[response.status] || response.statusText;
    const { status, url } = response;

    notification.error({
      message: `请求错误 ${status}: ${url}`,
      description: errorText,
    });
  } else if (!response) {
    notification.error({
      description: '您的网络发生异常，无法连接服务器',
      message: '网络异常',
    });
  }

  // return error; // 如果return. 正常返回,走try正常流程.

  throw error; // 如果throw. 错误将继续抛出,走catch流程.
};

```
