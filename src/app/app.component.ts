import { Component, PLATFORM_ID, APP_ID, Inject, HostListener, Injector } from '@angular/core';
import '../../node_modules/rxjs/Rx';
import { isPlatformBrowser } from '@angular/common';
import * as $ from 'jquery';
import { createCustomElement } from '@angular/elements';
import { ButtonTopService } from './core_modules/button-top/service-button-top/button-top.service';
import { ButtonTopComponent } from './core_modules/button-top/button-top/button-top.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(APP_ID) private appId: string, injector: Injector, public popup: ButtonTopService
  ) {
    const PopupElement = createCustomElement(ButtonTopComponent, { injector });
    // Register the custom element with the browser.
    customElements.define('popup-element', PopupElement);
  }

  title = 'uskabata-app';
  enableScrollToTop = false;

  onActivate(event: any) {
    if (isPlatformBrowser(this.platformId)) {
      const scrollToTop = window.setInterval(() => {
        const pos = window.pageYOffset;
        if (pos > 0) {
          window.scrollTo(0, pos - 50); // how far to scroll on each step
          this.enableScrollToTop = true;
        } else {
          window.clearInterval(scrollToTop);
          this.enableScrollToTop = false;
        }
      }, 16);
    }
  }
  @HostListener('window:scroll', ['$event'])
  scrollHandler(event) {
    const pos = window.pageYOffset;
    if (pos > 0) {
      this.enableScrollToTop = true;
    } else {
      this.enableScrollToTop = false;
    }
  }
  onScroll(event: any) {
    if (isPlatformBrowser(this.platformId)) {
      const scrollToTop = window.setInterval(() => {
        const pos = window.pageYOffset;
        if (pos > 0) {
          window.scrollTo(0, pos - 50); // how far to scroll on each step
          this.enableScrollToTop = true;
        } else {
          window.clearInterval(scrollToTop);
          this.enableScrollToTop = false;
        }
      }, 16);
    }
  }
}
