import { Component, inject, OnInit } from '@angular/core';
import { FormularioService } from '../../services/formulario.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';
import autotable from 'jspdf-autotable';
interface formulario {
  id: number;
  fecha?: string;
  horaIngreso?: string;
  horaSalida?: string;
  area?: string;
  marca?: string;
  modelo?: string;
  serie?: string;
  tipo?: string;
  capacidad?: string;
  refrig?: string;
  psi?: string;
  volts?: string;
  amp?: string;
  // Descripción de trabajo
  descripcion?: string;
  cantidad?: string;
  materiales?: string;
  recomendado?: string;
}
@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss']
})
export class formularioComponent implements OnInit {
  private FormularioService = inject(FormularioService);
  formularios: formulario[] = [];
  dialog_visible = false;
  formulario_id = -1;
  isSaving = false;


  // 1) Incluimos los controles para horaIngreso y horaSalida
  formularioForm = new FormGroup({
    fecha: new FormControl('', Validators.required),
    horaIngreso: new FormControl('', Validators.required),
    horaSalida: new FormControl('', Validators.required),
    area: new FormControl('', Validators.required),
    marca: new FormControl('', Validators.required),
    modelo: new FormControl('', Validators.required),
    serie: new FormControl('', Validators.required),
    tipo: new FormControl('', Validators.required),
    capacidad: new FormControl('', Validators.required),
    refrig: new FormControl('', Validators.required),
    psi: new FormControl('', Validators.required),
    volts: new FormControl('', Validators.required),
    amp: new FormControl('', Validators.required),
    // Descripción de trabajo
    descripcion: new FormControl('', Validators.required),
    cantidad: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$')]),
    materiales: new FormControl('', Validators.required),
    recomendado: new FormControl('', Validators.required)
  });

  ngOnInit(): void {
    this.getformularios();
  }

  getformularios() {
    this.FormularioService.funListar().subscribe(
      (res: any) => this.formularios = res,
      (err: any) => console.error(err)
    );
  }

  mostrarDialog() {
    this.formulario_id = -1;
    this.formularioForm.reset();
    this.dialog_visible = true;
  }

  cerrarDialog(): void {
    this.dialog_visible = false;
    setTimeout(() => {
      if (document.activeElement instanceof HTMLElement) document.activeElement.blur();
    }, 0);
  }

  guardarformulario() {
    if (this.formularioForm.invalid) {
      this.alerta('ERROR AL REGISTRAR', 'Complete todos los campos', 'error');
      return;
    }

    const data = { ...this.formularioForm.value };

    // Validar y formatear fecha
    if (data.fecha) {
      const f = new Date(data.fecha);
      data.fecha = `${f.getFullYear()}-${String(f.getMonth() + 1).padStart(2, '0')}-${String(f.getDate()).padStart(2, '0')}`;
    }

    this.isSaving = true;
    const request$ = this.formulario_id > 0
      ? this.FormularioService.funModificar(this.formulario_id, data)
      : this.FormularioService.funGuardar(data);
    request$.subscribe(
      () => {
        this.isSaving = false;
        this.cerrarDialog();
        this.getformularios();
        this.alerta(this.formulario_id > 0 ? 'ACTUALIZADO' : 'REGISTRADO', '¡Operación exitosa!', 'success');
        this.formulario_id = -1;
        this.formularioForm.reset();
      },
      () => {
        this.isSaving = false;
        this.alerta(this.formulario_id > 0 ? 'ERROR AL ACTUALIZAR' : 'ERROR AL REGISTRAR', 'Verifica los datos!', 'error');
      }
    );
  }
  editarformulario(formulario: formulario): void {
    this.formulario_id   = formulario.id;
    this.dialog_visible = true;

    // Limpia residuos de ediciones previas (opcional)
    this.formularioForm.reset();

    // Extrae sólo la fecha "YYYY-MM-DD"
    const [fecha] = formulario.fecha?.split('T') ?? [''];

    this.formularioForm.patchValue({
      fecha,
      horaIngreso: formulario.horaIngreso ?? '',
      horaSalida:  formulario.horaSalida  ?? '',
      area:        formulario.area        ?? '',
      marca:       formulario.marca       ?? '',
      modelo:      formulario.modelo      ?? '',
      serie:       formulario.serie       ?? '',
      tipo:        formulario.tipo        ?? '',
      capacidad:   formulario.capacidad   ?? '',
      refrig:      formulario.refrig      ?? '',
      psi:         formulario.psi         ?? '',
      volts:       formulario.volts       ?? '',
      amp:         formulario.amp         ?? '',
      // Descripción de trabajo
      descripcion: formulario.descripcion ?? '',
      // ← Aquí convertimos number → string
      cantidad:    formulario.cantidad != null 
                      ? formulario.cantidad.toString() 
                      : '',
      // Si materiales y acciones no son strings, conviértelos igual
      materiales:  formulario.materiales != null 
                      ? formulario.materiales.toString() 
                      : '',
      recomendado:    formulario.recomendado != null 
                      ? formulario.recomendado.toString() 
                      : ''
    });
  }
  eliminarformulario(cat: formulario) {
    Swal.fire({
      title: '¿Eliminar formulario?',
      text: '¡No podrás revertirlo!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33'
    }).then(result => {
      if (result.isConfirmed) {
        this.FormularioService.funEliminar(cat.id).subscribe(
          mensaje => {
            const texto = String(mensaje);
            this.alerta('ELIMINADO', texto, 'success');
            this.getformularios();
            this.formulario_id = -1;
          },
          err => {
            console.error('Error al eliminar categoría', err);
            this.alerta('ERROR', 'Error al eliminar la categoría', 'error');
          }
        );
      }
    });
  }
  alerta(title: string, text: string, icon: 'success' | 'error' | 'info' | 'question') {
    Swal.fire({ title, text, icon });
  }
  private loadImageAsDataUrl(url: string): Promise<string> {
    return fetch(url)
      .then(res => res.blob())
      .then(blob => new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      }));
  }
  async generarPDFformulario(cat: formulario): Promise<void> {
    const doc = new jsPDF();
    try {
      const dataUrl = await this.loadImageAsDataUrl('assets/layout/images/Logo-FRIGO.jpg');
      doc.addImage(dataUrl, 'JPG', 127, 10, 70, 25);
    } catch (err) {
      console.warn('No se pudo cargar el logo desde assets:', err);
    }
    doc.setFontSize(18);
    doc.text("Formulario", 90, 10);

    doc.setFontSize(12);
    if (cat.fecha) {
      doc.text('Hora Ingreso: ' + cat.horaIngreso, 14, 25)
      doc.text('Hora Salida: ' + cat.horaSalida, 14, 30);
      doc.text('Fecha: ' + cat.fecha, 10, 20);
    }
    doc.setFontSize(13);
    doc.text('Información:', 10, 40);

    const datos = [
      //['Hora Ingreso', cat.horaIngreso || ''],
      //['Hora Salida', cat.horaSalida || ''],
      ['Área', cat.area || ''],
      ['Marca', cat.marca || ''],
      ['Modelo', cat.modelo || ''],
      ['Serie', cat.serie || ''],
      ['Capacidad', cat.capacidad || ''],
      ['Refrigeración', cat.refrig || ''],
      ['PSI', cat.psi || ''],
      ['Volts', cat.volts || ''],
      ['Amp', cat.amp || ''],
      ['Tipo', cat.tipo || ''],

      ['Descripción', cat.descripcion || ''],
      ['Cantidad', cat.cantidad || ''],
      ['Materiales', cat.materiales || ''],
      ['recomendado', cat.recomendado || '']
    ];

    autotable(doc, {
      startY: 45,
      head: [['Datos', 'Detalles']],
      body: datos,
      styles: {
        fontSize: 11,
        cellPadding: 4,
        fillColor: [255, 255, 255]
      },
      headStyles: {
        fillColor: [243, 146, 0], // naranja corporativo
        textColor: 255,
        fontStyle: 'bold'
      },
      alternateRowStyles: {
        fillColor: [240, 245, 255]  // azul claro corporativo
      },
      tableLineWidth: 0.1,
      tableLineColor: [200, 200, 200]
    });

    doc.save(`Informe_${cat.id}-${cat.fecha}.pdf`);
  }
}

