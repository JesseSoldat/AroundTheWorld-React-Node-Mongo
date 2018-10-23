const profileFields = {
  username: {
    label: "* Username",
    placeholder: " Username",
    required: true,
    name: "username",
    info: "",
    index: "0",
    type: "text"
  },
  hometown: {
    label: "Hometown ",
    placeholder: " HomeTown",
    name: "hometown",
    info: "",
    type: "text"
  },
  genderMale: {
    label: "Male",
    name: "gender",
    type: "radio",
    value: "male"
  },
  genderFemale: {
    label: "Female",
    name: "gender",
    type: "radio",
    value: "female"
  }
};

export default profileFields;
