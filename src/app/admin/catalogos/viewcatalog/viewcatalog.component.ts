import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Catalogo } from 'src/app/model/Catalogo';
import { HttpClientService } from 'src/app/service/http-client.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-viewcatalog',
  templateUrl: './viewcatalog.component.html',
  styleUrls: ['./viewcatalog.component.css']
})
export class ViewcatalogComponent implements OnInit {

  @Input()
  catalogo: Catalogo;

  @Output()
  catalogDeletedEvent = new EventEmitter();

  constructor(private httpClientService: HttpClientService, private router: Router) { }

  ngOnInit(): void {
  }


  deleteCatalog() {
    this.httpClientService.deleteCatalogs(this.catalogo.id).subscribe(
      (catalogo) => {
        this.catalogDeletedEvent.emit();
        this.router.navigate(['admin', 'catalogos']);
      }
    );
  }
  editCatalog() {
    this.router.navigate(['admin', 'catalogos'], { queryParams: { action: 'edit', id: this.catalogo.id } });
  }
}
