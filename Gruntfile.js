/*jshint es5: false */
/*jshint esversion: 6 */

module.exports = function (grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      // All gz*.js files
      build_src: {
        src: ['src/gz3d/*.js'],
        dest: 'build/gz3d/gz3d.src.js'
      },
      // * All src except for GUI-related
      // * All needed dependencies
      build_gz3d: {
        src: ['src/client/js/include/three.js',
          'src/client/js/include/three.compat.js',
          'src/client/js/include/*.js',
          '!src/client/js/include/three.min.js',
          '!src/client/js/include/stats.min.js',
          '!src/client/js/include/roslib.min.js',
          '!src/client/js/include/jquery-1.9.1.js',
          '!src/client/js/include/jquery.mobile-1.4.0.min.js',
          '!src/client/js/include/angular.min.js',
          '!src/client/js/include/',
          'src/gz3d/gz*.js',
          '!src/gz3d/gzgui.js',
          '!src/gz3d/gzlogplay.js',
          '!src/gz3d/gzradialmenu.js',
        ],
        dest: 'build/gz3d/gz3d.js'
      },
      // * All src including GUI
      // * All needed dependencies
      build_gui: {
        src: ['src/client/js/include/three.js',
          'src/client/js/include/three.compat.js',
          'src/client/js/include/*.js',
          '!src/client/js/include/three.min.js',
          '!src/client/js/include/stats.min.js',
          '!src/client/js/include/roslib.min.js',
          '!src/client/js/include/',
          'src/gz3d/gz*.js',
        ],
        dest: 'build/gz3d/gz3d.gui.js'
      }
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      files: [
        'Gruntfile.js',
        'build/gz3d/gz3d.src.js'
      ]
    },
    uglify: {
      options: {
        report: 'min'
      },
      build_src: {
        src: 'build/gz3d/gz3d.js',
        dest: 'build/gz3d/gz3d.min.js'
      },
      build_gz3d: {
        src: 'build/gz3d/gz3d.js',
        dest: 'build/gz3d/gz3d.min.js'
      },
      build_gui: {
        src: 'build/gz3d/gz3d.gui.js',
        dest: 'build/gz3d/gz3d.gui.min.js'
      }
    },
    watch: {
      dev: {
        options: {
          interrupt: true
        },
        files: [
          'src/gz3d/*.js',
          'src/gz3d/**/*.js'
        ],
        tasks: ['concat']
      },
      build_and_watch: {
        options: {
          interrupt: true
        },
        files: [
          'Gruntfile.js',
          '.jshintrc',
          'src/gz3d/*.js',
          'src/gz3d/**/*.js'
        ],
        tasks: ['build']
      }
    },
    clean: {
      options: {
        force: true
      },
      doc: ['doc']
    },
    copy: {
      main: {
        files: [
          {
            expand: true,
            cwd: 'src',
            src: ['client/**'],
            dest: 'http',
          },
          {
            expand: true,
            flatten: true,
            src: ['build/gz3d/gz3d.gui.js'],
            dest: 'http/client',
          },
        ]
      },
      local_models: {
        files: process.env.GAZEBO_MODEL_PATH
          .split(':')
          .filter(folder => folder !== '')
          .map(folder => ({
            expand: true,
            cwd: folder,
            src: '**',
            dest: 'http/client/assets/models',
          })),
      },
      local_resources: {
        files: process.env.GAZEBO_RESOURCE_PATH
          .split(':')
          .filter(folder => folder !== '')
          .map(folder => ({
            expand: true,
            cwd: folder,
            src: 'media/**',
            dest: 'http/client/assets',
          })),
      },
    },
    jsdoc: {
      jsdoc: './node_modules/.bin/jsdoc',
      doc: {
        src: [
          'src/gz3d/*.js',
          'src/gz3d/**/*.js'
        ],
        options: {
          destination: 'doc'
        }
      }
    },
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify-es');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-jsdoc');

  grunt.registerTask('dev', ['concat', 'watch']);
  grunt.registerTask('build', ['concat', 'jshint', 'uglify', 'copy']);
  grunt.registerTask('build_and_watch', ['watch']);
  grunt.registerTask('doc', ['clean', 'jsdoc']);
};
