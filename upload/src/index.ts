import app from './app';

const port = process.env.UPLOAD_PORT || 3002;

app.listen(port, () => {
  /* eslint-disable no-console */
  console.log(`Listening: http://localhost:${port}`);
  /* eslint-enable no-console */
});
