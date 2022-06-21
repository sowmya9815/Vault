import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LogauthService {

  private _logUrl= "http://localhost:3000/api/logs";
  private _viewUrl= "http://localhost:3000/api/view";
  private _viewcheckUrl="http://localhost:3000/api/viewcheck";
  private _changecheckUrl="http://localhost:3000/api/changecheck";
  private _changecheckrUrl="http://localhost:3000/api/changecheckR";

  constructor(private http: HttpClient) { }

  logUser(loger:any){
    return this.http.post<any>(this._logUrl,loger)
  }

  viewlogs(){
    return this.http.get<any>(this._viewUrl)
  }

  viewcheck(){
    return this.http.get<any>(this._viewcheckUrl)
  }

  approveeventstat(event:any){
    console.log(event)
    return this.http.post<any>(this._changecheckUrl,event)
  }

  rejecteventstat(event:any){
    console.log(event)
    return this.http.post<any>(this._changecheckrUrl,event)
  }

}
