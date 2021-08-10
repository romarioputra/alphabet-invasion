import { AfterViewInit, Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { fromEvent, interval } from 'rxjs';
import { scan, startWith, map, takeWhile, switchMap, tap } from 'rxjs/operators';
@Component({
  selector: 'app-alphabet',
  templateUrl: './alphabet.component.html',
  styleUrls: ['./alphabet.component.css']
})
export class AlphabetComponent implements OnInit, AfterViewInit {
  @ViewChildren('span') span!: QueryList<any>;
  
  characters: number[] = Array(50).fill(0).map((x,i)=>i);
  leftPos: number[] = Array(10).fill(0).map((x,i) => i * 20);
  downMove: string[] = Array(50).fill(0).map((x,i) => (i * 16).toString() + 'px');

  constructor() { }
  ngAfterViewInit(): void {
    this.span.forEach((e, i) => {
      this.span.toArray()[i].nativeElement.textContent = '';
      this.span.toArray()[i].nativeElement.style.top = '0px';
    });

    interval(1000).subscribe(n => {      
      this.span.toArray()[n].nativeElement.textContent = String.fromCharCode(this.randomNum(26) + 97);
      this.span.toArray()[n].nativeElement.style.left = `${this.leftPos[this.randomNum(10)]}px`;

      this.span.filter(e => e.nativeElement.textContent !== '').forEach(e => {
        const indexDownMove = this.downMove.findIndex(index => index === e.nativeElement.style.top)
        e.nativeElement.style.top = this.downMove[indexDownMove + 1];
      })

    });
  }

  ngOnInit(): void {
    const key$ = fromEvent(document, 'keydown').pipe(
      map((e: any) => e.key)
    ).subscribe(e => {
      let firstCharIndex = this.span.toArray().findIndex(span => span.nativeElement.textContent !== '');
      console.log(firstCharIndex);
      if (e === this.span.toArray()[firstCharIndex].nativeElement.textContent) {
        this.span.toArray()[firstCharIndex].nativeElement.textContent = '';
      }
    })
  }

  randomNum(range: number): number {return Math.floor(Math.random() * range);}
}
