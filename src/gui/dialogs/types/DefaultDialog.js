define(['pixi', 'gui/dialogs/types/BaseDialog'], function (pixi, BaseDialog) {
  let DefaultDialog = function (options) {
    BaseDialog.call(this, options)
    console.log('loaded')
  }

  extend(DefaultDialog, BaseDialog)

  return DefaultDialog
})
