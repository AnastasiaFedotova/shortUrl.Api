import User, { Users } from "../models/users";

async function read(): Promise<Array<User>> {
  try {
    const res = await User.findAll();
    return res;
  } catch (err) {
    console.log(err)
  }
}

function add(user: Users): Promise<User> {
  try {
    const res = User.create(user);
    return res;
  } catch (err) {
    console.log(err)
  }
}

const userService = {
  add,
  read
};
export default userService;
