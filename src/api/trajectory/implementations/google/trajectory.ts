import ITrajectory from '../../interfaces/trajectory.interface';
import AddressModel from '../../../../models/address.model';
import axios from 'axios';
import * as fs from 'fs';

export default class Trajectory implements ITrajectory {

  private googleUrl = 'https://maps.googleapis.com/maps/api/distancematrix/json';

  private getGoogleApiKey(): string {
    const file = fs.readFileSync('package.json');
    const formatedFile = JSON.parse(file.toString());
    return formatedFile.googleApiKey;
  }

  private formatAddress(address: AddressModel): string {
    const fullAddress = `${address.street},${address.number},${address.neightborhood},${address.city},${address.state},${address.zipCode}`;
    return fullAddress;
  }

  public async getDistance(origin: AddressModel, destination: AddressModel): Promise<number> {
    const formatedOrigin = this.formatAddress(origin);
    const formatedDestination = this.formatAddress(destination);
    const apiKey = this.getGoogleApiKey();
    const url = `${this.googleUrl}?travelmode=driving&origins=${formatedOrigin}&destinations=${formatedDestination}&key=${apiKey}`;
    const response = await axios.get(encodeURI(url));
    const distance: string = response.data.rows[0].elements[0].distance.text;
    return parseFloat(distance.replace(' km', ''));
  }
}
