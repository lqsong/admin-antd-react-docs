# 多语言 {#index}

## 介绍 {#intro}

在实际的项目开发中，我们有可能会用到多语言，并且为了方便开发与统一维护，项目集成了多语言功能。

> 目前项目多语言配置了 `en-US`英文、`zh-CN`中文简体、`zh-TW`中文繁体三类语种。


::: tip 重点：
项目考虑了加载与运行效率，所以多语言功能按照按需手动引入集成，`@/locales`全局国际化文件目录下语言配置文件已经默认集成。

**如果多语言语种文件中下标key出现重名，权重如下：**

> `@/locales` &gt; `@/***/***/locales`

:::

## 语种文件名规则 {#rule}

为了实现自动化导入，并为了方便开发与统一维护，**多语言语种配置文件名，命名规则** 必不可少。

文件名规则：`/^([a-z]{2})-?([A-Z]{2})?\.ts$/`，比如：`zh-CN.ts`。

```ts
// @/@types/i18n.d.ts

export type I18nKey = 'zh-CN' | 'zh-TW' | 'en-US';

export interface I18nVal {
  [key: string]: string;
}

export type I18n = {
  [key in I18nKey]?: I18nVal;
};

```


## 多语言使用 {#use}

目前项目多语言有`en-US`英文、`zh-CN`中文简体、`zh-TW`中文繁体三类语种。如果你创建的`Layout`、`组件`或`页面`使用多语言，以`@/pages/home`页面为例：

```sh
views                  
└── Home              
    ├── locales          # 当前页面国际化目录
    │   ├── en-US.ts     # 当前页面英文国际化配置
    │   ├── index.ts     # 当前页面国际化入口
    │   ├── zh-CN.ts     # 当前页面中文简体国际化配置
    │   └── zh-TW.ts     # 当前页面中文繁体国际化配置
    ├── index.tsx        # 当前页面入口
```

以上可以看出：

- 1、`@/pages/Home` 下创建 `locales` 目录。

- 2、在 `locales` 目录中创建 `en-US.ts` 、 `zh-CN.ts` 、`zh-TW.ts` 对应语种文件与 `index.ts` 默认入口文件。

- 3、语种文件中书写格式：

```ts
// I18nVal 
export default {
    'key': 'value',
};
```

- 4、`index.tsx` 文件中使用：

```tsx
import { useRecoilValue } from 'recoil';
import { useI18n } from '@/store/i18n';
import locales from './locales';

export default () => {
  const t = useRecoilValue(useI18n(locales));

  return (
      <div>
       {t('page.home.articlechartcard.card-title')}
      </div>
   
  );
};
```



## 新增多语言语种 {#add}

目前项目多语言有`en-US`英文、`zh-CN`中文简体、`zh-TW`中文繁体三类语种。如果您需要新增语种如下操作即可，以`葡萄牙语`为例：

#### 1、`@/store/i18n.ts` 中引入 `antd` 的 `葡萄牙语`并配置 {#add-one}

```ts
/**
 * antd 多语言 配置
 */
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import zhTW from 'ant-design-vue/es/locale/zh_TW';
import enUS from 'ant-design-vue/es/locale/en_US';
import ptBR from 'ant-design-vue/es/locale/pt_BR';
export const antdMessages: { [key: string]: any} = {
    'zh-CN': zhCN,
    'zh-TW': zhTW,
    'en-US': enUS,
    'pt-BR': ptBR, // 葡萄牙语
}

```

#### 2、`@/components/SelectLang` 配置下拉选项 {#add-two}

```ts
const menuItems = useMemo<ItemType[]>(
    () => [
      {
        key: 'zh-CN',
        label: <> 简体中文</>,
        icon: <>🇨🇳 </>,
        disabled: i18nLocale === 'zh-CN',
      },
      {
        key: 'zh-TW',
        label: <> 繁体中文</>,
        icon: <>🇭🇰 </>,
        disabled: i18nLocale === 'zh-TW',
      },
      {
        key: 'en-US',
        label: <> English</>,
        icon: <>🇺🇸 </>,
        disabled: i18nLocale === 'en-US',
      },
      {
        key: 'pt-BR',
        label: <> English</>,
        icon: <>🇧🇷 </>,
        disabled: i18nLocale === 'pt-BR',
      },
    ],
    [i18nLocale],
  );
```

#### 3、 在需要的的地方目录下中创建 `pt-BR.ts` 文件 {#add-three}

内容格式如下，以`@/locales`全局国际化文件目录下语言配置文件为例：

```ts
// @/locales/pt-BR.ts
export default {
    'empty': 'vazio',
    'app.global.menu.notfound': 'Não encontrado',
    'app.global.form.validatefields.catch': 'A verificação não foi aceitada. por favor, verifique',
};
```
