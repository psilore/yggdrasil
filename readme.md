![Logo](https://path/to/yggdrasil-logo.png)

# Yggdrasil

## Prerequisites

Requires node.js.

## Installation

1. Clone the repo
   ```sh
   git clone https://github.com/psilore/yggdrasil.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
## Develop

### Start yggdrasil and watch for changes on [http://localhost:8003](http://localhost:8003)
This will also start the API to utilize the endpoints for the frontend.

```sh
$ npm run start
ℹ️ Server running at http://localhost:8003
✨ Built in 447ms
```

### Build static files for distribution

```sh
$ npm run build
ℹ️ Server running at http://localhost:8003
✨ Built in 447ms
```

### Tests (Jest)

```sh
$ npm run test
shoppingcart@1.0.0 test /Users/psiloc/Dev/avensia/shoppingcart
> jest

 PASS  src/components/Button/Button.test.tsx
  Button
    ✓ handles onClick (33 ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        3.097 s
Ran all test suites.
```

## Backend (Simple node app to serve JSON and some images)
I borrowed this from https://github.com/avensia/api-sample-server.git. Since it is needed for the assignment.

### API Endpoints

### [`GET /products`](http://localhost:8181/products)

_No parameters_

Responds with an `Array` containing all products.

### `GET /products/:id`

_No parameters_

Responds with product identified with the given `:id`.

### [`GET /cart`](http://localhost:8181/cart)

_No parameters_

Responds with full cart. Cart items and summary.

### `DELETE /cart`

_No parameters_

Empty cart. Responds with full updated cart.

### `POST /cart/:id`

_Parameters: `quantity=[number]`_

Add `quantity` to item with product identified with `:id`. Responds with full updated cart.

### `PUT /cart/:id`

_Parameters: `quantity=[number]`_

Update `quantity` to item with product identified with `:id`. If item doesn't exist in cart, it will be added with the given `quantity`. Responds with full updated cart.

### `DELETE /cart/:id`

_No parameters_

Remove item with `:id`. Responds with full updated cart.