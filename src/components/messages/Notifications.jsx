import React, { useEffect } from 'react';
import { useMessages } from './MessageContext';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Notifications = () => {
  const { message } = useMessages();

  useEffect(() => {
    AOS.init({ duration: 6000 });
  }, []);

  if (!message) return null;

  const { type, text } = message;

  let className = 'fixed bottom-4 left-4 p-4 rounded-lg shadow-lg text-white ';

  switch (type) {
    case 'success':
      className += 'bg-green-500';
      break;
    case 'error':
      className += 'bg-red-500';
      break;
    case 'warning':
      className += 'bg-yellow-500';
      break;
    case 'info':
      className += 'bg-blue-500';
      break;
    default:
      className += 'bg-gray-500';
  }

  return (
    <div 
      className={className}
      data-aos="fade-up"
      data-aos-anchor-placement="bottom-bottom"
    >
      {text}
    </div>
  );
};

export default Notifications;
