/**
 * I wrote the script, and got help from these fine articles:
 * https://inclusive-components.design/collapsible-sections/
 * https://gomakethings.com/detecting-click-events-on-svgs-with-vanilla-js-event-delegation/
 */

/**
 * @param {string} elems CSS selector. Will be converted into an array of DOM Elements.
 */
function Accordion(elems) {
  const buttons = [...document.querySelectorAll(elems)];

  buttons.forEach(button => {
    button.addEventListener('click', e => {
      const targetButton = e.target;
      let targetExpanded = targetButton.getAttribute('aria-expanded') === 'true' || false;

      targetButton.setAttribute('aria-expanded', !targetExpanded);
      this.toggleContent(targetButton, targetExpanded);
    })
  })
}

Accordion.prototype.toggleContent = function(target, isContentHidden) {
  const container = target.nextElementSibling;
  container.toggleAttribute('hidden');
  
  if(isContentHidden) {
    container.closest('tr').removeAttribute('style');
  } else {
    this.setParentRowHeight(container);
  }
}

Accordion.prototype.setParentRowHeight = function(container) {
  const containerHeight = container.clientHeight;
  const parentRow = container.closest('tr');

  parentRow.setAttribute('style', `height: ${containerHeight + 30}px`);
}

export default Accordion;
