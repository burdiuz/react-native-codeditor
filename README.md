# JS-Lib-Environment

> Note: Since Rollup currently does not support some things which are not yet standard(like class fields),
> I've used babel for transpiling code with specific set of plugins for such things.

> Note: This is rollup + jest setup, to get webpack + karma + chai + sinon setup check [webpack_chai](https://github.com/burdiuz/js-lib-project-environment/tree/webpack_chai) branch.

Environment setup for library project development, requires [rollup](https://rollupjs.org/guide/en)  v 0.66 or higher to be installed globally.
```
npm install rollup -g
```
After installation replace values of `LIBRARY_FILE_NAME` and `LIBRARY_VAR_NAME` in `webpack.helpers.js`.
* `LIBRARY_FILE_NAME` - distribution file name
* `LIBRARY_VAR_NAME` - variable name for global variable

Also you will need to update `"main"` value in `bower.json` and `package.json`.

NPM commands:
* `npm start` - run rollup to make distributions
* `npm test` - run jest tests
* `npm run server` - run rollup dev server
* `npm run flow` - run flow for static type checking
* `npm run build:watch` - run rollup in watch mode
* `npm run test:watch` - run tests in watch mode
* `npm run lint` - run ESLint for project files(including test files) in `/source` folder.
