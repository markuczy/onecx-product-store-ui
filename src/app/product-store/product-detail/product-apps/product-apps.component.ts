import { Component, Input, OnChanges, ViewChild } from '@angular/core'
import { SelectItem } from 'primeng/api'
import { Observable, finalize } from 'rxjs'

import { DataViewControlTranslations, UserService } from '@onecx/portal-integration-angular'
import {
  Product,
  MicrofrontendsAPIService,
  MicrofrontendPageResult,
  MicrofrontendAbstract
} from 'src/app/shared/generated'
import { dropDownSortItemsByLabel, limitText } from 'src/app/shared/utils'
import { IconService } from 'src/app/shared/iconservice'

import { ChangeMode } from '../../app-detail/app-detail.component'

@Component({
  selector: 'app-product-apps',
  templateUrl: './product-apps.component.html',
  styleUrls: ['./product-apps.component.scss']
})
export class ProductAppsComponent implements OnChanges {
  @Input() product: Product | undefined
  @Input() dateFormat = 'medium'
  @Input() changeMode: ChangeMode = 'VIEW'
  public apps$!: Observable<MicrofrontendPageResult>
  public app: MicrofrontendAbstract | undefined
  public iconItems: SelectItem[] = [{ label: '', value: null }]
  public filter: string | undefined
  public viewMode = 'grid'
  public sortField = 'name'
  public sortOrder = 1
  public searchInProgress = false
  public displayDetailDialog = false
  public displayDeleteDialog = false
  public hasCreatePermission = false
  public hasDeletePermission = false

  @ViewChild(DataView) dv: DataView | undefined
  public dataViewControlsTranslations: DataViewControlTranslations = {}
  public limitText = limitText

  constructor(private icon: IconService, private user: UserService, private appApi: MicrofrontendsAPIService) {
    this.hasCreatePermission = this.user.hasPermission('MICROFRONTEND#CREATE')
    this.hasDeletePermission = this.user.hasPermission('MICROFRONTEND#DELETE')
    this.iconItems.push(...this.icon.icons.map((i) => ({ label: i, value: i })))
    this.iconItems.sort(dropDownSortItemsByLabel)
  }

  ngOnChanges(): void {
    if (this.product) this.loadApps()
  }

  public loadApps(): void {
    this.searchInProgress = true
    this.apps$ = this.appApi
      .searchMicrofrontends({
        microfrontendSearchCriteria: { productName: this.product?.name, pageSize: 1000 }
      })
      .pipe(finalize(() => (this.searchInProgress = false)))
  }

  public onLayoutChange(viewMode: string): void {
    this.viewMode = viewMode
  }
  public onFilterChange(filter: string): void {
    this.filter = filter
    //this.dv?.filter(filter, 'contains')
  }
  public onSortChange(field: string): void {
    this.sortField = field
  }
  public onSortDirChange(asc: boolean): void {
    this.sortOrder = asc ? -1 : 1
  }

  public onDetail(ev: any, app: MicrofrontendAbstract) {
    ev.stopPropagation()
    this.app = app
    this.changeMode = 'EDIT'
    this.displayDetailDialog = true
  }
  public onCopy(ev: any, app: MicrofrontendAbstract) {
    ev.stopPropagation()
    this.app = app
    this.changeMode = 'COPY'
    this.displayDetailDialog = true
  }
  public onCreate() {
    this.changeMode = 'CREATE'
    this.app = undefined
    this.displayDetailDialog = true
  }
  public onDelete(ev: any, app: MicrofrontendAbstract) {
    ev.stopPropagation()
    this.app = app
    this.displayDeleteDialog = true
  }
}
