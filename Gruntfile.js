/**
 * Gruntfile
 */

module.exports = function(grunt) {

	/**
	 * initConfig (grunt.config.init) configuration for tasks
	 */
	grunt.initConfig({
		
		// MultiTask config. options
		build: {
			
			// Two file groups defined for each distribution set
			angular: {
				src: ['bower_components/angular/angular.js',
				      'bower_components/angular-resource/angular-resource.js'],
				dest: 'dist/angular.js'
			},
			
			angularWithJquery: {
				src: ['bower_components/jquery/dist/jquery.js',
				      'bower_components/angular/angular.js',
				      'bower_components/angular-resource/angular-resource.js'],
				dest: 'dist/jquery-angular.js'
			}
		},
		
		uglify: {
			scripts: {
				files: {'dist/angular-min.js': 'dist/angular.js',
					    'dist/jquery-angular-min.js': 'dist/jquery-angular.js'
				}
			}
		},
		
		deployDirectory: './dist'
			
	});
	
	// Load Uglify plugin to minimise
	grunt.loadNpmTasks('grunt-contrib-uglify');
	
	
	/**
	 * Register a task to clean up the deploy directory
	 */
	grunt.registerTask('clean', 'Delete the deploy folder and its contents', function() {
		// Use the deployDirectory config. option
		grunt.config.requires('deployDirectory');
		// Delete the deploy directory with the built in grunt.file.delete task
		grunt.file.delete(grunt.config.get('deployDirectory'));
	});
	
	/**
	 * Concatenate the files in each build file group into two separate
	 * build files in the dist folder.
	 */
	grunt.registerMultiTask('build', 'Concatenate files', function() {
		
		this.requires('clean');
		
		var output = '';
		
		// this.filegroups is an array of filegroup elements
		this.files.forEach(function(filegroup) {
			// filegroup.src is an array of source files
			var sources = filegroup.src.map(function(file) {
				return (grunt.file.read(file));
			});
		output = sources.join(';');
		grunt.file.write(filegroup.dest, output);
		});
	});

	
	/**
	 * Default task will clean, concatenate and minify distributions
	 */
	grunt.registerTask('default', ['clean', 'build', 'uglify:scripts']);
};

