const floors = [
  {
    id: "-1",
    label: "−1. Kat",
    detail: "Konferans salonu",
    location: "Sağlık Bilimleri Fakültesi Konferans Salonu",
  },
  {
    id: "1",
    label: "1. Kat",
    detail: "Ebelik laboratuvarı",
    location: "Sağlık Bilimleri Fakültesi Ebelik Bölümü Laboratuvarı",
  },
  {
    id: "2",
    label: "2. Kat",
    detail: "Hemşirelik laboratuvarı",
    location: "Sağlık Bilimleri Fakültesi Hemşirelik Bölümü Laboratuvarı",
  },
  {
    id: "3",
    label: "3. Kat",
    detail: "Beslenme ve diyet laboratuvarı",
    location: "Sağlık Bilimleri Fakültesi Beslenme ve Diyet Bölümü Laboratuvarı",
  },
  {
    id: "4",
    label: "4. Kat",
    detail: "Dekanlık · FTR laboratuvarı",
    location: "Sağlık Bilimleri Fakültesi Dekanlığı ve Fizyoterapi ve Rehabilitasyon Bölümü Laboratuvarı",
  },
];

const departments = [
  {
    name: "Beslenme ve Diyetetik",
    url: "https://bdy-sbf.marmara.edu.tr/",
  },
  {
    name: "Ebelik",
    url: "https://ebe-sbf.marmara.edu.tr/",
  },
  {
    name: "Fizyoterapi ve Rehabilitasyon",
    url: "https://ftr-sbf.marmara.edu.tr/",
  },
  {
    name: "Hemşirelik",
    url: "https://hem-sbf.marmara.edu.tr/",
  },
  {
    name: "Sağlık Yönetimi",
    url: "https://syn-sbf.marmara.edu.tr/",
  },
  {
    name: "Dil ve Konuşma Terapisi",
    url: "https://sbf.marmara.edu.tr/bolumler/dil-ve-konusma-terapisi-bolumu",
  },
  {
    name: "Odyoloji",
    url: "https://sbf.marmara.edu.tr/bolumler/odyoloji-bolumu",
  },
  {
    name: "Temel Sağlık Bilimleri",
    url: "https://tsb-sbf.marmara.edu.tr/",
  },
];

const address =
  "Marmara Üniversitesi Sağlık Bilimleri Fakültesi, Başıbüyük Mah. Süreyyapaşa Başıbüyük Yolu Sk. 4 B, Maltepe / İstanbul";

const floorSelector = document.querySelector("#floor-selector");
const selectedFloorTitle = document.querySelector("#selected-floor-title");
const selectedFloorLocation = document.querySelector("#selected-floor-location");
const departmentGrid = document.querySelector("#department-grid");
const departmentSearch = document.querySelector("#department-search");
const departmentQuery = document.querySelector("#department-query");
const searchStatus = document.querySelector("#search-status");
const menuToggle = document.querySelector("#menu-toggle");
const primaryNav = document.querySelector("#primary-nav");
const introScreen = document.querySelector("#intro-screen");
const toast = document.querySelector("#toast");

function renderFloors(selectedId) {
  floorSelector.innerHTML = floors
    .map(
      (floor) => `
        <button
          class="floor-button"
          type="button"
          data-floor-id="${floor.id}"
          aria-pressed="${floor.id === selectedId}"
        >
          <span class="floor-button-title">${floor.label}</span>
          <span class="floor-button-detail">${floor.detail}</span>
        </button>
      `,
    )
    .join("");

  floorSelector.querySelectorAll(".floor-button").forEach((button) => {
    button.addEventListener("click", () => selectFloor(button.dataset.floorId));
  });
}

function selectFloor(floorId) {
  const floor = floors.find((item) => item.id === floorId);

  if (!floor) {
    return;
  }

  selectedFloorTitle.textContent = floor.label;
  selectedFloorLocation.textContent = floor.location;
  renderFloors(floorId);
}

function renderDepartments(query = "") {
  const normalizedQuery = query.trim().toLocaleLowerCase("tr-TR");
  const visibleDepartments = departments.filter((department) =>
    department.name.toLocaleLowerCase("tr-TR").includes(normalizedQuery),
  );

  departmentGrid.innerHTML = visibleDepartments
    .map(
      (department) => `
        <a
          class="department-card"
          href="${department.url}"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span class="department-number">${String(departments.indexOf(department) + 1).padStart(2, "0")}</span>
          <strong>${department.name}</strong>
          <span class="department-arrow" aria-hidden="true">↗</span>
        </a>
      `,
    )
    .join("");

  if (visibleDepartments.length === 0) {
    searchStatus.textContent = "Aramanızla eşleşen bölüm bulunamadı.";
  } else if (normalizedQuery) {
    searchStatus.textContent = `${visibleDepartments.length} bölüm bulundu.`;
  } else {
    searchStatus.textContent = "";
  }
}

function closeMenu() {
  primaryNav.classList.remove("is-open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Menüyü aç");
}

let toastTimeout;

function showToast(message) {
  window.clearTimeout(toastTimeout);
  toast.textContent = message;
  toast.classList.add("is-visible");
  toastTimeout = window.setTimeout(() => {
    toast.classList.remove("is-visible");
  }, 3600);
}

departmentSearch.addEventListener("submit", (event) => {
  event.preventDefault();
  renderDepartments(departmentQuery.value);
  document.querySelector("#bolumler").scrollIntoView({ behavior: "smooth" });
});

departmentQuery.addEventListener("input", () => {
  renderDepartments(departmentQuery.value);
});

menuToggle.addEventListener("click", () => {
  const isOpen = primaryNav.classList.toggle("is-open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Menüyü kapat" : "Menüyü aç");
});

primaryNav.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    closeMenu();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMenu();
    introScreen.classList.add("is-dismissed");
  }
});

document.querySelector("#contrast-toggle").addEventListener("click", (event) => {
  const button = event.currentTarget;
  const isEnabled = document.body.classList.toggle("high-contrast");
  button.setAttribute("aria-pressed", String(isEnabled));
  button.setAttribute(
    "aria-label",
    isEnabled ? "Yüksek kontrastı kapat" : "Yüksek kontrastı aç",
  );
  showToast(isEnabled ? "Yüksek kontrast açıldı." : "Standart görünüm açıldı.");
});

document.querySelector("#copy-address").addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(address);
    showToast("Fakülte adresi panoya kopyalandı.");
  } catch (error) {
    console.error("Adres panoya kopyalanamadı.", error);
    showToast("Adres kopyalanamadı. Adresi seçip elle kopyalayabilirsiniz.");
  }
});

document.querySelector("#intro-skip").addEventListener("click", () => {
  introScreen.classList.add("is-dismissed");
});

introScreen.addEventListener("animationend", (event) => {
  if (event.animationName === "intro-out" || event.animationName === "intro-dismiss") {
    introScreen.hidden = true;
  }
});

document.querySelector("#current-year").textContent = String(new Date().getFullYear());

renderDepartments();
selectFloor("4");

if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  introScreen.classList.add("is-dismissed");
}
