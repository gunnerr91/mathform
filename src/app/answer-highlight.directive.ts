import { Directive, ElementRef } from '@angular/core';
import { NgControl } from '@angular/forms';
import { map } from 'rxjs/operators';

@Directive({
  selector: '[appAnswerHighlight]',
})
export class AnswerHighlightDirective {
  constructor(private elementRef: ElementRef, private controlName: NgControl) {}

  ngOnInit(): void {
    this.controlName.control?.parent?.valueChanges
      .pipe(
        map(({ firstNumber, secondNumber, answer }) =>
          Math.abs(
            (firstNumber + secondNumber - answer) / (firstNumber + secondNumber)
          )
        )
      )
      .subscribe((value) => {
        if (value < 0.2) {
          this.elementRef.nativeElement.classList.add('close');
        } else {
          this.elementRef.nativeElement.classList.remove('close');
        }
      });
  }
}
