import { keys } from "./constants.js";

function slice(nodes) {
  return Array.prototype.slice.call(nodes);
}

function RovingMultiselect(id, targetClass) {
  this.el = document.querySelector(id);
  this.listItems = slice(this.el.querySelectorAll(targetClass));
  this.selected = 0;
  this.focusedItem = this.listItems[this.selected];

  this.el.addEventListener('keydown', this.handleKeyDown.bind(this));
  // this.el.addEventListener('click', this.handleClick.bind(this));
};

RovingMultiselect.prototype.handleKeyDown = function(e) {
  switch(e.key) {
    case keys.LEFT:
    case keys.UP: {
      e.preventDefault();

      if (this.selected === 0) {
        this.selected = this.listItems.length - 1;
      } else {
        this.selected = this.selected - 1;
      }
      this.changeFocus(this.selected);
      break;
    }

    case keys.RIGHT:
    case keys.DOWN: {
      e.preventDefault();

      if(this.selected === this.listItems.length - 1) {
        this.selected = 0;
      } else {
        this.selected = this.selected + 1;
      }
      this.changeFocus(this.selected);
      break;
    }

    case keys.ENTER: {
      e.preventDefault();
      this.toggleChecked();
      break;
    }
  }
};

RovingMultiselect.prototype.toggleChecked = function() {
  if (this.focusedItem.getAttribute('aria-checked') === 'true') {
    this.focusedItem.setAttribute('aria-checked', 'false');
  } else {
    this.focusedItem.setAttribute('aria-checked', 'true');
  }
}

RovingMultiselect.prototype.changeFocus = function(idx) {
  // Set the old button to tabindex -1
  this.focusedItem.tabIndex = -1;
  this.focusedItem.setAttribute('aria-checked', 'false');
  this.focusedItem.setAttribute('aria-selected', 'false');
  this.focusedItem.classList.remove('roving-multiselect-list-item--selected');

  // Set the new button to tabindex 0 and focus it
  this.focusedItem = this.listItems[idx];
  this.focusedItem.tabIndex = 0;
  this.focusedItem.focus();
  this.focusedItem.setAttribute('aria-checked', 'true');
  this.focusedItem.setAttribute('aria-selected', 'true');
  this.focusedItem.classList.add('roving-multiselect-list-item--selected');
};

export default RovingMultiselect;