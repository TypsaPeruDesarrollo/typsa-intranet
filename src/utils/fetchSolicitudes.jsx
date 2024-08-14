
export const fetchSolicitudes = async (empleadoId, accessToken, estadoIds) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/solicitud-viaticos/${empleadoId}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      const data = await response.json();
      
      return data.filter(solicitud => estadoIds.includes(solicitud.EstadoId));
    } else {
      throw new Error(`Failed to fetch solicitudes: ${response.status}`);
    }
  } catch (err) {
    console.error('Error fetching data:', err);
    throw err;
  }
};
