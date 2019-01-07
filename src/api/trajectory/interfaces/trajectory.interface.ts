import AddressModel from '../../../models/address.model';


export default interface ITrajectory {
  getDistance(origin: AddressModel, destination: AddressModel): Promise<number>;
}
