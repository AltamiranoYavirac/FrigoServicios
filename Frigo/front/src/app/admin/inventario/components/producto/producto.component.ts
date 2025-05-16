// src/app/admin/inventario/components/producto/producto.component.ts

import { Component, OnInit } from '@angular/core';
import { TableLazyLoadEvent } from 'primeng/table';
import { ProductoService, Producto } from '../../services/producto.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss']
})
export class ProductoComponent implements OnInit {
  products: Producto[] = [];
  loading = false;
  totalRecords = 0;
  buscador = '';

  visible = false;
  isEdit = false;
  editId: number | null = null;
  nuevoMaterial: Partial<Producto> = {};

  // ← Agregado: lista de formularios para el p-dropdown
  formularios = [
    { name: 'Formulario A', code: 'FA' },
    { name: 'Formulario B', code: 'FB' },
    { name: 'Formulario C', code: 'FC' }
  ];

  selectedProduct: Producto | null = null;

  constructor(private productoService: ProductoService) {}

  ngOnInit(): void {
    this.loadProductos({ first: 0, rows: 10 } as TableLazyLoadEvent);
  }

  loadProductos(event: TableLazyLoadEvent) {
    this.loading = true;
    const first = event.first ?? 0;
    const rows  = event.rows  ?? 10;
    const page  = first / rows + 1;

    this.productoService
      .funListar(page, rows, this.buscador)
      .subscribe((res: any) => {
        this.products     = res.data;
        this.totalRecords = res.total;
        this.loading      = false;
      });
  }

  buscar(event: KeyboardEvent) {
    if (event.key === 'Enter' || !this.buscador) {
      this.loadProductos({ first: 0, rows: 10 } as TableLazyLoadEvent);
    }
  }

  openNew() {
    this.isEdit        = false;
    this.editId        = null;
    this.nuevoMaterial = {};
    this.visible       = true;
  }

  onEditButton() {
    if (!this.selectedProduct) return;
    this.isEdit        = true;
    this.editId        = this.selectedProduct.id!;
    this.nuevoMaterial = { ...this.selectedProduct };
    this.visible       = true;
  }

  onDeleteButton() {
    if (!this.selectedProduct) return;
    this.productoService.eliminar(this.selectedProduct.id!).subscribe(() => {
      this.selectedProduct = null;
      this.loadProductos({ first: 0, rows: 10 } as TableLazyLoadEvent);
    });
  }

  guardarMaterial() {
    const action$ = (this.isEdit && this.editId != null)
      ? this.productoService.actualizar(this.editId, this.nuevoMaterial)
      : this.productoService.crear(this.nuevoMaterial as Producto);

    action$.subscribe(() => {
      this.visible         = false;
      this.selectedProduct = null;
      this.loadProductos({ first: 0, rows: 10 } as TableLazyLoadEvent);
    });
  }
}
