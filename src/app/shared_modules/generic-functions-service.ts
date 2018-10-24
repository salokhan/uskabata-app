import { Injectable, PLATFORM_ID, APP_ID, Inject, HostListener, Injector } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
@Injectable()
export class GenericFunctionsService {
    constructor(
        @Inject(PLATFORM_ID) private platformId: Object,
        @Inject(APP_ID) private appId: string) {
    }

    scrollToTop(): void {
        if (isPlatformBrowser(this.platformId)) {
            const scrollToTop = window.setInterval(() => {
                const pos = window.pageYOffset;
                if (pos > 0) {
                    window.scrollTo(0, pos - 50); // how far to scroll on each step
                } else {
                    window.clearInterval(scrollToTop);
                }
            }, 16);
        }
    }

    getErrorMessage(): string {
        return 'Please fill the red marked fields and provide the correct format';
    }



}
