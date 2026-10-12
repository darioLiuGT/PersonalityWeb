const progressBar = document.getElementById("scroll-progress");
const posterFrame = document.getElementById("poster-frame");
const privateEntryElement = document.querySelector("[data-private-entry]");
const privateGate = document.querySelector("[data-private-gate]");
const privateGateForm = document.getElementById("private-gate-form");
const privatePasswordInput = document.getElementById("private-password");
const privateGateMessage = document.getElementById("private-gate-message");
const privateProtected = document.getElementById("private-protected");
const chapterIndicator = document.getElementById("chapter-indicator");
const chapterIndicatorTitle = document.getElementById("chapter-indicator-title");
const chapterIndicatorKicker = document.getElementById("chapter-indicator-kicker");
const neonCanvas = document.getElementById("neon-canvas");
const PRIVATE_ENTRY_THRESHOLD = 5;
const PRIVATE_ENTRY_WINDOW_MS = 3200;
const PRIVATE_ENTRY_DESTINATION = atob("YXRlbGllci5odG1s");
const PRIVATE_ARCHIVE_PAYLOAD = {
  salt: "wXax3g5yoi1rulpWjjkwcw==",
  iv: "/UmphcfIpXpK0mGV",
  ciphertext:
    "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"
};

function isWithinInitialViewport(element) {
  const rect = element.getBoundingClientRect();
  return rect.top < window.innerHeight * 0.9 && rect.bottom > 0;
}

function observeReveals() {
  const revealElements = Array.from(document.querySelectorAll(".reveal"));

  revealElements.forEach((element) => {
    if (isWithinInitialViewport(element)) {
      element.classList.add("is-visible");
    }
  });

  if (!("IntersectionObserver" in window)) {
    revealElements.forEach((element) => element.classList.add("is-visible"));
    return;
  }

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -10% 0px"
    }
  );

  revealElements
    .filter((element) => !element.classList.contains("is-visible"))
    .forEach((element) => revealObserver.observe(element));
}

function observeActiveLinks() {
  const navLinks = Array.from(document.querySelectorAll(".site-nav a"));
  const isHomePage = document.body.classList.contains("page-home");
  const sectionTargets = navLinks
    .map((link) => {
      const href = link.getAttribute("href");
      if (href && href.startsWith("#")) {
        return document.querySelector(href);
      }

      // Home is a document link for resilient cross-page navigation, but on the
      // homepage it should behave like the other section-aware navigation items.
      if (isHomePage && href === "index.html") {
        return document.querySelector(".hero-home");
      }

      return null;
    })
    .filter(Boolean);

  if (!sectionTargets.length || !("IntersectionObserver" in window)) {
    return;
  }

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        navLinks.forEach((link) => {
          const href = link.getAttribute("href");
          const matches =
            href === `#${entry.target.id}` ||
            (entry.target.classList.contains("hero-home") && href === "index.html");
          link.classList.toggle("is-active", matches);

          if (matches) {
            link.setAttribute("aria-current", "page");
          } else {
            link.removeAttribute("aria-current");
          }
        });
      });
    },
    {
      rootMargin: "-35% 0px -45% 0px",
      threshold: 0.12
    }
  );

  sectionTargets.forEach((section) => sectionObserver.observe(section));
}

function updateScrollProgress() {
  if (!progressBar) {
    if (chapterIndicator) {
      chapterIndicator.classList.toggle("is-visible", window.scrollY > 100);
    }
    return;
  }

  const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollableHeight > 0 ? (window.scrollY / scrollableHeight) * 100 : 0;
  progressBar.style.width = `${Math.min(progress, 100)}%`;

  if (chapterIndicator) {
    chapterIndicator.classList.toggle("is-visible", window.scrollY > 100);
  }
}

function hexToRgba(hexColor, alpha) {
  const normalized = hexColor.replace("#", "").trim();

  if (normalized.length !== 6) {
    return `rgba(44, 133, 200, ${alpha})`;
  }

  const red = parseInt(normalized.slice(0, 2), 16);
  const green = parseInt(normalized.slice(2, 4), 16);
  const blue = parseInt(normalized.slice(4, 6), 16);
  return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
}

function updateActiveChapter(section) {
  if (!section) {
    return;
  }

  const sections = Array.from(document.querySelectorAll(".section[data-chapter-title]"));
  sections.forEach((item) => {
    const isActive = item === section;
    item.classList.toggle("is-active-chapter", isActive);
    item.classList.toggle("is-inactive-chapter", !isActive);
  });

  if (chapterIndicatorTitle) {
    chapterIndicatorTitle.textContent = section.dataset.chapterTitle || "";
  }

  if (chapterIndicatorKicker) {
    chapterIndicatorKicker.textContent = section.dataset.chapterKicker || "";
  }

  const accent = section.dataset.chapterAccent || "#2c85c8";
  document.documentElement.style.setProperty("--chapter-accent", accent);
}

function observeChapters() {
  const chapterSections = Array.from(document.querySelectorAll(".section[data-chapter-title]"));

  if (!chapterSections.length) {
    return;
  }

  let currentSection = chapterSections[0];

  function refreshChapterFromViewport() {
    const viewportCenter = window.innerHeight * 0.42;
    const nextSection =
      chapterSections.reduce((bestSection, section) => {
        const rect = section.getBoundingClientRect();
        const sectionCenter = rect.top + rect.height / 2;
        const bestRect = bestSection.getBoundingClientRect();
        const bestCenter = bestRect.top + bestRect.height / 2;
        return Math.abs(sectionCenter - viewportCenter) < Math.abs(bestCenter - viewportCenter)
          ? section
          : bestSection;
      }, currentSection) || currentSection;

    if (nextSection && nextSection !== currentSection) {
      currentSection = nextSection;
    }

    updateActiveChapter(currentSection);
  }

  refreshChapterFromViewport();

  if (!("IntersectionObserver" in window)) {
    window.addEventListener("scroll", refreshChapterFromViewport, { passive: true });
    window.addEventListener("resize", refreshChapterFromViewport);
    return;
  }

  const chapterObserver = new IntersectionObserver(
    () => {
      refreshChapterFromViewport();
    },
    {
      threshold: [0.12, 0.28, 0.45, 0.68],
      rootMargin: "-12% 0px -28% 0px"
    }
  );

  chapterSections.forEach((section) => chapterObserver.observe(section));
  window.addEventListener("scroll", refreshChapterFromViewport, { passive: true });
  window.addEventListener("resize", refreshChapterFromViewport);
}

function setPosterSheen(event) {
  if (!posterFrame) {
    return;
  }

  const rect = posterFrame.getBoundingClientRect();
  const relativeX = (event.clientX - rect.left) / rect.width;
  const relativeY = (event.clientY - rect.top) / rect.height;
  const x = relativeX * 100;
  const y = relativeY * 100;
  const rotateY = (relativeX - 0.5) * 6;
  const rotateX = (0.5 - relativeY) * 6;
  posterFrame.style.setProperty("--sheen-x", `${x}%`);
  posterFrame.style.setProperty("--sheen-y", `${y}%`);
  posterFrame.style.setProperty("--poster-rotate-x", `${rotateX.toFixed(2)}deg`);
  posterFrame.style.setProperty("--poster-rotate-y", `${rotateY.toFixed(2)}deg`);
}

function resetPosterSheen() {
  if (!posterFrame) {
    return;
  }

  posterFrame.style.setProperty("--sheen-x", "50%");
  posterFrame.style.setProperty("--sheen-y", "35%");
  posterFrame.style.setProperty("--poster-rotate-x", "0deg");
  posterFrame.style.setProperty("--poster-rotate-y", "0deg");
}

function initializeExhibitionTilt() {
  const supportsFinePointer = window.matchMedia && window.matchMedia("(pointer: fine)").matches;
  const prefersReducedMotion =
    window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!supportsFinePointer || prefersReducedMotion) {
    return;
  }

  document.querySelectorAll(".research-showcase, .ux-work-card").forEach((card) => {
    card.addEventListener("pointermove", (event) => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;
      const rotateY = (x - 0.5) * 6;
      const rotateX = (0.5 - y) * 6;

      card.style.setProperty("--tilt-x", `${rotateX.toFixed(2)}deg`);
      card.style.setProperty("--tilt-y", `${rotateY.toFixed(2)}deg`);
      card.style.setProperty("--edge-x", `${(x * 100).toFixed(1)}%`);
      card.style.setProperty("--edge-y", `${(y * 100).toFixed(1)}%`);
    });

    card.addEventListener("pointerleave", () => {
      card.style.setProperty("--tilt-x", "0deg");
      card.style.setProperty("--tilt-y", "0deg");
      card.style.setProperty("--edge-x", "50%");
      card.style.setProperty("--edge-y", "50%");
    });
  });
}

function setPrivateGateMessage(message, state = "") {
  if (!privateGateMessage) {
    return;
  }

  privateGateMessage.textContent = message;
  privateGateMessage.classList.remove("is-error", "is-success");

  if (state) {
    privateGateMessage.classList.add(state);
  }
}

function bytesFromBase64(base64Value) {
  return Uint8Array.from(atob(base64Value), (character) => character.charCodeAt(0));
}

async function derivePrivateKey(password, saltBytes) {
  const passwordKey = await window.crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(password),
    "PBKDF2",
    false,
    ["deriveKey"]
  );

  return window.crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: saltBytes,
      iterations: 120000,
      hash: "SHA-256"
    },
    passwordKey,
    {
      name: "AES-GCM",
      length: 256
    },
    false,
    ["decrypt"]
  );
}

async function decryptPrivateHtml(password) {
  if (!window.crypto || !window.crypto.subtle) {
    return null;
  }

  try {
    const saltBytes = bytesFromBase64(PRIVATE_ARCHIVE_PAYLOAD.salt);
    const ivBytes = bytesFromBase64(PRIVATE_ARCHIVE_PAYLOAD.iv);
    const encryptedBytes = bytesFromBase64(PRIVATE_ARCHIVE_PAYLOAD.ciphertext);
    const key = await derivePrivateKey(password, saltBytes);
    const decryptedBuffer = await window.crypto.subtle.decrypt(
      {
        name: "AES-GCM",
        iv: ivBytes
      },
      key,
      encryptedBytes
    );

    return new TextDecoder().decode(decryptedBuffer);
  } catch {
    return null;
  }
}

function revealPrivateProtectedContent(html) {
  if (!privateProtected) {
    return;
  }

  if (html && !privateProtected.dataset.loaded) {
    privateProtected.innerHTML = html;
    privateProtected.dataset.loaded = "true";
  }

  privateProtected.hidden = false;
  privateProtected.setAttribute("aria-hidden", "false");
  observeReveals();
  updateScrollProgress();
}

async function handlePrivateUnlock(event) {
  event.preventDefault();

  if (!privatePasswordInput) {
    return;
  }

  const enteredValue = privatePasswordInput.value.trim();

  if (!enteredValue) {
    setPrivateGateMessage("Enter the access code first.", "is-error");
    privatePasswordInput.focus();
    return;
  }

  if (!window.crypto || !window.crypto.subtle) {
    setPrivateGateMessage("This browser cannot verify the access code.", "is-error");
    return;
  }

  const decryptedHtml = await decryptPrivateHtml(enteredValue);

  if (!decryptedHtml) {
    setPrivateGateMessage("That access code is incorrect.", "is-error");
    privatePasswordInput.select();
    return;
  }

  setPrivateGateMessage("Unlocked. The results board is now visible below.", "is-success");
  privatePasswordInput.value = "";
  revealPrivateProtectedContent(decryptedHtml);
}

function initializePrivateGate() {
  if (!privateGate || !privateProtected || !privateGateForm) {
    return;
  }

  privateGateForm.addEventListener("submit", handlePrivateUnlock);
}

function initializePrivateEntry() {
  if (!privateEntryElement) {
    return;
  }

  const destination = PRIVATE_ENTRY_DESTINATION;

  if (!destination) {
    return;
  }

  let activationCount = 0;
  let activationWindowStart = 0;

  privateEntryElement.addEventListener("click", (event) => {
    if (event.target instanceof Element && event.target.closest("a, button, input, textarea, select")) {
      return;
    }

    const now = Date.now();

    if (now - activationWindowStart > PRIVATE_ENTRY_WINDOW_MS) {
      activationCount = 0;
      activationWindowStart = now;
    }

    activationCount += 1;

    if (activationCount >= PRIVATE_ENTRY_THRESHOLD) {
      window.location.href = destination;
    }
  });
}

function initializeNeonCanvas() {
  if (!neonCanvas) {
    return;
  }

  const context = neonCanvas.getContext("2d");

  if (!context) {
    return;
  }

  const prefersReducedMotion =
    window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const state = {
    dpr: Math.min(window.devicePixelRatio || 1, 2),
    width: 0,
    height: 0,
    pointerX: 0.72,
    pointerY: 0.64,
    targetX: 0.72,
    targetY: 0.64,
    scrollY: window.scrollY,
    stars: []
  };

  function seedStars() {
    const starCount = Math.max(36, Math.round((state.width * state.height) / 28000));
    state.stars = Array.from({ length: starCount }, () => ({
      x: Math.random(),
      y: Math.random() * 0.82,
      size: Math.random() * 1.8 + 0.2,
      alpha: Math.random() * 0.55 + 0.15,
      drift: Math.random() * Math.PI * 2
    }));
  }

  function resizeCanvas() {
    state.dpr = Math.min(window.devicePixelRatio || 1, 2);
    state.width = window.innerWidth;
    state.height = window.innerHeight;
    neonCanvas.width = Math.round(state.width * state.dpr);
    neonCanvas.height = Math.round(state.height * state.dpr);
    neonCanvas.style.width = `${state.width}px`;
    neonCanvas.style.height = `${state.height}px`;
    context.setTransform(state.dpr, 0, 0, state.dpr, 0, 0);
    seedStars();
  }

  function drawSkyGlow(accentColor) {
    const horizon = state.height * 0.64 - Math.min(state.scrollY * 0.035, 52);
    const sunX = state.width * (0.72 + (state.pointerX - 0.5) * 0.08);
    const sunY = horizon + state.height * 0.08 + (state.pointerY - 0.5) * 28;

    const glow = context.createRadialGradient(sunX, sunY, 0, sunX, sunY, state.height * 0.33);
    glow.addColorStop(0, hexToRgba(accentColor, 0.52));
    glow.addColorStop(0.28, hexToRgba(accentColor, 0.18));
    glow.addColorStop(1, "rgba(0, 0, 0, 0)");
    context.fillStyle = glow;
    context.fillRect(0, 0, state.width, state.height);

    context.strokeStyle = hexToRgba(accentColor, 0.2);
    context.lineWidth = 1;
    context.beginPath();
    context.moveTo(0, horizon);
    context.lineTo(state.width, horizon);
    context.stroke();

    return { horizon, sunX };
  }

  function drawGrid({ horizon, sunX }, accentColor) {
    context.save();
    context.lineWidth = 1;
    context.strokeStyle = hexToRgba(accentColor, 0.16);

    for (let index = 0; index < 16; index += 1) {
      const progress = index / 15;
      const y = horizon + Math.pow(progress, 1.65) * (state.height - horizon + 60);
      const lineAlpha = 0.2 - progress * 0.11;
      context.strokeStyle = hexToRgba(accentColor, Math.max(lineAlpha, 0.04));
      context.beginPath();
      context.moveTo(0, y);
      context.lineTo(state.width, y);
      context.stroke();
    }

    const laneCount = 15;

    for (let index = -laneCount; index <= laneCount; index += 1) {
      const baseX = sunX + index * (state.width / 18);
      context.strokeStyle = hexToRgba(accentColor, 0.11);
      context.beginPath();
      context.moveTo(baseX, horizon);
      context.lineTo(sunX + index * state.width * 0.18, state.height + 80);
      context.stroke();
    }

    context.restore();
  }

  function drawParticles(accentColor, time) {
    state.stars.forEach((star, index) => {
      const parallaxX = (state.pointerX - 0.5) * (12 + (index % 5) * 2);
      const parallaxY = (state.pointerY - 0.5) * (8 + (index % 7));
      const pulse = Math.sin(time * 0.0008 + star.drift) * 0.12 + 0.88;
      const x = star.x * state.width + parallaxX;
      const y = star.y * state.height + parallaxY;

      context.fillStyle =
        index % 9 === 0 ? hexToRgba(accentColor, star.alpha * 0.8) : `rgba(255, 245, 239, ${star.alpha * pulse})`;
      context.beginPath();
      context.arc(x, y, star.size * pulse, 0, Math.PI * 2);
      context.fill();
    });
  }

  function renderFrame(time = 0) {
    const accentColor =
      getComputedStyle(document.documentElement).getPropertyValue("--chapter-accent").trim() ||
      "#2c85c8";

    if (!prefersReducedMotion) {
      state.pointerX += (state.targetX - state.pointerX) * 0.08;
      state.pointerY += (state.targetY - state.pointerY) * 0.08;
    }

    context.clearRect(0, 0, state.width, state.height);
    drawParticles(accentColor, time);
    const gridState = drawSkyGlow(accentColor);
    drawGrid(gridState, accentColor);

    if (!prefersReducedMotion) {
      window.requestAnimationFrame(renderFrame);
    }
  }

  resizeCanvas();
  renderFrame();

  window.addEventListener("resize", resizeCanvas);
  window.addEventListener(
    "scroll",
    () => {
      state.scrollY = window.scrollY;
    },
    { passive: true }
  );

  window.addEventListener("pointermove", (event) => {
    state.targetX = event.clientX / window.innerWidth;
    state.targetY = event.clientY / window.innerHeight;
  });

  window.addEventListener("pointerleave", () => {
    state.targetX = 0.72;
    state.targetY = 0.64;
  });
}

observeReveals();
observeActiveLinks();
observeChapters();
updateScrollProgress();
initializePrivateEntry();
initializePrivateGate();
initializeNeonCanvas();
initializeExhibitionTilt();

window.addEventListener("scroll", updateScrollProgress, { passive: true });
window.addEventListener("resize", updateScrollProgress);

if (posterFrame) {
  posterFrame.addEventListener("pointermove", setPosterSheen);
  posterFrame.addEventListener("pointerleave", resetPosterSheen);
}
