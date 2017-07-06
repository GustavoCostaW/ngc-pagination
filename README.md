# Angular 2 module starter

![alt tag](http://i.imgur.com/8Ex7Gd7.png)

[![license](https://img.shields.io/github/license/mashape/apistatus.svg?maxAge=2592000)](http://opensource.org/licenses/MIT)

Easy to use module starter for Angular 2.

Quick and easy installation - no setup hassle - just focus on your code.

Helps to create NPM package and publish it easily.

There is a test Angular 2 app inside and a separate folder for your module.
Test app is essentially a development environment that helps to test module before publishing it to NPM.

## Requirements
- [NPM](https://npmjs.org/) - Node package manager
- [Typings](https://www.npmjs.com/package/typings) - The TypeScript Definition Manager
- [TypeScript](https://www.npmjs.com/package/typescript) - Language for application scale JavaScript development


## Installation

- clone this repository
- run following commands: 
    - `typings install`
    - `npm install`


## Module development

Module files are in `module` folder. There is a module example in it.

Run `npm start` to compile and watch TypeScript files.

There is a `/module/module.ts` file where you set up your module class name - by default it's a `YourAwesomeModule`.
Change it according to your needs and edit `/app/app.module.ts` where it should be imported into test app which you can see in a browser when you run `npm start`.

When your module is ready you can publish it - files from `module` folder will be used for a package.


## Publishing package

- describe your module well in README.md and bump version
- run `npm publish`

Notice! Make sure you have stored your user credentials according to [this article](https://docs.npmjs.com/getting-started/publishing-npm-packages)


## Feedback

Please [leave your feedback](https://github.com/moff/angular2-module-starter/issues) if you have noticed any issues or have a feature request.

## License

The repository code is open-sourced software licensed under the [MIT license](http://opensource.org/licenses/MIT).
