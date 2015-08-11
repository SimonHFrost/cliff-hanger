var PIXI = require('pixi.js')

function Setup() {
  var renderer = this._createRenderer()
  var stage = this._createStage()
  this._createAnimation(renderer, stage)
  this._createBraid(stage)
}

Setup.prototype._createRenderer = function() {
  var renderer = PIXI.autoDetectRenderer(screen.width, screen.height, { backgroundColor : 0x00FF00 })
  document.body.appendChild(renderer.view)
  return renderer
}

Setup.prototype._createStage = function() {
  return new PIXI.Container()
}

Setup.prototype._createBraid = function(stage) {
    var loopTime = 500

    PIXI.loader
      .add('images/braid.json')
      .load(function() {
        var frames = []
        for (var i = 0; i < 26; i++) {
          frames.push(PIXI.Texture.fromFrame('sprite' + i + '.png'))
        }

        function doIt() {
          var movie = new PIXI.extras.MovieClip(frames)

          var x = Math.random() * screen.width
          var y = Math.random() * screen.height

          movie.position = new PIXI.Point(x, y)
          movie.anchor.set(0.5)
          movie.animationSpeed = 0.5
          movie.play()

          stage.addChild(movie)
        }

        setInterval(doIt, loopTime)
        loopTime = loopTime - 10
      })

}

Setup.prototype._createAnimation = function(renderer, stage) {
  animate()
  function animate() {
    requestAnimationFrame(animate)
    renderer.render(stage)
  }
}

module.exports = Setup
