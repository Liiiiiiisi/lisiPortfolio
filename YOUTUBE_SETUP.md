# YouTube 视频设置说明

## 首页自动播放 YouTube 视频

要在首页添加自动播放的 YouTube 视频（无播放按钮），请按以下步骤操作：

### 方法 1: 使用环境变量（推荐）

1. 在项目根目录创建 `.env.local` 文件（如果不存在）
2. 添加你的 YouTube URL：

```bash
NEXT_PUBLIC_YOUTUBE_URL=https://www.youtube.com/watch?v=YOUR_VIDEO_ID
```

或者使用短链接：

```bash
NEXT_PUBLIC_YOUTUBE_URL=https://youtu.be/YOUR_VIDEO_ID
```

3. 重启开发服务器：
```bash
npm run dev
```

### 方法 2: 直接在代码中设置

编辑 `app/page.tsx`，找到这一行：

```typescript
const youtubeUrl = process.env.NEXT_PUBLIC_YOUTUBE_URL || '';
```

改为：

```typescript
const youtubeUrl = 'https://www.youtube.com/watch?v=YOUR_VIDEO_ID';
```

### YouTube URL 格式

支持以下格式：
- `https://www.youtube.com/watch?v=VIDEO_ID`
- `https://youtu.be/VIDEO_ID`
- `https://www.youtube.com/embed/VIDEO_ID`

### 视频设置

视频会自动：
- ✅ 自动播放
- ✅ 静音（浏览器要求）
- ✅ 循环播放
- ✅ 无播放按钮
- ✅ 无相关视频推荐
- ✅ 无视频信息显示

### 注意事项

- 视频必须是公开的或未列出的（不能是私有的）
- 某些浏览器可能阻止自动播放，但会静音播放
- 移动设备上可能需要用户交互才能播放

