import * as cheerio from "cheerio";
import server from "./main.ts";
import { assertEquals } from "@std/assert";

const baseUrl = "https://crown.marketplace.test";

Deno.test("Non GET HTTP methods redirect to /", async () => {
  const http_methods = [
    "POST",
    "PUT",
    "PATCH",
    "DELETE",
  ];

  for (const http_method of http_methods) {
    const req = new Request(baseUrl, { method: http_method });
    const res = await server.fetch(req);

    assertEquals(res.status, 302);
    assertEquals(res.headers.get("location"), "/");
  }
});

Deno.test("Non / paths are redirected to /", async () => {
  const paths = [
    "/some/path",
    "/some/place",
    "/random-path",
  ];

  for (const path of paths) {
    const req = new Request(baseUrl + path);
    const res = await server.fetch(req);

    assertEquals(res.status, 302);
    assertEquals(res.headers.get("location"), "/");
  }
});

Deno.test("Can find manifest", async () => {
  const req = new Request(baseUrl + "/assets/manifest.json");
  const res = await server.fetch(req);

  assertEquals(res.status, 200);

  const manifest = await res.json();

  assertEquals(manifest.icons.length, 6);
});

Deno.test("Can find fonts", async () => {
  const fonts = [
    "bold-affa96571d-v2.woff",
    "bold-b542beb274-v2.woff2",
    "light-94a07e06a1-v2.woff2",
    "light-f591b13f7d-v2.woff",
  ];

  for (const font of fonts) {
    const req = new Request(baseUrl + "/assets/fonts/" + font);
    const res = await server.fetch(req);

    await res.text();

    assertEquals(res.status, 200);
  }
});

Deno.test("Can find images", async () => {
  const images = [
    "ccs-icon-180.png",
    "ccs-icon-192.png",
    "ccs-icon-512.png",
    "ccs-icon-mask.svg",
    "ccs-opengraph-image.png",
    "favicon.ico",
    "favicon.svg",
  ];

  for (const image of images) {
    const req = new Request(baseUrl + "/assets/images/" + image);
    const res = await server.fetch(req);

    await res.text();

    assertEquals(res.status, 200);
  }
});

Deno.test("Missing assets return 404", async () => {
  const paths = [
    "/assets/random.json",
    "/assets/fonts/random.woff",
    "/assets/images/random.png",
  ];

  for (const path of paths) {
    const req = new Request(baseUrl + path);
    const res = await server.fetch(req);

    assertEquals(res.status, 404);
  }
});

Deno.test("GET /", async () => {
  const req = new Request(baseUrl);
  const res = await server.fetch(req);

  assertEquals(res.status, 200);

  const $ = cheerio.load(await res.text());

  assertEquals($("h1.govuk-heading-xl").text().trim(), "Service unavailable");
  assertEquals(
    $("p.govuk-body-l:nth-child(2)").text().trim(),
    "You will be able to use the service later.",
  );
  assertEquals(
    $("p.govuk-body-l:nth-child(3)").text().trim(),
    "In the meantime please contact support at info@crowncommercial.gov.uk if you need to speak to someone, or alternatively you can view live service updates at https://status.crowncommercial.gov.uk",
  );
});
