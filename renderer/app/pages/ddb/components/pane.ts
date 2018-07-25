import { ChangeDetectionStrategy } from '@angular/core';
import { Component } from '@angular/core';
import { DDBStateModel } from '../state/ddb';
import { ElementRef } from '@angular/core';
import { Input } from '@angular/core';
import { PrefsStateModel } from '../../../state/prefs';
import { Schema } from '../state/ddbschemas';
import { View } from '../state/ddbviews';

/**
 * DDB pane component
 */

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'elaws-pane',
  styleUrls: ['pane.scss'],
  templateUrl: 'pane.html'
})

export class PaneComponent { 

  @Input() ddb = { } as DDBStateModel;
  @Input() ddbschema = { } as Schema;
  @Input() ddbview = { } as View;
  @Input() prefs = { } as PrefsStateModel;

  /** ctor */
  constructor(public element: ElementRef) { }

  /** Loading rows completed?? */
  isDoneLoadingRows(): boolean {
    return this.isTableSelected() && !this.ddb.loading && !!this.ddb.rows;
  }

  /** Rows loading? */
  isLoadingRows(): boolean {
    return this.isTableSelected() && this.ddb.loading;
  }

  /** Empty table (or all data filtered out)? */
  isTableEmpty(): boolean {
    return this.isDoneLoadingRows() && (this.ddb.rows.length === 0);
  }

  /** Non-empty table? */
  isTablePopulated(): boolean {
    return this.isDoneLoadingRows() && (this.ddb.rows.length > 0);
  }

  /** Table selected? */
  isTableSelected(): boolean {
    return !!this.ddb.table;
  }

}
