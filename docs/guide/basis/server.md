# 与服务端交互

## 前端请求流程

在 `admin-antd-react` 中，一个完整的前端 UI 交互到服务端处理流程是这样的：

1.  UI 组件交互操作；
2.  调用统一管理的 `model.ts` Dva model；(此步可以省略，可以直接进行下步)
3.  `model.ts` 调用 `service.ts` api 请求函数；
4.  使用封装的 `@/utils/request.ts` 发送请求；
5.  获取服务端返回；
6.  更新 data；


##  request.ts

`@/utils/request.ts` 是基于 [umi-request](https://github.com/umijs/umi-request) 的封装，便于统一处理 POST，GET 等请求参数，请求头，以及错误提示信息等。具体可以参看 [@/utils/request.ts](https://github.com/lqsong/admin-antd-react/blob/main/src/utils/request.ts)。
它封装了全局 `request拦截器`、`response拦截器`、`统一的错误处理`、`统一做了超时处理`、`baseURL设置等`。

## 一个表单提交例子：

[代码](https://github.com/lqsong/admin-antd-react/tree/main/src/pages/pagesample/form/basic)


```ts
// @/pages/pagesample/form/basic/service.ts
import request from '@/utils/request';
import { formDataType } from './data.d';

export async function createData(params: formDataType): Promise<any> {
  return request('/pages/form', {
    method: 'POST',
    data: params,
  });
}

// @/pages/pagesample/form/basic/model.ts
import { Effect } from 'umi';
import { createData } from './service';

export interface StateType {}

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    create: Effect;
  };
  reducers: {};
}
const initState: StateType = {};

const Model: ModelType = {
  namespace: 'FormBasic',
  state: initState,
  effects: {
    *create({ payload }, { call, put }) {
      try {
        yield call(createData, payload);
        return true;
      } catch (error) {
        return false;
      }
    },
  },
  reducers: {},
};

export default Model;

// @/pages/pagesample/form/basic/index.tsx
  const onFinish = async (values: formDataType) => {
    const res: boolean = await dispatch({
      type: 'FormBasic/create',
      payload: values,
    });
    if (res === true) {
      message.success('提交成功');
      onReset();
    }
  };


```
