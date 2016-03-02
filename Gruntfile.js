module.exports = function(grunt) {
	grunt.initConfig({
		copy: {
			dist: {
				"files": [{
			        "expand": true,
			        "cwd": "src",
			        "src": ["*.js"],
			        "dest": "dist",
			        "flatten": true
			    }]
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.registerTask('default', ['copy']);
};