const pages = {
  home: {
    title: "Sağlık Bilimleri Üniversitesi",
    description: "İçeriğe ulaşmak için keşfetmeye başlayın.",
    action: '<a class="primary-link" href="#/grid">İçeriği keşfet</a>',
  },
  page1: {
    title: "Sayfa 1",
    description: "İçerik: Sayfa 1",
  },
  page2: {
    title: "Sayfa 2",
    description: "İçerik: Sayfa 2",
  },
  page3: {
    title: "Sayfa 3",
    description: "İçerik: Sayfa 3",
  },
  profile: {
    title: "Profil",
    description: "Bu bölüm henüz hazır değil.",
  },
  settings: {
    title: "Ayarlar",
    description: "Bu bölüm henüz hazır değil.",
  },
};

const pageContent = document.querySelector("#page-content");
const menuToggle = document.querySelector("#menu-toggle");
const sideMenu = document.querySelector("#side-menu");
const menuBackdrop = document.querySelector("#menu-backdrop");
const mainContent = document.querySelector("#main-content");
const navigationLinks = document.querySelectorAll(".navigation a");

function currentRoute() {
  const route = window.location.hash.replace(/^#\/?/, "").split("/")[0];
  return route || "home";
}

function renderPage() {
  const route = currentRoute();

  if (route === "grid") {
    pageContent.innerHTML = `
      <h1>İçerik</h1>
      <div class="tile-grid" role="list" aria-label="İçerik listesi">
        ${Array.from({ length: 8 }, (_, index) => `
          <div class="tile" role="listitem">${index + 1}</div>
        `).join("")}
      </div>
    `;
  } else {
    const page = pages[route] || pages.home;
    pageContent.innerHTML = `
      <h1>${page.title}</h1>
      <p>${page.description}</p>
      ${page.action || ""}
    `;
  }

  navigationLinks.forEach((link) => {
    if (link.dataset.route === route) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });
  document.title = `${route === "home" ? pages.home.title : pages[route]?.title || "İçerik"} | Çalışma Alanı`;
}

function setMenuOpen(open) {
  sideMenu.hidden = !open;
  menuBackdrop.hidden = !open;
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute("aria-label", open ? "Menüyü kapat" : "Menüyü aç");

  if (open) {
    sideMenu.querySelector("a")?.focus();
  } else {
    menuToggle.focus();
  }
}

menuToggle.addEventListener("click", () => {
  setMenuOpen(sideMenu.hidden);
});

menuBackdrop.addEventListener("click", () => setMenuOpen(false));

sideMenu.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    setMenuOpen(false);
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !sideMenu.hidden) {
    setMenuOpen(false);
  }
});

window.addEventListener("hashchange", renderPage);
renderPage();
