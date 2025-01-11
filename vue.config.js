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
};