import * as XLSX from 'xlsx';
import { ajustarFecha } from "@/utils/dateUtils";

export const generarExcel = (solicitud) => {
  const header = [
    ["RENDICION DE GASTOS"],
    ["NOMBRE Y APELLIDOS:", solicitud.Nombres, "", "", "DEPARTAMENTO:", solicitud.CodigoProyecto],
    ["Detalle:", solicitud.NombreMotivo],
    ["Centro de Costo:", solicitud.CodigoProyecto],
  ];

  const detalles = [
    ["ITEM", "RESUMEN", "FECHA", "(1) MOVILIZACION", "", "", "(2) HOTEL", "(3) COMIDAS", "", "", "(4) OTROS GASTOS", "", "TOTAL (1+2+3+4)"],
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
        detalle.TotalRendicion ? detalle.TotalRendicion.toFixed(2) : "",
      ];
    }),
  ];

  const ajustarDetalles = (detalles) => {
    return detalles.map((fila, index) => {
      if (index > 1) {
        const item = fila[1].toLowerCase();
        const monto = parseFloat(fila[12]) || 0;
        switch (item) {
          case 'hotel':
            fila[6] = monto;
            break;
          case 'movilidad':
            fila[5] = monto;
            break;
          case 'desayuno':
            fila[7] = monto;
            break;
          case 'almuerzo':
            fila[8] = monto;
            break;
          case 'cena':
            fila[9] = monto;
            break;
          default:
            break;
        }
        fila[12] = monto;
      }
      return fila;
    });
  };

  const detallesAjustados = ajustarDetalles(detalles);

  const totalSoles = detallesAjustados.reduce((acc, fila, index) => {
    if (index > 1) {
      return acc + (parseFloat(fila[12]) || 0);
    }
    return acc;
  }, 0);

  const footer = [
    ["SALDO ANTERIOR EN SU PODER", "", "", "", "", "", "", "", "", "", "", "", ""],
    ["ENTREGA A RENDIR CUENTA", "", "", "", "", "", "", "", "", "", "", "", ""],
    ["TOTAL RECIBIDO", "", "", "", "", "", "", "", "", "", "", "", ""],
    ["TOTAL GASTOS OCASIONADOS", totalSoles.toFixed(2).replace(".", ",")],
    ["SALDO A DEPOSITAR EN CUENTA CORRIENTE", totalSoles.toFixed(2).replace(".", ",")],
  ];

  const ws = XLSX.utils.aoa_to_sheet([...header, [], ...detallesAjustados, [], ...footer]);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Rendicion");

  XLSX.writeFile(wb, `rendicion_${solicitud.SolicitudId}.xlsx`);
};
