import app from './app';

console.log(`Server rodando na porta:${process.env.PORT}`);
app.listen(process.env.PORT);
