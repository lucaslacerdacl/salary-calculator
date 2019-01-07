![Logo of the project](./src/assets/images/logo.png)

# Salary Calculator &middot; [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) [![Build status](https://dev.azure.com/lucaslacerdacl/salary-calculator/_apis/build/status/salary-calculator)](https://dev.azure.com/lucaslacerdacl/salary-calculator/_build/latest?definitionId=-1) [![codecov](https://codecov.io/gh/lucaslacerdacl/salary-calculator/branch/master/graph/badge.svg?token=UVMzsNr6HU)](https://codecov.io/gh/lucaslacerdacl/salary-calculator)

> An algorithm to calculate estimate salary.


### Usage

Insert your Google API key in the property ```googleApiKey``` in the ```package.json``` file.

Inside the folder metadata you will replace the ```user.json``` file with your informations. Here is an exemple:

```json
{
  "name": "Peter Parker",
  "address": {
    "street": "Av. Brasil",
    "number": "1877",
    "neightborhood": "Savassi",
    "city": "Belo Horizonte",
    "state": "Minas Gerais",
    "zipCode": "30140001"
  },
  "carKilometersPerLiter": 10,
  "gasolinePrice": 4.79,
  "expense": [
    {
      "name": "Gym",
      "value": 79.90
    },
    {
      "name": "Lunch",
      "value": 800
    }
  ]
}
```

Also replace the ```places.json``` file with your trajectory. Her is an exemple:

```json
{
  "places": [
    {
      "name": "Work",
      "address": {
        "street": "Av. Getúlio Vargas",
        "number": "291",
        "neightborhood": "Funcionários",
        "city": "Belo Horizonte",
        "state": "Minas Gerais",
        "zipCode": "30130160"
      }
    },
    {
      "name": "College",
      "address": {
        "street": "Avenida Presidente Antônio Carlos",
        "number": "6627",
        "neightborhood": "Pampulha",
        "city": "Belo Horizonte",
        "state": "Minas Gerais",
        "zipCode": "31270901"
      }
    }
  ]
}
```

Then run the command:

```shell
npm run salary
```

This command will show the appropriate salary in the console.


## Developing

### Built With
* Node
* Axios
* Typescript
* Lodash
* Jest

### Prerequisites
You will need install [Node](https://nodejs.org).


### Deploying / Publishing
The project is build and release in  [Azure DevOps](https://dev.azure.com/lucaslacerdacl/salary-calculator).

## Versioning

This project is using the pattern ```MAJOR.MINOR.PATCH```. You can read more in [Semantic Versioning](http://semver.org/).


## Tests

You can run:

```shell
npm run test
```
This command will run ```jest``` with code coverage.

This project is using ```ts-jest``` preset and run on ```src``` folder.

```json
  "jest": {
    "preset": "ts-jest",
    "roots": [
      "src"
    ]
  }
```

## Licensing

License under MIT.