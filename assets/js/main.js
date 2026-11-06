(() => {
  const $ = (selector, root = document) => root.querySelector(selector);
  const nav = $("#mainNav");
  const menu = $("#mobileMenu");
  const overlay = $("#searchOverlay");
  const searchInput = $("#siteSearch");
  const searchStatus = $("#searchStatus");

  menu?.addEventListener("click", () => {
    const opened = nav.classList.toggle("open");
    menu.setAttribute("aria-expanded", String(opened));
  });
  nav?.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
    nav.classList.remove("open");
    menu?.setAttribute("aria-expanded", "false");
  }));

  const savedTheme = localStorage.getItem("thorn-theme");
  if (savedTheme === "dark") document.body.classList.add("dark");
  $("#themeToggle")?.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    localStorage.setItem("thorn-theme", document.body.classList.contains("dark") ? "dark" : "light");
  });

  $("#currentYear").textContent = new Date().getFullYear();
  const openSearch = () => {
    overlay.classList.add("open");
    overlay.setAttribute("aria-hidden", "false");
    searchInput.focus();
  };
  const closeSearch = () => {
    overlay.classList.remove("open");
    overlay.setAttribute("aria-hidden", "true");
    searchInput.value = "";
    document.querySelectorAll(".searchable").forEach(item => item.hidden = false);
    searchStatus.textContent = "输入关键词，快速筛选首页内容。";
  };
  $("#searchOpen")?.addEventListener("click", openSearch);
  $("#searchClose")?.addEventListener("click", closeSearch);
  overlay?.addEventListener("click", event => { if (event.target === overlay) closeSearch(); });
  document.addEventListener("keydown", event => { if (event.key === "Escape") closeSearch(); });

  searchInput?.addEventListener("input", () => {
    const keyword = searchInput.value.trim().toLocaleLowerCase();
    const targets = [...document.querySelectorAll(".update-item,.project-card,.tag-cloud a,.resource-links a")];
    let matches = 0;
    targets.forEach(item => {
      const matched = !keyword || item.textContent.toLocaleLowerCase().includes(keyword);
      item.hidden = !matched;
      if (matched) matches++;
    });
    searchStatus.textContent = keyword ? `找到 ${matches} 条匹配内容。` : "输入关键词，快速筛选首页内容。";
  });
})();