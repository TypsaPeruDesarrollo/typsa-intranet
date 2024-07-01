import React, { createContext, useState, useContext } from 'react';

const MessageContext = createContext();

export const useMessages = () => {
  return useContext(MessageContext);
};

export const MessageProvider = ({ children }) => {
  const [message, setMessage] = useState(null);

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 3000); // Oculta el mensaje después de 3 segundos
  };

  return (
    <MessageContext.Provider value={{ message, showMessage }}>
      {children}
    </MessageContext.Provider>
  );
};
