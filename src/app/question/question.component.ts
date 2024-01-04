import { Component, OnInit, OnDestroy } from '@angular/core';
import { QuestionService } from '../service/question.service';
import { interval, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css'],
})
export class QuestionComponent implements OnInit, OnDestroy {
  public name: string = '';
  public questionList: any = 20;
  public currentQuestion: number = 0;
  public points: number = 0;
  counter = 60;
  correctAnswer: number = 0;
  inCorrectAnswer: number = 0;
  interval$: any;
  progress: string = '0';
  isQuizCompleted: boolean = false;
  private destroy$ = new Subject<void>();
  isAnswered: boolean = false;
  public totalQuestionAttempted: number = 0;
  public selectedQuestionList: any = [];
  answeredQuestions: any[] = [];
  summaryAfterQuestion: number = 20;
  constructor(private questionService: QuestionService) {}

  ngOnInit(): void {
    this.name = localStorage.getItem('name')!;
    this.getAllQuestions();
    this.startCounter();
    this.selectedQuestionList = Array(this.questionList.length).fill(false);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getAllQuestions() {
    this.questionService.getQuestionJson().subscribe((res) => {
      this.questionList = res.questions;
    });
  }

  answer(currentQno: number, option: any) {
    if (currentQno === this.questionList.length) {
      this.isQuizCompleted = true;
      this.stopCounter();
      this.totalQuestionAttempted++;
      this.selectedQuestionList[currentQno - 1] = true;
    }

    if (!option.selected) {
      this.questionList[currentQno - 1].options.forEach((otherOption: any) => {
        otherOption.selected = false;
      });

      option.selected = true;
      this.isAnswered = true;

      if (option.correct) {
        this.points += 10;
        this.correctAnswer++;
        setTimeout(() => {
          this.currentQuestion++;
          this.resetCounter();
          this.getProgressPercent();
        }, 1000);
      } else {
        setTimeout(() => {
          this.currentQuestion++;
          this.inCorrectAnswer++;
          this.resetCounter();
          this.getProgressPercent();
        }, 1000);

        this.points = this.points;
      }
    }
  }

  startCounter() {
    this.interval$ = interval(1000).subscribe((val) => {
      this.counter--;
      if (this.counter === 0) {
        if (this.currentQuestion < this.questionList.length - 1) {
          this.currentQuestion++;
          this.counter = 60;
          this.points -= 0;
        } else {
          this.isQuizCompleted = true;
        }
      }
    });
    setTimeout(() => {
      this.interval$.unsubscribe();
    }, 1200000);
  }

  stopCounter() {
    this.interval$.unsubscribe();
    this.counter = 0;
    this.isAnswered = false;
  }

  resetCounter() {
    this.stopCounter();
    this.counter = 60;
    this.startCounter();
  }

  resetQuiz() {
    this.resetCounter();
    this.getAllQuestions();
    this.points = 0;
    this.counter = 60;
    this.currentQuestion = 0;
    this.progress = '0';
  }

  getProgressPercent() {
    this.progress = (
      (this.currentQuestion / this.questionList.length) *
      100
    ).toString();
    return this.progress;
  }

  previousQuestion() {
    if (this.currentQuestion > 0) {
      this.currentQuestion--;
    }
  }

  nextQuestion() {
    if (
      this.currentQuestion < this.questionList.length - 1 &&
      this.isAnswered
    ) {
      this.currentQuestion++;
      this.resetCounter();
      this.resetOptions();
      this.isAnswered = false;
    }
  }

  resetOptions() {
    this.questionList[this.currentQuestion].options.forEach((option: any) => {
      option.selected = false;
    });
  }
}
