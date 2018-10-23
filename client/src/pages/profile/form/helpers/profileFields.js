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
  },
  about: {
    label: "About",
    placeholder: " About",
    name: "about",
    info: "",
    type: "text"
  },
  occupation: {
    label: "Occupation ",
    placeholder: " Occupation",
    name: "occupation",
    info: "",
    type: "text"
  }
};

export default profileFields;
