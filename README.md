# 主页

## 介绍

本主页基于[Vuepress](https://vuepress.vuejs.org/zh/)的[vdoing theme](https://doc.xugaoyi.com/)修改而来。

显示：

```bash
vuepress dev docs
```

构建：

```
vuepress build docs
```

## 结构

主题是一个经典的vuepress架构，其各个文件夹功能说明如下：

```
- docs 存放主要文件
	- .vuepress vuepress的一些配置
		- config 配置信息，包括一些注入内容
		- plugins 主题插件
		- styles 部分内容的主题定制
		- config.js 核心数据配置
    - 各个文件夹存放md文件，配置见vdoing主题说明
- theme-vdoing 主题的样式和逻辑定制
	- components 主题组件
	- global-components 也是一些组件
	- layouts 页面总体布局规划
	- styles 固定样式的布局文件
	- util 工具
```

## 功能

已经完成的：

- 对Home.vue主要结构的修改及样式初步调整
- EventsLecs，活动组件的设计及样式初步调整
- ArticleLists，文章组件的设计及样式初步调整
- 主题基本配置修改

TODO：

- 响应式设计
- 部分页面内容不正确
- 侧边栏逻辑
- 页面优化
- 内容完善
- 其它功能（比如评论等）上线