import {
  Directive,
  ViewContainerRef,
  HostListener,
  ViewChild,
  Input,
  AfterViewInit,
  ElementRef,
  ComponentFactoryResolver,
  forwardRef,
  Renderer,
  OnChanges,
  OnInit,
  Output,
  EventEmitter,
  TemplateRef,
  ComponentRef,
  NgZone,
  ChangeDetectorRef
} from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[fancyInput]',
})
export class FancyInputDirective implements OnInit {
  @Input() formControlName: any;
  @Input() fancyInput: any;
  public formValue: any;
  public value: any;
  public el: HTMLDivElement;
  config = {
    selector: null,
    tplRef: null,
    prefix: 'spu',
    classValid: 'valid',
    classInvalid: 'invalid',
    classPristine: 'pristine',
    classDirty: 'dirty',
    classTouched: 'touched',
    classUnTouched: 'untouched',
    classHasErrors: 'haserrors',
    classNoErrors: 'noerrors',
    classDisabled: 'disabled',
    classEnabled: 'enabled',
  };
  static globalconfig: any = {};
  c: any = {};
  allClasses: any[] = [];
  localconfig: any = {};



  @HostListener('focus', [])
  focus() {
    this.log();
  }
  @HostListener('blur', [])
  blur() {
    this.log();
  }

  constructor(
    private vcRef: ViewContainerRef,
    private eRef: ElementRef,
    private renderer: Renderer,
    private cdRef: ChangeDetectorRef,
    private formControl: NgControl
  ) { }

  // static withConfig(config) {
  //   FancyInputDirective.globalconfig = config;
  //   // return new FancyInputDirective();
  // }

  ngOnInit() {
    this.localconfig = { ...this.config, ...FancyInputDirective.globalconfig, ...this.fancyInput };
    if (this.localconfig.selector) {
      this.el = this.match(this.eRef.nativeElement, this.localconfig.selector)
    } else if (this.localconfig.tplRef) {
      this.el = this.localconfig.tplRef;
    } else {
      throw new Error('no valid selctor found');
    }
    this.allClasses = this.getClasses();
    this.log();

    this.formControl.valueChanges.subscribe(value => {
      this.log();
    });
    this.formControl.statusChanges.subscribe(status => {
      if (!this.formControl.control.validator) {
        return;
      }
      if (status === 'VALID') {
        this.markAsValid();
      } else {
        this.markAsInvalid();
      }

      this.log();
    });

  }

  getClasses() {
    this.c.valid = this.localconfig.prefix + '-' + this.localconfig.classValid;
    this.c.invalid = this.localconfig.prefix + '-' + this.localconfig.classInvalid;
    this.c.pristine = this.localconfig.prefix + '-' + this.localconfig.classPristine;
    this.c.dirty = this.localconfig.prefix + '-' + this.localconfig.classDirty;
    this.c.touched = this.localconfig.prefix + '-' + this.localconfig.classTouched;
    this.c.untouched = this.localconfig.prefix + '-' + this.localconfig.classUnTouched;
    this.c.haserrors = this.localconfig.prefix + '-' + this.localconfig.classHasErrors;
    this.c.noerrors = this.localconfig.prefix + '-' + this.localconfig.classNoErrors;
    this.c.disabled = this.localconfig.prefix + '-' + this.localconfig.classDisabled;
    this.c.enabled = this.localconfig.prefix + '-' + this.localconfig.classEnabled;
    return Object.keys(this.c).map(itm => this.c[itm]);
  }

  private validate(value: any) {
    if (value) {
      this.markAsValid();
    } else {
      this.markAsInvalid();
    }
  }

  private markAsInvalid() {
    this.el.classList.remove('success');
    this.el.classList.add('error');
  }
  private markAsValid() {
    this.el.classList.remove('error');
    this.el.classList.add('success');
  }

  private closest(matchesSelector, el, selector) {
    return !el ? null :
      matchesSelector.call(el, selector) ? el : this.closest(matchesSelector, el.parentElement, selector);
  }

  private match(el, selector) {
    const matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;
    return !el ? null :
      matchesSelector.call(el, selector) ? el : this.closest(matchesSelector, el.parentElement, selector);
  }

  log() {
    const control = this.formControl;
    const all = this.allClasses;
    const data = [
      control.valid ? this.c.valid : this.c.invalid,
      control.touched ? this.c.touched : this.c.untouched,
      control.pristine ? this.c.pristine : this.c.dirty,
      control.disabled ? this.c.disabled : this.c.enabled,
      control.errors ? this.c.haserrors : this.c.noerrors
    ];
    this.el.classList.remove(...all);
    this.el.classList.add(...data);
  }
}
