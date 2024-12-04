const parallaxContainer = document.getElementById("parallax-container");
const snowflakeContainer = document.getElementById("snowflakes");
const snowflakeTemplate = document.getElementById("snowflake-template");

function random(min, max) {
  return min + Math.random() * (max - min)
}

function makeSnowflakes(numSnowflakes) {
  const snowflakes = [];

  for (let i = 0; i < numSnowflakes; i++) {
    const clone = snowflakeTemplate.content.cloneNode(true);
    const snowflake = clone.querySelector("img");

    const size = `${random(8, 12)}px`;
    snowflake.style.width = size;
    snowflake.style.height = size;
    snowflake.style.opacity = random(0.7, 0.9);

    snowflakes.push(snowflake);
    snowflakeContainer.appendChild(clone);
  }

  return snowflakes;
}

function updateSnowflakes(snowflakes) {
  for (const snowflake of snowflakes) {
    const computedStyle = window.getComputedStyle(snowflake);
    const slope = computedStyle.getPropertyValue("--snowflake-slope");
    // In vh units
    const topCornerIntercept = -(slope * window.innerWidth / window.innerHeight * 100);

    // y-intercept of the line the snowflake will follow
    const intercept = `${random(topCornerIntercept, 100)}vh`;
    snowflake.style.setProperty("--snowflake-intercept", intercept);

    // CSS calculates the hypotenuse of the line and stores it in max-width to be calculated
    const hypot = parseFloat(computedStyle.getPropertyValue("max-width"));
    snowflake.style.animationDuration = `calc(${random(7, 12)}s * ${hypot / 2000})`;
    snowflake.style.animationDelay = `${random(0, 4)}s`;
  }
}

const snowflakes = makeSnowflakes(300);
updateSnowflakes(snowflakes);

window.addEventListener('resize', function () {
  updateSnowflakes(snowflakes);
});
