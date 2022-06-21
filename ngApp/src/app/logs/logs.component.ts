import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LogauthService } from '../logauth.service';
//import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css']
})
export class LogsComponent implements OnInit {

  logUserData:any = {}


  constructor(private _logauth: LogauthService, private _router: Router) { }

  ngOnInit(): void {
  }

  logUser(){
    this._logauth.logUser(this.logUserData)
    .subscribe(
      res => {
        console.log(res)
        //localStorage.setItem('token', res.token)
        this._router.navigate(['/view'])
      },
      err => console.log(err)
    )
  }

}
