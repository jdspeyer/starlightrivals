/**
 * Shrinks text to fit within its container width.
 */
function fitTextToContainer(el, minPx, maxPx) {
  if (!el) return;
  const parent = el.parentElement;
  if (!parent) return;

  const min = minPx || 12;
  const max = maxPx || parseFloat(getComputedStyle(el).fontSize) || 16;
  let low = min;
  let high = max;
  let best = min;

  el.style.fontSize = max + "px";

  if (el.scrollWidth <= parent.clientWidth) {
    el.style.fontSize = max + "px";
    return;
  }

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    el.style.fontSize = mid + "px";
    if (el.scrollWidth <= parent.clientWidth) {
      best = mid;
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }

  el.style.fontSize = best + "px";
}

function fitAllText() {
  document.querySelectorAll(".hero__title .line").forEach((line) => {
    const max = window.matchMedia("(max-width: 480px)").matches ? 52 : 128;
    fitTextToContainer(line, 22, max);
  });

  document.querySelectorAll(".manifesto__line").forEach((line) => {
    fitTextToContainer(line, 18, 144);
  });

  document.querySelectorAll(".section__title, .cta-final__title, .map-hero__title").forEach((el) => {
    el.style.fontSize = "";
  });
}

window.fitAllText = fitAllText;
