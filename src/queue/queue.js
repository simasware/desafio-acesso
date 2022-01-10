const amqplib = require("amqplib");

const connect = () => {
  return amqplib
    .connect(process.env.AMQP_URL)
    .then((conn) => conn.createChannel());
};

const createQueue = (channel, queue) => {
  return new Promise((resolve, reject) => {
    try {
      channel.assertQueue(queue, { durable: true });
      resolve(channel);
    } catch (err) {
      reject(err);
    }
  });
};

const sendToQueue = (queue, mensagem) => {
  connect()
    .then((channel) => createQueue(channel, queue))
    .then((channel) =>
      channel.sendToQueue(queue, Buffer.from(JSON.stringify(mensagem)))
    )
    .catch((err) => {
      console.log(err);
    });
};

const consume = (queue, callback) => {
  connect()
    .then((channel) => createQueue(channel, queue))
    .then((channel) => channel.consume(queue, callback, { noAck: true }))
    .catch((err) => console.log(err));
};

module.exports = { sendToQueue, consume };
