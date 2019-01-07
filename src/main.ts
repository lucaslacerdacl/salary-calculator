import UserModel from './models/user.model';
import PlaceModel from './models/place.model';
import * as fs from 'fs';
import ExpenseModel from './models/expense.model';
import * as _ from 'lodash';
import ITrajectory from './api/trajectory/interfaces/trajectory.interface';
import AddressModel from './models/address.model';


export default class Main {

  constructor(private _ITrajectory: ITrajectory) { }

  private getUser(): UserModel {
    const file = fs.readFileSync('metadata/user.json');
    const formatedFile = JSON.parse(file.toString());
    return new UserModel(formatedFile.name,
      formatedFile.address,
      formatedFile.carKilometersPerLiter,
      formatedFile.gasolinePrice,
      formatedFile.expense);
  }

  private getPlaces(): Array<PlaceModel> {
    const file = fs.readFileSync('metadata/places.json');
    const formatedFile = JSON.parse(file.toString());
    const places = new Array<PlaceModel>();
    _.forEach(formatedFile.places, ((place: any) => {
      places.push(new PlaceModel(place.name, place.address));
    }));
    return places;
  }

  private calculatePersonalExpenses(expenses: Array<ExpenseModel>): number {
    let total = 0;
    _.forEach(expenses, (expense: ExpenseModel): any => {
      total += expense.value;
    });
    return total;
  }

  private async getFirstDestinationDistance(home: AddressModel, destinations: Array<PlaceModel>): Promise<number> {
    return await this._ITrajectory.getDistance(home, _.head(destinations).address);
  }

  private async getDistanceBetweenDestinations(destinations: Array<PlaceModel>): Promise<number> {
    let distance = 0;
    for (let index = 0; index < destinations.length - 1; index++) {
      distance += await this._ITrajectory.getDistance(destinations[index].address, destinations[index + 1].address);
    }
    return distance;
  }

  private async getLastDestinationAddress(home: AddressModel, destinations: Array<PlaceModel>): Promise<number> {
    return await this._ITrajectory.getDistance(_.last(destinations).address, home);
  }

  private async calculateGasolineExpenses(user: UserModel, destinations: Array<PlaceModel>): Promise<number> {
    let trajectoryTotalDistance = 0;
    trajectoryTotalDistance += await this.getFirstDestinationDistance(user.address, destinations);
    trajectoryTotalDistance += await this.getDistanceBetweenDestinations(destinations);
    trajectoryTotalDistance += await this.getLastDestinationAddress(user.address, destinations);
    const kilometersInCar = trajectoryTotalDistance / user.carKilometersPerLiter;
    return kilometersInCar * user.gasolinePrice * 30;
  }

  public async calculateSalary(): Promise<number> {
    const user: UserModel = this.getUser();
    const places: Array<PlaceModel> = this.getPlaces();
    const expensesTotal = this.calculatePersonalExpenses(user.expense);
    const trajectoryTotal = await this.calculateGasolineExpenses(user, places);
    return parseFloat((expensesTotal + trajectoryTotal).toFixed(2));
  }

}
