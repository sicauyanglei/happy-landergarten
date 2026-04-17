// Save/Load System for Happy Landergarten
// Uses localStorage to persist game progress

/**
 * Save current game progress to localStorage
 * Saves: totalStars, game difficulties for all games, lastPlayed timestamp
 */
function SaveProgress() {
  const data = {
    totalStars: global.totalStars,
    colorGame_difficulty: global.colorGame_difficulty || 1,
    numberGame_difficulty: global.numberGame_difficulty || 1,
    shapeGame_difficulty: global.shapeGame_difficulty || 1,
    puzzleGame_difficulty: global.puzzleGame_difficulty || 1,
    musicGame_difficulty: global.musicGame_difficulty || 1,
    drawGame_difficulty: global.drawGame_difficulty || 1,
    animalGame_difficulty: global.animalGame_difficulty || 1,
    lastPlayed: new Date().toISOString()
  };
  localStorage.setItem('happyLandergarten_save', JSON.stringify(data));
  console.log('Progress saved:', data);
}

/**
 * Load game progress from localStorage
 * Restores: totalStars, game difficulties for all games
 */
function LoadProgress() {
  const saved = localStorage.getItem('happyLandergarten_save');
  if (saved) {
    try {
      const data = JSON.parse(saved);
      global.totalStars = data.totalStars || 0;
      global.colorGame_difficulty = data.colorGame_difficulty || 1;
      global.numberGame_difficulty = data.numberGame_difficulty || 1;
      global.shapeGame_difficulty = data.shapeGame_difficulty || 1;
      global.puzzleGame_difficulty = data.puzzleGame_difficulty || 1;
      global.musicGame_difficulty = data.musicGame_difficulty || 1;
      global.drawGame_difficulty = data.drawGame_difficulty || 1;
      global.animalGame_difficulty = data.animalGame_difficulty || 1;
      console.log('Progress loaded:', data);
      return true;
    } catch (e) {
      console.error('Failed to load progress:', e);
      return false;
    }
  }
  return false;
}

/**
 * Clear all saved progress
 */
function ClearProgress() {
  localStorage.removeItem('happyLandergarten_save');
  console.log('Progress cleared');
}

/**
 * Get saved progress info without loading
 */
function HasSavedProgress() {
  return localStorage.getItem('happyLandergarten_save') !== null;
}

// Auto-save timer interval (30 seconds)
let autoSaveInterval = null;

/**
 * Start auto-save timer (saves every 30 seconds)
 */
function StartAutoSave() {
  if (autoSaveInterval === null) {
    autoSaveInterval = setInterval(function() {
      SaveProgress();
    }, 30000);
    console.log('Auto-save started');
  }
}

/**
 * Stop auto-save timer
 */
function StopAutoSave() {
  if (autoSaveInterval !== null) {
    clearInterval(autoSaveInterval);
    autoSaveInterval = null;
    console.log('Auto-save stopped');
  }
}
