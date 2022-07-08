// https://davidwalsh.name/javascript-debounce-function
function _debounce(func, wait, immediate) {
  var timeout;
  return function() {
    var context = this,
      args = arguments;
    var later = function() {
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
function manageAriaScrollable(el) {
  var el = document.getElementsByClassName(el)[0];
  var containerWidth = el.clientWidth;
  var scrollWidth = el.scrollWidth;

  if (scrollWidth > containerWidth) {
    el.setAttribute("tabindex", 0);
    el.setAttribute("role", "group");
    el.classList.add("js-scroll");
  } else {
    el.removeAttribute("tabindex");
    el.removeAttribute("role");
    el.classList.remove("js-scroll");
  }
}

var debouncedResize = _debounce(function() {
  manageAriaScrollable("c-table__container");
}, 500);

window.addEventListener("DOMContentLoaded", function() {
  manageAriaScrollable("c-table__container");
});

window.addEventListener("resize", function() {
  debouncedResize();
});
