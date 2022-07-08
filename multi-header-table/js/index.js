// https://davidwalsh.name/javascript-debounce-function
function _debounce(func, wait, immediate = false) {
  var timeout;

  return () => {
    var context = this;
    var args = arguments;
    var later = () => {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

// https://inclusive-components.design/data-tables/
function manageScrollableTable(el) {
  console.log('Registered!');

  var el = document.getElementsByClassName(el)[0];
  var containerWidth = el.clientWidth;
  var scrollWidth = el.scrollWidth;

  if (scrollWidth > containerWidth) {
    el.setAttribute("tabindex", 0);
    el.classList.add("js-scroll");
  } else {
    el.removeAttribute("tabindex");
    el.classList.remove("js-scroll");
  }
}

var debouncedResize = _debounce(() => {
  manageScrollableTable("c-table__container");
}, 500);

window.addEventListener("DOMContentLoaded", () => {
  manageScrollableTable("c-table__container");
});

window.addEventListener("resize", () => {
  debouncedResize();
});
