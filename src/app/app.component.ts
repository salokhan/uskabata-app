import { Component } from '@angular/core';
import '../../node_modules/rxjs/Rx';
import * as $ from 'jquery';
import { ResultService } from './results/service-result/result.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ResultService]
})
export class AppComponent {
  title = 'uskabata-app';
}
