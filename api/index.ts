// api/index.ts
import app from "../src/server";
import { createServer } from "aws-serverless-express";

let server: any;

function getServer() {
  if (!server) {
    server = createServer(app);
  }
  return server;
}

export default function handler(req: any, res: any) {
  return getServer()(req, res);
}