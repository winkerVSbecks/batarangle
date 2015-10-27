import {Component, View, Inject, bootstrap, bind, LifeCycle}
  from 'angular2/angular2';
import {TreeView} from './components/tree-view/tree-view';
import {Dispatcher} from './dispatcher/dispatcher';
import {BackendActions} from './actions/backend-actions/backend-actions';
import {UserActions} from './actions/user-actions/user-actions';
import {ComponentDataStore}
  from './stores/component-data/component-data-store';
import {BackendMessagingService} from './channel/backend-messaging-service';
import * as Rx from '@reactiveX/rxjs';

@Component({
  selector: 'bt-app'
})
@View({
  directives: [TreeView],
  template: '<bt-tree-view [tree]="tree"></bt-tree-view>'
})
/**
 * Batarangle App
 */
class App {

  private tree: any;
  constructor(
    private backendAction: BackendActions,
    private userActions: UserActions,
    private componentDataStore: ComponentDataStore,
    @Inject(LifeCycle) private lifeCycle: LifeCycle
  ) {

    Rx.Observable.interval(1000).take(1).subscribe(() => {
      this.userActions.getComponentData();
    });

    this.componentDataStore.dataStream
      // .pluck('componentData')
      .map(({ componentData }: any) => componentData)
      .subscribe(componentData => {
        console.log('Application Root Received: ', componentData);
        this.tree = componentData;
        this.lifeCycle.tick();
      }
    );

  }

}

bootstrap(App, [
  BackendActions,
  UserActions,
  Dispatcher,
  ComponentDataStore,
  BackendMessagingService
]);

// @Component({
//   selector: 'bt-app'
// })
// @View({
//   directives: [],
//   template: '<h1>Angular 2 App!</h1>'
// })

// class App {

//   constructor() {
//     console.log('Application 🚀');
//   }

// }

// bootstrap(App, []);
