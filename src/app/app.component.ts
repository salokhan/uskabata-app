import { Component, HostListener } from '@angular/core';
import '../../node_modules/rxjs/Rx';
import * as $ from 'jquery';
import { GenericFunctionsService } from './shared_modules/generic-functions-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private _genricFunctionService: GenericFunctionsService) { }

  title = 'uskabata-app';
  enableScrollToTop = false;

  onActivate(event: any) {
    this._genricFunctionService.scrollToTop();
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
}
