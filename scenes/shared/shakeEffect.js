// Button shake effect - simulates vibration by rapidly moving left and right
// Used when player selects wrong answer

/**
 * Shake a button to indicate wrong answer
 * @param {string} buttonName - Name of the button object to shake
 */
function ShakeButton(buttonName) {
  const obj = runtime.objects[buttonName];
  if (!obj || obj.getInstancesCount() === 0) {
    return;
  }

  const instance = obj.getInstances()[0];
  const originalX = instance.getX();
  const shakeOffset = 8;
  const shakeCount = 4;
  const delay = 40; // ms between shakes

  let shakeIndex = 0;

  function doShake() {
    if (shakeIndex >= shakeCount * 2) {
      // End shake - return to original position
      instance.setX(originalX);
      return;
    }

    // Alternate between left and right offset
    const offset = (shakeIndex % 2 === 0) ? -shakeOffset : shakeOffset;
    instance.setX(originalX + offset);
    shakeIndex++;

    setTimeout(doShake, delay);
  }

  doShake();
}
