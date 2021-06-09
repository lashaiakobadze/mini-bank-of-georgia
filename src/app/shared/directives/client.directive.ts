import {Directive, ElementRef, HostBinding, HostListener, Renderer2} from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[client]'
})
export class ClientDirective {

  // constructor(private elementRef: ElementRef, private renderer: Renderer2) {
  // }

  // @HostListener('click', ['$event'])
  // changeBackground(): void {
  //   this.renderer.setStyle(this.elementRef.nativeElement, 'background', 'skyblue');
  // }

  constructor(private elementRef: ElementRef<HTMLElement>) { }
  @HostBinding('class.curClient') isOpen;


  @HostListener('document:click', ['$event']) toggleOpen($event) {
    this.isOpen = this.elementRef.nativeElement;
    console.log(this.isOpen);
  }

}
