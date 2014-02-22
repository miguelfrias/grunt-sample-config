'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    // @see http://www.jshint.com/docs/options/
    jshint: {
      // Files that jshint will watch
      files: ['js/src/controllers/*.js', 'js/src/models/*.js'],
      options: {
        curly: true,
        eqeqeq: true,
        browser: true,
        bitwise: true,
        camelcase: true,
        forin: true,
        indent: 4,
        latedef: 'nofunc',
        newcap: true,
        nonbsp: true,
        nonew: true,
        quotmark: 'single',
        undef: true,
        trailing: true,
        devel: true,
        jquery: true,
        globals: {
          Kinetic: true,
          Upload: true,
          Glass: true,
        },
        // Ignore error w040. Refer to asign 'this' to variables
        '-W040': true,
      },
    },

    concat: {
      prod: { // Target
        // Multiple files
        files: {
          'build/libs.pkg.js': ['js/src/libs/*.js'],
          'build/app.pkg.js': ['js/src/models/*.js', 'js/src/controllers/*.js'],
          'build/styles.pkg.css': ['css/*.css']
        },
      },
    },

    uglify: {
      options: {
        mangle: false, // Do not change variable names
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("dd-mm-yyyy") %> */\n',
        report: 'min',
      },
      prod: {
	// Multiple files
        files: {
          'build/libs.pkg.min.js': ['build/libs.pkg.js'],
          'build/app-<%= pkg.version %>.pkg.min.js': ['build/app.pkg.js'],
        },
      },
    },

    cssmin: {
      options: {
        banner: '/*! CSSMin <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("dd-mm-yyyy") %> */\n',
        report: 'min',
      },
      prod: {
        files: {
          'build/styles.pkg.min.css': ['build/styles.pkg.css'],
        },
      },
    },

    imagemin: {
      options: {
        optimizationLevel: 1, // Recommended level by imageoptim
      },
      prod: {
        files: [{
          expand: true,
          cwd: 'images/',
          src: ['*.{jpg,png,gif}', '**/*.{jpg,png,gif}'],
        }],
      },
    },

    watch: {
      options: {
        interrupt: true,
        atBegin: true, // Run task at first run
        livereload: true,
      },
      scripts: {
        files: ['js/src/**/*.js'],
        tasks: ['jshint'],
      },
    },
  });

  // Load plugins
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask('default', ['jshint']);

  grunt.registerTask('prod', ['jshint', 'concat:prod', 'uglify:prod', 'cssmin:prod', 'imagemin:prod']);
};
