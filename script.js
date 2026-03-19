const header = document.querySelector("[data-elevate]");
const toggle = document.querySelector("[data-nav-toggle]");
const menu = document.querySelector("[data-nav-menu]");

function setHeaderElevate() {
  if (!header) return;
  header.setAttribute("data-elevate", String(window.scrollY > 4));
}

function setMenu(open) {
  if (!toggle || !menu) return;
  toggle.setAttribute("aria-expanded", String(open));
  menu.setAttribute("data-open", String(open));

  const sr = toggle.querySelector(".sr-only");
  if (sr) sr.textContent = open ? "Close menu" : "Open menu";

  document.documentElement.style.overflow = open ? "hidden" : "";
}

setHeaderElevate();
window.addEventListener("scroll", setHeaderElevate, { passive: true });

if (toggle && menu) {
  toggle.addEventListener("click", () => {
    const open = toggle.getAttribute("aria-expanded") !== "true";
    setMenu(open);
  });

  menu.addEventListener("click", (e) => {
    const link = e.target.closest("a");
    if (link) setMenu(false);
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") setMenu(false);
  });

  window.addEventListener("resize", () => {
    if (window.matchMedia("(min-width: 720px)").matches) setMenu(false);
  });
}

// Footer year
const year = document.getElementById("year");
if (year) year.textContent = String(new Date().getFullYear());

// Contact form (frontend-only)
const form = document.getElementById("contact-form");
const note = document.getElementById("form-note");

if (form && note) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const topic = String(data.get("topic") || "").trim();
    const message = String(data.get("message") || "").trim();

    if (!name || !email || !topic || !message) {
      note.textContent = "Please fill out all fields.";
      return;
    }

    const topicLabel =
      topic === "report"
        ? "report"
        : topic === "volunteer"
          ? "volunteer request"
          : topic === "program"
            ? "program request"
            : topic === "partner"
              ? "partnership request"
              : "request";

    note.textContent = `Thanks! We saved your ${topicLabel}. (Connect a backend to deliver it.)`;
    form.reset();
  });
}

