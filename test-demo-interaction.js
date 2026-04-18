const { chromium } = require('playwright');
const path = require('path');

(async () => {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();

    const errors = [];
    page.on('console', msg => {
        if (msg.type() === 'error') errors.push(msg.text());
    });
    page.on('pageerror', err => errors.push(err.message));

    const filePath = 'file://' + path.resolve(__dirname, 'demo.html');
    await page.goto(filePath, { waitUntil: 'networkidle' });
    await page.waitForTimeout(1500);

    console.log('=== 游戏交互测试 ===\n');

    // Test Color Game Answer
    console.log('1. 颜色游戏 - 点击答题');
    await page.click('[data-game="colorGame"]');
    await page.waitForTimeout(500);
    const colorBtns = await page.$$('#colorOptions .color-btn');
    if (colorBtns.length > 0) {
        await colorBtns[0].click();
        await page.waitForTimeout(1500);
        const feedback = await page.$('.feedback.show');
        console.log('   - 答题反馈:', feedback ? '显示' : '未显示(可能已消失)');
    }
    await page.click('#backBtn');
    await page.waitForTimeout(300);

    // Test Number Game Answer
    console.log('\n2. 数字游戏 - 点击答题');
    await page.click('[data-game="numberGame"]');
    await page.waitForTimeout(500);
    const numberBtns = await page.$$('#numberOptions .number-btn');
    if (numberBtns.length > 0) {
        await numberBtns[0].click();
        await page.waitForTimeout(1500);
    }
    console.log('   - 答题完成');
    await page.click('#backBtn');
    await page.waitForTimeout(300);

    // Test Shape Game Answer
    console.log('\n3. 形状游戏 - 点击答题');
    await page.click('[data-game="shapeGame"]');
    await page.waitForTimeout(500);
    const shapeBtns = await page.$$('#shapeOptions .shape-btn');
    if (shapeBtns.length > 0) {
        await shapeBtns[0].click();
        await page.waitForTimeout(1500);
    }
    console.log('   - 答题完成');
    await page.click('#backBtn');
    await page.waitForTimeout(300);

    // Test Animal Game Sound
    console.log('\n4. 动物游戏 - 测试声音');
    await page.click('[data-game="animalGame"]');
    await page.waitForTimeout(500);
    const speaker = await page.$('#speaker');
    if (speaker) {
        await speaker.click();
        console.log('   - 点击扬声器: OK');
    }
    await page.click('#backBtn');
    await page.waitForTimeout(300);

    // Test Puzzle Game
    console.log('\n5. 拼图游戏 - 点击图案');
    await page.click('[data-game="puzzleGame"]');
    await page.waitForTimeout(500);
    const puzzlePieces = await page.$$('#puzzleGrid .puzzle-piece');
    if (puzzlePieces.length > 0) {
        await puzzlePieces[0].click();
        await page.waitForTimeout(1500);
    }
    console.log('   - 选择图案完成');
    await page.click('#backBtn');
    await page.waitForTimeout(300);

    // Test Music Game Piano Keys
    console.log('\n6. 音乐游戏 - 点击琴键');
    await page.click('[data-game="musicGame"]');
    await page.waitForTimeout(500);
    const pianoKeys = await page.$$('#piano .piano-key');
    if (pianoKeys.length > 0) {
        await pianoKeys[0].click();
        console.log('   - 点击琴键: OK');
    }
    await page.click('#backBtn');
    await page.waitForTimeout(300);

    // Test Drawing Canvas
    console.log('\n7. 画画游戏 - 画布交互');
    await page.click('[data-game="drawGame"]');
    await page.waitForTimeout(500);
    const canvas = await page.$('#drawCanvas');
    if (canvas) {
        const box = await canvas.boundingBox();
        await page.mouse.move(box.x + 50, box.y + 50);
        await page.mouse.down();
        await page.mouse.move(box.x + 100, box.y + 100);
        await page.mouse.up();
        console.log('   - 画布绘画: OK');
    }
    const clearBtn = await page.$('#clearBtn');
    if (clearBtn) {
        await clearBtn.click();
        console.log('   - 清空画布: OK');
    }
    await page.click('#backBtn');
    await page.waitForTimeout(300);

    // Test BGM Toggle
    console.log('\n8. 背景音乐切换');
    const bgmToggle = await page.$('#bgmToggle');
    if (bgmToggle) {
        await bgmToggle.click();
        console.log('   - 音乐切换: OK');
        await bgmToggle.click();
        console.log('   - 音乐恢复: OK');
    }

    // Final check for errors
    console.log('\n=== 交互测试结果 ===');
    if (errors.length === 0) {
        console.log('所有交互测试通过！');
    } else {
        console.log('发现错误:');
        errors.forEach(e => console.log('  -', e));
    }

    await browser.close();
    process.exit(errors.length > 0 ? 1 : 0);
})();
