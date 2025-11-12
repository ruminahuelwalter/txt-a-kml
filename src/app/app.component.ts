import { Component, OnInit } from '@angular/core';
import { ConvertirTxtAKmlComponent } from './components/convertir-txt-a-kml/convertir-txt-a-kml.component'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ ConvertirTxtAKmlComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent  {
  title = '';

}
