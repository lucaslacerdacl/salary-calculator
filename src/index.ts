#!/usr/bin/env node
import Main from './main';
import Trajectory from './api/trajectory/implementations/google/trajectory';

(async () => {
  try {
    const main = new Main(new Trajectory());
    console.log(await main.calculateSalary());
  } catch (err) {
    console.log(err.message);
  }
})();
