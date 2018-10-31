define(['pixi', 'gui/dialogs/BaseDialog'], function (pixi, BaseDialog) {
  let DefaultDialog = function (options) {
    BaseDialog.call(this, options)
  }

  extend(DefaultDialog, BaseDialog)

  DefaultDialog.prototype.init = function () {
    // empty
  }

  return DefaultDialog
})
