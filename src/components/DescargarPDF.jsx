import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { ajustarFecha } from "@/utils/dateUtils";

export const generarPDF = (solicitud) => {
  const doc = new jsPDF('landscape');

  doc.setFontSize(18);
  doc.text("RENDICION DE GASTOS", 14, 22);
  doc.setFontSize(12);
  doc.text(`NOMBRE Y APELLIDOS: ${solicitud.Nombres}`, 14, 32);
  doc.text(`DEPARTAMENTO: ${solicitud.CodigoProyecto}`, 140, 32);
  doc.text(`Detalle: ${solicitud.NombreMotivo}`, 14, 42);
  doc.text(`Centro de Costo: ${solicitud.CodigoProyecto}`, 14, 52);

  const detalles = [
    [{ content: "ITEM", styles: { halign: 'center' } }, "RESUMEN", "FECHA", { content: "MOVILIZACION", colSpan: 3, styles: { halign: 'center' } }, { content: "HOTEL", styles: { halign: 'center' } }, { content: "COMIDAS", colSpan: 3, styles: { halign: 'center' } }, { content: "OTROS GASTOS", colSpan: 2, styles: { halign: 'center' } }, "TOTAL"],
    ["", "", "", "Estacionamiento", "Combustible", "Taxi", "HOTEL", "Desayuno", "Almuerzo", "Cena", "DETALLE", "OTROS", "SOLES"],
    ...solicitud.DetalleRendicion.map((detalle, index) => {
      let fechaFormateada = "";
      try {
        fechaFormateada = ajustarFecha(detalle.FechaRendicion);
      } catch (error) {
        fechaFormateada = "Fecha inválida";
      }

      return [
        index + 1,
        detalle.Resumen || "",
        fechaFormateada,
        detalle.Estacionamiento || "",
        detalle.Combustible || "",
        detalle.Taxi || "",
        detalle.Hotel || "",
        detalle.Desayuno || "",
        detalle.Almuerzo || "",
        detalle.Cena || "",
        detalle.Detalle || "",
        detalle.Otros || "",
        detalle.TotalRendicion ? detalle.TotalRendicion.toFixed(2).replace(".", ",") : "",
      ];
    }),
  ];

  const totalSoles = detalles.slice(2).reduce((acc, fila) => {
    return acc + (parseFloat(fila[12].replace(",", ".")) || 0);
  }, 0);

  const footer = [
    ["SALDO ANTERIOR EN SU PODER", ""],
    ["ENTREGA A RENDIR CUENTA", ""],
    ["TOTAL RECIBIDO", ""],
    ["TOTAL GASTOS OCASIONADOS", totalSoles.toFixed(2).replace(".", ",")],
    ["SALDO A DEPOSITAR EN CUENTA CORRIENTE", totalSoles.toFixed(2).replace(".", ",")],
  ];

  doc.autoTable({
    startY: 60,
    head: detalles.slice(0, 2),
    body: detalles.slice(2),
    theme: 'grid',
    headStyles: { fillColor: [0, 81, 186] },
  });

  doc.autoTable({
    startY: doc.autoTable.previous.finalY + 10,
    body: footer,
    theme: 'grid',
    headStyles: { fillColor: [0, 81, 186] },
  });

  doc.save(`rendicion_${solicitud.SolicitudId}.pdf`);
};
