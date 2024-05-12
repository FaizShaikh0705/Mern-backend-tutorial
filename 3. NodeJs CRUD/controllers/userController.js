// Importing modules
const helper = require("../helper");

const getUsers = (req, res) => {
  res.writeHead(200, { "Content-Type": "application/json" });

  const storedData = helper.read();
  res.end(JSON.stringify(storedData));
  
};

const createUser = (req, res) => {
  try {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", () => {
      if (body) {
        const parsedData = JSON.parse(body);

        if (parsedData.name && parsedData.email) {
          const storedData = helper.read();

          helper.write([
            ...storedData,
            { id: storedData.length + 1, ...parsedData },
          ]);

          res.end(
            JSON.stringify({
              code: 200,
              remark: "User created",
            })
          );
        } else {
          res.end(
            JSON.stringify({
              code: 400,
              remark: "Name or Email is blank",
            })
          );
        }
      } else {
        res.writeHead(400);
        res.end(
          JSON.stringify({
            code: 400,
            remark: "Please pass data",
          })
        );
      }
    });
  } catch (error) {
    res.end(
      JSON.stringify({
        code: 500,
        remark: "Interval server error",
      })
    );
  }
};

const updateUser = (req, res) => {
  try {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", () => {
      if (body) {
        const parsedData = JSON.parse(body);

        if ((parsedData.name || parsedData.email) && parsedData.id) {
          const storedData = helper.read();

          const updatedData = storedData.map((item) => {
            if (item.id === parsedData.id) {
              item.name = parsedData.name || item.name;
              item.email = parsedData.email || item.email;
            }
            return item;
          });

          helper.write(updatedData);

          res.end(
            JSON.stringify({
              code: 200,
              remark: "User updated",
            })
          );
        } else {
          res.writeHead(400);
          res.end(
            JSON.stringify({
              code: 400,
              remark: "Data is not valid",
            })
          );
        }
      } else {
        res.writeHead(400);
        res.end(
          JSON.stringify({
            code: 400,
            remark: "Please send data",
          })
        );
      }
    });
  } catch (error) {
    res.writeHead(500);
    res.end(
      JSON.stringify({
        code: 500,
        remark: "Something went wrong",
      })
    );
  }
};


const deleteUser = (req, res)=>{
  try {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", () => {
      if (body) {
        const parsedData = JSON.parse(body);

        if (parsedData.id) {
          const storedData = helper.read();

          let userToDelete = -1

          storedData.map((item, index) => {
            if (item.id === parsedData.id) {
              userToDelete=index
            }
          });

          if(userToDelete==-1){
            res.writeHead(400)
            res.end(JSON.stringify({
              code: 400,
              remark:"user not found"
            }))
          } else {

            storedData.splice(userToDelete,1)
            helper.write(storedData);
  
            res.end(
              JSON.stringify({
                code: 200,
                remark: "User deleted",
              })
            );
          }

        } else {
          res.writeHead(400);
          res.end(
            JSON.stringify({
              code: 400,
              remark: "Data is not valid",
            })
          );
        }
      } else {
        res.writeHead(400);
        res.end(
          JSON.stringify({
            code: 400,
            remark: "Please send id",
          })
        );
      }
    });
  } catch (error) {
    res.writeHead(500);
    res.end(
      JSON.stringify({
        code: 500,
        remark: "Something went wrong",
      })
    );
  }
}

module.exports = { getUsers, createUser, updateUser, deleteUser };
