# Velocity-Watch
Simple boilerplate to compile [Apache Velocity](http://velocity.apache.org/engine/index.html) Scripts. This boiler plate provides two main scripts `npm compile` and `npm watch`. ( `npm compile` will simply compile once and `npm watch` will compile whenever there are changes to src files.)

## Pre Requisite
* Understanding of Apache Velocity and npm
* NodeJS and NPM
* *vs-code recommended*

## Getting Started
To get started simply clone or download the repository and start playing with velocity using npm compile or watch.



## Configuration
The boiler plate can configured by three different ways.
1. Input and Output files could be changed using .env
2. The variable context can be changed using context.json file
3. The new macros could be added by exporting from index.js in macros directory.



## Roadmap
----- **Version 1** -----
- [x] Develop a working Environment
- [ ] Support for Multiple Input and Output Files
  
----- **Version 2** -----

- [ ] Allowing Dynamic Context
- [ ] Watch Event Optimization
- [ ] File Change Event