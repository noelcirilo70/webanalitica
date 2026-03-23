document.addEventListener("DOMContentLoaded", () => {
  initAccordion();
  initMobileMenu();
});

function initAccordion() {
  document.querySelectorAll("[data-accordion]").forEach((acc) => {
    const items = acc.querySelectorAll(".faq-item");

    items.forEach((item) => {
      const btn = item.querySelector(".faq-btn");
      const panel = item.querySelector(".faq-panel");
      const icon = item.querySelector(".faq-icon");

      if (!btn || !panel || !icon) return;

      btn.addEventListener("click", () => {
        const isOpen = !panel.classList.contains("hidden");

        items.forEach((it) => {
          const currentPanel = it.querySelector(".faq-panel");
          const currentIcon = it.querySelector(".faq-icon");

          if (currentPanel) currentPanel.classList.add("hidden");
          if (currentIcon) currentIcon.textContent = "+";
        });

        if (!isOpen) {
          panel.classList.remove("hidden");
          icon.textContent = "–";
        }
      });
    });
  });
}

function initMobileMenu() {
  const mobileBtn = document.getElementById("mobileMenuBtn");
  const mobileMenu = document.getElementById("mobileMenu");

  if (!mobileBtn || !mobileMenu) return;

  mobileBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");

    const icon = mobileBtn.querySelector(".material-symbols-outlined");
    if (icon) {
      icon.textContent = mobileMenu.classList.contains("hidden") ? "menu" : "close";
    }
  });
}
document.addEventListener("DOMContentLoaded", () => {
  initScrollReveal();
  initTiltCard();
  initDemoFormProgress();
  initDemoFormSubmit();
  initEnhancedMobileMenu();
});

function initEnhancedMobileMenu() {
  const btn = document.getElementById("mobileMenuBtn");
  const menu = document.getElementById("mobileMenu");
  const icon = document.getElementById("mobileMenuIcon");

  if (!btn || !menu) return;

  btn.addEventListener("click", () => {
    const isOpen = !menu.classList.contains("hidden");
    menu.classList.toggle("hidden");

    if (icon) {
      icon.textContent = isOpen ? "menu" : "close";
    }

    btn.setAttribute("aria-label", isOpen ? "Abrir menú" : "Cerrar menú");
  });

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.add("hidden");
      if (icon) icon.textContent = "menu";
      btn.setAttribute("aria-label", "Abrir menú");
    });
  });
}

function initScrollReveal() {
  const elements = Array.from(document.querySelectorAll(".reveal"));
  if (!elements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  elements.forEach((el) => observer.observe(el));
}

function initTiltCard() {
  const card = document.getElementById("tiltCard");
  if (!card) return;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion) return;

  let raf = null;
  const max = 8;

  function onMove(ev) {
    const rect = card.getBoundingClientRect();
    const x = (ev.clientX - rect.left) / rect.width;
    const y = (ev.clientY - rect.top) / rect.height;
    const rx = (0.5 - y) * (max * 2);
    const ry = (x - 0.5) * (max * 2);

    if (raf) cancelAnimationFrame(raf);

    raf = requestAnimationFrame(() => {
      card.style.transform = `perspective(900px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg)`;
    });
  }

  function onLeave() {
    if (raf) cancelAnimationFrame(raf);
    card.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg)";
  }

  card.addEventListener("mousemove", onMove);
  card.addEventListener("mouseleave", onLeave);
}

function initDemoFormProgress() {
  const form = document.getElementById("demoForm");
  const bar = document.getElementById("progressBar");
  const label = document.getElementById("progressLabel");

  if (!form || !bar || !label) return;

  const requiredFields = Array.from(form.querySelectorAll("[required]"));

  function calc() {
    const filled = requiredFields.filter((field) => {
      if (field.type === "checkbox" || field.type === "radio") return field.checked;
      return String(field.value || "").trim().length > 0;
    }).length;

    const pct = Math.round((filled / requiredFields.length) * 100);
    bar.style.width = `${pct}%`;
    label.textContent = `${pct}%`;
  }

  form.addEventListener("input", calc);
  form.addEventListener("change", calc);
  calc();
}

function initDemoFormSubmit() {
  const form = document.getElementById("demoForm");
  const btn = document.getElementById("submitBtn");
  const spinner = document.getElementById("submitSpinner");
  const toast = document.getElementById("toast");
  const toastClose = document.getElementById("toastClose");
  const toastTitle = document.getElementById("toastTitle");
  const toastMsg = document.getElementById("toastMsg");

  if (!form) return;

  function showToast(title, msg) {
    if (!toast) return;
    if (toastTitle) toastTitle.textContent = title;
    if (toastMsg) toastMsg.textContent = msg;
    toast.classList.add("show");
  }

  function hideToast() {
    if (toast) toast.classList.remove("show");
  }

  if (toastClose) {
    toastClose.addEventListener("click", hideToast);
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      showToast("Faltan datos", "Completa los campos obligatorios para agendar la demo.");
      return;
    }

    if (btn) {
      btn.setAttribute("disabled", "true");
      btn.classList.add("opacity-90");
    }

    if (spinner) {
      spinner.classList.remove("hidden");
    }

    window.setTimeout(() => {
      if (spinner) spinner.classList.add("hidden");
      if (btn) {
        btn.removeAttribute("disabled");
        btn.classList.remove("opacity-90");
      }

      showToast("Solicitud enviada", "Te contactaremos en menos de 24h para confirmar día y hora.");
      form.reset();

      const ev = new Event("input", { bubbles: true });
      form.dispatchEvent(ev);
    }, 850);
  });
}
document.addEventListener("DOMContentLoaded", () => {
  initDashboardPanel();
  initDashboardFilters();
});

function initDashboardPanel() {
  const panelToggle = document.getElementById("panel-toggle");
  const overlay = document.getElementById("overlay");

  const elements = {
    ref: document.getElementById("panel-ref"),
    img: document.getElementById("panel-image"),
    chip: document.getElementById("panel-chip"),
    title: document.getElementById("panel-title"),
    desc: document.getElementById("panel-description"),
    freqLabel: document.getElementById("panel-freq-label"),
    freqValue: document.getElementById("panel-freq-value"),
    supportLabel: document.getElementById("panel-support-label"),
    supportValue: document.getElementById("panel-support-value"),
    metricsTitle: document.getElementById("panel-metrics-title"),
    metricsWrap: document.getElementById("panel-metrics"),
  };

  if (!panelToggle || !overlay || !elements.ref) return;

  function metricPill(text) {
    const span = document.createElement("span");
    span.className =
      "px-4 py-2 bg-slate-900/30 rounded-xl text-sm font-semibold text-slate-300 border border-slate-700/70 shadow-sm";
    span.textContent = text;
    return span;
  }

  function setPanelFromCard(cardLabel) {
    const d = cardLabel.dataset;
    const img = cardLabel.querySelector("img");

    if (img && img.getAttribute("src")) {
      elements.img.src = img.getAttribute("src");
      elements.img.alt = `${d.title || img.getAttribute("alt") || "Dashboard"} Deep Dive`;
    }

    if (d.ref) elements.ref.textContent = `Referencia: ${d.ref}`;
    if (d.category) elements.chip.textContent = d.category;
    if (d.title) elements.title.textContent = d.title;
    if (d.description) elements.desc.textContent = d.description;
    if (d.freqLabel) elements.freqLabel.textContent = d.freqLabel;
    if (d.freqValue) elements.freqValue.textContent = d.freqValue;
    if (d.supportLabel) elements.supportLabel.textContent = d.supportLabel;
    if (d.supportValue) elements.supportValue.textContent = d.supportValue;

    if (d.metricsTitle && elements.metricsTitle) {
      const icon = elements.metricsTitle.querySelector(".material-symbols-outlined");
      elements.metricsTitle.innerHTML = "";
      if (icon) elements.metricsTitle.appendChild(icon);
      elements.metricsTitle.appendChild(document.createTextNode(` ${d.metricsTitle}`));
    }

    if (elements.metricsWrap) {
      elements.metricsWrap.innerHTML = "";
      const metrics = (d.metrics || "")
        .split("|")
        .map((item) => item.trim())
        .filter(Boolean);

      metrics.forEach((metric) => {
        elements.metricsWrap.appendChild(metricPill(metric));
      });
    }
  }

  document.querySelectorAll('label[for="panel-toggle"].dashboard-card').forEach((label) => {
    label.addEventListener("click", () => setPanelFromCard(label));
  });

  overlay.addEventListener("click", () => {
    panelToggle.checked = false;
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      panelToggle.checked = false;
    }
  });
}

function initDashboardFilters() {
  const input = document.getElementById("dashboardSearch") || document.querySelector(".search-input");
  const grid = document.getElementById("dashboard-grid");
  const noResults = document.getElementById("no-results");
  const filterBtns = Array.from(document.querySelectorAll(".filter-btn"));

  if (!grid) return;

  const cards = Array.from(grid.querySelectorAll('label[for="panel-toggle"].dashboard-card'));
  let activeFilter = document.querySelector(".filter-btn.active")?.dataset?.filter || "all";

  function normalize(str) {
    return (str || "")
      .toString()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim();
  }

  function matchCategory(data) {
    if (!activeFilter || activeFilter === "all") return true;

    const cat = normalize(data.category);

    switch (activeFilter) {
      case "profit":
        return cat.includes("rentabilidad") || cat.includes("profit");
      case "ppc":
        return cat.includes("advertising") || cat.includes("ppc") || cat.includes("publicidad");
      case "logistics":
        return (
          cat.includes("logistica") ||
          cat.includes("stock") ||
          cat.includes("inventario") ||
          cat.includes("logistics")
        );
      case "global_sales":
        return cat.includes("ventas globales") || cat.includes("global");
      case "executive":
        return cat.includes("executive") || cat.includes("performance overview") || cat.includes("estrategia");
      case "growth":
        return cat.includes("growth") || cat.includes("marketing");
      case "cro":
        return cat.includes("cro") || cat.includes("optimizacion");
      default:
        return true;
    }
  }

  function applyFilter() {
    const q = normalize(input ? input.value : "");
    let shown = 0;

    cards.forEach((card) => {
      const d = card.dataset || {};

      const haystack = normalize(
        [
          d.title,
          d.category,
          d.ref,
          d.badge,
          d.description,
          d.metricsTitle,
          d.metrics,
        ]
          .filter(Boolean)
          .join(" ")
      );

      const matchText = !q || haystack.includes(q);
      const matchCat = matchCategory(d);
      const match = matchText && matchCat;

      card.classList.toggle("hidden", !match);
      if (match) shown += 1;
    });

    if (noResults) {
      noResults.classList.toggle("hidden", shown !== 0);
    }
  }

  if (input) {
    input.addEventListener("input", applyFilter);
    input.addEventListener("change", applyFilter);
  }

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      activeFilter = btn.dataset.filter || "all";
      applyFilter();
    });
  });

  applyFilter();
}
document.addEventListener("DOMContentLoaded", () => {
  initIntegrationsPage();
});

function initIntegrationsPage() {
  const cardsEl = document.getElementById("cards");
  const yearEl = document.getElementById("year");
  const modal = document.getElementById("connectModal");
  const modalTitle = document.getElementById("modalTitle");
  const btnStart = document.getElementById("btnStartConnect");
  const btnClose = document.getElementById("modalClose");
  const progressBar = document.getElementById("progressBar");
  const progressPct = document.getElementById("progressPct");
  const step1 = document.getElementById("step1");
  const step2 = document.getElementById("step2");
  const step3 = document.getElementById("step3");
  const activeCount = document.getElementById("activeCount");
  const activeBar = document.getElementById("activeBar");
  const btnReset = document.getElementById("btnReset");
  const btnConnectAll = document.getElementById("btnConnectAll");
  const toastEl = document.getElementById("toast");
  const toastTitle = document.getElementById("toastTitle");
  const toastMsg = document.getElementById("toastMsg");

  if (!cardsEl || !modal || !modalTitle) return;

  const INTEGRATIONS = [
    {
      id: "sellercentral",
      group: "amazon",
      name: "Amazon Seller Central (SP-API)",
      desc: "Ventas, pedidos, devoluciones, fees, inventario y performance.",
      icon: "storefront",
      highlight: "Recomendado",
    },
    {
      id: "ppc",
      group: "amazon",
      name: "Amazon Advertising (PPC API)",
      desc: "Campañas, keywords, search terms, ACOS/TACOS y presupuestos.",
      icon: "ads_click",
      highlight: "Core",
    },
    {
      id: "fba",
      group: "amazon",
      name: "FBA & Restock",
      desc: "Stock, inbound shipments, días de cobertura y alertas.",
      icon: "inventory_2",
      highlight: "Operaciones",
    },
    {
      id: "sheets",
      group: "bi",
      name: "Google Sheets",
      desc: "Export automático, plantillas y reportes programados.",
      icon: "grid_on",
      highlight: "Reportes",
    },
    {
      id: "powerbi",
      group: "bi",
      name: "Power BI / Looker Studio",
      desc: "Conector BI para analítica avanzada y reporting enterprise.",
      icon: "analytics",
      highlight: "Enterprise",
    },
    {
      id: "slack",
      group: "alerts",
      name: "Slack / Teams",
      desc: "Notificaciones: stock bajo, ACOS alto, anomalías, Buy Box.",
      icon: "notifications",
      highlight: "Alertas",
    },
    {
      id: "email",
      group: "alerts",
      name: "Email Reports",
      desc: "Reportes diarios/semanales por correo (SMTP).",
      icon: "mail",
      highlight: "Automático",
    },
    {
      id: "webhooks",
      group: "dev",
      name: "Webhooks",
      desc: "Eventos en tiempo real a tu stack (CRM, automatizaciones).",
      icon: "webhook",
      highlight: "Dev",
    },
    {
      id: "api",
      group: "dev",
      name: "API Premium",
      desc: "Acceso a endpoints para integraciones a medida.",
      icon: "api",
      highlight: "Pro",
    },
  ];

  const STORAGE_KEY = "wap_integrations_status_v1";
  let state = loadState();
  let currentIntegration = null;
  let timer = null;
  let toastTimer = null;

  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  function loadState() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    } catch {
      return {};
    }
  }

  function saveState(nextState) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextState));
  }

  function statusFor(id) {
    return state[id]?.status || "disconnected";
  }

  function setStatus(id, status) {
    state[id] = { status, at: Date.now() };
    saveState(state);
    renderIntegrations();
    updateSidebar();
  }

  function prettyStatus(st) {
    if (st === "connected") {
      return {
        label: "Conectado",
        cls: "bg-teal-400/10 border-teal-300/25 text-teal-200",
      };
    }
    if (st === "pending") {
      return {
        label: "Sincronizando",
        cls: "bg-sky-400/10 border-sky-300/25 text-sky-200",
      };
    }
    return {
      label: "Desconectado",
      cls: "bg-white/5 border-white/10 text-slate-200/85",
    };
  }

  function cardTemplate(item) {
    const st = statusFor(item.id);
    const ps = prettyStatus(st);
    const btnLabel = st === "connected" ? "Gestionar" : "Conectar";
    const btnClass =
      st === "connected"
        ? "btn-premium btn-ghost px-4 py-2 rounded-xl inline-flex items-center gap-2"
        : "btn-premium btn-primary px-4 py-2 rounded-xl inline-flex items-center gap-2";

    return `
      <article class="reveal relative int-card rounded-3xl p-6 overflow-hidden" data-group="${item.group}" data-id="${item.id}">
        <div class="flex items-start justify-between gap-4">
          <div class="flex items-center gap-3">
            <div class="w-11 h-11 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
              <span class="material-symbols-outlined text-sky-200">${item.icon}</span>
            </div>
            <div>
              <h5 class="font-semibold leading-tight">${item.name}</h5>
              <div class="text-xs text-slate-300/75 mt-1">${item.highlight}</div>
            </div>
          </div>

          <span class="badge text-xs px-2.5 py-1 rounded-full border ${ps.cls}">
            ${ps.label}
          </span>
        </div>

        <p class="mt-4 text-sm text-slate-300/90 leading-relaxed">${item.desc}</p>

        <div class="mt-5 flex items-center justify-between gap-3">
          <button class="${btnClass}" data-action="connect">
            <span class="material-symbols-outlined text-[18px]">link</span>
            ${btnLabel}
          </button>

          <button class="px-3 py-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition inline-flex items-center gap-2 text-sm" data-action="details">
            <span class="material-symbols-outlined text-[18px]">info</span>
            Detalles
          </button>
        </div>
      </article>
    `;
  }

  function renderIntegrations() {
    cardsEl.innerHTML = INTEGRATIONS.map(cardTemplate).join("");

    cardsEl.querySelectorAll(".int-card").forEach((card) => {
      card.addEventListener("pointermove", (e) => {
        const rect = card.getBoundingClientRect();
        const mx = ((e.clientX - rect.left) / rect.width) * 100;
        const my = ((e.clientY - rect.top) / rect.height) * 100;
        card.style.setProperty("--mx", `${mx}%`);
        card.style.setProperty("--my", `${my}%`);
      });
    });

    initRevealOnPage();
  }

  function initRevealOnPage() {
    const revealElements = Array.from(document.querySelectorAll(".reveal"));
    if (!revealElements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("is-in");
        });
      },
      { threshold: 0.12 }
    );

    revealElements.forEach((el) => observer.observe(el));
  }

  function setFilter(key) {
    document.querySelectorAll(".integration-chip").forEach((chip) => {
      chip.setAttribute("aria-pressed", String(chip.dataset.filter === key));
    });

    cardsEl.querySelectorAll(":scope > article").forEach((card) => {
      const ok = key === "all" || card.dataset.group === key;
      card.style.display = ok ? "" : "none";
    });
  }

  function openModal(integration) {
    currentIntegration = integration;
    modalTitle.textContent = `Conectar: ${integration.name}`;
    modal.classList.remove("hidden");
    document.body.style.overflow = "hidden";
    resetProgress();
  }

  function closeModal() {
    modal.classList.add("hidden");
    document.body.style.overflow = "";
    currentIntegration = null;
  }

  function resetProgress() {
    if (progressBar) progressBar.style.width = "0%";
    if (progressPct) progressPct.textContent = "0%";

    [step1, step2, step3].forEach((step) => {
      if (!step) return;
      step.classList.remove("text-teal-200", "text-sky-200", "text-indigo-200");
      step.classList.add("text-slate-300/80");
    });
  }

  function markStep(el, tone) {
    if (!el) return;
    el.classList.remove("text-slate-300/80");
    el.classList.add(tone);
  }

  function runConnect() {
    if (!currentIntegration) return;

    setStatus(currentIntegration.id, "pending");
    resetProgress();

    let pct = 0;
    clearInterval(timer);

    timer = setInterval(() => {
      pct += Math.floor(6 + Math.random() * 10);
      if (pct > 100) pct = 100;

      if (progressBar) progressBar.style.width = `${pct}%`;
      if (progressPct) progressPct.textContent = `${pct}%`;

      if (pct >= 20) markStep(step1, "text-sky-200");
      if (pct >= 55) markStep(step2, "text-teal-200");
      if (pct >= 85) markStep(step3, "text-indigo-200");

      if (pct === 100) {
        clearInterval(timer);
        setTimeout(() => {
          setStatus(currentIntegration.id, "connected");
          closeModal();
          showToast("Integración conectada", `${currentIntegration.name} está activa.`);
        }, 350);
      }
    }, 260);
  }

  function updateSidebar() {
    const connected = INTEGRATIONS.filter((item) => statusFor(item.id) === "connected").length;
    if (activeCount) activeCount.textContent = connected;

    const pct = Math.round((connected / INTEGRATIONS.length) * 100);
    if (activeBar) activeBar.style.width = `${pct}%`;
  }

  function showToast(title, msg) {
    if (!toastEl || !toastTitle || !toastMsg) return;
    toastTitle.textContent = title;
    toastMsg.textContent = msg;
    toastEl.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toastEl.classList.remove("show");
    }, 3200);
  }

  document.querySelectorAll(".integration-chip").forEach((chip) => {
    chip.addEventListener("click", () => setFilter(chip.dataset.filter));
  });

  cardsEl.addEventListener("click", (e) => {
    const btn = e.target.closest("button");
    if (!btn) return;

    const card = e.target.closest("article");
    const id = card?.dataset.id;
    const integration = INTEGRATIONS.find((item) => item.id === id);
    if (!integration) return;

    const action = btn.dataset.action;
    if (action === "connect") {
      openModal(integration);
    } else if (action === "details") {
      showToast(integration.name, integration.desc);
    }
  });

  if (btnStart) btnStart.addEventListener("click", runConnect);
  if (btnClose) btnClose.addEventListener("click", closeModal);

  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.classList.contains("hidden")) {
      closeModal();
    }
  });

  if (btnReset) {
    btnReset.addEventListener("click", () => {
      state = {};
      saveState(state);
      renderIntegrations();
      updateSidebar();
      showToast("Reset", "Estados limpiados.");
    });
  }

  if (btnConnectAll) {
    btnConnectAll.addEventListener("click", () => {
      ["sellercentral", "ppc", "fba"].forEach((id) => setStatus(id, "connected"));
      showToast("Demo lista", "Seller Central + PPC + FBA conectados.");
    });
  }

  if (toastEl) {
    toastEl.addEventListener("click", () => {
      toastEl.classList.remove("show");
    });
  }

  renderIntegrations();
  updateSidebar();
  setFilter("all");

  setTimeout(() => {
    document.querySelectorAll(".reveal").forEach((el) => el.classList.add("is-in"));
  }, 80);
}
document.addEventListener("DOMContentLoaded", () => {
  initLoginPage();
});

function initLoginPage() {
  const yearEls = document.querySelectorAll("#year");
  const tabLogin = document.getElementById("tabLogin");
  const tabRegister = document.getElementById("tabRegister");
  const paneLogin = document.getElementById("paneLogin");
  const paneRegister = document.getElementById("paneRegister");
  const navLoginBtn = document.getElementById("navLoginBtn");
  const navRegisterBtn = document.getElementById("navRegisterBtn");
  const toast = document.getElementById("toast");
  const toastTitle = document.getElementById("toastTitle");
  const toastMsg = document.getElementById("toastMsg");
  const toastIcon = document.getElementById("toastIcon");
  const toastClose = document.getElementById("toastClose");
  const forgotModal = document.getElementById("forgotModal");

  if (!tabLogin || !tabRegister || !paneLogin || !paneRegister) return;

  yearEls.forEach((el) => {
    el.textContent = new Date().getFullYear();
  });

  function setActive(mode) {
    const isLogin = mode === "login";

    tabLogin.classList.toggle("active", isLogin);
    tabRegister.classList.toggle("active", !isLogin);
    paneLogin.classList.toggle("active", isLogin);
    paneRegister.classList.toggle("active", !isLogin);

    navLoginBtn?.classList.toggle("btn-primary", isLogin);
    navLoginBtn?.classList.toggle("btn-ghost", !isLogin);
    navRegisterBtn?.classList.toggle("btn-primary", !isLogin);
    navRegisterBtn?.classList.toggle("btn-ghost", isLogin);

    if (location.hash !== (isLogin ? "#login" : "#register")) {
      history.replaceState(null, "", isLogin ? "#login" : "#register");
    }
  }

  tabLogin.addEventListener("click", () => setActive("login"));
  tabRegister.addEventListener("click", () => setActive("register"));
  document.getElementById("ctaToRegister")?.addEventListener("click", () => setActive("register"));
  document.getElementById("ctaToLogin")?.addEventListener("click", () => setActive("login"));

  const initialHash = (location.hash || "#login").toLowerCase();
  if (initialHash.includes("register")) setActive("register");
  else setActive("login");

  window.addEventListener("hashchange", () => {
    const h = (location.hash || "#login").toLowerCase();
    if (h.includes("register")) setActive("register");
    if (h.includes("login")) setActive("login");
  });

  document.querySelectorAll("[data-toggle-pass]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-toggle-pass");
      const input = document.getElementById(id);
      const icon = btn.querySelector(".material-symbols-outlined");
      if (!input || !icon) return;

      const show = input.type === "password";
      input.type = show ? "text" : "password";
      icon.textContent = show ? "visibility_off" : "visibility";
    });
  });

  let toastTimer = null;

  function showToast({ title, msg, icon = "check_circle" }) {
    if (!toast || !toastTitle || !toastMsg || !toastIcon) return;
    toastTitle.textContent = title;
    toastMsg.textContent = msg;
    toastIcon.textContent = icon;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 3200);
  }

  toastClose?.addEventListener("click", () => toast.classList.remove("show"));

  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function setErr(el, show) {
    if (!el) return;
    el.classList.toggle("hidden", !show);
  }

  document.getElementById("loginForm")?.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("loginEmail")?.value.trim() || "";
    const pass = document.getElementById("loginPassword")?.value || "";

    const okEmail = emailRe.test(email);
    const okPass = pass.length >= 6;

    setErr(document.getElementById("loginEmailError"), !okEmail);
    setErr(document.getElementById("loginPassError"), !okPass);

    if (!okEmail || !okPass) {
      showToast({
        title: "Revisa tus datos",
        msg: "Corrige los campos marcados para continuar.",
        icon: "error",
      });
      return;
    }

    showToast({
      title: "Login listo",
      msg: "UI funcionando. Conecta tu API para autenticar.",
      icon: "verified",
    });
  });

  function scorePassword(password) {
    let score = 0;
    if (!password) return 0;

    const hasLower = /[a-z]/.test(password);
    const hasUpper = /[A-Z]/.test(password);
    const hasNum = /\d/.test(password);
    const hasSym = /[^A-Za-z0-9]/.test(password);
    const len = password.length;

    score += Math.min(40, len * 4);
    score += hasLower ? 10 : 0;
    score += hasUpper ? 15 : 0;
    score += hasNum ? 15 : 0;
    score += hasSym ? 20 : 0;

    if (len < 8) score -= 15;
    if (!(hasLower && hasUpper)) score -= 8;
    if (!(hasNum || hasSym)) score -= 10;

    return Math.max(0, Math.min(100, score));
  }

  const strengthBar = document.getElementById("strengthBar");
  const strengthLabel = document.getElementById("strengthLabel");
  const regPass = document.getElementById("regPassword");

  regPass?.addEventListener("input", () => {
    const score = scorePassword(regPass.value);
    if (strengthBar) strengthBar.style.width = `${score}%`;

    if (strengthLabel) {
      if (score < 35) strengthLabel.textContent = "Baja";
      else if (score < 70) strengthLabel.textContent = "Media";
      else strengthLabel.textContent = "Alta";
    }
  });

  document.getElementById("registerForm")?.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("regName")?.value.trim() || "";
    const email = document.getElementById("regEmail")?.value.trim() || "";
    const p1 = document.getElementById("regPassword")?.value || "";
    const p2 = document.getElementById("regPassword2")?.value || "";
    const terms = document.getElementById("terms")?.checked || false;

    const okName = name.length >= 2;
    const okEmail = emailRe.test(email);
    const okPass = p1.length >= 8;
    const okMatch = p1 === p2 && okPass;

    setErr(document.getElementById("regNameError"), !okName);
    setErr(document.getElementById("regEmailError"), !okEmail);
    setErr(document.getElementById("regPassError"), !okPass);
    setErr(document.getElementById("regPass2Error"), !okMatch);
    setErr(document.getElementById("termsError"), !terms);

    if (!okName || !okEmail || !okPass || !okMatch || !terms) {
      showToast({
        title: "No se pudo crear",
        msg: "Revisa los campos y vuelve a intentar.",
        icon: "error",
      });
      return;
    }

    showToast({
      title: "Registro listo",
      msg: "UI funcionando. Conecta tu API para crear usuarios.",
      icon: "celebration",
    });

    setActive("login");
  });

  document.getElementById("forgotBtn")?.addEventListener("click", () => {
    forgotModal?.classList.remove("hidden");
  });

  document.getElementById("forgotClose")?.addEventListener("click", () => {
    forgotModal?.classList.add("hidden");
  });

  forgotModal?.addEventListener("click", (e) => {
    const backdrop = forgotModal.querySelector(".absolute.inset-0");
    if (e.target === backdrop) {
      forgotModal.classList.add("hidden");
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      forgotModal?.classList.add("hidden");
    }
  });

  document.getElementById("forgotForm")?.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("forgotEmail")?.value.trim() || "";
    const ok = emailRe.test(email);

    setErr(document.getElementById("forgotEmailError"), !ok);

    if (!ok) {
      showToast({
        title: "Correo inválido",
        msg: "Escribe un correo válido para enviar el enlace.",
        icon: "error",
      });
      return;
    }

    forgotModal?.classList.add("hidden");

    showToast({
      title: "Enviado",
      msg: "UI lista. Conecta tu backend para enviar el email real.",
      icon: "send",
    });
  });
}
document.addEventListener("DOMContentLoaded", () => {
  initPricingPage();
});

function initPricingPage() {
  const yearEls = document.querySelectorAll("#year");
  const toggle = document.getElementById("billingToggle");
  const knob = document.getElementById("billingKnob");
  const prices = Array.from(document.querySelectorAll(".plan-price"));
  const labels = Array.from(document.querySelectorAll(".billing-label"));

  if (!toggle || !knob || !prices.length) return;

  yearEls.forEach((el) => {
    el.textContent = new Date().getFullYear();
  });

  let yearly = false;

  function renderBilling() {
    if (yearly) {
      toggle.classList.add("bg-slate-700");
      knob.style.transform = "translateX(24px)";
      prices.forEach((el) => {
        el.textContent = el.dataset.year || el.textContent;
      });
      labels.forEach((el) => {
        el.textContent = "/mes (anual)";
      });
    } else {
      toggle.classList.remove("bg-slate-700");
      knob.style.transform = "translateX(0px)";
      prices.forEach((el) => {
        el.textContent = el.dataset.month || el.textContent;
      });
      labels.forEach((el) => {
        el.textContent = "/mes";
      });
    }
  }

  toggle.addEventListener("click", () => {
    yearly = !yearly;
    renderBilling();
  });

  renderBilling();
}