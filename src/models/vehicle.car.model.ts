export default class CarModel {
  public kilometersPerLiter: number;
  public gasolinePrice: number;

  constructor(kilometersPerLiter: number, gasolinePrice: number) {
    this.kilometersPerLiter = kilometersPerLiter;
    this.gasolinePrice = gasolinePrice;
  }
}
