### Installation
Install local dependencies and mocha:
```sh
$ npm install
$ npm install -g mocha
```

### Step by step Installation

Create package.json and install dependencies:
```sh
npm init
npm install --global mocha
npm install --save-dev mocha
npm install --save-dev chai
```
Install type definitions to improve autocompletion:
```sh
npm install --save-dev @types/mocha
npm install --save-dev @types/chai
```


### Usage
Watch for changes in .ts files and recompile of neccessary:
```sh
tsc --watch
```

Run tests:
```sh
mocha
```


