const { UsersModel } = require("./../config/dbShema");
const { Users } = require("./../interface/users");

async function read(): Promise<Array<typeof Users>> {
  return await UsersModel.findAll();
}

function addUser(user: typeof Users): Promise<typeof Users> {
  const res = UsersModel.create(user).catch(err => {
    console.log(err);
  })

  return res;
}

const userService = {
  addUser,
  read
};

module.exports = userService;
