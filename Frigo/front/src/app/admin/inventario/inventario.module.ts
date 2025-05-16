import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductoComponent } from './components/producto/producto.component';
import { formularioComponent } from './components/formulario/formulario.component';
import { HttpClientModule } from '@angular/common/http';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToolbarModule } from 'primeng/toolbar';
import { PrimengModule } from '../../primeng/primeng.module';
import { FileUploadModule } from 'primeng/fileupload';
import { DropdownModule } from 'primeng/dropdown';



@NgModule({
  declarations: [
    ProductoComponent,
    formularioComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    TableModule,
    DialogModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    ReactiveFormsModule,
    ToolbarModule,
    PrimengModule,
    DropdownModule,
    FormsModule,
    FileUploadModule,
  ]
})
export class InventarioModule { }
