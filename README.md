# @ngu-pagination

Simple pagination for Angular v2+


## Installation

First you need to install the npm module:

```sh
npm install @ngu-pagination --save
```

## Usage

#### 1. Import the `NguPaginationModule`:

Finally, you can use ngu-pagination in your Angular project.

```ts
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {NguPaginationModule} from 'ngu-pagination';

@NgModule({
    imports: [
        BrowserModule,
        NguPaginationModule
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
```

##### SharedModule

If you use a [`SharedModule`](https://angular.io/docs/ts/latest/guide/ngmodule.html#!#shared-modules) that you import in multiple other feature modules,
you can export the `NguPaginationModule` to make sure you don't have to import it in every module.

```ts
@NgModule({
    exports: [
        CommonModule,
        NguPaginationModule
    ]
})
export class SharedModule { }
```

## Sample

