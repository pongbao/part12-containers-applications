const express = require("express");
const router = express.Router();
const { Todo } = require("../mongo");
const redis = require("../redis");

/* GET todos listing. */
router.get("/", async (_, res) => {
  const todos = await Todo.find({});
  res.send(todos);
});

/* POST todo to listing. */
router.post("/", async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false,
  });

  let todoCount = await redis.getAsync("todoCount");
  todoCount = Number(todoCount);
  todoCount++;

  await redis.setAsync("todoCount", todoCount);

  res.send(todo);
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params;
  req.todo = await Todo.findById(id);
  if (!req.todo) return res.sendStatus(404);

  next();
};

/* DELETE todo. */
singleRouter.delete("/", async (req, res) => {
  await req.todo.delete();
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get("/", async (req, res) => {
  res.send(req.todo).status(200);
});

/* PUT todo. */
singleRouter.put("/", async (req, res) => {
  const todo = await Todo.findOne({ _id: req.todo._id });

  todo.text = req.body.text;
  todo.done = req.body.done;

  const returnedTodo = await todo.save();

  res.status(200).json(returnedTodo);
});

router.use("/:id", findByIdMiddleware, singleRouter);

module.exports = router;
