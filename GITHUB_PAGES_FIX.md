# GitHub Pages 部署修复说明

## 修复的问题

### 1. BasePath 配置
GitHub Pages 部署在子路径（`username.github.io/repo-name/`）时，需要设置 `basePath`。

**修复内容：**
- ✅ 在 `next.config.ts` 中自动检测并设置 basePath
- ✅ 在 GitHub Actions 工作流中设置 `NEXT_PUBLIC_BASE_PATH` 环境变量
- ✅ 创建了 `lib/paths.ts` 工具函数处理路径

### 2. 静态资源路径
视频和图片路径需要包含 basePath。

**修复内容：**
- ✅ `ProjectList` 组件中的视频和图片使用 `withBasePath()`
- ✅ `VideoHero` 组件中的视频路径使用 `withBasePath()`
- ✅ `MarkdownRenderer` 组件中的图片路径使用 `withBasePath()`

### 3. 背景色问题
确保黑色背景在部署后正确显示。

**修复内容：**
- ✅ 添加内联样式 `backgroundColor: '#000000'` 到所有主要容器
- ✅ 更新 `body` 标签样式

## 部署检查清单

### 部署前
1. ✅ 确保 `next.config.ts` 中的 basePath 配置正确
2. ✅ 确保 GitHub Actions 工作流文件存在（`.github/workflows/deploy.yml`）
3. ✅ 确保所有静态资源（视频、图片）在 `public/` 目录下

### 部署后验证
1. 检查网站URL：`https://liiiiiiisi.github.io/lisiPortfolio/`
2. 验证以下内容：
   - ✅ 背景是黑色（不是白色）
   - ✅ 导航链接可以正常点击
   - ✅ 项目列表显示正确
   - ✅ 悬停时视频播放
   - ✅ 项目页面可以正常访问
   - ✅ 图片和视频可以正常加载

## 如果还有问题

### 问题：资源404错误
**解决方案：**
- 检查 `public/` 目录下的文件是否都提交到了GitHub
- 确保文件路径大小写正确（GitHub Pages区分大小写）

### 问题：样式不正确
**解决方案：**
- 清除浏览器缓存（Cmd+Shift+R 或 Ctrl+Shift+R）
- 检查 GitHub Actions 构建日志是否有错误

### 问题：basePath不正确
**解决方案：**
- 如果仓库名不是 `lisiPortfolio`，修改 `next.config.ts` 中的默认值
- 或者设置环境变量 `NEXT_PUBLIC_BASE_PATH`

## 本地测试

要测试 GitHub Pages 的 basePath 效果，可以：

```bash
# 设置环境变量模拟GitHub Pages
export NEXT_PUBLIC_BASE_PATH=/lisiPortfolio
npm run build
npm start
```

然后访问 `http://localhost:3000/lisiPortfolio/`

