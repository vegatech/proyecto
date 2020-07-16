import { Component, OnInit } from '@angular/core';
import { HttpLoginService } from '../../service/service.index';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  constructor(
    public _httploginservice: HttpLoginService
  ) { }

  ngOnInit() {
  }

}
