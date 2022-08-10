import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'zh-CN',
  lastUpdated: false,
  srcDir: 'src',
  base: '/v2_vite/',
  outDir: '../v2_vite',
  title: 'admin-antd-react',
  titleTemplate: '后台前端解决方案',
  description: '基于 React 18、Ant Design、Recoil、TypeScript 、Axios ... 后台前端解决方案。',
  head: [
    ['link', {rel: 'icon', href: '/favicon.ico'}],
    ['script', {type: 'text/javascript', src: 'https://hm.baidu.com/hm.js?49f8dbc935316bb6b9811648f3900922'}]
  ],
  markdown: {
    theme: 'material-palenight',
    lineNumbers: true
  },
  themeConfig: {
    nav: [
      { text: '指南', link: '/guide/', activeMatch: '/guide/' },
      {
        text: '功能',
        items: [
          {
            text: '组件',
            items: [
              {text: 'tui-editor', link: '/feature/component/tui-editor'},
              {text: 'CKEditor', link: '/feature/component/CKEditor'},
              {text: 'IconSvg', link: '/feature/component/icon-svg'},
            ]
          },
          {
            text: 'Hooks',
            items: [
              {text: 'useEcharts', link: '/feature/hooks/echarts'}
            ]
          },
          {
            text: 'Script',
            items: [
              {text: 'Svgo', link: '/feature/script/svgo'}
            ]
          }
        ]
      },
      { text: '捐赠', link: '/donate/', activeMatch: '/donate/' },
      {
        text: '生态',
        items: [
          {
            text: '后台框架',
            items: [
              {text: 'admin-element-vue', link: 'http://admin-element-vue.liqingsong.cc'},
              {text: 'admin-antd-vue', link: 'http://admin-antd-vue.liqingsong.cc'},
              {text: 'admin-antd-react', link: 'http://admin-antd-react.liqingsong.cc'},
              {text: 'electron-admin-element-vue', link: 'http://admin-element-vue.liqingsong.cc/tsv2/guide/senior/electron.html'},
              {text: 'electron-admin-antd-vue', link: 'http://admin-antd-vue.liqingsong.cc/webpackts/guide/senior/electron.html'},
              {text: 'electron-admin-antd-react', link: 'http://admin-antd-react.liqingsong.cc/guide/senior/electron.html'},
              {text: 'admin-vue3-micro-qiankun', link: 'http://admin-vue3-micro-qiankun.liqingsong.cc'},
            ],
          },
          {
            text: '前台框架',
            items: [
              {
                text: 'midway-vue3-ssr',
                link: 'http://midway-vue3-ssr.liqingsong.cc'
              }
            ],
          },
          
        ],
      },
      {
          text: 'v2.0-vite',
          items: [
              {
                  text: '其他版本',
                  items: [
                      {text: 'v1.0-umijs', link: 'http://admin-antd-react.liqingsong.cc/v1_umijs/'},
                  ] 
              }            
          ]
      },
      {
          text: '预览', link: 'http://vite-demo.admin-antd-react.liqingsong.cc'
      },
    ],
    sidebar: {
      '/guide/': [
        {
          text: '开始',
          collapsible: true,
          items: [
            { text: '简介', link: '/guide/' },
            { text: '快速开始', link: '/guide/getting-started' },
          ]
        },
        {
          text: '基础',
          collapsible: true,
          items: [
            { text: '配置', link: '/guide/essentials/config' },
            { text: '布局', link: '/guide/essentials/layout' },
            { text: '路由和菜单', link: '/guide/essentials/router-and-menu' },
            { text: '权限验证', link: '/guide/essentials/permission' },
            { text: '状态管理(Recoil)', link: '/guide/essentials/store' },
            { text: '多语言', link: '/guide/essentials/locales' },
            { text: '新增页面', link: '/guide/essentials/new-module-page' },
            { text: '与服务端交互', link: '/guide/essentials/server' },
            { text: 'Mock Data', link: '/guide/essentials/mock' },
            { text: '构建与发布', link: '/guide/essentials/build-and-release' },
          ]
        },
        {
          text: '进阶',
          collapsible: true,
          items: [
            { text: '懒加载组件', link: '/guide/senior/lazy-loading' },
            { text: '异常处理', link: '/guide/senior/exception-handling' },           
            { text: 'VS Code 插件', link: '/guide/senior/v-s-code' },
          ]
        },
        
      ],
      '/feature/': [
        {
          text:'组件',
          collapsible: false,
          items:[
            {text: 'tui-editor', link: '/feature/component/tui-editor'},
            {text: 'CKEditor', link: '/feature/component/CKEditor'},
            {text: 'IconSvg', link: '/feature/component/icon-svg'},
          ]
        },
        {
          text:'Hooks',
          collapsible: false,
          items:[
            {text: 'useEcharts', link: '/feature/hooks/echarts'}
          ]
        },
        {
          text:'Script',
          collapsible: false,
          items:[
            {text: 'Svgo', link: '/feature/script/svgo'}
          ]
        }
      ]
    },
   /*  algolia: {
     
    }, */
    socialLinks: [
      { icon: 'github', link: 'https://github.com/lqsong/admin-antd-react' },
    ],
    logo: '/images/logo.png',
    outlineTitle: '页面概要',
    footer: {
      message: 'Released under the MIT License.',
      copyright: `Copyright © 2022-${new Date().getFullYear()} LiQingSong`
    },
    
  }
  // ...
})
