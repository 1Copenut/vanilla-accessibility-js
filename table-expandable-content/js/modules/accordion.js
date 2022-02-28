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
  console.log(target.nextElementSibling);
  const text = target.nextElementSibling;
  text.toggleAttribute('hidden');
}

export default Accordion;
