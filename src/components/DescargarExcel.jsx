import React from 'react';
import * as XLSX from 'xlsx';
import { ajustarFecha } from "@/utils/dateUtils";

const DescargarExcel = ({ solicitud }) => {
  const generarExcel = () => {
    // Crear datos para el encabezado
    const header = [
      ["RENDICION DE GASTOS"],
      ["NOMBRE Y APELLIDOS:", solicitud.Nombres, "", "", "DEPARTAMENTO:", solicitud.CodigoProyecto],
      ["Detalle:", solicitud.NombreMotivo],
      ["Centro de Costo:", solicitud.CodigoProyecto],
    ];

    // Crear datos para los detalles
    const detalles = [
      ["ITEM", "FECHA", "NUMERO", "PROVEEDOR", "(1) MOVILIZACION", "", "", "(2) HOTEL", "", "(3) COMIDAS", "", "", "(4) OTROS GASTOS", "", "TOTAL (1+2+3+4)", "CARGO A CUENTA"],
      ["", "", "", "", "Estacionamiento", "Combustible", "Taxi", "", "Desayuno", "Almuerzo", "Cena", "DETALLE", "OTROS", "SOLES"],
      ...solicitud.DetalleRendicion.map((detalle, index) => {
        // Verificar si la fecha es válida
        let fechaFormateada = "";
        try {
          fechaFormateada = ajustarFecha(detalle.Fecha);
        } catch (error) {
          fechaFormateada = "Fecha inválida";
        }

        return [
          index + 1,
          fechaFormateada,
          detalle.Numero || "",
          detalle.Proveedor || "",
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

    // Crear datos para el pie de página
    const footer = [
      ["SALDO ANTERIOR EN SU PODER", "", "", "", "", "", "", "", "", "", "", "", "", "", "", solicitud.SaldoAnterior || ""],
      ["ENTREGA A RENDIR CUENTA", "", "", "", "", "", "", "", "", "", "", "", "", "", "", solicitud.EntregaARendir || ""],
      ["TOTAL RECIBIDO", "", "", "", "", "", "", "", "", "", "", "", "", "", "", solicitud.TotalRecibido || ""],
      ["TOTAL GASTOS OCASIONADOS", "", "", "", "", "", "", "", "", "", "", "", "", "", "", solicitud.TotalGastos ? solicitud.TotalGastos.toFixed(2) : ""],
      ["SALDO A DEPOSITAR EN CUENTA CORRIENTE", "", "", "", "", "", "", "", "", "", "", "", "", "", "", solicitud.SaldoADepositar || ""],
    ];

    // Crear la hoja de cálculo
    const ws = XLSX.utils.aoa_to_sheet([...header, [], ...detalles, [], ...footer]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Rendicion");

    // Descargar el archivo
    XLSX.writeFile(wb, `rendicion_${solicitud.SolicitudId}.xlsx`);
  };

  return (
    <button
      onClick={generarExcel}
      className="text-gray-800 bg-blue-400 font-semibold py-1 rounded-md px-4"
    >
      Descargar Excel
    </button>
  );
};

export default DescargarExcel;
