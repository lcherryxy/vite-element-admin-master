# 内容工坊（ContentStudio）

## 一、项目简介

内容工坊是一个面向内容团队的文章生产与运营平台，覆盖内容创作、素材处理、数据看板与账号管理，帮助内容团队把「选题 — 撰写 — 编辑 — 发布」的流程放进同一套后台。

项目基于 Vue 3 组合式 API 与 Pinia 开发，UI 采用 Element Plus，构建工具为 Vite。

## 二、技术栈

| 技术 | 版本 | 说明 |
| --- | --- | --- |
| Vue | 3.5.44 | 组合式 API（`<script setup>`） |
| Vite | 6.4.4 | 开发服务器与生产构建 |
| Pinia | 3.0.4 | 全局状态管理 |
| Vue Router | 4.6.4 | Hash 模式，动态路由权限 |
| Element Plus | 2.14.7 | UI 组件库 |
| @element-plus/icons-vue | 2.3.2 | 通用交互图标 |
| Sass | 1.105.1 | 样式预处理（`@use` 语法） |
| ECharts | 5.5.1 | 图表与 3D 可视化 |
| vxe-table | 4.4.2 | 高性能表格 |

> 版本以当前 `node_modules` 实际安装为准，升级依赖后请同步更新本表。

## 三、功能清单

- **登录与权限**：Mock 登录、动态路由注册、菜单按权限过滤。
- **仪表盘**：首页数据概览。
- **图表**：ECharts 折线、混合图、3D 图表。
- **地图**：百度地图、高德地图、腾讯地图。
- **表格**：动态表格、拖拽排序、可编辑表格、综合表格（vxe-table）。
- **内容编辑**：wangeditor、Vditor、TinyMCE 三种编辑器，tui-image-editor 图片编辑。
- **个人中心**：我的账号、登录历史、实名认证。
- **框架能力**：多标签页与页面缓存（keep-alive）、侧边栏折叠、面包屑、全屏、主题设置、Mock 数据。
- **图标体系**：Element Plus 图标 + 自研 SVG 图标双轨。

## 四、目录结构

```
├── config/                 # 构建配置（Vite 插件、环境变量解析）
├── public/                 # 静态资源（favicon.ico）
├── src/
│   ├── api/                # 接口定义
│   ├── assets/             # 图片等静态资源
│   ├── components/         # 全局公共组件
│   ├── config/             # 全局常量
│   ├── directive/          # 全局指令
│   ├── icons/              # 业务 SVG 图标与 SVG 注册入口
│   ├── layout/             # 布局（侧边栏、导航栏、标签页）
│   ├── locale/             # 国际化
│   ├── plugins/            # 插件初始化（Element Plus、图标、vxe-table）
│   ├── router/             # 路由与路由模块
│   ├── store/              # Pinia 模块
│   ├── styles/             # 全局样式与主题变量
│   ├── utils/              # 工具函数（请求、权限、校验）
│   ├── views/              # 页面
│   ├── App.vue             # 根组件
│   ├── main.js             # 应用入口
│   └── permission.js       # 路由守卫与权限逻辑
├── index.html              # HTML 模板
├── vite.config.js          # Vite 配置
└── package.json            # 依赖与脚本
```

## 五、本地启动

环境要求：Node.js >= 18。

```bash
# 安装依赖
npm install

# 启动开发服务（默认端口 9527）
npm run dev

# 生产构建
npm run build

# 本地预览构建产物
npm run preview
```

开发服务启动后访问 `http://localhost:9527`。登录使用 Mock 数据，账号与密码可任意填写。

## 六、二次开发说明

### 6.1 图标按语义分流

- **通用交互类**（搜索、全屏、关闭、删除、返回等）：使用 `@element-plus/icons-vue`。图标已在 `src/plugins/elementIcons.js` 全量注册，模板中直接写 `<Search />`、`<FullScreen />` 即可。
- **业务类**（菜单图标、微信登录、品牌相关图形）：放在 `src/icons/svg`。构建时由 `config/plugins.js` 中的 `svgBuilder` 打包为 SVG symbol，通过 `<svg-icon icon-class="名称" />` 使用。新增图标只需把文件放入目录，无需改代码。
- 两类图标不要混用：Element Plus 图标不放进 `src/icons/svg`，自研 SVG 只承载业务语义。

### 6.2 lottie 改为页内引用

项目已移除动画相关的全局注册与全局样式引入。页面需要 Lottie 动画时，在该页面内按需 `import` 动画 JSON 与播放组件，动画资源放在页面同级目录，随路由懒加载，避免进入首屏包体。

### 6.3 高德地图配置安全密钥

在 `.env.local`（该文件已被 `.gitignore` 忽略，不会提交）中配置：

```bash
VITE_AMAP_KEY = '你的 Web 端（JS API）Key'
VITE_AMAP_SECURITY_CODE = '你的安全密钥'
```

页面通过 `window._AMapSecurityConfig.securityJsCode` 注入安全密钥后再加载 SDK。生产环境建议改用代理服务器方案，避免密钥明文出现在前端。

## 七、后续规划

- **接入大模型实现 AI 辅助写作**：在文章编辑器中提供选题建议、大纲生成、续写、改写润色、标题与摘要生成；模型调用统一走后端网关，集中管理密钥、配额与调用日志。
- **内容生产链路**：把选题库、稿件状态流转、审核发布串成完整流程。
- **数据运营**：作者产出、内容表现与渠道效果的统计看板。
