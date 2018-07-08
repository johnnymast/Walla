define(['pixi', 'gui/dialogs/DialogType'], function (pixi, DialogType) {
  let DefaultDialog = function (options) {
    DialogType.call(this, options)
    console.log('loaded')
  }

  extend(DefaultDialog, DialogType)

  return DefaultDialog
})
