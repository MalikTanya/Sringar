import brcypt from "bcryptjs";

const users = [
  {
    name: "Admin User ",
    email: "admin@example.com",
    password: brcypt.hashSync("123456", 10),
    isAdmin: true,
  },

  {
    name: "Jane Doe ",
    email: "jane@example.com",
    password: brcypt.hashSync("123456", 10),
  },

  {
    name: "John Doe ",
    email: "john@example.com",
    password: brcypt.hashSync("123456", 10),
  },
];

export default users;
