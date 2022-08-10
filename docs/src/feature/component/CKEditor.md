# CKEditor


[CKEditor](http://vite-demo.admin-antd-react.liqingsong.cc/#/component/editor/ckeditor) 组件基于 `CKEditor 5` 封装，是一款 富文本编辑器；`CKEditor` [官网](https://ckeditor.com/)。


## Props

| 名称     | 类型    | 默认值                      | 说明                                                                           |
| -------- | ------ | -------------------------- | ------------------------------------------------------------------------------------- |
| value    | String |                      | 编辑器的内容.                                    |
| toolbars  | string[] |  `CKEditorConfig.toolbar`          | 编辑器 工具栏 配置.                                                                    |
| onChange | Function(data: string, editor: any, event: any) |  | |
| onFocus | Function(event: any, editor: any) |  | |
| onBlur | Function(event: any, editor: any) |  | |
| onReady | Function(editor: any) |  | |



## 上传图片

组件统一了整个后台编辑器的上传图片api地址。相关代码如下,你可以自定义修改：

```tsx{74-104}
import React from 'react';
import request from '@/utils/request';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import '@ckeditor/ckeditor5-build-decoupled-document/build/translations/zh-cn';
// import '@ckeditor/ckeditor5-build-decoupled-document/build/translations/zh'; // 繁体
import styles from './index.module.less';

export const CKEditorConfig = {
  toolbar: [
    'heading',
    '|',
    'fontfamily',
    'fontsize',
    'fontColor',
    'fontBackgroundColor',
    '|',
    'bold',
    'italic',
    'underline',
    'strikethrough',
    '|',
    'alignment',
    '|',
    'numberedList',
    'bulletedList',
    '|',
    'indent',
    'outdent',
    '|',
    'link',
    'blockquote',
    'imageUpload',
    'insertTable',
    'mediaEmbed',
    '|',
    'undo',
    'redo',
  ],
  language: 'zh-cn',
};

export interface CKEditorProps {
  value: string;
  toolbars?: string[];
  onChange?: (data: string, editor: any, event: any) => void;
  onBlur?: (event: any, editor: any) => void;
  onFocus?: (event: any, editor: any) => void;
  onReady?: (editor: any) => void;
}

const Editor: React.FC<CKEditorProps> = (props) => {
  const { toolbar, ...config } = CKEditorConfig;

  const { value = '', toolbars = toolbar, onChange, onBlur, onFocus, onReady } = props;

  let thisEditor: any = null;

  return (
    <div className={styles['document-editor']}>
      <CKEditor
        editor={DecoupledEditor}
        config={{
          toolbar: toolbars,
          ...config,
        }}
        data={value}
        onReady={(editor: any) => {
          // console.log( 'Editor is ready to use!', editor );
          editor.ui
            .getEditableElement()
            .parentElement.insertBefore(editor.ui.view.toolbar.element, editor.ui.getEditableElement());

          editor.plugins.get('FileRepository').createUploadAdapter = (loader: any) =>
            // let val = editor.getData();
            ({
              upload: async () => {
                return await loader.file.then((f: any) => {
                  // console.log("file:", f);

                  const param = new FormData();
                  param.append('file', f);

                  return new Promise((resolve, reject) => {
                    request({
                      url: '/uploads',
                      headers: { 'Content-Type': 'multipart/form-data' },
                      method: 'POST',
                      data: param,
                    })
                      .then((res) => {
                        const { data } = res as any;
                        resolve({
                          default: data.url || '',
                        });
                      })
                      .catch((err) => {
                        console.log(err);
                        reject(err);
                      });
                  });
                });
              },
            });

          thisEditor = editor;

          if (onReady) {
            onReady(editor);
          }
        }}
        onError={({ willEditorRestart }: { willEditorRestart: boolean }) => {
          if (willEditorRestart) {
            thisEditor.ui.view.toolbar.element.remove();
          }
        }}
        onChange={(event: any, editor: any) => {
          const data = editor.getData();
          // console.log( { event, editor, data } );
          if (onChange) {
            onChange(data, editor, event);
          }
        }}
        onBlur={(event: any, editor: any) => {
          // console.log( 'Blur.', editor );
          if (onBlur) {
            onBlur(event, editor);
          }
        }}
        onFocus={(event: any, editor: any) => {
          // console.log( 'Focus.', editor );
          if (onFocus) {
            onFocus(event, editor);
          }
        }}
      />
    </div>
  );
};

export default Editor;

```


## Example

[在线链接](http://vite-demo.admin-antd-react.liqingsong.cc/#/component/editor/ckeditor)


## 卸载

如果你不需要此组件，然后代码打包感觉不需要，可以卸载此组件。

1、CMD 运行

```bash
pnpm remove @ckeditor/ckeditor5-build-decoupled-document @ckeditor/ckeditor5-react
```

2、删除组件文件目录 `@/components/CKEditor`