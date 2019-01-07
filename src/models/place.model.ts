import AddressModel from './address.model';

export default class PlaceModel {
  public name: string;
  public address: AddressModel;

  constructor(name: string, address: AddressModel) {
    this.name = name;
    this.address = address;
  }
}
