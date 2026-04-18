const { chromium } = require('playwright');
const path = require('path');

(async () => {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();

    const errors = [];
    const logs = [];

    page.on('console', msg => {
        if (msg.type() === 'error') {
            errors.push(msg.text());
        }
        logs.push(`[${msg.type()}] ${msg.text()}`);
    });

    page.on('pageerror', err => {
        errors.push(`Page Error: ${err.message}`);
    });

    const filePath = 'file://' + path.resolve(__dirname, 'demo.html');
    console.log('Loading:', filePath);

    await page.goto(filePath, { waitUntil: 'networkidle' });

    // Wait for loading to disappear
    await page.waitForTimeout(2000);

    // Check if game container exists
    const container = await page.$('#game-container');
    console.log('Game container exists:', !!container);

    // Check if playground is visible
    const playground = await page.$('#playground.active');
    console.log('Playground is active:', !!playground);

    // Check game cards count
    const gameCards = await page.$$('.game-card');
    console.log('Game cards count:', gameCards.length);

    // Click each game card and verify scene switches
    const games = ['colorGame', 'numberGame', 'shapeGame', 'animalGame', 'puzzleGame', 'musicGame', 'drawGame'];

    for (const game of games) {
        try {
            await page.click(`[data-game="${game}"]`);
            await page.waitForTimeout(500);
            const scene = await page.$(`#${game}.active`);
            console.log(`${game} loads:`, !!scene);

            // Go back
            await page.click('#backBtn');
            await page.waitForTimeout(300);
        } catch (e) {
            console.log(`${game} error:`, e.message);
        }
    }

    console.log('\n=== Console Errors ===');
    if (errors.length === 0) {
        console.log('No errors found!');
    } else {
        errors.forEach(e => console.log('ERROR:', e));
    }

    await browser.close();

    process.exit(errors.length > 0 ? 1 : 0);
})();
