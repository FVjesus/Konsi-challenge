const puppeter = require('puppeteer');

let browser;



module.exports = async function crawler(document, user, password) {
  if (!browser) {
    browser = await puppeter.launch({
      headless: true,
    });
  }

  const page = await browser.newPage();

  await page.goto('http://extratoclube.com.br/');

  const contentFrame = await (await page.$('html > frameset > frame')).contentFrame();

  await contentFrame.waitForSelector('[id=user]', { visible: true });

  await contentFrame.type('[id=user]', user);
  await contentFrame.type('[id=pass]', password);

  await contentFrame.click('#botao');

  await contentFrame.waitForSelector('#ion-overlay-1 > div.modal-wrapper.ion-overlay-wrapper.sc-ion-modal-md > app-modal-fila > ion-button', { visible: true });

  await contentFrame.click('#ion-overlay-1 > div.modal-wrapper.ion-overlay-wrapper.sc-ion-modal-md > app-modal-fila > ion-button');

  await contentFrame.waitForSelector('body > app-root > app-home > ion-app > ion-menu > ion-content > ion-list > ion-item:nth-child(2)', { visible: true });

  await contentFrame.click('body > app-root > app-home > ion-app > ion-menu > ion-content > ion-list > ion-item:nth-child(2)')


  await contentFrame.waitForSelector('#extratoonline > ion-row:nth-child(2) > ion-col > ion-card > ion-button.ion-color.ion-color-warning.md.button.button-full.button-solid.ion-activatable.ion-focusable.hydrated', { visible: true });

  await contentFrame.click('#extratoonline > ion-row:nth-child(2) > ion-col > ion-card > ion-button.ion-color.ion-color-warning.md.button.button-full.button-solid.ion-activatable.ion-focusable.hydrated');

  await contentFrame.waitForSelector('#extratoonline > ion-row:nth-child(2) > ion-col > ion-card > ion-button:nth-child(11)', { visible: true });

  await contentFrame.$eval(`#extratoonline > ion-row:nth-child(2) > ion-col > ion-card > ion-button:nth-child(11)`, element =>
    element.click()
  );

  await contentFrame.waitForSelector('#extratoonline > ion-row:nth-child(2) > ion-col > ion-card > ion-grid > ion-row:nth-child(2) > ion-col > ion-card > ion-item > ion-input > input', { visible: true });

  await contentFrame.type('#extratoonline > ion-row:nth-child(2) > ion-col > ion-card > ion-grid > ion-row:nth-child(2) > ion-col > ion-card > ion-item > ion-input > input', document);

  await page.waitForTimeout(1000);

  await contentFrame.waitForSelector("#extratoonline > ion-row:nth-child(2) > ion-col > ion-card > ion-grid > ion-row:nth-child(2) > ion-col > ion-card > ion-button").then((e) => {
    e.click();
  });

  await page.waitForTimeout(3000);

  const text = await contentFrame.$(
    `#extratoonline > ion-row:nth-child(2) > ion-col > ion-card > ion-grid > ion-row:nth-child(2)`
  )

  const textContent = await text.evaluate((e) => e.innerText);

  await page.close();

  const response = textContent.split('\n');

  response.shift();

  return response;
}