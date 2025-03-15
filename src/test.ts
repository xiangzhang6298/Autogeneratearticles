const { WeixinWorkflow } = require("./services/weixin-article.workflow");
const { ConfigManager } = require("./utils/config/config-manager");
const { EnvConfigSource } = require("./utils/config/sources/env-config.source");
const { DbConfigSource } = require("./utils/config/sources/db-config.source");
const { MySQLDB } = require("./utils/db/mysql.db");
const { WeixinAIBenchWorkflow } = require("./services/weixin-aibench.workflow");
const { WeixinHelloGithubWorkflow } = require("./services/weixin-hellogithub.workflow");
import express, { Request, Response } from "express";
async function bootstrap() {
  const configManager = ConfigManager.getInstance();
  configManager.addSource(new EnvConfigSource());

  const db = await MySQLDB.getInstance({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  });

  configManager.addSource(new DbConfigSource(db));

  const weixinWorkflow = new WeixinWorkflow();

  await weixinWorkflow.refresh();
  await weixinWorkflow.process();

  // const weixinAIBenchWorkflow = new WeixinAIBenchWorkflow();
  // await weixinAIBenchWorkflow.refresh();
  // await weixinAIBenchWorkflow.process();

  // const weixinHelloGithubWorkflow = new WeixinHelloGithubWorkflow();
  // await weixinHelloGithubWorkflow.refresh();
  // await weixinHelloGithubWorkflow.process();
}

bootstrap().catch(console.error);
