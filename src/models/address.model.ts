export default class AddressModel {
  public street: string;
  public number: string;
  public neightborhood: string;
  public city: string;
  public state: string;
  public zipCode: string;

  constructor(street: string, number: string, neightborhood: string, city: string, state: string, zipCode: string) {
    this.street = street;
    this.number = number;
    this.neightborhood = neightborhood;
    this.city = city;
    this.state = state;
    this.zipCode = zipCode;
  }
}
