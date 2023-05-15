import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  constructor(private readonly router: Router) { }

  ngOnInit(): void {
  }

  detail(id: number){
    this.router.navigate([`/recommendation/detail/${id}`]);
  }
}
