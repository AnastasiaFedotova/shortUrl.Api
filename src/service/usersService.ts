import Users from "./../interface/users";

async function read(): Promise<Array<Users>> {
  return await Users.findAll();
}

function add(user: Users): Promise<Users> {
  const res = Users.create(user);
  return res;
}

const userService = {
  add,
  read
};
export default userService;
