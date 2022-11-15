function makeDoubleDigit(val: number) {
  if (val >= 10) {
    return val;
  }
  return `0${val}`;
}

const DateString = {
  convertDateToYYYYMMDD(
    dateObject: Date,
    yearIncre = 0,
    monthIncre = 0,
    dateIncre = 0,
    delimeter = '-'
  ) {
    const year = dateObject.getFullYear() + yearIncre;
    const month = makeDoubleDigit(dateObject.getMonth() + 1 + monthIncre);
    const day = makeDoubleDigit(dateObject.getDate() + dateIncre);

    const result = [year, month, day].join(delimeter);

    return result;
  },
};

export default DateString;
