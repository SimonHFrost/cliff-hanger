module.exports = function(grunt) {

  grunt.initConfig({
    browserify: {
      'build/bundle.js': ['app.js']
    }
  })

  grunt.loadNpmTasks('grunt-browserify')

}
