var PIXI = require('pixi.js')

function Setup() {
  var renderer = this._createRenderer()
  var stage = this._createStage()
  var bunny = this._createBunny()
  stage.addChild(bunny)
  this._createAnimation(renderer, stage, bunny)
  this._createEventHandling(bunny)
  this._createBraid(stage)
}

Setup.prototype._createRenderer = function() {
  var renderer = PIXI.autoDetectRenderer(800, 600, { backgroundColor : 0xFFFFFF })
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

Setup.prototype._createBraid = function(stage) {
  PIXI.loader
    .add('images/braid.json')
    .load(function() {
      var frames = []
      for (var i = 0; i < 26; i++) {
        frames.push(PIXI.Texture.fromFrame('sprite' + i + '.png'))
      }

      movie = new PIXI.extras.MovieClip(frames)
      movie.position.set(300)
      movie.anchor.set(0.5)
      movie.animationSpeed = 0.5
      movie.play()

      stage.addChild(movie)
    })
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
