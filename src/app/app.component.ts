import { Component, Renderer2, TemplateRef, ViewChild, ElementRef } from '@angular/core';
import 'prismjs/prism';
import 'prismjs/components/prism-typescript';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
declare var Prism: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('tpl') tpl: ElementRef;
  preNode: HTMLPreElement;
  codeNode: HTMLElement;
  language = 'typescript';
  basic;
  constructor(
    private _renderer: Renderer2,
    private formBuilder: FormBuilder
  ) { }
  ngOnInit() {
    this.basic = this.formBuilder.group({
      name: ['', (c: FormControl) => {
        if (c.value === 'hi') return null;
        return {
          nothierror: 'say just hi!'
        }
      }],
      address: [null, Validators.required]
    });
  }
  ngAfterViewInit() {
    // this.prepare();
  }
  prepare() {
    this.preNode = this._renderer.createElement('pre');
    this.codeNode = this._renderer.createElement('code');
    this._renderer.addClass(this.codeNode, 'language-' + this.language);
    this._renderer.appendChild(this.tpl.nativeElement, this.preNode);
    this._renderer.appendChild(this.preNode, this.codeNode);
    this.codeNode.textContent = this.getCode();
    const foo = Prism.highlightElement(this.codeNode);
    // console.log('foo', foo);
  }

  getCode() {
    return `
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
/* Import Choosy */
import { NgxChoosyModule } from '@nglibrary/ngx-choosy'; // <----
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    NgxChoosyModule.forRoot()
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
    `;
  }
}
