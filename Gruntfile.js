module.exports = function(grunt) {

  grunt.initConfig({
    browserify: {
      'build/bundle.js': ['javascript/app.js']
    }
  })

  grunt.loadNpmTasks('grunt-browserify')

}
