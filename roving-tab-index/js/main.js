// TODO: Refactor to modules: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules

(function() {
  'use strict';

  // Define keycodes
  const keys = {
    LEFT: 'ArrowLeft',
    UP: 'ArrowUp',
    RIGHT: 'ArrowRight',
    DOWN: 'ArrowDown',
  };

  function slice(nodes) {
    return Array.prototype.slice.call(nodes);
  }

  function RovingIndex(id) {
    this.el = document.querySelector(id);
    this.listItems = slice(this.el.querySelectorAll('.roving-list-item'));
    this.selected = 0;
    this.focusedItem = this.listItems[this.selected];

    this.el.addEventListener('keydown', this.handleKeyDown.bind(this));
    this.el.addEventListener('click', this.handleClick.bind(this));
  };

  RovingIndex.prototype.handleClick = function(e) {
    const children = e.target.parentNode.children;

    for (let i = 0; i < children.length; i++) {
      if (e.target === children[i]) {
        this.selected = i;
        this.changeFocus(this.selected);
      }
    }
  };

  RovingIndex.prototype.handleKeyDown = function(e) {
    switch(e.key) {
      case keys.LEFT:
      case keys.UP: {
        e.preventDefault();

        if (this.selected === 0) {
          this.selected = this.listItems.length - 1;
        } else {
          this.selected = this.selected - 1;
        }
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
        break;
      }
    }
    this.changeFocus(this.selected);
  };

  RovingIndex.prototype.changeFocus = function(idx) {
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
  };

  const rovingIndex = new RovingIndex('#list-group-1');
}());