export default class ExpenseModel {
  public name: string;
  public value: number;

  constructor(name: string, value: number) {
    this.name = name;
    this.value = value;
  }
}
