/**
 * Created by kishe56@gmail.com on 2018. 9. 17.
 * Blog : https://kishe89.github.io
 * Github : https://github.com/kishe89
 */
'use strict';

function Profile(document) {
  if (!(this instanceof Profile)) {
    throw new Error('must be created with new keyword');
  }
  this.view = document.getElementById('profile');
}

Profile.prototype.setName = function (name) {
  this.view.innerText = name;
};

Profile.prototype.getName = function () {
  return this.view.innerText;
};

module.exports = Profile;
//# sourceMappingURL=Profile.js.map