const express = require('express');

require('./db/mongoose');
const userRouter = require('./routers/users');
const taskRouter = require('./routers/tasks');

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => console.log(`Server is running on port ${port}`));

/////////////////////////////////////////
/*const jwt = require('jsonwebtoken')

const jwtSecretKey = process.env.JWT_SECRET

const token = jwt.sign({ _id: 'abs123' }, secretKey, { expiresIn: '2s' });

console.log(token);

try {
  const decoded = jwt.verify(token, jwtSecretKey);
  console.log(decoded);

  setTimeout(() => jwt.verify(token, jwtSecretKey), 1000);
} catch(e) {
  console.log(e);
}*/
