import slice from '../helpers/slice.js';
import uniqueId from '../helpers/uniqueId.js';
import { keys } from "../constants/constants.js";

function RovingTabindex(id, targetClass) {
  this.el = document.querySelector(id);
  this.listItems = slice(this.el.querySelectorAll(targetClass));
  this.selected = 0;
  this.focusedItem = this.listItems[this.selected];
  this.createUniqueId(this.listItems);
  
  this.el.addEventListener('keydown', this.handleKeyDown.bind(this));
  this.el.addEventListener('click', this.handleClick.bind(this));
};

RovingTabindex.prototype.handleClick = function(e) {
  const children = e.target.parentNode.children;

  for (let i = 0; i < children.length; i++) {
    if (e.target === children[i]) {
      this.selected = i;
      this.changeFocus(this.selected);
    }
  }
};

RovingTabindex.prototype.handleKeyDown = function(e) {
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
  }
};

RovingTabindex.prototype.createUniqueId = function(listItems) {
  listItems.forEach(item => {
    item.setAttribute('id', uniqueId('select'));
  });
}

RovingTabindex.prototype.changeFocus = function(idx) {
  const parent = this.focusedItem.parentNode;

  // Set the old button to tabindex -1
  this.focusedItem.tabIndex = -1;
  this.focusedItem.setAttribute('aria-checked', 'false');
  this.focusedItem.setAttribute('aria-selected', 'false');
  this.focusedItem.classList.remove('roving-list-item--selected');

  // Set the new button to tabindex 0 and focus it
  this.focusedItem = this.listItems[idx];
  this.focusedItem.tabIndex = 0;
  this.focusedItem.focus();
  this.focusedItem.setAttribute('aria-checked', 'true');
  this.focusedItem.setAttribute('aria-selected', 'true');
  this.focusedItem.classList.add('roving-list-item--selected');
  parent.setAttribute('aria-activedescendant', this.focusedItem.getAttribute('id'));
};

export default RovingTabindex;