import { Injectable, Injector, ApplicationRef, ComponentFactoryResolver } from '@angular/core';
import { ButtonTopComponent } from '../button-top/button-top.component';

@Injectable()
export class ButtonTopService {
  constructor(private injector: Injector,
    private applicationRef: ApplicationRef,
    private componentFactoryResolver: ComponentFactoryResolver) { }

  // Previous dynamic-loading method required you to set up infrastructure
  // before adding the popup to the DOM.
  showAsComponent(message: string) {
    // Create element
    const popup = document.createElement('popup-component');

    // Create the component and wire it up with the element
    const factory = this.componentFactoryResolver.resolveComponentFactory(ButtonTopComponent);
    const ButtonTopComponentRef = factory.create(this.injector, [], popup);

    // Attach to the view so that the change detector knows to run
    this.applicationRef.attachView(ButtonTopComponentRef.hostView);

    // Listen to the close event
    ButtonTopComponentRef.instance.closed.subscribe(() => {
      document.body.removeChild(popup);
      this.applicationRef.detachView(ButtonTopComponentRef.hostView);
    });

    // Set the message
    ButtonTopComponentRef.instance.message = message;

    // Add to the DOM
    document.body.appendChild(popup);
  }
}
