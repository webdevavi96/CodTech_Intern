import { app, server, port } from './app.js';
import { connect } from './src/config/conn.db.js';

// DB Connection Main server running
connect()
  .then(() => {
    server.on('error', (error) => {
      console.error(error);
      throw error;
    });
    server.listen(port, () => {
      console.log('Server is running on port: ', port);
    });
  })
  .catch((error) => console.error('mongoDB connection error: ', error));
