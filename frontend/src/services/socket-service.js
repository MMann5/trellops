import io from 'socket.io-client';
let socket = io(window.location.origin.replace(/^http/, 'ws'), {
  transports: ['websocket', 'polling'],
});

export default socket;
