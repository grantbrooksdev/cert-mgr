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

    /api/customer/create

### Date types

    {
        "email": string,
        "name": string,
        "password": string
    }

### Example

    curl -d '{"email": "grant@grantbrooks.dev", "name": "Grant", "password": "supersecretpassword1234!"}' -H "Content-Type: application/json" -X POST "http://localhost:1234/api/customer/create"

# Delete a Customer

    /api/customer/delete

### Data Types

    {
        "email": string,
    }

### Example

    curl -d '{"email": "grant@grant.com"}' -H "Content-Type: application/json" -X DELETE "http://localhost:1234/api/customer/delete"

# Get a Customer

    /api/customer

### Example

    curl "http://localhost:1234/api/customer?email=grant@grantbrooks.dev"

# Get all Certificates for Customer

    /api/customer/certificates

### Example

    curl "http://localhost:1234/api/customer/certificates?email=grant@grantbrooks.dev"

# Create a Certificate

### Endpoint

    /api/certificate/create

### Date types

    {
        "email": string,
        "active": boolean,
        "pkey": string // for now
    }

### Eaxmple

    curl -d '{"email": "grant@grantbrooks.dev", "active": true, "pkey": "1234567qwertyuio"}' -H "Content-Type: application/json" -X POST "http://localhost:1234/api/certificate/create"

# Activate / Deactivate a Certificate

### Endpoint

    /api/certificate/update-active

### Date types

    {
        "id": integer,
        "active": boolean
    }

### Example

    curl -d '{"id": 5, "active": false}' -H "Content-Type: application/json" -X PUT "http://localhost:1234/api/certificate/update-active"
