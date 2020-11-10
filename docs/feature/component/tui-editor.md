# tui-editor

[TuiEditor](https://github.com/lqsong/admin-antd-react/tree/main/src/components/TuiEditor) 组件基于 `tui-editor` 封装，是一款 Markdown 编辑器；`tui-editor` [官网](https://ui.toast.com/tui-editor/)，[GitHub](https://github.com/nhnent/tui.editor)。

## Editor

### Props

| 名称     | 类型    | 默认值                      | 说明                                                                           |
| -------- | ------ | -------------------------- | ------------------------------------------------------------------------------------- |
| value    | String | " "                        | 编辑器的内容.                                       |
| toolbars | string[] |  `toolbarItems`          | tui.editor 工具栏的配置.                                                                    |
| height   | String | '300px'                    | 编辑器的高度.                                                                          |
| initialEditType   | String | 'markdown' |    | 编辑器的模式. (`markdown`or `wysiwyg`)                                                 |
| previewStyle | 'tab' \| 'vertical' \| undefined  | undefined             |  |
| onChange | Function(value: string, editor?: Editor) |  | |
| onLoad | Function(editor?: Editor) |  | |
| onFocus | Function(param: { source: SourceType }) |  | |
| onBlur | Function(param: { source: SourceType }) |  | |

```js
const toolbarItems: string[] = [
  'heading',
  'bold',
  'italic',
  'strike',
  'divider',
  'hr',
  'quote',
  'divider',
  'ul',
  'ol',
  'task',
  'indent',
  'outdent',
  'divider',
  'table',
  'image',
  'link',
  'divider',
  'code',
  'codeblock',
];
```


## Viewer

### Props

| 名称     | 类型    | 默认值                      | 说明                                                                           |
| -------- | ------ | -------------------------- | ------------------------------------------------------------------------------------- |
| value    | String | " "                        | 显示的内容. **如果使用 `v-model`, 不要使用它**.                                      |


## 上传图片

组件统一了整个后台编辑器的上传图片api地址。相关代码如下,你可以自定义修改：

```ts
import React, { useMemo, useRef } from 'react';
import request from '@/utils/request';
import Editor from '@toast-ui/editor';
import { Editor as EditorReact } from '@toast-ui/react-editor';
import 'codemirror/lib/codemirror.css';
import '@toast-ui/editor/dist/toastui-editor.css';

const toolbarItems: string[] = [
  'heading',
  'bold',
  'italic',
  'strike',
  'divider',
  'hr',
  'quote',
  'divider',
  'ul',
  'ol',
  'task',
  'indent',
  'outdent',
  'divider',
  'table',
  'image',
  'link',
  'divider',
  'code',
  'codeblock',
];

type SourceType = 'wysiwyg' | 'markdown';

export interface TuiEditorProps {
  value: string;
  height?: string;
  toolbars?: string[];
  previewStyle?: 'tab' | 'vertical';
  initialEditType?: SourceType;
  useCommandShortcut?: boolean;
  onLoad?: (editor: Editor) => void;
  onChange?: (value: string, editor?: Editor) => void;
  stateChange?: (param: any) => void;
  onFocus?: (param: { source: SourceType }) => void;
  onBlur?: (param: { source: SourceType }) => void;
}

const TuiEditor: React.FC<TuiEditorProps> = props => {
  const {
    value = '',
    height = '300px',
    toolbars = toolbarItems,
    previewStyle,
    initialEditType = 'markdown',
    useCommandShortcut = true,
    onLoad,
    onChange,
    stateChange,
    onFocus,
    onBlur,
  } = props;

  const editorRef = useRef<Editor>();

  const events = useMemo(() => {
    let ret = {
      load: (editor: any) => {
        if (!editorRef.current) {
          editorRef.current = editor;
        }

        if (onLoad) {
          onLoad(editor);
        }
      },
      change: (/* param: { source: SourceType | 'viewer'; data: MouseEvent } */) => {
        let value = editorRef.current ? editorRef.current.getMarkdown() : '';

        if (onChange) {
          onChange(value, editorRef.current);
        }
      },
    };

    if (stateChange) {
      ret['stateChange'] = stateChange;
    }

    if (onFocus) {
      ret['focus'] = onFocus;
    }

    if (onBlur) {
      ret['blur'] = onBlur;
    }

    return ret;
  }, [1]);

  return (
    <EditorReact
      initialValue={value}
      toolbarItems={toolbars}
      previewStyle={previewStyle}
      height={height}
      initialEditType={initialEditType}
      useCommandShortcut={useCommandShortcut}
      events={events}
      hooks={{
        addImageBlobHook: (fileOrBlob, callback) => {
          let param = new FormData();
          param.append('file', fileOrBlob);

          request('/uploads', {
            headers: { 'Content-Type': 'multipart/form-data' },
            method: 'POST',
            data: param,
          })
            .then(res => {
              const { data } = res;
              const { url, name } = data;
              callback(url, name);
            })
            .catch(err => {
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

[在线链接](http://demo.admin-antd-react.liqingsong.cc/#/component/editor/tuieditor)

## 卸载

如果你不需要此组件，然后代码打包感觉不需要，可以卸载此组件。

1、CMD 运行

```bash
npm uninstall @toast-ui/react-editor
```

2、删除组件文件目录 [@/components/TuiEditor](https://github.com/lqsong/admin-antd-react/tree/main/src/components/TuiEditor)