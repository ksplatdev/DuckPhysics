# DuckPhysics

![Build Badge](https://img.shields.io/github/workflow/status/ksplatdev/DuckPhysics/CodeQL?style=flat-square)
![Release Badge](https://img.shields.io/github/v/release/ksplatdev/DuckPhysics?style=flat-square)
![License Badge](https://img.shields.io/github/license/ksplatdev/DuckPhysics?label=license&style=flat-square)
![Lint Badge](https://github.com/ksplatdev/DuckPhysics/actions/workflows/lint.yml/badge.svg)
![Format Badge](https://github.com/ksplatdev/DuckPhysics/actions/workflows/format.yml/badge.svg)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

A 2D advanced SAT Physics Engine for the web.

*Used in [DuckEngine](https://github.com/ksplatdev/DuckEngine)*

## Features

- SAT Collision Detection & Resolution
  - Fast & Performant
- Advanced Hitbox System
  - Multiple Hitboxes per RigidBody
  - Different Shapes
    - Rectangles
    - Capsules
    - Circles
    - Concave & Convex Polygons
- RigidBodies
  - Mass, Density, Restitution
  - Different Shapes
    - Polygons
    - Rectangles
    - Circles
- Physics World
  - Gravity
  - Atmosphere
  - Physics Layers
  - Debugging
- Standalone // No dependencies
- Fast & Asynchronous Loop
- Flexible
- Made fully in TypeScript
- Out of box Typedefs
- A lot more ...

*Note: DuckPhysics is **strictly** a physics engine and includes no rendering.*

## Performance & Compatibility

### Browser Requirements

1. Browser supports ES6 (EcmaScript2015)

## Download

### Github

1. Download the [latest release](https://github.com/ksplatdev/DuckPhysics/releases/latest).
2. Setup an asset bundler like webpack or parcel.
3. Import DuckPhysics.
4. Read the [docs](https://ksplatdev.github.io/DuckPhysics/).

### NPM

1. Run `npm install duckphysics`.
2. Setup an asset bundler like webpack or parcel.
3. Import DuckPhysics.
4. Read the [docs](https://ksplatdev.github.io/DuckPhysics/).

### CDN

1. Setup an asset bundler like webpack or parcel.
2. Import DuckPhysics from URL
   - Regular <https://cdn.jsdelivr.net/npm/duckphysics@1.0.0/dist/index.js>
   - Minified <https://cdn.jsdelivr.net/npm/duckphysics@1.0.0/dist/index.min.js>
3. Read the [docs](https://ksplatdev.github.io/DuckPhysics/).
