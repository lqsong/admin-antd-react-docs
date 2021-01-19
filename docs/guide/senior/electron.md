# electron-admin-antd-react

> electron-admin-antd-react（[GitHub](https://github.com/lqsong/electron-admin-antd-react)、[Gitee](https://gitee.com/lqsong/electron-admin-antd-react)） 是在 `admin-antd-react`（[GitHub](https://github.com/lqsong/admin-antd-react)、[Gitee](https://gitee.com/lqsong/admin-antd-react)）的基础上结合 [umi-plugin-electron-builder](https://github.com/nklayman/umi-plugin-electron-builder) 构建的桌面Admin。

## Demo

**注意：Demo 用的是在线mock服务，不稳定，若登录不了pull到本地可直接运行查看demo**

> 下载自己需要的版本进行安装

|下载链接|
:-------------------------:
| electron-admin-antd-react-v1.0.0-win32-ia32-setup.exe [Github](https://github.com/lqsong/electron-admin-antd-react/releases) [Gitee](https://gitee.com/lqsong/electron-admin-antd-react/releases)  |
| electron-admin-antd-react-v1.0.0-win32-x64-setup.exe [Github](https://github.com/lqsong/electron-admin-antd-react/releases) [Gitee](https://gitee.com/lqsong/electron-admin-antd-react/releases) |


|图片预览|
:-------------------------:
| ![Home](https://gitee.com/lqsong/public/raw/master/electron-admin-antd-react/admin1.png)  |
| ![Home](https://gitee.com/lqsong/public/raw/master/electron-admin-antd-react/admin2.png)  |


## 目录结构

`electron-admin-antd-react` 在 `admin-antd-react` [目录结构](/guide/#目录结构)基础上新增以下目录与文件

```bash
├── build                      # 构建资源
│   └── icons                  # 图标目录(尺寸最小256x256)
└── src                        # 源代码
    └── main                   # Electron 主进程目录
```

## 安装

```bash
# 克隆项目
git clone https://github.com/lqsong/electron-admin-antd-react.git

# 进入项目目录
cd electron-admin-antd-react

# 复制文件
copy .env  .env.local # 启用修改里面的参数

# 安装依赖，推荐使用 yarn 
yarn 
# or
npm install

# 本地开发 启动项目
yarn electron:dev
# or
npm run electron:dev
```

> 推荐使用 yarn , **[yarn安装与常用命令](http://liqingsong.cc/article/detail/9)** 。

启动完成后会，会自动打开 `Electron` 窗口， 你看到下面的窗口就代表操作成功了。

![Home](https://gitee.com/lqsong/public/raw/master/electron-admin-antd-react/admin1.png)


## 配置

`electron-admin-antd-react` 在 `admin-antd-react` 的基础上新增了以下配置.

### scripts 配置

`package.json` 中 `scripts` 增加了以下命令参数:

```js
  "scripts": {
    // 开发 electron 项目
    "electron:dev": "umi dev electron",
    // 构建 electron 项目
    "electron:build:win": "umi build electron --win",
    "electron:build:mac": "umi build electron --mac",
    "electron:build:linux": "umi build electron --linux" 
  },
```

### 构建配置

`.umirc.ts` 中增加了以下配置：

```js
export default defineConfig({
  electronBuilder: {
    routerMode: 'hash', // 路由 只能是hash或memory
    outputDir: 'dist_electron', // 默认打包目录
    externals: [],  // 不配置的无法使用
    rendererTarget: 'electron-renderer', // 构建目标electron-renderer 或 web
    builderOptions: {
      productName: 'electron-admin-antd-react', // 项目名，也是生成的安装文件名，即electron-admin-antd-react.exe
      appId: 'cc.liqingsong.electron-admin-antd-react', // 包名
      copyright: 'Copyright © 2018-present LiQingSong', // 版权
      nsis: {
          oneClick: false, // 是否一键安装
          allowElevation: true, // 允许请求提升。 如果为false，则用户必须使用提升的权限重新启动安装程序。
          allowToChangeInstallationDirectory: true, // 允许修改安装目录
          installerIcon: './build/icons/icon.ico', // 安装图标
          uninstallerIcon: './build/icons/icon.ico', // 卸载图标
          installerHeaderIcon: './build/icons/icon.ico', // 安装时头部图标
          createDesktopShortcut: true, // 创建桌面图标
          createStartMenuShortcut: true, // 创建开始菜单图标
          shortcutName: 'electron-admin-antd-react' // 图标名称
      },
      dmg: { // macOSdmg
          contents: [
            {
              "x": 410,
              "y": 150,
              "type": "link",
              "path": "/Applications"
            },
            {
              "x": 130,
              "y": 150,
              "type": "file"
            }
          ]
      },
      mac: { // mac
          icon: "./build/icons/icon.icns"
      },
      win: { // win 相关配置
          icon: './build/icons/icon.ico',
          target: [
              {
                target: "nsis", // 利用nsis制作安装程序
                arch: [ // 这个意思是打出来32 bit + 64 bit的包，但是要注意：这样打包出来的安装包体积比较大，所以建议直接打32的安装包。
                  // "x64",
                  "ia32"
                ]
              }
            ]
      },
      linux: {
          icon: "./build/icons"
      },
      publish: [
        {
          provider: 'generic',
          url: '',
        },
      ],
    }
  }
});

```

> `builderOptions` 中的更多参数，参考 [electron-builder](https://www.electron.build/)。


## 构建

当项目开发完毕，只需要运行一行命令就可以打包你的应用：

```bash
# 打包正式环境
yarn electron:build:win
yarn electron:build:mac
yarn electron:build:linux
# or 
npm run electron:build
npm run electron:build:mac
npm run electron:build:linux
```

构建打包成功之后，会在根目录生成 `dist_electron` 文件夹，里面就是构建打包好的文件，详细文档参考：[electron-builder](https://www.electron.build/)。


:::tip
其他内容与 `admin-antd-react` 一致，相关内容说明请参考文档其他说明。
:::


