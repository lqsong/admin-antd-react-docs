# ESLint 配置

不管是多人合作还是个人项目，代码规范都是很重要的。这样做不仅可以很大程度地避免基本语法错误，也保证了代码的可读性。

## 配置项

所有的配置文件都在 [.eslintrc.js](https://github.com/lqsong/admin-antd-react/blob/main/.eslintrc.js) 中。
此文件 eslint 规则基于 [umi-fabric](https://github.com/umijs/fabric) 你可以结合自己的需求进行定制化配置。


```js
// https://github.com/lqsong/admin-antd-react/blob/main/.eslintrc.js

module.exports = {
  extends: [require.resolve('@umijs/fabric/dist/eslint')],
  rules: {
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'eslintobject-shorthand': ['always'],
  },
  globals: {},
};
```

## vscode 配置 ESLint

工欲善其事，必先利其器，个人推荐 eslint+vscode ，绝对有种飞一般的感觉。
每次保存，vscode 就能标红不符合 eslint 规则的地方，同时还会做一些简单的自我修正。安装步骤如下：

首先安装 eslint 插件
![vscode-eslint.png](https://gitee.com/lqsong/public/raw/master/admin-element-vue/vscode-eslint.png)

安装并配置完成 ESLint 后，我们继续回到 VSCode 进行扩展设置，依次点击 文件 > 首选项 > 设置 > 扩展 > ESLint > 在 settings.json 中编辑 打开 VSCode 配置文件,添加如下配置

```json
{
  "files.autoSave": "off",
  "eslint.autoFixOnSave": true,
  "eslint.validate": [
    "javascript",
    "javascriptreact",
  ],
  "eslint.run": "onSave"  
}
```

这样每次保存的时候就可以根据根目录下.eslintrc.js 你配置的 eslint 规则来检查和做一些简单的 fix。每个人和团队都有自己的代码规范，统一就好了，你可以借鉴：

[vscode 插件和配置推荐](https://github.com/varHarrie/Dawn-Blossoms/issues/10)
