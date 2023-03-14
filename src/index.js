const app = require('./config/express')();
const port = process.env.PORT || 3000;

app.use('/api', require('./routers/itemRoutes')());

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
