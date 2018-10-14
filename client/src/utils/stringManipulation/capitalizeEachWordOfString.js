import capitalizeFirstLetter from "./capitalizeFirstLetter";
import splitStrToArray from "./splitStrToArray";

// check for multiple words used in a sentence
const capitalizeEachWordOfString = (sentence = "") => {
  // splitStrToArray defaults no value to use a empty space
  const sentenceArray = splitStrToArray(sentence);
  // capitalize each word in the title
  return sentenceArray.map(word => capitalizeFirstLetter(word)).join(" ");
};

export default capitalizeEachWordOfString;
