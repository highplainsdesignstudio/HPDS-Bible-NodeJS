import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { BibleDetailsComponent } from './BibleComponents/bible-details/bible-details.component';

import { GetbibleService } from './BibleComponents/getbible.service';
import { HoverDirective } from './directives/hover.directive';


@NgModule({
  declarations: [
    AppComponent,
    BibleDetailsComponent,
    HoverDirective,
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [
    GetbibleService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
