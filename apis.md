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
    - full address
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
  - inputs:
    - property ID
    - count (1..25 inclusive)
  - outputs:
    - for each comparable sale:
      - property ID
      - full address
      - zestimate
      - comparison score (0 = most relevant, higher numbers less relevant)

- `GetDeepComps`:
  - inputs same as `GetComps`
  - outputs same as `GetComps` plus the extra provided in `GetDeepSearchResults`

## Google Places

// Costs money now? I used to use it as recently as a few months ago and you got thousands of requests for free, not sure what the costs are now.

- `place/search`:
  - inputs:
    - address/arbitrary search input
  - outputs:
    - placeID
    - formatted address
    - rating
    - price level

## Yelp

- TODO

