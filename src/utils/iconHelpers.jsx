
import React from 'react';
import { FaCheck } from "react-icons/fa";
import { GiBackwardTime } from "react-icons/gi";
import { MdErrorOutline } from "react-icons/md";

export function iconBasedOnState(estadoId, columnIndex) {
  const checkIcon = <FaCheck style={{ color: '#82bd69' }} className="w-6 h-6 mx-auto" />;
  const pendingIcon = <GiBackwardTime style={{ color: '#e1be63' }} className="w-6 h-6 mx-auto" />;
  const errorIcon = <MdErrorOutline className="text-red-500 w-6 h-6 mx-auto" />;

  switch (estadoId) {
    case 5:
      if (columnIndex === 1) return checkIcon;
      break;
    case 6:
      if (columnIndex === 1) return checkIcon;
      break;
    case 7:
      if (columnIndex === 1 || columnIndex === 2) return checkIcon;
      break;
    case 8:
      if (columnIndex === 1 || columnIndex === 2 || columnIndex === 3) return checkIcon;
      break;
    case 9:
      if (columnIndex === 1) return checkIcon;
      if (columnIndex === 2) return errorIcon;
      break;
    case 10:
      if (columnIndex === 1 || columnIndex === 2 || columnIndex === 3 || columnIndex === 4) return checkIcon;
      break;
    case 11:
      if (columnIndex === 1 || columnIndex === 2 ) return checkIcon;
      if (columnIndex === 3) return errorIcon;
      break;
    default:
      return pendingIcon;
  }
  return pendingIcon;
}
