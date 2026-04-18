const { chromium } = require('playwright');
const path = require('path');

(async () => {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();

    const filePath = 'file://' + path.resolve(__dirname, 'demo.html');
    await page.goto(filePath, { waitUntil: 'networkidle' });
    await page.waitForTimeout(1500);

    console.log('=== 场景切换测试 ===\n');

    // Check playground is visible initially
    const playgroundVisible1 = await page.$eval('#playground', el => {
        const style = window.getComputedStyle(el);
        return style.display !== 'none';
    });
    console.log('1. 初始状态 - playground显示:', playgroundVisible1 ? 'YES' : 'NO');

    // Click color game
    await page.click('[data-game="colorGame"]');
    await page.waitForTimeout(500);

    // Check playground is hidden
    const playgroundHidden = await page.$eval('#playground', el => {
        const style = window.getComputedStyle(el);
        return style.display === 'none';
    });
    console.log('2. 进入颜色游戏 - playground隐藏:', playgroundHidden ? 'YES' : 'NO');

    // Check color game is visible
    const colorGameVisible = await page.$eval('#colorGame', el => {
        const style = window.getComputedStyle(el);
        return style.display !== 'none';
    });
    console.log('3. 进入颜色游戏 - colorGame显示:', colorGameVisible ? 'YES' : 'NO');

    // Go back
    await page.click('#backBtn');
    await page.waitForTimeout(300);

    // Check playground is visible again
    const playgroundVisible2 = await page.$eval('#playground', el => {
        const style = window.getComputedStyle(el);
        return style.display !== 'none';
    });
    console.log('4. 返回主界面 - playground显示:', playgroundVisible2 ? 'YES' : 'NO');

    console.log('\n=== 结果 ===');
    if (playgroundVisible1 && playgroundHidden && colorGameVisible && playgroundVisible2) {
        console.log('场景切换测试通过！');
    } else {
        console.log('场景切换有问题！');
    }

    await browser.close();
})();
