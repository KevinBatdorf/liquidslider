module.exports = function (grunt) {

	grunt.initConfig({
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
				banner: "/*\n *  Liquid Slider v2.0.12\n *  Copyright 2012 Kevin Batdorf\n *  http://liquidslider.com\n *  MIT license\n */"
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
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', ['jshint', 'uglify', 'watch']);

};