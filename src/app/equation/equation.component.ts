import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { MathValidators } from '../math-validators';

@Component({
  selector: 'app-equation',
  templateUrl: './equation.component.html',
  styleUrls: ['./equation.component.css'],
})
export class EquationComponent implements OnInit {
  mathForm = new FormGroup(
    {
      firstNumber: new FormControl(this.randomNumber()),
      secondNumber: new FormControl(this.randomNumber()),
      answer: new FormControl(''),
    },
    [MathValidators.addition]
  );

  get firstNumber() {
    return this.mathForm.value.firstNumber;
  }

  get secondNumber() {
    return this.mathForm.value.secondNumber;
  }

  constructor() {}

  ngOnInit(): void {}

  randomNumber() {
    return Math.floor(Math.random() * 10);
  }
}
