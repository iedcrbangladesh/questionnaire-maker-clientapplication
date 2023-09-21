module.exports = {
    webpackDevMiddleware: (config) => {      
      config.watchOptions.poll = 300;
      return config;
    },
    env:{
      URL:'http://localhost:4000/api/'
    }
  };
  