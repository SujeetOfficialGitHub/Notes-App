const config = {
    development: {
      apiUrl: 'http://localhost:8000',
    },
    production: {
      apiUrl: 'https://notespublish.pythonanywhere.com', 
    },
  };
  
  export default config[process.env.NODE_ENV || 'development'];
  