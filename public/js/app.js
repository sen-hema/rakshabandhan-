(() => {
  const form = document.getElementById("login-form");
  const errorEl = document.getElementById("login-error");
  const submitBtn = document.getElementById("unlock-btn");
  const loginScreen = document.getElementById("login-screen");
  const threadIntro = document.getElementById("thread-intro");
  const mainContent = document.getElementById("main-content");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    errorEl.textContent = "";
    submitBtn.disabled = true;
    submitBtn.textContent = "Untying the thread...";

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        unlock();
      } else {
        errorEl.textContent = data.message || "That ID or password isn't right.";
        submitBtn.disabled = false;
        submitBtn.textContent = "Tie the Rakhi";
      }
    } catch (err) {
      errorEl.textContent = "Couldn't reach the server. Try again in a moment.";
      submitBtn.disabled = false;
      submitBtn.textContent = "Tie the Rakhi";
    }
  });

  function unlock() {
    loginScreen.style.display = "none";
    threadIntro.classList.add("is-active");
    threadIntro.style.display = "flex";

    window.setTimeout(() => {
      threadIntro.style.display = "none";
      mainContent.hidden = false;
      document.title = "For Karishma, this Raksha Bandhan";
      initCardNav();
    }, 2100);
  }

  function initCardNav() {
    const pages = Array.from(mainContent.querySelectorAll(".card-page"));
    const prevBtn = document.getElementById("prev-btn");
    const nextBtn = document.getElementById("next-btn");
    const dotsWrap = document.getElementById("page-dots");
    let current = 0;

    pages.forEach((_, i) => {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = "dot";
      dot.setAttribute("role", "tab");
      dot.setAttribute("aria-label", `Go to page ${i + 1} of ${pages.length}`);
      dot.addEventListener("click", () => goTo(i));
      dotsWrap.appendChild(dot);
    });
    const dots = Array.from(dotsWrap.children);

    function render(direction) {
      pages.forEach((page, i) => {
        page.classList.remove("is-active", "is-leaving-back");
        if (i === current) {
          page.classList.add("is-active");
        } else if (direction === "back" && i > current) {
          page.classList.add("is-leaving-back");
        }
      });
      dots.forEach((dot, i) => dot.classList.toggle("is-active", i === current));

      prevBtn.disabled = current === 0;
      nextBtn.textContent = current === pages.length - 1 ? "↺" : "→";
      nextBtn.setAttribute(
        "aria-label",
        current === pages.length - 1 ? "Start over" : "Next page"
      );
    }

    function goTo(index, direction) {
      current = Math.max(0, Math.min(pages.length - 1, index));
      render(direction);
    }

    prevBtn.addEventListener("click", () => goTo(current - 1, "back"));
    nextBtn.addEventListener("click", () => {
      if (current === pages.length - 1) {
        goTo(0, "back");
      } else {
        goTo(current + 1, "forward");
      }
    });

    document.addEventListener("keydown", (e) => {
      if (mainContent.hidden) return;
      if (e.key === "ArrowRight") goTo(Math.min(current + 1, pages.length - 1), "forward");
      if (e.key === "ArrowLeft") goTo(Math.max(current - 1, 0), "back");
    });

    render();
  }
})();
