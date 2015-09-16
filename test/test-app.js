'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');

describe('jspm-angular:app', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../generators/app'))
      .withOptions({ skipInstall: true })
      .withPrompts({ someOption: true })
      .on('end', done);
  });

  it('creates files', function () {
    assert.file([
      'package.json',
      '.editorconfig',
      'README.md',
      'index.html',
      'jspm.config.js',
      '.gitignore',
      'tslint.json',
      'LICENSE',
      'tsconfig.json',
      'tsd.json',
      'gulpfile.js',
      '.vscode/settings.json',
      'app/main.ts',
      'app/all.d.ts',
      'app/greeter/greeter.ts',
      'app/greeter/greeter-ctrl.ts',
      'app/greeter/greeter-ctrl.spec.ts'
    ]);
  });
});
