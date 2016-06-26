module.exports = function(grunt) {

	// Auto-Load Tasks
	require('load-grunt-tasks')(grunt);

	// Time Tasks.
	require('time-grunt')(grunt);

	// Read Package File
	var pkg = grunt.file.readJSON('package.json');

	/* CONFIGURE TASKS */
	grunt.initConfig({

		//WATCH
		watch: {
			sass: {
				files: ['src/sass/*.scss'],
				tasks: ['sass'],
				options: {
					livereload: true
				}
			},
			js: {
				files: ['src/scripts/*.js'],
				tasks: ['jshint','uglify'],
				options: {
					livereload: true
				}
			},
			html: {
				files: ['src/html/*.html'],
				tasks: ['copy:html'],
				options: {
					livereload: true
				}
			},
            data: {
				files: ['src/data/*.json'],
				tasks: ['copy:data'],
				options: {
					livereload: true
				}
            }
		},

		//CONNECT
		connect: {
            server: {
                options: {
                    port: 9999,
					hostname: '*',
                    base: 'app',
                    livereload: true,
                    open: true
                }
            }
		},

		//COPY
		copy: {
			data: {
				expand: true,
			    cwd: 'src/data',
				src: '**',
				dest: 'app/data/',
				flatten: true,
				filter: 'isFile'
			},
			html: {
				expand: true,
			    cwd: 'src/html',
				src: '**',
				dest: 'app/',
				flatten: true,
				filter: 'isFile'
			}
		},

		//SASS
		sass: {
            sass: {
                options: {
                    sourceMap: true,
                    style: 'compact'
                },
                files: [{
                    expand: true,
                    cwd: 'src/sass/',
                    src: ['*.scss'],
                    dest: 'app/css/',
                    ext: '.css',
                    extDot: 'last'
                }]
            }
        },

		//JSHINT
		jshint: {
			src: ['src/scripts/*.js']
		},

		//UGLIFY
		uglify: {
			js: {
    			options: {
    				sourceMap: true
    			},
				files: [{
					expand: true,
					cwd: 'src/scripts',
					src: '*.js',
					dest: 'app/scripts',
					ext: '.min.js'
				}]
			}
		}

	});
	/* END CONFIGURE TASKS */

	/* REGISTER TASKS */
	//"build"
	grunt.registerTask('build', [
		'sass',		//compile SASS & place in /app
		'jshint',	//check script(s)
		'uglify',	//minify JS & place in /app
        'copy'      //copy data & html to app
	]);

	//"serve" task
	grunt.registerTask('serve', [
		'build',	//build
		'connect',	//create and connect to the server
		'watch'     //watch for changes
	]);
	/* END REGISTER TASKS */

};
// END module.exports = function(grunt)
