const config = {
    development: {
      apiUrl: 'http://localhost:8000', // Use the correct development URL
    },
    production: {
      apiUrl: 'https://www.example.com', // Use the correct production URL
    },
  };
  
  export default config[process.env.NODE_ENV || 'development'];
  