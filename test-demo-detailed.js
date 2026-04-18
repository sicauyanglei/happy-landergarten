const { chromium } = require('playwright');
const path = require('path');

(async () => {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();

    const errors = [];

    page.on('console', msg => {
        if (msg.type() === 'error') {
            errors.push(msg.text());
        }
    });

    page.on('pageerror', err => {
        errors.push(`Page Error: ${err.message}`);
    });

    const filePath = 'file://' + path.resolve(__dirname, 'demo.html');
    await page.goto(filePath, { waitUntil: 'networkidle' });
    await page.waitForTimeout(1500);

    console.log('=== 快乐乐园 UI 测试 ===\n');

    // Test 1: Playground elements
    console.log('1. 主界面测试');
    const sun = await page.$('.sun');
    const rainbow = await page.$('.rainbow');
    const clouds = await page.$$('.cloud');
    const flowers = await page.$$('.flower');
    console.log('   - 太阳:', !!sun);
    console.log('   - 彩虹:', !!rainbow);
    console.log('   - 云朵数量:', clouds.length);
    console.log('   - 花朵数量:', flowers.length);

    // Test 2: Game cards
    console.log('\n2. 游戏卡片测试');
    const gameCards = await page.$$('.game-card');
    console.log('   - 游戏数量:', gameCards.length);

    const expectedGames = ['colorGame', 'numberGame', 'shapeGame', 'animalGame', 'puzzleGame', 'musicGame', 'drawGame'];
    for (const game of expectedGames) {
        const card = await page.$(`[data-game="${game}"]`);
        const name = await card.$eval('.game-name', el => el.textContent);
        console.log(`   - ${name}:`, !!card ? 'OK' : 'MISSING');
    }

    // Test 3: Header elements
    console.log('\n3. 顶部栏测试');
    const starCount = await page.$eval('#starCount', el => el.textContent);
    const difficulty = await page.$eval('#difficulty', el => el.textContent);
    const bgmToggle = await page.$('#bgmToggle');
    console.log('   - 星星数量:', starCount);
    console.log('   - 难度显示:', difficulty);
    console.log('   - 音乐按钮:', !!bgmToggle ? 'OK' : 'MISSING');

    // Test 4: Color Game
    console.log('\n4. 颜色游戏测试');
    await page.click('[data-game="colorGame"]');
    await page.waitForTimeout(500);
    const colorItem = await page.$('#colorItem');
    const colorOptions = await page.$$('#colorOptions .color-btn');
    console.log('   - 颜色题目:', !!colorItem ? 'OK' : 'MISSING');
    console.log('   - 选项数量:', colorOptions.length);
    await page.click('#backBtn');
    await page.waitForTimeout(300);

    // Test 5: Number Game
    console.log('\n5. 数字游戏测试');
    await page.click('[data-game="numberGame"]');
    await page.waitForTimeout(500);
    const itemsDisplay = await page.$('#itemsDisplay');
    const numberOptions = await page.$$('#numberOptions .number-btn');
    console.log('   - 物品显示:', !!itemsDisplay ? 'OK' : 'MISSING');
    console.log('   - 选项数量:', numberOptions.length);
    await page.click('#backBtn');
    await page.waitForTimeout(300);

    // Test 6: Shape Game
    console.log('\n6. 形状游戏测试');
    await page.click('[data-game="shapeGame"]');
    await page.waitForTimeout(500);
    const shapeIcon = await page.$('#shapeIcon');
    const shapeOptions = await page.$$('#shapeOptions .shape-btn');
    console.log('   - 形状图标:', !!shapeIcon ? 'OK' : 'MISSING');
    console.log('   - 选项数量:', shapeOptions.length);
    await page.click('#backBtn');
    await page.waitForTimeout(300);

    // Test 7: Animal Game
    console.log('\n7. 动物游戏测试');
    await page.click('[data-game="animalGame"]');
    await page.waitForTimeout(500);
    const speaker = await page.$('#speaker');
    const animalOptions = await page.$$('#animalOptions .animal-btn');
    console.log('   - 扬声器按钮:', !!speaker ? 'OK' : 'MISSING');
    console.log('   - 选项数量:', animalOptions.length);
    await page.click('#backBtn');
    await page.waitForTimeout(300);

    // Test 8: Puzzle Game
    console.log('\n8. 拼图游戏测试');
    await page.click('[data-game="puzzleGame"]');
    await page.waitForTimeout(500);
    const puzzleGrid = await page.$('#puzzleGrid');
    const puzzlePieces = await page.$$('#puzzleGrid .puzzle-piece');
    const puzzleOptions = await page.$$('#puzzleOptions .color-btn');
    console.log('   - 拼图网格:', !!puzzleGrid ? 'OK' : 'MISSING');
    console.log('   - 图案数量:', puzzlePieces.length);
    console.log('   - 选项数量:', puzzleOptions.length);
    await page.click('#backBtn');
    await page.waitForTimeout(300);

    // Test 9: Music Game
    console.log('\n9. 音乐游戏测试');
    await page.click('[data-game="musicGame"]');
    await page.waitForTimeout(500);
    const piano = await page.$('#piano');
    const pianoKeys = await page.$$('#piano .piano-key');
    const musicTarget = await page.$('#musicTarget');
    console.log('   - 钢琴:', !!piano ? 'OK' : 'MISSING');
    console.log('   - 琴键数量:', pianoKeys.length);
    console.log('   - 目标音符:', !!musicTarget ? 'OK' : 'MISSING');
    await page.click('#backBtn');
    await page.waitForTimeout(300);

    // Test 10: Drawing Game
    console.log('\n10. 画画游戏测试');
    await page.click('[data-game="drawGame"]');
    await page.waitForTimeout(500);
    const canvas = await page.$('#drawCanvas');
    const colorPicker = await page.$('#colorPicker');
    const brushSize = await page.$('#brushSize');
    const eraserBtn = await page.$('#eraserBtn');
    const clearBtn = await page.$('#clearBtn');
    console.log('   - 画布:', !!canvas ? 'OK' : 'MISSING');
    console.log('   - 颜色选择:', !!colorPicker ? 'OK' : 'MISSING');
    console.log('   - 笔刷大小:', !!brushSize ? 'OK' : 'MISSING');
    console.log('   - 橡皮擦:', !!eraserBtn ? 'OK' : 'MISSING');
    console.log('   - 清空按钮:', !!clearBtn ? 'OK' : 'MISSING');
    await page.click('#backBtn');
    await page.waitForTimeout(300);

    // Summary
    console.log('\n=== 测试结果 ===');
    if (errors.length === 0) {
        console.log('所有测试通过！无错误。');
    } else {
        console.log('发现错误:');
        errors.forEach(e => console.log('  -', e));
    }

    await browser.close();
    process.exit(errors.length > 0 ? 1 : 0);
})();
