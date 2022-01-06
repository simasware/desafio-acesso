import queue from "../queue/queue.js";

const QueueTransferController = (req, res, next) => {
  console.log("entrou aqui");
  try {
    const { data } = req.body;
    queue.enfileirar("transferencias", data);
    res.send("transfer queued").status(200);
  } catch (e) {
    next(e);
  }
};

export default QueueTransferController;
