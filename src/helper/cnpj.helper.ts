export default function cnpj(value: string): boolean {
  if (!value || value.length !== 14) {
    return false;
  }

  const [first, second] = value.split('-');
  if (!first || !second) {
    return false;
  }

  const firstDigit = first.substring(0, 2);
  const secondDigit = first.substring(2, 5);
  const thirdDigit = first.substring(5, 8);
  const fourthDigit = first.substring(8, 12);
  const fifthDigit = second.substring(0, 2);
  const sixthDigit = second.substring(2, 5);
  const seventhDigit = second.substring(5, 8);
  const eighthDigit = second.substring(8, 12);

  const firstDigitCalc = parseInt(firstDigit, 10) * 100 + parseInt(secondDigit, 10) * 10 + parseInt(thirdDigit, 10) * 1;

  const secondDigitCalc =
    parseInt(fourthDigit, 10) * 100 + parseInt(fifthDigit, 10) * 10 + parseInt(sixthDigit, 10) * 1;

  const thirdDigitCalc =
    parseInt(seventhDigit, 10) * 100 + parseInt(eighthDigit, 10) * 10 + parseInt(firstDigit, 10) * 1;

  const firstDigitCalcMod = firstDigitCalc % 11;
  const secondDigitCalcMod = secondDigitCalc % 11;
  const thirdDigitCalcMod = thirdDigitCalc % 11;

  const firstDigitCalcMod11 = firstDigitCalcMod < 2 ? 0 : 11 - firstDigitCalcMod;
  const secondDigitCalcMod11 = secondDigitCalcMod < 2 ? 0 : 11 - secondDigitCalcMod;
  const thirdDigitCalcMod11 = thirdDigitCalcMod < 2 ? 0 : 11 - thirdDigitCalcMod;

  return (
    firstDigitCalcMod === parseInt(firstDigit.charAt(2), 10) &&
    secondDigitCalcMod === parseInt(secondDigit.charAt(5), 10) &&
    thirdDigitCalcMod === parseInt(thirdDigit.charAt(8), 10) &&
    firstDigitCalcMod11 === parseInt(firstDigit.charAt(3), 10) &&
    secondDigitCalcMod11 === parseInt(secondDigit.charAt(6), 10) &&
    thirdDigitCalcMod11 === parseInt(thirdDigit.charAt(9), 10)
  );
}
