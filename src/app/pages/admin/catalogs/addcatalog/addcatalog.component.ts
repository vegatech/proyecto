import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Catalogo } from 'src/app/model/Catalogo';
import { HttpClientService} from 'src/app/service/http-client.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { from } from 'rxjs';

@Component({
  selector: 'app-addcatalog',
  templateUrl: './addcatalog.component.html',
  styleUrls: ['./addcatalog.component.css']
})
export class AddcatalogComponent implements OnInit {

  @Input()
  catalogo: Catalogo;


  @Output()
  catalogAddedEvent = new EventEmitter();

  private selectedFile;
  imgURL: any;

  constructor(private httpClientService: HttpClientService,
    private activedRoute: ActivatedRoute,
    private router: Router,
    private httpClient: HttpClient) { }

  ngOnInit(): void {
  }

  public onFileChanged(event) {
    console.log(event);
    this.selectedFile = event.target.files[0];

    let reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (event2) => {
      this.imgURL = reader.result;
    };

  }

  saveCatalogo() {
//If there is no catalog id then it is an add catalog call else it is an edit catalogo call
    if (this.catalogo.id == null) {
    const uploadData = new FormData();
    uploadData.append('imageFile', this.selectedFile, this.selectedFile.name);
    this.selectedFile.imageName = this.selectedFile.name;

    this.httpClient.post('http://localhost:8080/catalogos/uploadfile', uploadData, { observe: 'response' })
    .subscribe((response) => {
      if (response.status === 200) {
        console.log('Imagen subida Exitosamente');
      } else {
        console.log('Imagen no pudo subirse');
      }
    }
        );
    
    this.httpClient.post('http://localhost:8080/catalogos/upload', uploadData, { observe: 'response' })
      .subscribe((response) => {
        if (response.status === 200) {
          this.httpClientService.addCatalogs(this.catalogo).subscribe(
            (catalogo) => {
              this.catalogAddedEvent.emit();
              this.router.navigate(['admin', 'catalogos']);
            }
          );
          console.log('Imagen subida Exitosamente');
        } else {
          console.log('Imagen no pudo subirse');
        }
      }
      );
    } else {
      this.httpClientService.updateCatalogs(this.catalogo).subscribe(
        (catalogo) => {
          this.catalogAddedEvent.emit();
          this.router.navigate(['admin', 'catalogos']);
        }
      );
  }//Save Catalogo

}

}
