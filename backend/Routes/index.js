const express = require("express");
const {
  getController,
  postController,
  deleteController,
  putController,
  loginController,
  registerController,
} = require("../controller");
const { verifyUser, upload } = require("../middleware");

const route = express.Router();

route.post("/signup", registerController);
route.post("/signin", loginController);

route.get("/", verifyUser, getController);

route.get("/verifyUser", verifyUser, (req, res) => {
  res.send(req.authorized);
});

route.post("/", upload.single("image"), postController);

// route.post("/", postController);

route.delete("/:id", verifyUser, deleteController);

route.put("/:id", upload.single("image"), putController);

route.use("/user", express.static("storage"));

module.exports = { route };
