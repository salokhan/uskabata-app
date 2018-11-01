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
        this.scrollToTop();
        return 'Please fill the red marked fields and provide the correct format';
    }

    getMonths(): any[] {
        return ['January', 'February', 'March', 'April',
            'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    }

    getYears(): any[] {
        const years: any[] = [];
        const currentYear = (new Date()).getFullYear();
        const toBackYear = 80;
        for (let i = currentYear; i !== (currentYear - toBackYear); i--) {
            years.push(i);
        }
        return years;
    }

    getHour(): any[] {
        const hours: any[] = [];
        for (let i = 1; i <= 12; i++) {
            if (i < 10) {
                hours.push('0' + i.toString());
            } else {
                hours.push(i.toString());
            }
        }
        return hours;
    }
    getMinute(): any[] {
        const minutes: any[] = [];
        for (let i = 0; i < 60; i++) {
            if (i < 10) {
                minutes.push('0' + i.toString());
            } else {
                minutes.push(i.toString());
            }
        }
        return minutes;
    }
    getAPMeridiem(): any[] {
        return ['AM', 'PM'];
    }

}


