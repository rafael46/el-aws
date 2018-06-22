import { Action } from '@ngxs/store';
import { State } from '@ngxs/store';
import { StateContext } from '@ngxs/store';

import { isObjectEqual } from 'ellib'; 

/** NOTE: actions must come first because of AST */

export class AddPath {
  static readonly type = '[View] add path';
  constructor(public readonly payload: { path: string }) { }
}

export class RemovePath {
  static readonly type = '[View] remove path';
  constructor(public readonly payload: { path: string }) { }
}

export class UpdatePathLRU {
  static readonly type = '[View] update path LRU';
  constructor(public readonly payload: { path: string }) { }
}

export class UpdateSort {
  static readonly type = '[View] update sort';
  constructor(public readonly payload: { sortColumn: string, sortDir: number }) { }
}

export class UpdateVisibility {
  static readonly type = '[View] update visibility';
  constructor(public readonly payload: { visibility: ViewVisibility }) { }
}

export class UpdateWidths {
  static readonly type = '[View] update widths';
  constructor(public readonly payload: { widths: ViewWidths }) { }
}

export interface LRUCache {
  [path: string]: number;
}

export interface S3ViewStateModel {
  lru: LRUCache;
  paths: string[];
  sortColumn: string;
  sortDir: number;
  visibility: ViewVisibility;
  widths: ViewWidths;
}

export interface ViewVisibility {
  [column: string]: boolean;
}

export interface ViewWidths {
  [column: string]: number;
}

@State<S3ViewStateModel>({
  name: 's3view',
  defaults: {
    lru: { },
    paths: ['/'],
    sortColumn: 'name',
    sortDir: 1,
    widths: {
      name: 60,
      size: 20,
      timestamp: 20
    },
    visibility: {
      name: true,
      size: true,
      timestamp: true
    }
  }
}) export class S3ViewState {

  @Action(AddPath)
  addPath({ getState, patchState }: StateContext<S3ViewStateModel>,
          { payload }: AddPath) {
    const { path } = payload;
    const state = getState();
    if (!state.paths.includes(path)) 
      patchState({ paths: [...state.paths, path] });
  }

  @Action(RemovePath)
  removePath({ getState, patchState }: StateContext<S3ViewStateModel>,
             { payload }: RemovePath) {
    const { path } = payload;
    const state = getState();
    const ix = state.paths.indexOf(path);
    if (ix !== -1)
      patchState({ paths: [...state.paths.splice(ix, 1)] });
  }

  @Action(UpdatePathLRU)
  updatePathLRU({ getState, patchState }: StateContext<S3ViewStateModel>,
                { payload }: UpdatePathLRU) {
    const { path } = payload;
    const state = getState();
    patchState({ lru: { ...state.lru, [path]: Date.now() } });
  }

  @Action(UpdateSort)
  updateSort({ patchState }: StateContext<S3ViewStateModel>,
             { payload }: UpdateSort) {
    const { sortColumn, sortDir } = payload;
    patchState({ sortColumn, sortDir });
  }

  @Action(UpdateVisibility)
  updateVisibility({ getState, patchState }: StateContext<S3ViewStateModel>,
                  { payload }: UpdateVisibility) {
    const { visibility } = payload;
    const state = getState();
    // NOTE: if the visibility flags haven't changed, then we don't need
    // to zero out the widths
    if (!isObjectEqual(visibility, state.visibility))
      patchState({ widths: { } });
    patchState({ visibility });
  }

  @Action(UpdateWidths)
  updateWidths({ patchState }: StateContext<S3ViewStateModel>,
               { payload }: UpdateWidths) {
    const { widths } = payload;
    patchState({ widths });
  }

}
