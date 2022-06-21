import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { LogauthService } from '../logauth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  adval:boolean=true;

  events :any = []
  //event :any={}
  constructor(private _logAuth: LogauthService, private _router: Router) { }

  ngOnInit(): any {
    this._logAuth.viewlogs()
    .subscribe(
      res => this.events = res,
      err => console.log(err)
    ),
    this._logAuth.viewcheck()
   .subscribe(
     res=>this.adval=res
   )
  }

  changestatsapprove(event: any){
    this._logAuth.approveeventstat(event)
     .subscribe(
       res=>{
         event=res
         this._router.navigate(['/test'])
       })
   }

   changestatsreject(event: any){
    this._logAuth.rejecteventstat(event)
     .subscribe(
       res=>{
         event=res
         this._router.navigate(['/test'])
       })
   }

}
