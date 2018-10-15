const registerFields = [
  {
    label: "* Username ",
    placeholder: "Username ",
    required: true,
    name: "username",
    info: "",
    index: "0",
    type: "text"
  },
  {
    label: "* Email",
    placeholder: "Email",
    required: true,
    name: "email",
    info: "",
    type: "email"
  },
  {
    label: "* Password",
    placeholder: "Password",
    required: true,
    name: "password",
    info: "",
    type: "password"
  },
  {
    label: "* Confirm Password",
    placeholder: "Confirm Password",
    required: true,
    name: "confirm",
    info: "",
    type: "password"
  }
];

const loginFields = [
  {
    label: "* Email",
    placeholder: "Email",
    required: true,
    name: "email",
    info: "",
    type: "email"
  },
  {
    label: "* Password",
    placeholder: "Password",
    required: true,
    name: "password",
    info: "",
    type: "password"
  }
];

export { registerFields, loginFields };
