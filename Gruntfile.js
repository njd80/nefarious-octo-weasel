/**
* Grunt Configuration
*/
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
				files: ['css/*.scss'],
				tasks: ['sass','cssmin'],
				options: {
					livereload: '<%=connect.options.livereload %>'
				}
			},
			js: {
				files: ['scripts/*.js','!scripts/*.min.*'],
				tasks: ['jshint','uglify'],
				options: {
					livereload: '<%=connect.options.livereload %>'
				}
			},
			html: {
				files: ['*.html'],
				options: {
					livereload: '<%=connect.options.livereload %>'
				}
			}
		},

		//CONNECT
		connect: {
			options: {
				port: 9999,
				hostname: '*',
				livereload: true
			},
			livereload: {
				options: {
					open: true
				}
			}
		},

		//SASS
		sass: {
			css: {
				options: {
					sourcemap: 'none'
				},
				files: {
					'css/styles.css':'css/styles.scss'
				}
			}
		},

		//JSHINT
		jshint: {
			src: ['scripts/*.js', '!scripts/*.min.js']
		},

		//UGLIFY
		uglify: {
			options: {
				sourceMap: true
			},
			js: {
				files: [{
					expand: true,
					cwd: 'scripts',
					src: '*.js',
					dest: 'scripts',
					ext: '.min.js'
				}]
			}
		},

		//CSSMIN
		cssmin: {
			options: {
				sourceMap: true
			},
			css: {
				files: {
					'css/styles.min.css':'css/styles.css'
				}
			}
		}

	});
	/* END CONFIGURE TASKS */

	/* REGISTER TASKS */
	//"build"
	grunt.registerTask('build', [
		'sass',					//compile the SASS files
		'cssmin',				//minify the generated CSS
		'jshint',				//check script syntax
		'uglify'				//minify the JS files
	]);

	//"serve" task
	grunt.registerTask('serve', [
		'build',            	//build
		'connect:livereload',   //create and connect to the server
		'watch'                 //watch for changes
	]);
	/* END REGISTER TASKS */

};
// END module.exports = function(grunt)