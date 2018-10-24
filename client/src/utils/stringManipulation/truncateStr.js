const truncateStr = (text = "", limit = 150) =>
  text.length > limit ? text.slice(0, limit) + " ........ " : text;

export default truncateStr;
