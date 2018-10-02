# APIs

## Zillow

- `GetSearchResults`/`GetZestimate`
  - inputs for `GetSearchResults`:
    - street address
    - city state zip
  - inputs for `GetZestimate`:
    - property ID
  - outputs:
    - property ID
    - full-address
      - street address
      - city
      - state
      - zip
      - latitude
      - longitude
    - zestimate
    - rent zestimate
    - local real estate
      - zillow home value index
      - zillow home value index one year change

- `GetDeepSearchResults`:
  - inputs same as `GetSearchResults`
  - outputs same as `GetSearchResults` plus:
    - use code (single family, duplex, etc.)
    - tax assessment
    - lot size (sqft)
    - finished property size (sqft)
    - bathrooms
    - bedrooms
    - last sold date & price

- `GetComps`:
  - TODO

- `GetDeepComps`:
  - TODO
