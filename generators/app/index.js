'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var path = require('path');
var _ = require('lodash');

module.exports = yeoman.generators.Base.extend({
  constructor: function () {
    yeoman.generators.Base.apply(this, arguments);
    
    this.argument('appname', { type: String, required: false });
    
    this.option('skip-install', {
      desc:     'Whether dependencies should be installed',
      defaults: false,
    });

    this.option('skip-install-message', {
      desc:     'Whether commands run should be shown',
      defaults: false,
    });
    
    this.sourceRoot(path.join(path.dirname(this.resolved), 'templates'));
  },
  
  init: function () {
    this.appname = this.appname || path.basename(process.cwd());
    this.appname = _.kebabCase(this.appname);
    
    console.log(this.appname);
  },
  
  askFor: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the stupendous ' + chalk.red('JSPM Angular') + ' generator!'
    ));

    var prompts = [
      {
        type: 'input',
        name: 'ghUser',
        message: 'What is your GitHub username?'
      }
    ];

    this.prompt(prompts, function (props) {
      this.ghUser = props.ghUser;

      done();
    }.bind(this));
  },

  app: function () {
    this.template('_package.json', 'package.json');
    this.template('_README.md', 'README.md');
    this.template('_index.html', 'index.html');
    
    this.copy('jspm.config.js', 'jspm.config.js');
    this.copy('editorconfig', '.editorconfig');
    this.copy('gitignore', '.gitignore');
    this.copy('tslint.json', 'tslint.json');
    this.copy('LICENSE', 'LICENSE');
    this.copy('tsconfig.json', 'tsconfig.json');
    this.copy('tsd.json', 'tsd.json');
    this.copy('gulpfile.js', 'gulpfile.js');
    this.copy('karma.conf.js', 'karma.conf.js');
    
    this.mkdir('.vscode');
    this.directory('vscode', '.vscode');
    
    this.mkdir('app');
    this.mkdir('app/greeter');
    this.template('app/main.ts', 'app/main.ts');
    this.copy('app/all.d.ts', 'app/all.d.ts');
    this.copy('app/greeter/greeter.ts', 'app/greeter/greeter.ts');
    this.copy('app/greeter/greeter-ctrl.ts', 'app/greeter/greeter-ctrl.ts');
    this.copy('app/greeter/greeter-ctrl.spec.ts', 'app/greeter/greeter-ctrl.spec.ts');
  },

  install: function () {
    this.installDependencies({
      bower: false,
      npm: true,
      skipInstall: this.options['skip-install'],
      skipMessage: this.options['skip-install-message'],
    });
  }
});
