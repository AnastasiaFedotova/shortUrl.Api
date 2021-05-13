import User from "../models/users";

async function logIn(login: string, password: string): Promise<string> {
  try {
    const user = await User.findOne({
      where: {
        login: login
      }, raw: true
    });
    if (!user) {
      throw new Error("User not found");
    }

    if (user.password === password) {
      return user.id;
    }

    throw new Error("Invalid password");
  } catch (err) {
    console.log(err)
  }
}

const service = {
  logIn
}

export default service;
