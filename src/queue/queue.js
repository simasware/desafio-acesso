import amqplib from "amqplib";

const conectar = () => {
  console.log("Conectando ao AMQP");
  return amqplib
    .connect(process.env.AMQP_URL)
    .then((conn) => conn.createChannel());
};

const criarFila = (canal, fila) => {
  return new Promise((resolve, reject) => {
    try {
      canal.assertQueue(fila, { durable: true });
      resolve(canal);
    } catch (err) {
      reject(err);
    }
  });
};

const enfileirar = (fila, mensagem) => {
  conectar()
    .then((canal) => criarFila(canal, fila))
    .then((canal) =>
      canal.sendToQueue(fila, Buffer.from(JSON.stringify(mensagem)))
    )
    .catch((err) => {
      console.log(err);
    });
};

const consumir = (fila, callback) => {
  conectar()
    .then((canal) => criarFila(canal, fila))
    .then((canal) => canal.consume(fila, callback, { noAck: true }))
    .catch((err) => console.log(err));
};

export default { enfileirar, consumir };
