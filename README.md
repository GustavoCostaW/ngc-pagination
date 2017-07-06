# @ngc-pagination

Simple pagination for Angular v2+


## Installation

First you need to install the npm module:

```sh
npm install ngc-pagination --save
```

## Usage

#### 1. Import the `NgcPaginationModule`:

Finally, you can use ngc-pagination in your Angular project.

```ts
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {NgcPaginationModule} from 'ngc-pagination';

@NgModule({
    imports: [
        BrowserModule,
        NgcPaginationModule
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
```

##### SharedModule

If you use a [`SharedModule`](https://angular.io/docs/ts/latest/guide/ngmodule.html#!#shared-modules) that you import in multiple other feature modules,
you can export the `NgcPaginationModule` to make sure you don't have to import it in every module.

```ts
@NgModule({
    exports: [
        CommonModule,
        NgcPaginationModule
    ]
})
export class SharedModule { }
```

## Sample

