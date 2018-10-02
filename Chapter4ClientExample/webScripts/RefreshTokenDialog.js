/**
 * Created by kishe56@gmail.com on 2018. 9. 17.
 * Blog : https://kishe89.github.io
 * Github : https://github.com/kishe89
 */
'use strict';

function RefreshTokenDialog(document) {
  if(!(this instanceof RefreshTokenDialog)){
    throw new Error('must be created with new keyword');
  }
  this.view = document.getElementById('refreshTokenDialogWrapper');
}

RefreshTokenDialog.prototype.show = function () {
  this.view.classList.toggle('show');
};

module.exports = RefreshTokenDialog;