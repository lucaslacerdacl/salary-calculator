import * as fs from 'fs';
import axios from 'axios';
import Trajectory from './trajectory';
import AddressModel from '../../../../models/address.model';

describe('Google Implementation', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  beforeEach(() => {
    jest.restoreAllMocks();
  });

  it('should get distances', async () => {

    const apiKey = Buffer.from(JSON.stringify({googleApiKey: 'test_google_api_key'}));
    const spyReadFileSync = jest.spyOn(fs, 'readFileSync').mockImplementation(() => { }).mockReturnValueOnce(apiKey);
    const googleResponse = {
      rows: [
        {
           elements : [
              {
                 distance : {
                    text : '18.9 km'
                 }
              }
           ]
        }
     ]
    };
    const spyHttp = jest.spyOn(axios, 'get').mockImplementation(() => { }).mockReturnValueOnce({ data: googleResponse});

    const origin = new AddressModel('Rua Bernardo Figueiredo', '52', 'Serra', 'Belo Horizonte', 'Minas Gerais', '30220140');
    const destination = new AddressModel('Rua Fernandes Tourinho', '195', 'Savassi', 'Belo Horizonte', 'Minas Gerais', '30112000');
    const trajectory = new Trajectory();
    const result = await trajectory.getDistance(origin, destination);

    expect(spyReadFileSync).toHaveBeenCalledTimes(1);
    expect(spyReadFileSync).toHaveBeenCalledWith('package.json');


    expect(spyHttp).toHaveBeenCalledTimes(1);
    const urlPrefix = 'https://maps.googleapis.com/maps/api/distancematrix/json?travelmode=driving';
    const urlOrigin = 'Rua%20Bernardo%20Figueiredo,52,Serra,Belo%20Horizonte,Minas%20Gerais,30220140';
    const urlDestination = 'Rua%20Fernandes%20Tourinho,195,Savassi,Belo%20Horizonte,Minas%20Gerais,30112000';
    const urlApi = 'test_google_api_key';
    const url = `${urlPrefix}&origins=${urlOrigin}&destinations=${urlDestination}&key=${urlApi}`;
    expect(spyHttp).toHaveBeenCalledWith(url);

    expect(result).toBe(18.9);

  });

});
