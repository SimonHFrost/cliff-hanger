var PIXI = require('pixi.js')

function Setup() {
  var self = this
  var renderer = this._createRenderer()
  this.stage = new PIXI.Container()
  this._createAnimation(renderer, this.stage)
  var frames = this._createBraid(this.stage)
  setInterval(function() { self._createImageWithText(frames) }, 1000)
}

Setup.prototype._createRenderer = function() {
  var renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight, { backgroundColor : 0x00BB00 })
  document.body.appendChild(renderer.view)
  return renderer
}

Setup.prototype._createImageWithText = function(frames) {
  var x = Math.random() * window.innerWidth
  var y = Math.random() * window.innerHeight

  var movie = new PIXI.extras.MovieClip(frames)
  movie.position = new PIXI.Point(x, y)
  movie.anchor.set(0.5)
  movie.play()
  this.stage.addChild(movie)

  setInterval(function() {
    var distanceFromEnd = window.innerWidth - movie.position.x
    movie.animationSpeed = 0.005 * distanceFromEnd
    movie.position.x = movie.position.x + distanceFromEnd * 0.01
  }, 100)

  if ( Math.random() > 0.5) {
    this._createText(movie, x + 50, y - 50)
  }
}

Setup.prototype._createText = function(movie, x, y) {
  var textConfig = {
    font: 'bold 16px Arial',
    stroke: '#FFFFFF',
    strokeThickness: 5
  }
  var text = new PIXI.Text('Did someone say bacon pancakes?', textConfig)
  text.position = new PIXI.Point(50, -50)
  movie.addChild(text)
}

Setup.prototype._createBraid = function(stage) {
  var self = this
  var frames = []

  PIXI.loader
    .add('images/braid.json')
    .load(function() {
      for (var i = 0; i < 26; i++) {
        frames.push(PIXI.Texture.fromFrame('sprite' + i + '.png'))
      }
    })

  return frames
}

Setup.prototype._createAnimation = function(renderer, stage) {
  animate()
  function animate() {
    requestAnimationFrame(animate)
    renderer.render(stage)
  }
}

module.exports = Setup
