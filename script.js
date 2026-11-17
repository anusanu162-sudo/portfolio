/* ==========================================================================
   Anu M — portfolio interactions
   Vanilla JS, no dependencies
   ========================================================================== */
(function () {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------------- header + scroll progress ---------------- */
  const header = document.getElementById("siteHeader");
  const progress = document.getElementById("scrollProgress");

  function onScroll() {
    const y = window.scrollY || document.documentElement.scrollTop;
    header.classList.toggle("is-scrolled", y > 12);

    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (y / docHeight) * 100 : 0;
    progress.style.width = pct + "%";
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------------- mobile menu ---------------- */
  const toggle = document.getElementById("navToggle");
  const menu = document.getElementById("navMenu");

  function closeMenu() {
    menu.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open menu");
  }

  toggle.addEventListener("click", function () {
    const open = menu.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  });

  menu.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeMenu();
  });

  document.addEventListener("click", function (e) {
    if (!menu.contains(e.target) && !toggle.contains(e.target)) closeMenu();
  });

  /* ---------------- active nav link ---------------- */
  const sections = Array.from(document.querySelectorAll("main section[id]"));
  const navLinks = Array.from(document.querySelectorAll(".nav-link"));
  const headerOffset = 120;

  function updateActiveNav() {
    if (!sections.length) return;

    const y = window.scrollY || document.documentElement.scrollTop;
    const atBottom =
      y + window.innerHeight >= document.documentElement.scrollHeight - 4;
    let current = sections[0].id;

    if (atBottom) {
      current = sections[sections.length - 1].id;
    } else {
      sections.forEach(function (section) {
        if (section.offsetTop - headerOffset <= y) current = section.id;
      });
    }

    navLinks.forEach(function (link) {
      link.classList.toggle("is-active", link.getAttribute("href") === "#" + current);
    });
  }

  window.addEventListener("scroll", updateActiveNav, { passive: true });
  window.addEventListener("resize", updateActiveNav);
  updateActiveNav();

  /* ---------------- reveal on scroll ---------------- */
  const revealEls = Array.from(document.querySelectorAll("[data-reveal]"));

  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  } else {
    const revealObserver = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    revealEls.forEach(function (el) { revealObserver.observe(el); });
  }

  /* ---------------- animated counters ---------------- */
  const counters = Array.from(document.querySelectorAll(".counter"));

  function runCounter(el) {
    const target = parseFloat(el.dataset.target || "0");
    const decimals = parseInt(el.dataset.decimals || "0", 10);
    const duration = reduceMotion ? 0 : 1400;
    const start = performance.now();

    function frame(now) {
      const t = duration === 0 ? 1 : Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      const value = target * eased;
      el.textContent = decimals > 0
        ? value.toFixed(decimals)
        : Math.round(value).toString();
      if (t < 1) requestAnimationFrame(frame);
      else el.textContent = decimals > 0 ? target.toFixed(decimals) : String(target);
    }
    requestAnimationFrame(frame);
  }

  if ("IntersectionObserver" in window) {
    const counterObserver = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          runCounter(entry.target);
          obs.unobserve(entry.target);
        });
      },
      { threshold: 0.5 }
    );
    counters.forEach(function (c) { counterObserver.observe(c); });
  } else {
    counters.forEach(runCounter);
  }

  /* ---------------- rotating role text ---------------- */
  const rotator = document.getElementById("roleRotator");
  const roles = [
    "Django Developer",
    "FastAPI Developer",
    "Python Web Developer",
    "Computer Science Student"
  ];

  if (rotator) {
    if (reduceMotion) {
      rotator.textContent = roles[0];
    } else {
      let roleIndex = 0;
      let charIndex = roles[0].length;
      let deleting = false;

      function tick() {
        const word = roles[roleIndex];

        if (!deleting) {
          charIndex++;
          rotator.textContent = word.slice(0, charIndex);
          if (charIndex >= word.length) {
            deleting = true;
            return setTimeout(tick, 1700);
          }
          return setTimeout(tick, 65);
        }

        charIndex--;
        rotator.textContent = word.slice(0, charIndex);
        if (charIndex <= 0) {
          deleting = false;
          roleIndex = (roleIndex + 1) % roles.length;
          return setTimeout(tick, 320);
        }
        return setTimeout(tick, 32);
      }

      setTimeout(function () {
        deleting = true;
        tick();
      }, 1900);
    }
  }

  /* ---------------- tilt on project cards ---------------- */
  const tiltEls = Array.from(document.querySelectorAll("[data-tilt]"));
  const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  if (canHover && !reduceMotion) {
    tiltEls.forEach(function (card) {
      card.addEventListener("mousemove", function (e) {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform =
          "perspective(900px) rotateX(" + (-y * 4).toFixed(2) + "deg) rotateY(" +
          (x * 4).toFixed(2) + "deg) translateY(-3px)";
      });

      card.addEventListener("mouseleave", function () {
        card.style.transform = "";
      });
    });
  }

  /* ---------------- subtle portrait parallax ---------------- */
  const portrait = document.getElementById("portraitWrap");
  if (portrait && canHover && !reduceMotion) {
    const hero = document.getElementById("home");
    hero.addEventListener("mousemove", function (e) {
      const rect = hero.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      portrait.style.transform =
        "translate3d(" + (x * 10).toFixed(1) + "px," + (y * 10).toFixed(1) + "px,0) rotateX(" +
        (-y * 3).toFixed(1) + "deg) rotateY(" + (x * 3).toFixed(1) + "deg)";
    });
    hero.addEventListener("mouseleave", function () {
      portrait.style.transform = "";
    });
  }

  /* ---------------- copy email + toast ---------------- */
  const copyBtn = document.getElementById("copyEmail");
  const copyLabel = document.getElementById("copyLabel");
  const toast = document.getElementById("toast");
  let toastTimer;

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add("is-visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      toast.classList.remove("is-visible");
    }, 2400);
  }

  if (copyBtn) {
    copyBtn.addEventListener("click", function () {
      const email = copyBtn.dataset.email;

      function done() {
        copyLabel.textContent = "Copied!";
        showToast("Email copied — " + email);
        setTimeout(function () { copyLabel.textContent = "Copy email"; }, 2200);
      }

      function legacyCopy() {
        const temp = document.createElement("textarea");
        temp.value = email;
        temp.setAttribute("readonly", "");
        temp.style.position = "fixed";
        temp.style.opacity = "0";
        document.body.appendChild(temp);
        temp.select();
        let ok = false;
        try { ok = document.execCommand("copy"); } catch (err) { ok = false; }
        document.body.removeChild(temp);
        if (ok) done();
        else showToast("Email: " + email);
      }

      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(email).then(done).catch(legacyCopy);
      } else {
        legacyCopy();
      }
    });
  }

  /* ---------------- footer year ---------------- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
})();
