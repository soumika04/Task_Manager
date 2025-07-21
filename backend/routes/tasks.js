router.post('/', async (req, res) => {
  const { title, description, dueDate, priority, status } = req.body;
  const newTask = new Task({
    title,
    description,
    dueDate,
    priority,
    status
  });
  const savedTask = await newTask.save();
  res.json(savedTask);
});
