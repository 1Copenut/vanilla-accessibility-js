function _removeTabIndex(elem) {
  if (!elem) throw new Error("A DOM element must be passed as an argument");
  elem.addEventListener("blur", () => elem.removeAttribute("tabindex"));
}

function handleScrollEvent(targetId) {
  const skipLink = document.getElementById(targetId);

  skipLink.addEventListener("click", (e) => {
    console.log("I'd rather be scrolling");
    const hash = e.target.hash;
    const target = document.querySelector(hash);

    e.preventDefault();
    target.scrollIntoView();
    target.setAttribute("tabindex", "-1");
    target.focus({ preventScroll: true });

    _removeTabIndex(target);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  handleScrollEvent("skip-link");
});
