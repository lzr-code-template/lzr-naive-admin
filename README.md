# lzr-naive-admin

一款极简风格的后台管理系统，采用现代化的技术栈，注重用户体验与开发效率。

## ✨ 特性

- � **现代化技术栈**：基于 Vite 5 + Vue 3.5 + TypeScript + Pinia 2.2 构建
- ⚡️ **原子化 CSS**：采用 TailwindCSS 3.4 框架，实现优雅、轻量、易用的样式管理
- 🎨 **精美 UI 设计**：基于 Naive UI 2.40 组件库，提供极致简洁的界面与灵活的主题定制
- 🍒 **模块化设计**：采用先进的文件结构，实现模块间零耦合，支持灵活的功能扩展
- 🍉 **扁平化路由**：创新的路由设计理念，完美解决多级路由 KeepAlive 难题
- 📦 **开箱即用**：集成 ESLint、VueUse、NProgress 等实用工具，提供完整开发体验

## 🚀 快速开始

### 环境准备

- Node.js >= 18
- pnpm >= 8

### 安装依赖

```bash
pnpm install
```

### 开发调试

```bash
# 开发环境
pnpm dev-ming

# 测试环境
pnpm dev-test
```

### 构建部署

```bash
# 生产环境构建
pnpm build

# 测试环境构建
pnpm build-test

# 预览构建结果
pnpm preview
```

## 🛠️ 核心依赖

- **Vue 生态**
  - Vue ^3.5.13
  - Vue Router ^4.5.0
  - Pinia ^2.2.8
  - Naive UI ^2.40.2
  
- **工具库**
  - @vueuse/core ^10.11.1
  - axios ^1.7.8
  - lodash-es ^4.17.21
  - crypto-js ^4.2.0
  
- **构建工具**
  - vite ^5.4.11
  - typescript ~5.3.3
  - tailwindcss ^3.4.15
  - unplugin-auto-import ^0.17.8

## 📝 开发建议

### IDE 配置

推荐使用 VSCode 进行开发，并安装以下插件：

- [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar)
- [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin)
- [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)

> 注意：使用时请禁用 Vetur 插件

### 代码规范

项目使用 `@stefanobartoletti/eslint-config` 配置进行代码规范约束，确保代码风格统一。

### TypeScript 支持

本项目使用 `vue-tsc` 进行类型检查。为获得更好的开发体验，建议：

1. 安装 TypeScript Vue Plugin (Volar)
2. 启用 Volar 的 [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669)
3. 使用 `pnpm type-check` 命令进行类型检查

## 🤝 贡献指南

欢迎提交 Issue 或 Pull Request 来帮助改进项目。在提交 PR 前，请确保：

1. 代码通过 ESLint 检查
2. TypeScript 类型检查无误
3. 新功能已添加相应的文档说明

## 📄 开源协议

[MIT License](LICENSE)
