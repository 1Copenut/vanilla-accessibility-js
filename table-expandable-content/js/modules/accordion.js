function Accordion(elems) {
  const buttons = [...document.querySelectorAll(elems)];

  buttons.forEach(button => {
    button.addEventListener('click', e => {
      e.preventDefault();
      const targetButton = e.target;
      
      this.toggleContent(targetButton);
    })
  })
}

Accordion.prototype.toggleContent = function(target) {
  const container = target.nextElementSibling;
  
  container.toggleAttribute('hidden');
  
  if(!container.hasAttribute('hidden')) {
    this.setParentRowHeight(container);
  } else {
    container.closest('tr').removeAttribute('style');
  }
}

Accordion.prototype.setParentRowHeight = function(container) {
  const containerHeight = container.clientHeight;
  const parentRow = container.closest('tr');
  const parentRowHeight = container.closest('tr').clientHeight;

  console.log(`Hidden content height: ${containerHeight} px`);
  console.log(`Parent row height: ${parentRowHeight} px`);

  parentRow.setAttribute('style', `height: ${containerHeight + 20}px`);
}

export default Accordion;
