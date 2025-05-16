import { Component } from '@angular/core';
import { PedidoService } from '../../service/pedido.service';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-lista-pedido',
  templateUrl: './lista-pedido.component.html',
  styleUrl: './lista-pedido.component.scss'
})
export class ListaPedidoComponent {
  mostrar_pedido: boolean = false;
  detalle_pedido: any;

  pedidos: any[] = [
    {
      id: 3,
      fecha: "2024-01-01",
      cliente: {
        nombre_completo: "Christopher D. Jimenez",
        dni: 123456789,
        telefono: 157554245
      },
      productos: [
        {
          id: 2,
          nombre: "Cerveza",
          cantidad: 2
        },
        {
          id: 5,
          cantidad: 1
        }
      ]
    },
    {
      id: 4,
      fecha: "2024-01-01",
      cliente: {
        nombre_completo: "Melarosano P. Pedromaster",
        dni: 123456789,
        telefono: 1245332578
      },
      productos: [
        {
          id: 6,
          nombre: "Cerveza",
          cantidad: 22
        },
        {
          id: 15,
          cantidad: 15
        }
      ]
    },
    {
      id: 1,
      fecha: "2024-01-01",
      cliente: {
        nombre_completo: "lufi D. Dregon",
        dni: 123456789,
        telefono: 157554245
      },
      productos: [
        {
          id: 6,
          nombre: "Cerveza",
          cantidad: 2
        },
        {
          id: 9,
          cantidad: 7
        }
      ]
    }
  ];

  constructor(private _pedidoService: PedidoService) {
    this.getPedidos();
  }

  async getPedidos() {
    this._pedidoService.funListar().subscribe(
      (res: any) => { this.pedidos = res }
    );
  }

  showDialogPedido(pedido: any) {
    this.mostrar_pedido = true;
    this.detalle_pedido = pedido;
  }

  generarPDF(pedido: any) {
    //probamos si genera
    //const doc=new jsPDF();
    //doc.text("Hola Mundo",10,10);
    //doc.save("a4.pdf");
    this.detalle_pedido = pedido;
    const doc = new jsPDF();
    doc.setFontSize(18); //tamaño de la fuente
    doc.text("Recibo del Pedido", 10, 20); //titulo con la posicion x y

    doc.setFontSize(12);
    doc.text("Número de Pedido: " + pedido.id, 15, 30);
    doc.text("Fecha Pedido: " + pedido.fecha, 15, 40);

    doc.setFontSize(12);
    doc.text("Datos de Cliente", 10, 50);
    doc.text("Cliente: " + pedido.cliente.nombre_completo, 15, 60);
    doc.text("DNI: " + pedido.cliente.dni, 15, 70);

    const headers = [['Producto', 'Precio', 'Cantidad', 'Subtotal']];
    const productos = pedido.productos.map((produ: any) => {
      const subtotal = parseFloat(produ.precio) * produ.cantidad;
      return [
        produ.nombre,
        `$ ${produ.precio}`,
        produ.cantidad,
        `$ ${subtotal.toFixed(2)}`
      ];
    });

    const startY = 80;
    autoTable(doc, {
      head: headers,
      body: productos,
      startY: startY,
    });

    doc.save("recibo.pdf");
  }
}
