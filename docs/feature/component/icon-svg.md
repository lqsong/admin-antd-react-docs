# IconSvg

全局 Svg Icon 图标组件。

[@/components/IconSvg](https://github.com/lqsong/admin-antd-react/tree/main/src/components/IconSvg) 可以在项目中任意地方使用。图标均可在 [@/assets/iconsvg](https://github.com/lqsong/admin-antd-react/tree/main/src/assets/iconsvg)目录下自行添加或者删除，所有图标都会被自动导入，无需手动操作。

[在线DOME](http://demo.admin-antd-react.liqingsong.cc/#/component/icon/svg)

## 使用方法

### 1、下载或制作svg文件

存放到 `@/assets/iconsvg` 目录下，自己可以对此目录下svg进行删减。

### 2、压缩精简svg

项目会根据 `@/assets/iconsvg/svgo.yml` 配置自动压缩精简svg，也可以独立运行 `yarn svgo` 或 `npm run svgo` 压缩精简svg。

### 3、使用Demo：

```ts
import IconSvg from '@/components/IconSvg';
() => {
    return <IconSvg type="svg文件名" className="" style=""/>;
}
```





