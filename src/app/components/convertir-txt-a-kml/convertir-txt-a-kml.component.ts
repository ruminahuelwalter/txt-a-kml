import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { NgIf } from '@angular/common';


@Component({
  selector: 'convertir-txt-to-kml',
  templateUrl: './convertir-txt-a-kml.component.html',
  styleUrls: ['./convertir-txt-a-kml.component.css'],
  standalone: true,
  imports: [
    NgIf,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule
  ]
})

export class ConvertirTxtAKmlComponent {
  kmlData: string | null = null;
  previewData: any[] = [];
  fileName: string = 'export.kml';

  displayedColumns: string[] = [
  'folio', 'nombre', 'direccion', 'socio', 'sum', 'medidor', 'latitud', 'longitud'
];


  onFileSelected(event: any) {
    const file: File = event.files?.[0] || event.target.files?.[0];
    if (!file) return;

    this.fileName = file.name.replace(/\.[^/.]+$/, '') + '.kml';
    const reader = new FileReader();

    reader.onload = () => {
      const text = reader.result as string;
      const lines = text.split('\n').filter(l => l.trim() !== '');
      const parsedData = this.parseData(lines);
      this.previewData = parsedData.slice(0, 5);
      this.kmlData = this.convertToKML(parsedData);
    };

    reader.readAsText(file);
  }

  parseData(lines: string[]) {
    const data: any[] = [];
    for (let line of lines) {
      const cols = line.split('\t');
      if (cols.length < 18) continue;

      data.push({
        folio: cols[1]?.trim(),
        nombre: cols[2]?.trim(),
        direccion: cols[3]?.trim(),
        socio: cols[4]?.trim(),
        sum: cols[5]?.trim(),
        medidor: cols[6]?.trim(),
        latitud: cols[16]?.trim(),
        longitud: cols[17]?.trim()
      });
    }
    return data;
  }

  convertToKML(data: any[]): string {
    let placemarks = '';

    for (const row of data) {
      if (!row.latitud || !row.longitud) continue;

      const descripcion = `
        Folio: ${row.folio}<br/>
        Dirección: ${row.direccion}<br/>
        Socio: ${row.socio}<br/>
        Suministro: ${row.sum}<br/>
        Medidor: ${row.medidor}
      `;

      placemarks += `
        <Placemark>
          <name>${row.nombre}</name>
          <description><![CDATA[${descripcion}]]></description>
          <Point>
            <coordinates>${row.longitud},${row.latitud},0</coordinates>
          </Point>
        </Placemark>
      `;
    }

    return `<?xml version="1.0" encoding="UTF-8"?>
      <kml xmlns="http://www.opengis.net/kml/2.2">
        <Document>
          <name>Datos Exportados</name>
          ${placemarks}
        </Document>
      </kml>`;
  }

  downloadKML() {
    if (!this.kmlData) return;
    const blob = new Blob([this.kmlData], { type: 'application/vnd.google-earth.kml+xml' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = this.fileName;
    a.click();
    window.URL.revokeObjectURL(url);
  }

  clearData() {
    this.kmlData = null;
    this.previewData = [];
  }
}
