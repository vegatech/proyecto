import { Component, OnInit } from '@angular/core';
import { Catalogo } from '../../model/Catalogo';
import { HttpClientService } from '../../service/http-client.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-catalogs',
  templateUrl: './catalogs.component.html',
  styleUrls: ['./catalogs.component.css']
})
export class CatalogsComponent implements OnInit {

  catalogos: Array<Catalogo>;
  catalogsRecieved: Array<Catalogo>;
  selectedCatalog: Catalogo;
  action: string;

  constructor(private httpClientService: HttpClientService, 
     private activedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.refreshData();
  }
  refreshData() {
  this.httpClientService.getCatalogs().subscribe(
    response => this.handleSuccessfulResponse(response)
  );
  this.activedRoute.queryParams.subscribe(
    (params) => {
      // get the url parameter named action. this can either be add or view.
      this.action = params['action'];
        // get the parameter id. this will be the id of the book whose details 
        // are to be displayed when action is view.
        const id = params['id'];
        // if id exists, convert it to integer and then retrive the book from
        // the books array
      if (id) {
        this.selectedCatalog = this.catalogos.find(catalogo => {
          return catalogo.id === +id;
        });
      }
    }
  );
 
}


 // we will be taking the books response returned from the database
  // and we will be adding the retrieved   
  handleSuccessfulResponse(response) {
    this.catalogos = new Array<Catalogo>();
    //get books returned by the api call
    this.catalogsRecieved = response;
    for (const catalog of this.catalogsRecieved) {
    
      const catalogwithRetrievedImageField = new Catalogo();
      catalogwithRetrievedImageField.id = catalog.id;
      catalogwithRetrievedImageField.idusuario = catalog.idusuario;
      catalogwithRetrievedImageField.fechaIns = catalog.fechaIns;
      catalogwithRetrievedImageField.descripcion = catalog.descripcion;
      catalogwithRetrievedImageField.detalle = catalog.detalle;
      catalogwithRetrievedImageField.img = catalog.img;
      //populate retrieved image field so that book image can be displayed
      catalogwithRetrievedImageField.retrievedImage = 'data:image/jpeg;base64,' + catalog.img;
      catalogwithRetrievedImageField.precio = catalog.precio;
      catalogwithRetrievedImageField.estatus = catalog.estatus;
      
      this.catalogos.push(catalogwithRetrievedImageField);
    }
  }
  addCatalog() {
    this.selectedCatalog = new Catalogo();
    this.router.navigate(['admin', 'catalogs'], { queryParams: { action: 'add' } });

  }
  viewCatalog(id: number) {
    this.router.navigate(['admin', 'catalogs'], { queryParams: { id, action: 'view' } });
  }

}
