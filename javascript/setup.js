var PIXI = require('pixi.js')

function Setup() {
  var renderer = this._createRenderer()
  var stage = this._createStage()
  this._createAnimation(renderer, stage)
  this._createBraid(stage)
}

Setup.prototype._createRenderer = function() {
  var renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight, { backgroundColor : 0x00BB00 })
  document.body.appendChild(renderer.view)
  return renderer
}

Setup.prototype._createStage = function() {
  return new PIXI.Container()
}

Setup.prototype._createBraid = function(stage) {
    var loopTime = 1000

    PIXI.loader
      .add('images/braid.json')
      .load(function() {
        var frames = []
        for (var i = 0; i < 26; i++) {
          frames.push(PIXI.Texture.fromFrame('sprite' + i + '.png'))
        }

        function doIt() {
          var x = Math.random() * window.innerWidth
          var y = Math.random() * window.innerHeight

          var movie = new PIXI.extras.MovieClip(frames)
          movie.position = new PIXI.Point(x, y)
          movie.anchor.set(0.5)
          movie.animationSpeed = 0.5
          movie.play()
          stage.addChild(movie)

          if ( Math.random() > 0.5) {
            var textConfig = {
              font: 'bold 16px Arial',
              stroke: '#FFFFFF',
              strokeThickness: 5
            }
            var text = new PIXI.Text('Did someone say bacon pancakes?', textConfig)
            text.position = new PIXI.Point(x + 50, y - 50)
            stage.addChild(text)
          }
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
