import express, { Request, Response } from "express";
import path from "path";
import { exec } from "child_process";
import bodyParser from "body-parser";
import { MySQLDB as MySQLDatabase } from "./utils/db/mysql.db";

const app = express();
const port = 3000;

// 确保静态资源路径正确
app.use(express.static(path.join(__dirname, "../public")));
app.use(bodyParser.json());

// 确保模板路径正确
app.get("/", (req: Request, res: Response) => {
  res.sendFile(path.resolve(__dirname, "../public/index.html"));
});

app.post('/api/run-test', (req: Request, res: Response) => {
  exec('npm run test', (error: Error | null, stdout: string, stderr: string) => {
    if (error) {
      console.error(`执行命令失败: ${error.message}`);
      return res.status(500).send('命令执行失败');
    }
    if (stderr) {
      console.error(`命令错误输出: ${stderr}`);
      return res.status(500).send('命令执行失败');
    }
    console.log(`命令输出: ${stdout}`);
    res.send('命令执行成功');
  });
});

// 查询文章
app.get('/api/articles', async (req: Request, res: Response) => {
  const keyword = req.query.keyword || '';
  try {
    const db = await MySQLDatabase.getInstance({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
    });
    const [rows] = await db.query(
      `SELECT id, category, title, content, date FROM articles WHERE title LIKE ? OR content LIKE ?`,
      [`%${keyword}%`, `%${keyword}%`]
    );
    res.json(rows);
  } catch (error) {
    console.error('查询文章失败:', error);
    res.status(500).send('查询文章失败');
  }
});

// 获取文章详情
app.get('/api/articles/:id', async (req: Request, res: Response) => {
  const articleId = req.params.id;
  try {
    const db = await MySQLDatabase.getInstance({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
    });
    const [rows] = await db.query(
      `SELECT id, category, title, content, date FROM articles WHERE id = ?`,
      [articleId]
    );
    if (rows.length === 0) {
      return res.status(404).send('文章未找到');
    }
    res.json(rows[0]);
  } catch (error) {
    console.error('获取文章详情失败:', error);
    res.status(500).send('获取文章详情失败');
  }
});

// 删除文章
app.delete('/api/articles/:id', async (req: Request, res: Response) => {
  const articleId = req.params.id;
  try {
    const db = await MySQLDatabase.getInstance({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
    });
    await db.query(`DELETE FROM articles WHERE id = ?`, [articleId]);
    res.send('文章删除成功');
  } catch (error) {
    console.error('删除文章失败:', error);
    res.status(500).send('删除文章失败');
  }
});

app.listen(port, () => {
  console.log(`服务器正在运行在 http://localhost:${port}`);
});
