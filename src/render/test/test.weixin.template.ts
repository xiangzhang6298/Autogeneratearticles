import fs from "fs";
import path from "path";
import { WeixinTemplateRenderer } from "../weixin/renderer";
import { WeixinTemplate } from "../interfaces/template.interface";
import { formatDate } from "../../utils/common";

// 生成示例HTML预览
const previewArticles: WeixinTemplate[] = [
  {
    id: "1",
    title: "人工智能发展最新突破：GPT-4展现多模态能力",
    content: `当你使用一个库时，它能够“即插即用”，这背后往往隐藏着一位工程师付出的巨大努力。编写高质量的技术文档是一项耗时且需要高度专业技能的工作。这些文档不仅包括了详细的API说明、示例代码和常见问题解答，还可能涵盖了一些最佳实践和性能优化建议。<next_paragraph/>在软件开发领域，良好的文档可以显著提高开发效率，减少因理解错误导致的bug。对于开源项目来说，优质的文档更是吸引贡献者和用户的关键因素之一。很多工程师在完成核心功能开发后，会花费大量时间来完善相关文档，以确保其他开发者能够快速上手并充分利用该库的功能。<next_paragraph/>这种对细节的关注和对用户体验的重视体现了工程师的专业精神。虽然编写文档的过程可能是枯燥乏味的，但其带来的长期收益却非常可观。因此，当下次你在享受某个库带来的便利时，请记得感谢那些默默无闻地为良好文档而努力工作的工程师们。`,
    url: "https://example.com/gpt4-breakthrough",
    publishDate: formatDate(new Date().toISOString()),
    keywords: ["GPT-4", "人工智能", "多模态", "OpenAI"],
    metadata: {
      author: "AI研究员",
      readTime: "5分钟",
    },
  }
];

// 渲染并保存预览文件
const renderer = new WeixinTemplateRenderer();
const html = renderer.render(previewArticles);

// 确保temp目录存在
const tempDir = path.join(__dirname, "../../../temp");
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir, { recursive: true });
}

// 保存渲染结果
const outputPath = path.join(tempDir, "preview_weixin.html");
fs.writeFileSync(outputPath, html, "utf-8");
console.log(`预览文件已生成：${outputPath}`);
