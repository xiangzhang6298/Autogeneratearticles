# TrendPublish

一个基于 AI 的趋势发现和内容发布系统，支持多源数据采集、智能总结和自动发布到微信公众号。

> 🌰 示例公众号：**AISPACE科技空间**

> 即刻关注，体验 AI 智能创作的内容～

## 🌟 主要功能

- 🤖 多源数据采集

  - Twitter/X 内容抓取
  - 网站内容抓取 (基于 FireCrawl)
  - 支持自定义数据源配置

- 🧠 AI 智能处理

  - 使用 DeepseekAI Together 千问 万象 讯飞 进行内容总结
  - 关键信息提取
  - 智能标题生成

- 📢 自动发布

  - 微信公众号文章发布
  - 自定义文章模板
  - 定时发布任务

- 📱 通知系统
  - Bark 通知集成
  - 任务执行状态通知
  - 错误告警

## DONE

- [x] 微信公众号文章发布
- [x] 大模型每周排行榜
- [x] 热门AI相关仓库推荐


## Todo
- [ ] 热门AI相关论文推荐
- [ ] 热门AI相关工具推荐
- [ ] FireCrawl 自动注册免费续期


## 🛠 技术栈

- **运行环境**: Node.js + TypeScript
- **AI 服务**: DeepseekAI Together 千问 万象 讯飞 
- **数据源**:
  - Twitter/X API
  - FireCrawl
- **定时任务**: node-cron
- **模板引擎**: EJS
- **开发工具**:
  - nodemon (热重载)
  - TypeScript

## 🚀 快速开始

### 环境要求

- Node.js (v22+)
- npm
- TypeScript

### 安装

1. 克隆项目

```bash
git clone https://github.com/OpenAISpace/ai-trend-publish
```

2. 安装依赖

```bash
npm install
```

3. 配置环境变量

```bash
cp .env.example .env
# 编辑 .env 文件配置必要的环境变量
```

## ⚙️ 环境变量配置

在 `.env` 文件中配置以下必要的环境变量：

```bash
如果需要使用数据库配置（先从数据库查找配置key，然后再env寻找）：
DB_HOST=xxxx
DB_PORT=xxxx
DB_USER=xxxx
DB_PASSWORD=xxxx
DB_DATABASE=xxxx


微信文章获取的必备环境：

# DeepseekAI API 配置 https://api-docs.deepseek.com/ 获取
DEEPSEEK_API_KEY=your_api_key

# FireCrawl 配置 https://www.firecrawl.dev/ 获取
FIRE_CRAWL_API_KEY=your_api_key

# Twitter API 配置  https://twitterapi.io/ 获取
X_API_BEARER_TOKEN=your_api_key

# 千问 https://bailian.console.aliyun.com/ 获取
DASHSCOPE_API_KEY=your_api_key

# 微信公众号配置
WEIXIN_APP_ID=your_app_id
WEIXIN_APP_SECRET=your_app_secret


可选环境:

# Bark 通知配置
BARK_KEY=your_key

# 获取图片 API 配置 https://getimg.cc/ 获取
GETIMG_API_KEY=your_api_key

TOGETHER_API_KEY=your_api_key

```

4. 启动项目

```bash
# 测试模式
npm run test

# 运行
npm run start

详细运行时间见 src\controllers\cron.ts
```

## 📦 部署指南

### 方式一：直接部署

1. 在服务器上安装 Node.js (v20+) 和 PM2

```bash
# 安装 PM2
npm install -g pm2
```

2. 构建项目

```bash
npm run build
```

3. 使用 PM2 启动服务

```bash
pm2 start dist/index.js --name ai-trend-publish
```


### CI/CD 自动部署

项目已配置 GitHub Actions 自动部署流程：

1. 推送代码到 main 分支会自动触发部署
2. 也可以在 GitHub Actions 页面手动触发部署
3. 确保在 GitHub Secrets 中配置以下环境变量：
   - `SERVER_HOST`: 服务器地址
   - `SERVER_USER`: 服务器用户名
   - `SSH_PRIVATE_KEY`: SSH 私钥
   - 其他必要的环境变量（参考 .env.example）




## 🤝 贡献指南

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'Add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 提交 Pull Request

## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=OpenAISpace/ai-trend-publish&type=Date)](https://star-history.com/#OpenAISpace/ai-trend-publish&Date)

## 📄 许可证

本项目采用 MIT 许可证 - 详见 [LICENSE](LICENSE) 文件
