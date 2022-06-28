export default class LinstenPeymentPIX {
  constructor() {}

  //create method loop setInterval 30s
  public open() {
    let _cont = 0;

    const intevalId = setInterval(() => {
      _cont++;

      if (_cont === 3) {
        clearInterval(intevalId);
      }

      console.log(_cont);
    }, 10000);
  } //end open
}
