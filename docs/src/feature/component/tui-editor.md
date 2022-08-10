# tui-editor

[TuiEditor](http://vite-demo.admin-antd-react.liqingsong.cc/#/component/editor/tuieditor) 组件基于 `tui-editor` 封装，是一款 Markdown 编辑器；`tui-editor` [官网](https://ui.toast.com/tui-editor/)，[GitHub](https://github.com/nhnent/tui.editor)。

## Editor

### Props

| 名称     | 类型    | 默认值                      | 说明                                                                           |
| -------- | ------ | -------------------------- | ------------------------------------------------------------------------------------- |
| value    | String | " "                        | 编辑器的内容.                                       |
| onChange | Function(value: string) |  | |



## Viewer

### Props

| 名称     | 类型    | 默认值                      | 说明                                                                           |
| -------- | ------ | -------------------------- | ------------------------------------------------------------------------------------- |
| value    | String | " "                        | 显示的内容.                                       |


## 上传图片

组件统一了整个后台编辑器的上传图片api地址。相关代码如下,你可以自定义修改：

```tsx{24-42}
import React, { createRef } from 'react';
import request from '@/utils/request';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';

export interface TuiEditorProps {
  value: string;
  onChange: (value?: string) => void;
}

const TuiEditor: React.FC<TuiEditorProps> = (props) => {
  const { value = '', onChange } = props;

  const editorRef = createRef<Editor>();

  return (
    <Editor
      ref={editorRef}
      initialValue={value}
      onChange={() => {
        onChange(editorRef.current?.getInstance().getMarkdown());
      }}
      hooks={{
        addImageBlobHook: (fileOrBlob, callback) => {
          const param = new FormData();
          param.append('file', fileOrBlob);

          request({
            url: '/uploads',
            headers: { 'Content-Type': 'multipart/form-data' },
            method: 'POST',
            data: param,
          })
            .then((res) => {
              const { data } = res as any;
              const { url, name } = data || {};
              callback(url, name);
            })
            .catch((err) => {
              console.log(err);
            });
        },
      }}
    />
  );
};

export default TuiEditor;

```


## Example

[在线链接](http://vite-demo.admin-antd-react.liqingsong.cc/#/component/editor/tuieditor)

## 卸载

如果你不需要此组件，然后代码打包感觉不需要，可以卸载此组件。

1、CMD 运行

```bash
pnpm remove  @toast-ui/react-editor @toast-ui/editor
```

2、删除组件文件目录 `@/components/TuiEditor`