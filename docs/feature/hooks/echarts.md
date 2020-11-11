# useEcharts

[useEcharts](https://github.com/lqsong/admin-antd-react/blob/main/src/hooks/useEcharts.ts) Hooks 基于 `Echarts` 封装, [官网](https://echarts.apache.org)。

## Props

| 名称     | 类型    | 默认值                      | 说明                                                                           |
| -------- | ------ | -------------------------- | ------------------------------------------------------------------------------------- |
| ref    | React.RefObject \| React.MutableRefObject |                      | 显示图表的DOM                                    |
| initOption  | EChartOption |         | echarts option                                                                    |
| theme | string \| object | macarons |  主题 |

## Example

[在线链接](http://demo.admin-antd-react.liqingsong.cc/#/home/workplace)

在线代码

[@/pages/home/components/WorksChartCard](https://github.com/lqsong/admin-antd-react/blob/main/src/pages/home/components/WorksChartCard/index.tsx)

[@/pages/home/components/TopicsChartCard](https://github.com/lqsong/admin-antd-react/blob/main/src/pages/home/components/TopicsChartCard/index.tsx)

[@/pages/home/components/LinksChartCard](https://github.com/lqsong/admin-antd-react/blob/main/src/pages/home/components/LinksChartCard/index.tsx)

