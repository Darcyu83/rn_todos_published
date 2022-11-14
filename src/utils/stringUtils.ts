export const capitalizeFirstLetter = (text: string | undefined) => {
  if (!text) return text;
  return text.charAt(0).toUpperCase() + text.slice(1);
};
