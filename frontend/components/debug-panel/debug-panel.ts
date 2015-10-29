import {Component, View} from 'angular2/angular2';
import {TreeView} from '../tree-view/tree-view';
import {Header} from '../header/header';

@Component({
  selector: 'bt-debug-panel',
  properties: ['tree: tree']
})
@View({
  directives: [TreeView, Header],
  templateUrl: 'components/debug-panel/debug-panel.html'
})
/**
 * Debug Panel which is displayed in devtools
 */
export class DebugPanel {

  private tree: any;

}
