import {
  assetsHandler,
  defaultHandler,
  maintenanceHandler,
  stylesheetsHandler,
} from "./handlers.ts";
import { type Route, route } from "@std/http";

const routes: Route[] = [
  {
    pattern: new URLPattern({ pathname: "/" }),
    handler: maintenanceHandler,
  },
  {
    pattern: new URLPattern({ pathname: "/assets/*" }),
    handler: assetsHandler,
  },
  {
    pattern: new URLPattern({ pathname: "/stylesheets/*" }),
    handler: stylesheetsHandler,
  },
];

const handler = route(routes, defaultHandler);

export default {
  fetch(req) {
    return handler(req);
  },
} satisfies Deno.ServeDefaultExport;
