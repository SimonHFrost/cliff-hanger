module.exports = function(grunt) {

  grunt.initConfig({
    browserify: {
      'build/bundle.js': ['javascript/app.js'],
      options: {
        browserifyOptions: {
          debug: true
        }
      }
    }
  })

  grunt.loadNpmTasks('grunt-browserify')

}
