import { Directive, ElementRef, Renderer2 } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoadingService } from '../../services/loading.service';

@Directive({
  selector: '[appLoadingButton]',
})
export class LoadingButtonDirective {
  private sub = new Subscription();

  private readonly spinnerEl: HTMLElement;
  private readonly hostEl: HTMLElement;

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private loadingService: LoadingService
  ) {
    this.hostEl = this.elementRef.nativeElement;
    this.renderer.addClass(this.hostEl, 'btn-loading-btn');
    this.spinnerEl = this.renderer.createElement('i');
    const text = this.renderer.createText('autorenew');
    this.renderer.appendChild(this.spinnerEl, text);
    this.spinnerEl.classList.add('material-icons', 'loading-icon');
    this.hostEl.insertAdjacentElement('afterbegin', this.spinnerEl);

    this.sub = this.loadingService.isLoading.subscribe(isLoading => {
      if (isLoading) {
        this.renderer.addClass(this.hostEl, 'is-loading');
        this.renderer.setAttribute(this.hostEl, 'disabled', 'disabled');
      } else {
        this.renderer.removeClass(this.hostEl, 'is-loading');
        this.renderer.removeAttribute(this.hostEl, 'disabled');
      }
    });
  }
}
