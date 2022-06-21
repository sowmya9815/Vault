import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  constructor(private _router : Router) { }

  ngOnInit(): void {
  }
  logentry(){
    this._router.navigate(['/logs'])
  }
  viewlogs(){
   console.log("success")
   this._router.navigate(['/view'])
  }

}
