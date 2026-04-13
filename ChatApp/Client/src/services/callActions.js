import { io } from 'socket.io-client';

export const endCall = () => {
  alert('Call Ended!');
};

export const muteCall = () => {
  return;
};

export const addNewPeople = () => {
  return;
};

export function chat() {
  return io(import.meta.env.VITE_CHAT_URL);
}
