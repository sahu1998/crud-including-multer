const jwt = require("jsonwebtoken");
require("dotenv").config();
const {
  postData,
  getData,
  deleteData,
  putData,
  getDataByEmail,
  registerData,
} = require("../Modal");

const getController = async (req, res) => {
  const result = await getData(req.query.id);
  res.send(result);
};

const postController = async (req, res) => {
  console.log(req.file);
  console.log(req.files);

  const user = { ...req.body, image: req.file?.path };
  console.log("jjjjjj: ", req.body);
  const result = await postData(user);
  res.send(result);
};

const deleteController = async (req, res) => {
  console.log(req.params);
  const result = await deleteData(req.params.id);
  res.send(result);
};

const putController = async (req, res) => {
  console.log("params:====", req.params);
  console.log("putController body:----", req.body);
  const user = { ...req.body, image: req.file?.path };

  const result = await putData(req.params.id, user);
  res.send(result);
};

const registerController = async (req, res) => {
  const user = await getDataByEmail(req.body.email);
  console.log("available: ", user);
  if (!user) {
    const result = await registerData(req.body);
    res.send({ result, status: 200 });
  } else {
    res.send({ message: "Email already registered", status: 400 });
  }
};

const loginController = async (req, res) => {
  const { email, password } = req.body;
  console.log("login user: ", req.body);
  if (!(email && password)) {
    res.send({ message: "email and password required", login: false });
    return;
  }
  const result = await getDataByEmail(email);

  console.log("RESULT: ", result);
  if (!result || result.password !== password) {
    res.send({ message: "credential not matched", login: false });
    return;
  }

  const token = jwt.sign(
    { id: result._id, email: result.email },
    process.env.SECRET_KEY,
    { expiresIn: "1h" }
  );
  console.log("token: ", token);
  res.send({ token, login: true });
};

module.exports = {
  getController,
  postController,
  deleteController,
  putController,
  registerController,
  loginController,
};
