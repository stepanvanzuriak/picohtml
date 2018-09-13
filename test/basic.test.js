const puppeteer = require("puppeteer");
const httpServer = require("http-server");

test(
  "renders correctly",
  async () => {
    const server = httpServer.createServer({ root: __dirname });
    server.listen(8080);

    let browser = await puppeteer.launch({ args: ["--no-sandbox"] });
    let page = await browser.newPage();

    await page.goto("http://localhost:8080/basic.html");
    await page.waitForSelector(".header");

    const html = await page.$eval(".header", e => e.innerHTML);
    expect(html).toBe("Hello planet");

    server.close();
    browser.close();
  },
  20000
);

test("onclick", async () => {
  const server = httpServer.createServer({ root: __dirname });
  server.listen(8080);

  let browser = await puppeteer.launch({ args: ["--no-sandbox"] });
  let page = await browser.newPage();

  await page.goto("http://localhost:8080/onclick.html");
  await page.click(".btn");

  const html = await page.$eval(".test", e => e.innerHTML);

  expect(html).toBe("Test");

  browser.close();
  server.close();
});
