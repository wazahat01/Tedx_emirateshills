/**
 * TEDxEmiratesHills Event Hub - main.js
 * High-performance, zero-dependency client interactions
 */

document.addEventListener("DOMContentLoaded", () => {
  initStickyYearNav();
  initQuickSearch();
  initImageFallbacks();
  initBackToTop();
});

/**
 * Sticky Year Navigation & Active State Tracking
 */
function initStickyYearNav() {
  const navBtns = document.querySelectorAll(".year-pill-btn");
  const sections = document.querySelectorAll(".event-edition-section");

  if (!sections.length || !navBtns.length) return;

  // Click handler with smooth scrolling
  navBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = btn.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        const offset = 140; // account for headers
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = targetSection.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });

        // Update active class immediately
        navBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
      }
    });
  });

  // IntersectionObserver for scroll spy
  const observerOptions = {
    root: null,
    rootMargin: "-25% 0px -65% 0px",
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const sectionId = entry.target.getAttribute("id");
        navBtns.forEach((btn) => {
          if (btn.getAttribute("href") === `#${sectionId}`) {
            btn.classList.add("active");
          } else {
            btn.classList.remove("active");
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach((sec) => observer.observe(sec));
}

/**
 * Real-time Instant Filter / Search
 */
function initQuickSearch() {
  const searchInput = document.getElementById("quick-search");
  if (!searchInput) return;

  searchInput.addEventListener("input", (e) => {
    const query = e.target.value.trim().toLowerCase();
    const speakerCards = document.querySelectorAll(".speaker-card");
    const partnerCards = document.querySelectorAll(".partner-card");

    // Filter speakers
    speakerCards.forEach((card) => {
      const name = (card.querySelector(".speaker-name")?.textContent || "").toLowerCase();
      const role = (card.querySelector(".speaker-designation")?.textContent || "").toLowerCase();
      const tag = (card.querySelector(".speaker-role-tag")?.textContent || "").toLowerCase();

      if (!query || name.includes(query) || role.includes(query) || tag.includes(query)) {
        card.style.display = "";
        card.style.opacity = "1";
      } else {
        card.style.display = "none";
        card.style.opacity = "0";
      }
    });

    // Check if whole sections have visible content
    const sections = document.querySelectorAll(".event-edition-section");
    sections.forEach((sec) => {
      const visibleCards = sec.querySelectorAll(".speaker-card:not([style*='display: none'])");
      const emptyNotice = sec.querySelector(".search-empty-notice");

      if (query && visibleCards.length === 0) {
        if (!emptyNotice) {
          const notice = document.createElement("div");
          notice.className = "search-empty-notice";
          notice.style.padding = "1.5rem";
          notice.style.textAlign = "center";
          notice.style.color = "var(--text-dim)";
          notice.style.fontSize = "0.9rem";
          notice.textContent = "No matching speakers found in this edition.";
          sec.querySelector(".speakers-grid")?.after(notice);
        }
      } else if (emptyNotice) {
        emptyNotice.remove();
      }
    });
  });
}

/**
 * Graceful Fallback for Broken Images
 */
function initImageFallbacks() {
  const images = document.querySelectorAll(".speaker-img");

  images.forEach((img) => {
    img.addEventListener("error", () => {
      const parent = img.parentElement;
      const name = img.getAttribute("alt") || "Speaker";
      const initials = name
        .split(" ")
        .map(n => n[0])
        .filter(Boolean)
        .slice(0, 2)
        .join("")
        .toUpperCase();

      img.style.display = "none";
      const fallback = document.createElement("div");
      fallback.className = "avatar-fallback";
      fallback.textContent = initials || "TED";
      parent.appendChild(fallback);
    });
  });
}

/**
 * Back to Top Button
 */
function initBackToTop() {
  const backBtn = document.getElementById("back-to-top");
  if (!backBtn) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 400) {
      backBtn.classList.add("visible");
    } else {
      backBtn.classList.remove("visible");
    }
  }, { passive: true });

  backBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}
