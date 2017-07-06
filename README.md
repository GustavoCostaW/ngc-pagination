# ngc-pagination

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


1 - Configure the pagination

```Typescript

    import { NgcPaginationModel } from 'ngc-pagination';
    import { BehaviorSubject } from 'rxjs/BehaviorSubject';

    /*

    @Component({ ... });

    */

    export class MyComponent {

        private paginationConfig: BehaviorSubject<NgcPaginationModel>;

        constructor() {
            createPagination();
        }

        // pagination config to send to component
        createPagination() {
            this.paginationConfig = new BehaviorSubject({
                totalItens: 300, // required
                itensPerPage: 10, // 10 is the default
                currentPage: 1, // 1 is the default
                range: 10, // 10 is the default
                change_after: false // false is the default
            });
        }

        /*
          change_after property when is true, all user events isn't applied in the view when the current page is changed. A good sample of your usage is if you want to update the current page in the UI only your request is done for example.
        */

        // to listener ngc-pagination events.
        events(event) {
            console.log(event);
        }
    }

```


2 - The pagination template

```HTML
    <ngc-pagination #pagination 
    [config]="paginationConfig" 
    (paginationEvents)="events($event)">

     <!-- 
     
        WARNING, I'm using the Angular Material buttons with md-button directive and <md-icon> to 
        show icons in this template, if you not using the Angular Material in your project you need 
        to remove the all directives md-button in all <button> tags below and remove all <md-icon> 
        below and change to simple text.
    
     -->

      <button md-button 
      (click)="pagination.goTo('firstPage')"
      [disabled]="pagination.config.getValue().currentPage <= 1">
        <md-icon class="material-content-icon">
          first_page
        </md-icon>
      </button>

      <button md-button 
      (click)="pagination.goTo('prevPage')"
      [disabled]="pagination.config.getValue().currentPage <= 1">
        <md-icon class="material-content-icon">
          chevron_left
        </md-icon>
      </button>

      <button md-button 
      class="page" *ngFor="let page of pagination.config.getValue().exibition" 
      [class.active]="page === pagination.config.getValue().currentPage"
      (click)="page !== pagination.config.getValue().currentPage ? pagination.goTo('pageChanged', page) : undefined">
        {{page}}
      </button>

      <button md-button 
      (click)="pagination.goTo('nextPage')" 
      [disabled]="pagination.config.getValue().currentPage >= pagination.config.getValue().totalPages" 
      class="material-content-icon">
        <md-icon class="material-content-icon">
          chevron_right
        </md-icon>
      </button>

      <button md-button 
      (click)="pagination.goTo('lastPage')"
      [disabled]="pagination.config.getValue().currentPage >= pagination.config.getValue().totalPages" 
      class="material-icons">
        <md-icon class="material-content-icon">
          last_page
        </md-icon>
      </button>
    </ngc-pagination>
```

Well, with only that you can see this result:

![](http://g.recordit.co/RDtZOmZ6kE.gif)


Cool! And with your `BehaviorSubject` you can emit events and the ngu-pagination will react the property changes.


If you need change the currentPage

```Typescript

      this.paginationConfig.next({
        ...this.paginationConfig.getValue(), // with this you get the active properties
        currentPage: event.goTo // you only change the currentPage property
      })

```

Or if you need change the pagination range

```Typescript
      this.paginationConfig.next({
        ...this.paginationConfig.getValue(),
        range: 5
      })
```