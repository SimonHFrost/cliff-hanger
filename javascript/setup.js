var PIXI = require('pixi.js')

function Setup() {
  var self = this
  var renderer = this._createRenderer()
  this.stage = new PIXI.Container()
  this._createBackground(this.stage, renderer)
  this._createAnimation(renderer, this.stage)
  var frames = this._prepareSpriteSheet(this.stage)
  setInterval(function() { self._createCharacter(frames) }, 1000)
}

Setup.prototype._createRenderer = function() {
  var renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight, { backgroundColor : 0x00BB00 })
  document.body.appendChild(renderer.view)
  return renderer
}

Setup.prototype._createBackground = function(stage, renderer) {
  var texture = PIXI.Texture.fromImage('images/grass.jpg')
  var tilingSprite = new PIXI.extras.TilingSprite(texture, renderer.width, renderer.height)

  setInterval(function() {
    tilingSprite.tilePosition.x -= 1
  }, 20)

  stage.addChild(tilingSprite)
}

Setup.prototype._createCharacter = function(frames) {
  var x = Math.random() * window.innerWidth
  var y = Math.random() * window.innerHeight

  var movie = new PIXI.extras.MovieClip(frames)
  movie.position = new PIXI.Point(-50, y)
  movie.anchor.set(0.5)
  movie.play()
  this.stage.addChild(movie)

  setInterval(function() {
    var distanceFromEnd = x - movie.position.x
    var scale = 0.1
    var offset = 0.25
    movie.animationSpeed = (0.005 * distanceFromEnd) * scale + offset
    if (movie.position.x < x) {
      movie.position.x = movie.position.x + distanceFromEnd * 0.01
    }
  }, 100)
}

Setup.prototype._prepareSpriteSheet = function(stage) {
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
