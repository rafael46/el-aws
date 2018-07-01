import { ChangeDetectionStrategy } from '@angular/core';
import { Component } from '@angular/core';
import { ContextMenuComponent } from 'ngx-contextmenu';
import { Descriptor } from '../state/s3';
import { Dictionary } from '../services/dictionary';
import { Input } from '@angular/core';
import { OnInit } from '@angular/core';
import { PrefsStateModel } from '../../../state/prefs';
import { S3StateModel } from '../state/s3';
import { S3ViewStateModel } from '../state/s3view';
import { Store } from '@ngxs/store';
import { TreeComponent } from '../tree';
import { UpdatePathLRU } from '../state/s3view';


/**
 * S3 branch component
 */

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'elaws-branch',
  styleUrls: ['branch.scss'],
  templateUrl: 'branch.html'
})

export class BranchComponent implements OnInit { 

  @Input() contextMenu: ContextMenuComponent;
  @Input() descriptorsByPath: { [path: string]: Descriptor[] } = {};
  @Input() dictionary: Dictionary[] = [];
  @Input() s3 = {} as S3StateModel;
  @Input() level = 0;
  @Input() path: string;
  @Input() prefs = {} as PrefsStateModel;
  @Input() view = {} as S3ViewStateModel;

  /** ctor */
  constructor(private store: Store,
              public tree: TreeComponent) { }

  // lifecycle methods

  ngOnInit(): void {
    this.store.dispatch(new UpdatePathLRU({ path: this.path }));
  }

} 