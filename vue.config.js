module.exports = {
    devServer: {
      onBeforeSetupMiddleware: (devServer) => {

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

      },
    },
  };