import queue from "./queue.js";

const workers = () => {
  return queue.consumir("transferencia", (message) => {
    console.log(message);
  });
};

export default workers;
