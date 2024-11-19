let ioInstance;

exports.initSocket = (io) => {
  ioInstance = io;
};

exports.notifySuperhero = (event, data) => {
  if (ioInstance) {
    // console.log(`Emitting event ${event} with data:`, data);
    ioInstance.emit(event, data); // Notify all connected clients
  } else {
    console.error("Socket.IO instance not initialized.");
  }
}; 