const { generateText, checkAndGenerate } = require("./util"); //native by jest

const puppet = require("puppeteer");

//unit
test("should output name and age", () => {
  const text = generateText("setu", 22);
  expect(text).toBe(`setu (22 years old)`);
});

//integaation

test("should genrate valid text", () => {
  const text = checkAndGenerate("max", 29);
  expect(text).toBe(`max (29 years old)`);
});

//e2e
test("e2e", async () => {
  const browser = await puppet.launch({
    headless: false,
    slowMo: 80,
    args: ["---window-size=1920,1080"],
  });
  const page = await browser.newPage();
  await page.goto("http://127.0.0.1:5500/index.html");
  await page.click("input#name");
  await page.type("input#name", "Anna");
  await page.click("input#age");
  await page.type("input#age", "28");
  await page.click("#btnAddUser");
  const finaltext = await page.$eval(".user-item", (el) => {
    return el.textContent;
  });
  expect(finaltext).toBe(`Anna (28 years old)`);
}, 15000);
