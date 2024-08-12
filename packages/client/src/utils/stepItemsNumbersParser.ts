export const parseIntegers = (str: string): number[] => {
  let subStr = ''
  const arrayOfNumbers = []
  for (let i = 0; i < str.length; i++) {
    if (!isNaN(+str[i])) {
      subStr += str[i]
    } else if (subStr.length > 0) {
      arrayOfNumbers.push(parseInt(subStr))
      subStr = ''
    }
  }
  if (subStr.length > 0) {
    arrayOfNumbers.push(parseInt(subStr, 10))
  }
  return arrayOfNumbers
}
