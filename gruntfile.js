/* globals module, require */
module.exports = function (grunt) {
    "use strict";
    const sass = require('node-sass');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            dist: {
                files: {
                    'dist/nudge.min.js': ['src/nudge.js']
                }
            }
        },
        sass: {
            options: {
                implementation: sass,
                outputStyle: 'compressed'
            },
            dist: {
                files: {
                    'dist/nudge.min.css': ['src/nudge.scss'],
                    'dist/themes/lite.min.css': ['src/nudge-lite.scss']
                }
            }
        },
        postcss: {
            options: {
                processors: [
                    require('autoprefixer')()
                ]
            },
            dist: {
                src: ['dist/*.css', 'src/*.css']
            }
        },
        watch: {
            scripts: {
                files: ['src/**/*.js'],
                tasks: ['newer:uglify'],
                options: {
                    spawn: false
                }
            },
            styles: {
                files: ['src/**/*.scss'],
                tasks: ['newer:sass', 'newer:postcss'],
                options: {
                    spawn: false
                }
            }
        }
    });

    // Load the plugins
    grunt.loadNpmTasks('grunt-newer');
    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
};
