import {Component, View, Inject, bootstrap, bind, LifeCycle}
  from 'angular2/angular2';
import {DebugPanel} from './components/debug-panel/debug-panel';
import {Dispatcher} from './dispatcher/dispatcher';
import {BackendActions} from './actions/backend-actions/backend-actions';
import {UserActions} from './actions/user-actions/user-actions';
import {ComponentDataStore}
  from './stores/component-data/component-data-store';
import {BackendMessagingService} from './channel/backend-messaging-service';

@Component({
  selector: 'bt-app'
})
@View({
  directives: [DebugPanel],
  template: '<bt-debug-panel [tree]="tree"></bt-debug-panel>'
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

    this.userActions.startComponentTreeInspection();

    this.componentDataStore.dataStream
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
