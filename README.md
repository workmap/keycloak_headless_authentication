# Keycloakheadless

This node application is used to exhibit access and refresh token requests using the keycloak API

## Docker build
- copy .env.example to .env
- in the new .env file enter the following environment variables
  - keycloak client id (api)
  - keycloak client secret (api client's secret from keycloak)
  - keycloak host (https://sit-login.geoplatform.info)
  - username (api)
  - password (reset api user's password as needed and use here) 
- docker build -t keycloakheadless:latest .

## Run
- docker-compose up -d
- go to http://localhost:49160/


