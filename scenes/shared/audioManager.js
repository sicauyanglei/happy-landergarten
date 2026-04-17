// Audio Manager for Happy Landergarten
// Provides unified sound effect and BGM management

/**
 * AudioManager - Centralized audio playback for the game
 *
 * Sound effects expected in: assets/sounds/sfx/
 * - correct.ogg   - Played when player answers correctly
 * - wrong.ogg     - Played when player answers incorrectly
 * - levelup.ogg   - Played when player levels up
 * - click.ogg     - Played on button clicks
 *
 * Background music expected in: assets/sounds/bgm/
 * - (any .ogg file passed to playBGM)
 */
const AudioManager = {
  bgmPlaying: false,
  currentBGM: null,

  /**
   * Play background music (loops, only one instance)
   * @param {string} name - BGM filename without extension (looks in assets/sounds/bgm/)
   */
  playBGM(name) {
    if (!this.bgmPlaying || this.currentBGM === null) {
      this.currentBGM = new Audio('assets/sounds/bgm/' + name + '.ogg');
      this.currentBGM.loop = true;
      this.currentBGM.volume = 0.5;
      this.currentBGM.play().catch(e => console.warn('BGM play failed:', e));
      this.bgmPlaying = true;
    }
  },

  /**
   * Play a sound effect (one-shot, can overlap)
   * @param {string} name - SFX filename without extension (looks in assets/sounds/sfx/)
   */
  playSFX(name) {
    const audio = new Audio('assets/sounds/sfx/' + name + '.ogg');
    audio.volume = 0.7;
    audio.play().catch(e => console.warn('SFX play failed:', e));
  },

  /**
   * Stop the currently playing background music
   */
  stopBGM() {
    if (this.currentBGM) {
      this.currentBGM.pause();
      this.currentBGM.currentTime = 0;
      this.currentBGM = null;
    }
    this.bgmPlaying = false;
  }
};
