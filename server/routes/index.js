const dateRoutes = require('./date')


const constructorMethod = (app) => {
  app.use('/date', dateRoutes);
  
  app.use('*', (req, res) => {
    res.status(404).json({ error: 'Not found' });
  });
};




module.exports = constructorMethod;
