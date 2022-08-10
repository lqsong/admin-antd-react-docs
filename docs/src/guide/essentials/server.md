# 与服务端交互 {#index}


## 前端请求流程 {#query}

在 `admin-antd-react-vite` 中，一个完整的前端 UI 交互到服务端处理流程是这样的：

1.  UI 组件交互操作；
2.  调用统一管理的 `store.ts` ；(此步可以省略，可以直接进行下步调用 `service.ts`)
3.  `store.ts` 调用 `service.ts` api 请求函数；
4.  使用封装的 `@/utils/request.ts` 发送请求；
5.  获取服务端返回；
6.  更新 data；


##  request.ts {#request}

`@/utils/request.ts` 是基于 [Axios](https://github.com/axios/axios) 的封装，便于统一处理 POST，GET 等请求参数，请求头，以及错误提示信息等。
它封装了全局 `request拦截器`、`response拦截器`、`统一的错误处理`、`统一做了超时处理`、`baseURL设置等`。

## 一个表单提交例子： {#from}


```ts
// @/pages/pagesample/form/basic/service.ts
import request from '@/utils/request';
import { FormDataType } from './data.d';

export async function createData(params: FormDataType): Promise<any> {
  return request({
    url: '/pages/form',
    method: 'POST',
    data: params,
  });
}

```

```tsx
// @/pages/pagesample/form/basic/index.tsx
import { useState } from 'react';
import { Button, Card, Checkbox, DatePicker, Form, Input, message, Radio, Select } from 'antd';
import { FormDataType } from './data.d';
import { createData } from './service';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 7 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 },
    md: { span: 10 },
  },
};

const submitFormLayout = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 10, offset: 7 },
  },
};

function App() {
  const [form] = Form.useForm();
  const onReset = () => {
    form.resetFields();
  };

  const [loading, setLoading] = useState<boolean>(false);
  const onFinish = async (values: FormDataType) => {
    setLoading(true);
    try {
      await createData(values);
      message.success('提交成功');
      onReset();
    } catch (error: any) {
      console.log(error);
    }
    setLoading(false);
  };
  return (
    <div className='layout-main-conent'>
      <Card bordered={false}>
        <Form
          /* hideRequiredMark */
          name='basic'
          form={form}
          onFinish={onFinish}
        >
          <Form.Item
            {...formItemLayout}
            label='标题：'
            name='title'
            rules={[
              {
                required: true,
                message: '必填',
              },
            ]}
          >
            <Input placeholder='请输入' />
          </Form.Item>

          <Form.Item
            {...formItemLayout}
            label='起止日期'
            name='date'
            rules={[
              {
                required: true,
                message: '必填',
              },
            ]}
          >
            <DatePicker.RangePicker
              style={{ width: '100%' }}
              placeholder={['开始日期', '截止日期']}
              onChange={(value, string) => {
                console.log(value, string);
              }}
            />
          </Form.Item>

          <Form.Item
            {...formItemLayout}
            label='下拉选择'
            name='select'
            rules={[
              {
                required: true,
                message: '请选择',
              },
            ]}
          >
            <Select placeholder='请选择' allowClear>
              <Select.Option value='1'>select1</Select.Option>
              <Select.Option value='2'>select2</Select.Option>
              <Select.Option value='3'>select3</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item {...formItemLayout} label='单选按钮1' name='radio1'>
            <Radio.Group>
              <Radio value='a'>item 1</Radio>
              <Radio value='b'>item 2</Radio>
              <Radio value='c'>item 3</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            {...formItemLayout}
            label='单选按钮2'
            name='radio2'
            rules={[{ required: true, message: '请选择' }]}
          >
            <Radio.Group>
              <Radio.Button value='a'>item 1</Radio.Button>
              <Radio.Button value='b'>item 2</Radio.Button>
              <Radio.Button value='c'>item 3</Radio.Button>
            </Radio.Group>
          </Form.Item>

          <Form.Item {...formItemLayout} label='复选框' name='checkbox'>
            <Checkbox.Group>
              <Checkbox value='A' style={{ lineHeight: '32px' }}>
                A
              </Checkbox>

              <Checkbox value='B' style={{ lineHeight: '32px' }} disabled>
                B
              </Checkbox>

              <Checkbox value='C' style={{ lineHeight: '32px' }}>
                C
              </Checkbox>

              <Checkbox value='D' style={{ lineHeight: '32px' }}>
                D
              </Checkbox>

              <Checkbox value='E' style={{ lineHeight: '32px' }}>
                E
              </Checkbox>

              <Checkbox value='F' style={{ lineHeight: '32px' }}>
                F
              </Checkbox>
            </Checkbox.Group>
          </Form.Item>

          <Form.Item {...formItemLayout} label='备注' name='remark'>
            <Input.TextArea style={{ minHeight: 32 }} placeholder='请输入' rows={4} />
          </Form.Item>

          <Form.Item {...submitFormLayout}>
            <Button type='primary' htmlType='submit' loading={loading}>
              提交
            </Button>
            <Button htmlType='button' onClick={onReset} style={{ marginLeft: 8 }}>
              重置
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

export default App;

```



