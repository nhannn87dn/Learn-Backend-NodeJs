import app from './src/app';

const PORT = process.env.PORT || 8080;


const server = app.listen(PORT, () =>
  console.log(`🚀 Server ready at: http://localhost:${PORT}`),
)