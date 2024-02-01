import { APP_INITIALIZER, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HttpClient, HttpClientModule } from '@angular/common/http'
import { RouterModule, Routes } from '@angular/router'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core'

import {
  APP_CONFIG,
  AppStateService,
  createTranslateLoader,
  translateServiceInitializer,
  PortalCoreModule,
  UserService
} from '@onecx/portal-integration-angular'
import { KeycloakAuthModule } from '@onecx/keycloak-auth'

import { AppComponent } from './app.component'
import { environment } from 'src/environments/environment'

const routes: Routes = [{ path: '', pathMatch: 'full' }]
@NgModule({
  bootstrap: [AppComponent],
  declarations: [AppComponent],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    KeycloakAuthModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabledBlocking',
      enableTracing: true
    }),
    PortalCoreModule.forRoot('onecx-product-store-ui'),
    TranslateModule.forRoot({
      isolate: true,
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient, AppStateService]
      }
    })
  ],
  providers: [
    { provide: APP_CONFIG, useValue: environment },
    {
      provide: APP_INITIALIZER,
      useFactory: translateServiceInitializer,
      multi: true,
      deps: [UserService, TranslateService]
    }
  ],
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
  constructor() {
    console.info('App Module constructor')
  }
}
