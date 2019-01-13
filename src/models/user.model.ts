import AddressModel from './address.model';
import ExpenseModel from './expense.model';

export default class UserModel {

  public static CAR = 'car';
  public static BUS = 'bus';

  public name: string;
  public address: AddressModel;
  public vehicle: string;
  public expense: Array<ExpenseModel> = new Array<ExpenseModel>();

  constructor(name: string, address: AddressModel, vehicle: string, expense: Array<ExpenseModel>) {
    this.name = name;
    this.address = address;
    this.expense = expense;
    this.vehicle = vehicle;
  }
}
