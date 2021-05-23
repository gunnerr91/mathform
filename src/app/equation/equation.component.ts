import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { MathValidators } from '../math-validators';
import { filter, delay, scan } from 'rxjs/operators';

@Component({
  selector: 'app-equation',
  templateUrl: './equation.component.html',
  styleUrls: ['./equation.component.css'],
})
export class EquationComponent implements OnInit {
  secondsPerSolution = 0;
  mathForm = new FormGroup(
    {
      firstNumber: new FormControl(this.randomNumber()),
      secondNumber: new FormControl(this.randomNumber()),
      answer: new FormControl(''),
    },
    [MathValidators.addition('answer', 'firstNumber', 'secondNumber')]
  );

  get firstNumber() {
    return this.mathForm.value.firstNumber;
  }

  get secondNumber() {
    return this.mathForm.value.secondNumber;
  }

  constructor() {}

  ngOnInit(): void {
    this.mathForm.statusChanges
      .pipe(
        filter((value) => value === 'VALID'),
        delay(100),
        scan(
          (acc) => {
            return {
              startTime: acc.startTime,
              solutionsSolved: acc.solutionsSolved + 1,
            };
          },
          { startTime: new Date(), solutionsSolved: 0 }
        )
      )
      .subscribe(({ startTime, solutionsSolved }) => {
        this.secondsPerSolution =
          (new Date().getTime() - startTime.getTime()) / solutionsSolved / 1000;
        this.mathForm.setValue({
          firstNumber: this.randomNumber(),
          secondNumber: this.randomNumber(),
          answer: '',
        });
      });
  }

  randomNumber() {
    return Math.floor(Math.random() * 10);
  }
}
