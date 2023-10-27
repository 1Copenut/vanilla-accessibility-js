/**
 * I wrote the script, and got help from these fine articles:
 * https://inclusive-components.design/collapsible-sections/
 * https://gomakethings.com/detecting-click-events-on-svgs-with-vanilla-js-event-delegation/
 */

/**
 * @param {string} buttonElems CSS selector for buttons to trigger accordion.
 * @param {string} contentElems CSS selector for content blocks. Typically a DIV or SPAN.
 */
function Accordion(buttonElems, contentElems) {
  const buttons = [...document.querySelectorAll(buttonElems)];
  const contentBlocks = [...document.querySelectorAll(contentElems)];

  buttons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const targetButton = e.target;
      let targetExpanded =
        targetButton.getAttribute("aria-expanded") === "true" || false;

      targetButton.setAttribute("aria-expanded", !targetExpanded);
      this.toggleContent(targetButton, targetExpanded);
    });
  });

  contentBlocks.forEach((block) => {
    block.addEventListener("blur", (e) => {
      e.target.removeAttribute("tabindex");
    });
  });
}

/**
 *
 * @param {HTMLButtonElement} target Button that fired the click event.
 * @param {boolean} isContentHidden Is sibling content block hidden?
 */
Accordion.prototype.toggleContent = function (target, isContentHidden) {
  const container = target.nextElementSibling;
  container.toggleAttribute("hidden");

  if (!isContentHidden) {
    container.setAttribute("tabindex", "-1");
    container.focus();
  }
};

export default Accordion;
