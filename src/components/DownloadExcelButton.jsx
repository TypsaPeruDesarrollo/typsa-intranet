import React from 'react';
import axios from 'axios';

const DownloadExcelButton = ({ rendicionId }) => {
  const downloadExcel = async () => {
    if (!rendicionId) {
      alert('Rendicion ID no proporcionado');
      return;
    }

    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/export/${rendicionId}`, {
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const a = document.createElement('a');
      a.href = url;
      a.download = `detalle_gastos_${rendicionId}.xlsx`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error al descargar el archivo Excel:', error);
    }
  };

  return (
    <button onClick={downloadExcel}>Descargar Excel</button>
  );
};

export default DownloadExcelButton;
