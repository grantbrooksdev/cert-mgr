# How to run:

1. Clone the repository
2. Ensure you're in the project root directory
3. Run `npm install`
4. Ensure that ports `5077` and `5432` are available on your computer. If they are not, please update the ports referenced in `.env`
5. Ensure that you have Docker Desktop and/or can use the `docker-compose` command
6. Run `docker-compose up`
7. You should now be able to interact with the API via `http://localhost:5077`

# Requirements

A Customer:

-   [x] Has a name
-   [x] Has an email address
-   [x] Has a password
-   [x] May have zero to many Certificates

A Certificate:

-   [x] Belongs to one and only one Customer
-   [x] Can be either active or inactive
-   [x] Has a private key
-   [x] Has a certificate body

Your solution must support:

-   [x] Creating/Deleting Customers
-   [x] Creating Certificates
-   [x] Listing all of a Customer’s Active Certificates
-   [x] Activating/Deactivating Certificates. If a certificate is either activated or de-activated, add the ability to notify an external system (via an HTTP post) about that fact. You could use http://httpbin.org or http://requestb.in/ to exercise this.
-   [x] Persistence (data must survive computer restarts)

# Create a Customer

### Endpoint: POST

    /api/customer/create

### Date types

    {
        "email": string,
        "name": string,
        "password": string
    }

### Example

    curl -d '{"email": "grant@grantbrooks.dev", "name": "Grant", "password": "supersecretpassword5077!"}' -H "Content-Type: application/json" -X POST "http://localhost:5077/api/customer/create"

# Delete a Customer

### Endpoint: DELETE

    /api/customer/delete

### Data Types

    {
        "email": string,
    }

### Example

    curl -d '{"email": "grant@grantbrooks.dev"}' -H "Content-Type: application/json" -X DELETE "http://localhost:5077/api/customer/delete"

# Get all Certificates for Customer

### Endpoint: GET

    /api/customer/certificates

### Example

    curl "http://localhost:5077/api/customer/certificates?email=grant@grantbrooks.dev"

# Create a Certificate

### Endpoint: POST

    /api/certificate/create

### Date types

    {
        "email": string,
        "active": boolean,
        "pkey": string // for now
    }

### Eaxmple

    curl -d '{"email": "grant@grantbrooks.dev", "active": true, "pkey": "5077567qwertyuio"}' -H "Content-Type: application/json" -X POST "http://localhost:5077/api/certificate/create"

# Activate / Deactivate a Certificate

### Endpoint: PUT

    /api/certificate/update-active

### Date types

    {
        "id": integer,
        "active": boolean
    }

### Example

    curl -d '{"id": 1, "active": false}' -H "Content-Type: application/json" -X PUT "http://localhost:5077/api/certificate/update-active"
