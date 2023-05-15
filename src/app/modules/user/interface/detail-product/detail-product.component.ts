import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.scss']
})
export class DetailProductComponent implements OnInit {

  constructor(private readonly routerActive: ActivatedRoute) { }

  ngOnInit(): void {
  }

  detail(id: number){
    this.routerActive.snapshot.paramMap.get('id')
  }

}
