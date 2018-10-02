/**
 * Created by kishe56@gmail.com on 2018. 9. 17.
 * Blog : https://kishe89.github.io
 * Github : https://github.com/kishe89
 */
'use strict';

function Button(element) {
  if (!(this instanceof Button)) {
    throw Error('must be created with new keyword');
  }
  this.view = element;
  this.eventListener = undefined;
}

Button.prototype.setEventListener = function (listener) {
  if (this.eventListener) {
    this.view.removeEventListener('click', this.eventListener);
  }
  this.eventListener = listener;
  this.view.addEventListener('click', this.eventListener);
};

module.exports = Button;
//# sourceMappingURL=Button.js.map
//# sourceMappingURL=Button.js.map