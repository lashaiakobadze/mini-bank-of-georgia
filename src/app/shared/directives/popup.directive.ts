import { Directive, ElementRef, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[bgPopup]'
})
export class PopupDirective {

  constructor(private elementRef: ElementRef<HTMLElement>) { }
  @HostBinding('class.active') isOpen = false;


  @HostListener('document:click', ['$event']) toggleOpen($event) {
    this.isOpen = this.elementRef.nativeElement.contains($event.target) ? !this.isOpen : false;
  }

}
