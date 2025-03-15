async function loadArticlesContent() {
  try {
    const response = await fetch('/articles.html');
    const articlesHtml = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(articlesHtml, 'text/html');
    const content = doc.querySelector('.search-container').outerHTML + doc.querySelector('table').outerHTML; // 获取内容部分
    contentContainer.innerHTML = content; // 替换内容区域
  } catch (error) {
    console.error('加载文章页面失败:', error);
    contentContainer.innerHTML = `<p>加载文章页面失败，请稍后重试。</p>`;
  }
}
