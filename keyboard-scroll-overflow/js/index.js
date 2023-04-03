const containers = [...document.querySelectorAll(".cd-content-container")];

containers.forEach((container, i) => {
  if (!container.clientHeight || !container.scrollHeight) return;

  if (container.scrollHeight <= container.clientHeight) return;

  container.setAttribute("tabindex", "0");
  container.style["overflow-y"] = "auto";
});
