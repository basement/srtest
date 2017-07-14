import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { FancyInputDirective } from './fancy-input/fancy-input.directive';


// export function directiveInput() {
//   return new FancyInputDirective();
// };

@NgModule({
  declarations: [
    AppComponent,
    FancyInputDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
