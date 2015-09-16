# generator-jspm-angular [![Build Status](https://travis-ci.org/hourliert/generator-jspm-angular.svg)](https://travis-ci.org/hourliert/generator-jspm-angular)

## Getting Started

### Install

```bash
npm install -g yo generator-jspm-angular
yo jspm-angular
```

### Structure

The scaffolded project has this structure:
```
.
├── .editorconfig
├── .gitignore
├── .vscode
│   └── settings.json
├── LICENSE
├── README.md
├── app
│   ├── all.d.ts
│   ├── greeter
│   │   ├── greeter-ctrl.spec.ts
│   │   ├── greeter-ctrl.ts
│   │   └── greeter.ts
│   └── main.ts
├── gulpfile.js
├── index.html
├── jspm.config.js
├── karma.conf.js
├── package.json
├── tsconfig.json
├── tsd.json
└── tslint.json
```

### Gulp tasks

* `default` cleans the project, install type definition files and build a production ready version in `./dist`.
* `serve` launches a dev server with hot reloading. Runs TypeScript Linter each time a .ts file has changed.
* `serve:dist` builds and serves the production version.
* `typedoc` generates the project documentation.

### Tests

Run `npm test` to launch karma an run unit tests.

## License

MIT
