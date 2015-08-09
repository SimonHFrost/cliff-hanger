var PIXI = require('pixi.js')

function Setup() {
  var renderer = this._createRenderer()
  var stage = this._createStage()
  var bunny = this._createBunny()
  stage.addChild(bunny)
  this._createAnimation(renderer, stage, bunny)
  this._createEventHandling(bunny)
}

Setup.prototype._createRenderer = function() {
  var renderer = PIXI.autoDetectRenderer(800, 600, { backgroundColor : 0x1099bb })
  document.body.appendChild(renderer.view)
  return renderer
}

Setup.prototype._createStage = function() {
  return new PIXI.Container()
}

Setup.prototype._createBunny = function(stage) {
  var texture = PIXI.Texture.fromImage('images/bunny.png')
  var bunny = new PIXI.Sprite(texture)

  bunny.anchor.x = 0.5
  bunny.anchor.y = 0.5

  bunny.position.x = 200
  bunny.position.y = 150

  return bunny
}

Setup.prototype._createAnimation = function(renderer, stage, bunny) {
  animate()
  function animate() {
      requestAnimationFrame(animate)
      bunny.rotation += 0.1
      renderer.render(stage)
  }
}

Setup.prototype._createEventHandling = function(bunny) {
  document.onkeydown = function(event) {
    if (event.keyCode === 37) {
      bunny.position.x -= 1
    }

    if (event.keyCode === 39) {
      bunny.position.x += 1
    }
  }
}

module.exports = Setup
