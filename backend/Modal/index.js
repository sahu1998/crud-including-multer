const mongoose = require("mongoose");
require("../dbconnection");

const contactSchema = mongoose.Schema({
  name: String,
  email: String,
  age: Number,
  contact: String,
  image: String,
});

const userSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
});

const userModel = mongoose.model("users", userSchema);

const contactModal = mongoose.model("friends", contactSchema);

const registerData = async (user) => {
  let result = await userModel.create(user);
  result = result.toObject();
  delete result.password;
  delete result._id;
  return result;
};

const getDataByEmail = async (user) => {
  const result = await userModel.findOne({ email: user });
  return result;
};

const getData = async (id = null) => {
  try {
    const response = id
      ? await contactModal.findById(id)
      : await contactModal.find();
    return { response, message: "success", status: 200 };
  } catch (error) {
    return { response: error, message: "error", status: 400 };
  }
};

const postData = async (values) => {
  console.log("post data: ", values);
  try {
    const response = await contactModal.create(values);
    return { response, message: "success", status: 200 };
  } catch (error) {
    return { response: error, message: "error", status: 400 };
  }
};

const deleteData = async (id) => {
  try {
    const response = await contactModal.findByIdAndDelete(id);
    return { response, message: "success", status: 200 };
  } catch (error) {
    return { response: error, message: "error", status: 400 };
  }
};

const putData = async (id, values) => {
  console.log("put:----- ", values);
  try {
    const response = await contactModal.findByIdAndUpdate(id, values);
    return { response, message: "success", status: 200 };
  } catch (error) {
    return { response: error, message: "error", status: 400 };
  }
};
module.exports = {
  postData,
  getData,
  deleteData,
  putData,
  getDataByEmail,
  registerData,
};
