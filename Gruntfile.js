var grunt = require("grunt");
grunt.loadNpmTasks('grunt-coffeelint');
grunt.loadNpmTasks('grunt-contrib-coffee');
grunt.loadNpmTasks('grunt-contrib-jasmine');
grunt.loadNpmTasks('grunt-browserify');
grunt.loadNpmTasks('grunt-release');
grunt.loadNpmTasks('grunt-jasmine-node');
grunt.loadNpmTasks('grunt-contrib-watch');

grunt.initConfig({
  coffeelint: {
    app: ['src/**/*.coffee', '*.coffee'],
    options: {
      'max_line_length': {
        level: 'ignore'
      },
      'no_backticks': {
        'level': 'ignore'
      }
    }
  },
  watch: {
    scripts: {
      files: ['src/**/*.{coffee,js}', '*.{coffee,js}',
        'tests/*.{coffee,js}'
      ],
      tasks: ['all'],
      options: {
        spawn: false
      }
    }
  },
  coffee: {
    multiple: {
      options: {
        sourceMap: true,
        sourceMapDir: 'compiled/maps/'
      },
      expand: true,
      cwd: 'src',
      src: '**/*.coffee',
      dest: 'compiled/',
      ext: '.js'
    }
  },
  jasmine: {
    src: ['tests/target/patternmatching-with-tests.js']
  },
  browserify: {
    dist: {
      files: {
        'dist/index.js': ['compiled/core/index.js']
      }
    },
    testCore: {
      files: {
        'tests/target/patternmatching-with-tests.js': [
          'tests/*.js'
        ]
      }
    }
  }
});
grunt.registerTask("all", ["all-coffee", "browserify:dist",
  "browserify:testCore","test"]);
grunt.registerTask("all-coffee", [ "coffee:multiple","coffeelint"]);
grunt.registerTask("default", ["all","watch"]);
grunt.registerTask("test", ["jasmine"]);
