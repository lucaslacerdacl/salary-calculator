import AddressModel from './address.model';
import ExpenseModel from './expense.model';

export default class UserModel {
  public name: string;
  public address: AddressModel;
  public carKilometersPerLiter: number;
  public gasolinePrice: number;
  public expense: Array<ExpenseModel> = new Array<ExpenseModel>();

  constructor(name: string, address: AddressModel, carKilometersPerLiter: number, gasolinePrice: number, expense: Array<ExpenseModel>) {
    this.name = name;
    this.carKilometersPerLiter = carKilometersPerLiter;
    this.gasolinePrice = gasolinePrice;
    this.address = address;
    this.expense = expense;
  }
}
