import { Directive, ElementRef, HostListener, Renderer2, Host } from '@angular/core';

@Directive({
  selector: '[appHover]'
})
export class HoverDirective {

  constructor(private el: ElementRef, private renderer: Renderer2) {
    
  }

  @HostListener ('mouseenter') onmouseenter() {
    this.highlight("yellow");
  }

  @HostListener ('mouseleave') onmouseleave() {
    this.highlight(null);
  }

  highlight(color) {
    this.renderer.setStyle(this.el.nativeElement, "background-color", color);
  }
}
