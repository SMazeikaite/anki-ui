import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appRandomColor]',
})
export class RandomColorDirective implements OnInit {
  constructor(private element: ElementRef) {}

  private colors = [
    'var(--teal-100)',
    'var(--purple-40)',
    // '#A83D8D',
    // '#05A448',
    // '#E62834',
  ];
  //   private currentColor = 0;

  ngOnInit() {
    this.element.nativeElement.style.color = this.getRandomColor();
  }

  //   getColor(index: number): string {
  //     const total = this.colors.length;
  //     this.currentColor = index >= this.colors.length ? index % total : index;
  //     return this.colors[this.currentColor];
  //   }

  getRandomColor(): string {
    return this.colors[Math.floor(Math.random() * this.colors.length)];
  }
}
