import { BarrelModule } from '../../../barrel';
import { BranchComponent } from './branch';
import { BucketFilterComponent } from './props/filter';
import { BucketPropsComponent } from './props/bucket';
import { CellComponent } from './cell';
import { ColumnComponent } from './column';
import { ComponentsModule as CommonComponentsModule } from '../../../components/module';
import { CreateBucketComponent } from './props/create';
import { FilePropsComponent } from './props/file';
import { HeaderComponent } from './header';
import { NgModule } from '@angular/core';
import { RowComponent } from './row';
import { SelectBucketComponent } from './select-bucket';
import { TreeComponent } from './tree';
import { ViewComponent } from './view';

/**
 * All our components
 */

const COMPONENTS = [
  BranchComponent,
  BucketPropsComponent,
  BucketFilterComponent,
  CellComponent,
  CreateBucketComponent,
  ColumnComponent,
  FilePropsComponent,
  HeaderComponent,
  RowComponent,
  SelectBucketComponent,
  TreeComponent,
  ViewComponent
];

@NgModule({

  declarations: [
    ...COMPONENTS
  ],

  exports: [
    ...COMPONENTS
  ],

  imports: [
    BarrelModule,
    CommonComponentsModule
  ]

})

export class ComponentsModule { }
