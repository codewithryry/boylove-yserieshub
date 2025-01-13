const webpack = require('webpack'); // Import webpack for DefinePlugin

module.exports = {
  devServer: {
    setupMiddlewares: (middlewares, devServer) => {
      if (!devServer) {
        throw new Error('webpack-dev-server is not defined');
      }

      // Define your custom middleware here
      devServer.app.get('/songs.json', (req, res) => {
        res.redirect('/blocked'); // Redirect to /blocked
      });

      devServer.app.get('/recommendation.json', (req, res) => {
        res.redirect('/blocked'); // Redirect to /blocked
      });

      devServer.app.get('/series.json', (req, res) => {
        res.redirect('/blocked'); // Redirect to /blocked
      });

      devServer.app.get('/faq.json', (req, res) => {
        res.redirect('/blocked'); // Redirect to /blocked
      });

      devServer.app.get('/blogPosts.json', (req, res) => {
        res.redirect('/blocked'); // Redirect to /blocked
      });


      

      // Return the middlewares array
      return middlewares;
    },
  },

  // Add DefinePlugin configuration here
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: JSON.stringify(false), // Set to false to suppress hydration mismatch warnings
      }),
    ],
  },
};