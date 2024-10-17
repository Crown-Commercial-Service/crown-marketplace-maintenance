import { serveDir, serveFile } from "@std/http";

const defaultHandler = (_req: Request) =>
  new Response(null, { status: 302, headers: { Location: "/" } });

const maintenanceHandler = (req: Request) =>
  serveFile(req, "public/index.html");

const assetsHandler = (req: Request) =>
  serveDir(req, { fsRoot: "public/assets", urlRoot: "assets" });

const stylesheetsHandler = (req: Request) =>
  serveDir(req, { fsRoot: "public/stylesheets", urlRoot: "stylesheets" });

export {
  assetsHandler,
  defaultHandler,
  maintenanceHandler,
  stylesheetsHandler,
};
