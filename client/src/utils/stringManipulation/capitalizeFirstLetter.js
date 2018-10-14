const strToUpperCase = str =>
  (str = str[0].toUpperCase() + str.slice(1).toLowerCase());

const capitalizeFirstLetter = (str = "") => {
  if (str[0] && str[1]) {
    return strToUpperCase(str);
  } else if (str[0]) {
    return strToUpperCase(str);
  } else {
    return str;
  }
};

export default capitalizeFirstLetter;
