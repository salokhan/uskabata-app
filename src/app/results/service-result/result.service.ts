import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { IResult } from '../result';

@Injectable()
export class ResultService {

    resultUrl = 'api/results/results.json';
    private resultStorage: IResult;

    constructor(private _http: Http) {

    }

    private handleError(response: Response) {
        return Observable.throw(response.json().error || 'Server Error');
    }

    getResult(): Observable<IResult[]> {
        return this._http.get(this.resultUrl).map((response: Response) =>
            <IResult[]>response.json()
        ).do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    setResultStorage(result: IResult): void {
        this.resultStorage = result;
    }

    getResultStorage(): IResult {
        return this.resultStorage;
    }

}
