import { Component, Input, Output, EventEmitter} from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-button-top',
  templateUrl: './button-top.component.html',
  styleUrls: ['./button-top.component.scss'],
  host: { '[@state]': 'state' },
  animations: [trigger('state', [
    state('opened', style({ transform: 'translateY(0%)' })),
    state('void, closed', style({ transform: 'translateY(100%)', opacity: 0 })),
    transition('* => *', animate('100ms ease-in')),
  ])
  ]
})
export class ButtonTopComponent {

  private state: 'opened' | 'closed' = 'closed';

  constructor() { }



  @Input()
  set message(message: string) {
    this._message = message;
    this.state = 'opened';
  }
  get message(): string { return this._message; }
  _message: string;

  @Output()
  closed = new EventEmitter();

}
