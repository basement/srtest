import { TestBed, ComponentFixture, tick, fakeAsync } from '@angular/core/testing';
import { Component, DebugElement, OnInit } from '@angular/core';
import { By } from '@angular/platform-browser';
import { FancyInputDirective } from './fancy-input.directive';
import { FormGroup, FormBuilder, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  template: `
    <form [formGroup]="testFormGroup" #foo class="tay">
      <div class="form-group fancy-input">
        <label for="name">Name</label>
        <div class="input-group">
          <input type="text" placeholder="username" class="form-control" formControlName="name" [fancyInput]="{tplRef:foo}">
        </div>
      </div>
    </form>
    <form [formGroup]="testFormGroup" #foobar class="fiy">
      <div class="form-group fancy-input">
        <label for="name">Name</label>
        <div class="input-group">
          <input type="text" placeholder="username" class="form-control" formControlName="name" [fancyInput]="{tplRef:foo}">
        </div>
      </div>
    </form>
  `
})
class TestFancyInputComponent implements OnInit {
  testFormGroup: FormGroup;
  constructor(
    private formBuilder: FormBuilder
  ) { }
  ngOnInit() {
    this.testFormGroup = this.formBuilder.group({
      name: ['', (c: FormControl) => c.value === 'hello' ? null : { error: 'No hello!' }],
      address: [null, Validators.required]
    });
  }
}


describe('Directive: HoverFocus', () => {

  let component: TestFancyInputComponent;
  let fixture: ComponentFixture<TestFancyInputComponent>;
  let inputEl: DebugElement;
  let formEl: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule
      ],
      declarations: [TestFancyInputComponent, FancyInputDirective]
    });
    fixture = TestBed.createComponent(TestFancyInputComponent);
    component = fixture.componentInstance;
    inputEl = fixture.debugElement.query(By.css('input'));
    formEl = fixture.debugElement.query(By.css('form'));
  });

  it('clicking input', () => {
    inputEl.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(formEl.nativeElement.className).toBe('tay spu-invalid spu-untouched spu-pristine spu-enabled spu-haserrors ng-untouched ng-pristine ng-invalid');
  });
  it('input value', () => {
    inputEl.nativeElement.value = 'hello';
    inputEl.nativeElement.dispatchEvent(new Event('input'));
    // fixture.detectChanges();
    expect(inputEl.nativeElement.value).toBe('hello');
  });
  it('clicking input', fakeAsync(() => {
    fixture.detectChanges();
    tick();
    inputEl.nativeElement.value = 'hello';
    inputEl.nativeElement.dispatchEvent(new Event('input'));
    tick();
    expect(formEl.nativeElement.className).toBe('tay ng-untouched ng-pristine ng-invalid success spu-valid spu-untouched spu-dirty spu-enabled spu-noerrors');
  }));
  it('clicking input', fakeAsync(() => {
    fixture.detectChanges();
    tick();
    inputEl.nativeElement.value = 'hello';
    inputEl.nativeElement.dispatchEvent(new Event('input'));
    tick();
    expect(formEl.nativeElement.classList).toContain('spu-valid');
  }));
  it('clicking input', fakeAsync(() => {
    fixture.detectChanges();
    tick();
    inputEl.nativeElement.value = 'hey';
    inputEl.nativeElement.dispatchEvent(new Event('input'));
    tick();
    expect(formEl.nativeElement.classList).toContain('spu-invalid');
  }));
});
