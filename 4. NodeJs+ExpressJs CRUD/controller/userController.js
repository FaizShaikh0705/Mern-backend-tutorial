import helper from "../helper.js";

const getUsers = (req, res) => {
  try {
    const users = helper.read();

    res.json({
      code: 200,
      remark: "success",
      data: users,
    });
  } catch (error) {
    res.status(500);
    res.json({ code: 500, remark: "Internal server error" });
  }
};

const createUser = (req, res) => {
  try {
    const { name, email } = req.body;

    if (name && email) {
      const storedData = helper.read();

      const newUser = {
        name: name,
        email: email,
        id: storedData.length + 1,
      };
      helper.write([...storedData, newUser]);

      res.json({
        code: 200,
        remark: "user created",
      });
    } else {
      res.status(400);
      res.json({ code: 400, remark: "Name and email is required" });
    }
  } catch (error) {
    res.status(500);
    res.json({ code: 500, remark: "Internal server error" });
  }
};

const updateUser = (req, res) => {
  try {
    const { name, email, id } = req.body;

    if ((name || email) && id) {
      const storedData = helper.read();

      const updatedData = storedData.map((item) => {
        if (item.id === id) {
          item.name = name || item.name;
          item.email = email || item.email;
        }
        return item;
      });

      helper.write(updatedData);
      res.json({
        code: 200,
        remark: "user updated",
      });
    } else {
      res.status(400);
      res.json({
        code: 400,
        remark: "Please send user id and name or email",
      });
    }
  } catch (error) {
    res.status(500);
    res.json({ code: 500, remark: "Internal server error" });
  }
};

const deleteUser = (req, res) => {
  try {
    const { id } = req.body;

    if (id) {
      const storedData = helper.read();

      let userToDelete = -1;

      storedData.map((item, index) => {
        if (item.id === id) {
          userToDelete = index;
        }
      });

      if (userToDelete === -1) {
        res.status(400);
        res.json({
          code: 400,
          remark: "Please send user id",
        });
      } else {
        storedData.splice(userToDelete, 1);
        helper.write(storedData);

        res.json({
          code: 200,
          remark: "User deleted",
        });
      }
    } else {
      res.status(400);
      res.json({
        code: 400,
        remark: "Please send user id",
      });
    }
  } catch (error) {
    res.status(500);
    res.json({ code: 500, remark: "Internal server error" });
  }
};

export default { getUsers, createUser, updateUser, deleteUser };
