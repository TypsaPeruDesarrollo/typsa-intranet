import { format } from 'date-fns';

export const ajustarFecha = (fechaISO) => {
  const fecha = new Date(fechaISO);
  fecha.setMinutes(fecha.getMinutes() + fecha.getTimezoneOffset());
  return format(fecha, 'dd/MM/yyyy');
};