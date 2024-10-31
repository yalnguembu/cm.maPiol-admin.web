export const capitalize = (text: string) =>
  `${text[0]?.toUpperCase()}${text?.slice(1)}`;

export const sanityseString = (text: string) => {
  const words = text.split("/");
  
  return words.map((word) => capitalize(word)).join(" ");
};
