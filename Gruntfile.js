module.exports = function (grunt) {

	grunt.initConfig({
		version: '2.3.8',
		jshint: {
			options: {
				browser: true,
				eqeqeq: true,
				undef: true,
				unused: true,
				jquery: true,
				expr: true
			},
			main: {
				src: "src/js/jquery.liquid-slider.js"
			}
		},
		uglify: {
			options: {
				mangle: true,
				compress: true,
				sourceMap: false,
				banner: "/*\n *  Liquid Slider <%= version %>\n *  Copyright 2012 Kevin Batdorf\n *  http://liquidslider.com\n *  MIT license\n */"
			},
			main: {
				src: "src/js/jquery.liquid-slider.js",
				dest: "js/jquery.liquid-slider.min.js"
			}
		},
		watch: {
			scripts: {
				files: ["src/js/jquery.liquid-slider.js"],
				tasks: ["jshint", "uglify"],
				options: {
					livereload: true
				}
			},
			html: {
				files: ["src/index.html"],
				tasks: ["jshint", "uglify"],
				options: {
					livereload: true
				}
			},
			config: {
				files: ['Gruntfile.js'],
				tasks: ["jshint", "uglify"]
			}
		},
		bump: {
	    options: {
	      files: ['./*.json', 'Gruntfile.js'],
	      updateConfigs: ['version'],
	      tagName: "%VERSION%",
	      commit: false,
	      push:false,
	      createTag:false
	    }
	  },
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-bump');

	grunt.registerTask('default', ['jshint', 'uglify', 'watch']);

};