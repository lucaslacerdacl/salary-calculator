import * as fs from 'fs';
import UserModel from './models/user.model';
import AddressModel from './models/address.model';
import PlaceModel from './models/place.model';
import ExpenseModel from './models/expense.model';
import Main from './main';
import ITrajectory from './api/trajectory/interfaces/trajectory.interface';
import CarModel from './models/vehicle.car.model';
import BusModel from './models/vehicle.bus.model';

describe('Main', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  beforeEach(() => {
    jest.restoreAllMocks();
  });

  it('should calculate salary with car', async () => {
    const addressUser = new AddressModel('Rua Joaquim de Figueiredo', '681', 'Barreiro', 'Belo Horizonte', 'Minas Gerais', '30640090');
    const expense = new ExpenseModel('Whey', 100.00);
    const user = new UserModel('Lucas Lacerda', addressUser, 'car', new Array<ExpenseModel>(expense));
    const fileUser = Buffer.from(JSON.stringify(user));

    const addressPlace1 = new AddressModel('Rua Bernardo Figueiredo', '52', 'Serra', 'Belo Horizonte', 'Minas Gerais', '30220140');
    const place1 = new PlaceModel('Hotmart', addressPlace1);
    const addressPlace2 = new AddressModel('Rua Fernandes Tourinho', '195', 'Savassi', 'Belo Horizonte', 'Minas Gerais', '30112000');
    const place2 = new PlaceModel('Academia', addressPlace2);
    const addressPlace3 = new AddressModel('Avenida Presidente Antônio Carloso',
                                            '6627',
                                            'Pampulha',
                                            'Belo Horizonte',
                                            'Minas Gerais',
                                            '31270901');
    const place3 = new PlaceModel('UFMG', addressPlace3);
    const places = [place1, place2, place3];
    const filePlace = Buffer.from(JSON.stringify({ places }));

    const car = new CarModel(10, 4.79);
    const fileCar = Buffer.from(JSON.stringify(car));

    const spyReadFileSync = jest.spyOn(fs, 'readFileSync').mockImplementation(() => { })
    .mockReturnValueOnce(fileUser)
    .mockReturnValueOnce(filePlace)
    .mockReturnValueOnce(fileCar);

    const TrajectoryMock = jest.fn<ITrajectory>(() => ({
      getDistance: jest.fn(() => 10)
    }));
    const trajectoryMock = new TrajectoryMock();
    const main = new Main(trajectoryMock);
    const result = await main.calculateSalary();

    expect(spyReadFileSync).toHaveBeenCalledTimes(3);
    expect(spyReadFileSync).toHaveBeenNthCalledWith(1, 'metadata/user.json');
    expect(spyReadFileSync).toHaveBeenNthCalledWith(2, 'metadata/places.json');
    expect(spyReadFileSync).toHaveBeenNthCalledWith(3, 'metadata/car.json');


    expect(trajectoryMock.getDistance).toHaveBeenCalledTimes(4);
    expect(trajectoryMock.getDistance).toHaveBeenNthCalledWith(1, user.address, place1.address);
    expect(trajectoryMock.getDistance).toHaveBeenNthCalledWith(2, place1.address, place2.address);
    expect(trajectoryMock.getDistance).toHaveBeenNthCalledWith(3, place2.address, place3.address);
    expect(trajectoryMock.getDistance).toHaveBeenNthCalledWith(4, place3.address, user.address);

    expect(result).toEqual(674.8);

  });

  it('should calculate salary with bus', async () => {
    const addressUser = new AddressModel('Rua Joaquim de Figueiredo', '681', 'Barreiro', 'Belo Horizonte', 'Minas Gerais', '30640090');
    const expense = new ExpenseModel('Whey', 100.00);
    const user = new UserModel('Lucas Lacerda', addressUser, 'bus', new Array<ExpenseModel>(expense));
    const fileUser = Buffer.from(JSON.stringify(user));

    const addressPlace1 = new AddressModel('Rua Bernardo Figueiredo', '52', 'Serra', 'Belo Horizonte', 'Minas Gerais', '30220140');
    const place1 = new PlaceModel('Hotmart', addressPlace1);
    const addressPlace2 = new AddressModel('Rua Fernandes Tourinho', '195', 'Savassi', 'Belo Horizonte', 'Minas Gerais', '30112000');
    const place2 = new PlaceModel('Academia', addressPlace2);
    const addressPlace3 = new AddressModel('Avenida Presidente Antônio Carloso',
                                            '6627',
                                            'Pampulha',
                                            'Belo Horizonte',
                                            'Minas Gerais',
                                            '31270901');
    const place3 = new PlaceModel('UFMG', addressPlace3);
    const places = [place1, place2, place3];
    const filePlace = Buffer.from(JSON.stringify({ places }));

    const bus = new BusModel(4.79);
    const fileBus = Buffer.from(JSON.stringify(bus));

    const spyReadFileSync = jest.spyOn(fs, 'readFileSync').mockImplementation(() => { })
    .mockReturnValueOnce(fileUser)
    .mockReturnValueOnce(filePlace)
    .mockReturnValueOnce(fileBus);

    const TrajectoryMock = jest.fn<ITrajectory>(() => ({
      getDistance: jest.fn(() => 10)
    }));
    const trajectoryMock = new TrajectoryMock();
    const main = new Main(trajectoryMock);
    const result = await main.calculateSalary();

    expect(spyReadFileSync).toHaveBeenCalledTimes(3);
    expect(spyReadFileSync).toHaveBeenNthCalledWith(1, 'metadata/user.json');
    expect(spyReadFileSync).toHaveBeenNthCalledWith(2, 'metadata/places.json');
    expect(spyReadFileSync).toHaveBeenNthCalledWith(3, 'metadata/bus.json');


    expect(trajectoryMock.getDistance).toHaveBeenCalledTimes(0);

    expect(result).toEqual(818.5);

  });

  it('should calculate salary with bus', async () => {
    const addressUser = new AddressModel('Rua Joaquim de Figueiredo', '681', 'Barreiro', 'Belo Horizonte', 'Minas Gerais', '30640090');
    const expense = new ExpenseModel('Whey', 100.00);
    const user = new UserModel('Lucas Lacerda', addressUser, undefined, new Array<ExpenseModel>(expense));
    const fileUser = Buffer.from(JSON.stringify(user));

    const addressPlace1 = new AddressModel('Rua Bernardo Figueiredo', '52', 'Serra', 'Belo Horizonte', 'Minas Gerais', '30220140');
    const place1 = new PlaceModel('Hotmart', addressPlace1);
    const addressPlace2 = new AddressModel('Rua Fernandes Tourinho', '195', 'Savassi', 'Belo Horizonte', 'Minas Gerais', '30112000');
    const place2 = new PlaceModel('Academia', addressPlace2);
    const addressPlace3 = new AddressModel('Avenida Presidente Antônio Carloso',
                                            '6627',
                                            'Pampulha',
                                            'Belo Horizonte',
                                            'Minas Gerais',
                                            '31270901');
    const place3 = new PlaceModel('UFMG', addressPlace3);
    const places = [place1, place2, place3];
    const filePlace = Buffer.from(JSON.stringify({ places }));

    const spyReadFileSync = jest.spyOn(fs, 'readFileSync').mockImplementation(() => { })
    .mockReturnValueOnce(fileUser)
    .mockReturnValueOnce(filePlace);

    const TrajectoryMock = jest.fn<ITrajectory>(() => ({
      getDistance: jest.fn(() => 10)
    }));
    const trajectoryMock = new TrajectoryMock();
    const main = new Main(trajectoryMock);
    const result = await main.calculateSalary();

    expect(spyReadFileSync).toHaveBeenCalledTimes(2);
    expect(spyReadFileSync).toHaveBeenNthCalledWith(1, 'metadata/user.json');
    expect(spyReadFileSync).toHaveBeenNthCalledWith(2, 'metadata/places.json');

    expect(trajectoryMock.getDistance).toHaveBeenCalledTimes(0);

    expect(result).toEqual(100);

  });
});
