import {Component, View, LifeCycle, Inject} from 'angular2/angular2';
import {ComponentDataStore}
  from '../../stores/component-data/component-data-store';
import {UserActions} from '../../actions/user-actions/user-actions';

@Component({
  selector: 'bt-header'
})
@View({
  templateUrl: 'components/header/header.html'
})
/**
 * Header
 */
export class Header {

  constructor(
    private userActions: UserActions,
    @Inject(LifeCycle) private lifeCycle: LifeCycle
  ) {
  }

  /**
   * Query for a node
   * @param  {String} query
   */
  onChange(query) {
    this.userActions.searchNode({ query });
    this.lifeCycle.tick();
  }

}
