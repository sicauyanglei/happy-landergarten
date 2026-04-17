// Particle Effects for Happy Landergarten
// Provides star burst and other particle effects using pooled sprites

/**
 * Spawn a burst of star particles at the given position
 * @param {number} x - X coordinate of burst origin
 * @param {number} y - Y coordinate of burst origin
 * @param {number} count - Number of stars to spawn
 */
function SpawnStarBurst(x, y, count) {
  for (let i = 0; i < count; i++) {
    const star = runtime.objects["particleStar" + (i + 1)];
    if (star && !star.isVisible()) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 50 + Math.random() * 100;
      const vx = Math.cos(angle) * speed;
      const vy = Math.sin(angle) * speed;

      star.setX(x);
      star.setY(y);
      star.opacity = 100;
      star.setVisible(true);

      // Animate the star outward and fade
      const duration = 0.5 + Math.random() * 0.5;
      const targetX = x + vx * 0.5;
      const targetY = y + vy * 0.5;

      const tween = star.getBehavior("Tween");
      if (tween) {
        tween.moveTo(targetX, targetY, duration, "EaseOutQuad");
        tween.fadeOut(duration, "EaseInQuad", (obj) => {
          obj.setVisible(false);
        });
      } else {
        // Fallback if no Tween behavior - just hide after delay
        setTimeout(() => {
          star.setVisible(false);
        }, duration * 1000);
      }
    }
  }
}

/**
 * Spawn a burst of star particles at the correct answer button position
 * This version uses the button position for more dramatic effect
 * @param {number} x - X coordinate
 * @param {number} y - Y coordinate
 * @param {number} count - Number of stars
 */
function SpawnStarBurstAtPosition(x, y, count) {
  SpawnStarBurst(x, y, count);
}
