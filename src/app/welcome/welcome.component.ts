import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
})
export class WelcomeComponent implements OnInit {
  @ViewChild('name') nameKey!: ElementRef;
  isNameEmpty: boolean = true;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  startQuiz() {
    localStorage.setItem('name', this.nameKey.nativeElement.value);
  }

  onKeyUp(event: any) {
    this.isNameEmpty = event.target.value.trim() === '';
  }

  onEnter() {
    if (!this.isNameEmpty) {
      this.startQuiz();
      this.router.navigateByUrl('question');
    }
  }
}
