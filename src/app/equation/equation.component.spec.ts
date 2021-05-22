import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { EquationComponent } from './equation.component';

describe('EquationComponent', () => {
  let component: EquationComponent;
  let fixture: ComponentFixture<EquationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EquationComponent],
      imports: [ReactiveFormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EquationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('random number returns a number', () => {
    const result = component.randomNumber();
    expect(typeof result).toBe('number');
  });

  it('has a form with two numbers for the equation', () => {
    const compiledForm: HTMLElement =
      fixture.nativeElement.querySelector('form');
    expect(compiledForm.innerHTML).toContain(component.firstNumber);
    expect(compiledForm.innerHTML).toContain(component.secondNumber);
  });

  it('math form has answer property', () => {
    expect(component.mathForm.get('answer')?.value).toBe('');
  });

  it('validates answer', () => {
    const total =
      component.mathForm.get('firstNumber')?.value +
      component.mathForm.get('secondNumber')?.value;
    component.mathForm.patchValue({
      answer: total.toString(),
    });
    expect(component.mathForm.valid).toBeTruthy();
  });
});
