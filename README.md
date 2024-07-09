# first-api-rest

## API Documentation

Welcome to the documentation for the API provided. This API allows you to manage users and products with authentication using JWT tokens.

### Authentication

**POST /auth**

Endpoint for user authentication. Generates a JWT token for valid credentials.

- **Request Parameters:**
  - `email` (string): User's email address.
  - `password` (string): User's password.

- **Response:**
  - `200 OK` on success with JSON containing:
    ```json
    {
      "token": "<jwt_token>"
    }
    ```
  - `404 Not Found` if user credentials are invalid.
  - `500 Internal Server Error` if token creation fails.

### Users

**POST /user**

Endpoint to create a new user.

- **Request Parameters:**
  - `name` (string): User's name.
  - `email` (string): User's email address.
  - `password` (string): User's password.

- **Response:**
  - `200 OK` on success.
  - `400 Bad Request` if user with the same email already exists.
  - `500 Internal Server Error` on database error.

### Products

**GET /product**

Retrieve all products.

- **Authorization Header:**
  - `Authorization: Bearer <token>` (JWT token obtained from /auth)

- **Response:**
  - `200 OK` with JSON array of products:
    ```json
    {
      "products": [
        {
          "id": 1,
          "name": "Product Name",
          "description": "Product Description",
          "price": 10.99,
          "category": "Product Category"
        },
        {
          "id": 2,
          "name": "Another Product",
          "description": "Another Description",
          "price": 5.99,
          "category": "Other Category"
        }
      ]
    }
    ```
  - `404 Not Found` if no products are found.

**GET /product/:id**

Retrieve a specific product by ID.

- **URL Parameters:**
  - `id` (integer): ID of the product to retrieve.

- **Response:**
  - `200 OK` with JSON of the product.
  - `404 Not Found` if the product with specified ID does not exist.

**POST /product**

Create a new product.

- **Authorization Header:**
  - `Authorization: Bearer <token>` (JWT token obtained from /auth)

- **Request Body:**
  ```json
  {
    "name": "Product Name",
    "description": "Product Description",
    "price": 10.99,
    "category": "Product Category"
  }
### Response:

- `200 OK` on successful creation.
- `400 Bad Request` if request body is missing required fields or contains invalid data.

### PUT /product

Update an existing product.

**Authorization Header:**

- `Authorization: Bearer <token>` (JWT token obtained from /auth)

**Request Body:**

```json
{
  "id": 1,
  "name": "Updated Product Name",
  "description": "Updated Product Description",
  "price": 15.99,
  "category": "Updated Category"
}
### Response:

- `200 OK` on successful update with JSON of updated product.
- `404 Not Found` if the product with specified ID does not exist.

### DELETE /product/:id

Delete a product by ID.

**Authorization Header:**

- `Authorization: Bearer <token>` (JWT token obtained from /auth)

**URL Parameters:**

- `id` (integer): ID of the product to delete.

**Response:**

- `200 OK` on successful deletion.
- `404 Not Found` if the product with specified ID does not exist.

### Errors

- `400 Bad Request` indicates a client-side error due to invalid parameters or missing data.
- `401 Unauthorized` indicates missing or invalid authentication token.
- `404 Not Found` indicates requested resource was not found.
- `500 Internal Server Error` indicates a server-side error occurred.

**Esta api e apenas um projeto com nodes e express e esta documentacao faz parte do projeto