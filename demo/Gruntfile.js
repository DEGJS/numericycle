module.exports = function(grunt) {
	grunt.initConfig({
		jspm: {
	        options: {
	            sfx: true,
	            minify: true,
	            mangle: true
	        },
	        dist: {
	            files: {
	                "dist/js/demo-bundle.js": "src/js/demo.js"
	            }
	        }
	    },

	    postcss: {
	    	options: {
	            map: false,
	            processors: [
	                require("postcss-import")(),	                
	                require("postcss-custom-properties")(),	  
	                require("postcss-nested")(),
	                require("autoprefixer")({
	                    browsers: 'last 2 versions'
	                }),
	                require('csswring')
	            ]
	        },
	        dist: {
	            expand: true,
	            cwd: 'src/css',
	            src: ['style.css'],
	            dest: 'dist/css',
	            ext: '.css'
	        }
	    },

		copy: {
			dist: {
				"files": [{
			        "expand": true,
			        "cwd": "src",
			        "src": ["*.html"],
			        "dest": "dist",
			        "flatten": true
			    }]
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-jspm');
	grunt.loadNpmTasks('grunt-postcss');
	grunt.registerTask('default', ['copy', 'postcss', 'jspm']);
};