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

- `Transactions` (list of businesses which support food delivery transactions):
  - inputs:
    - latitude
    - longitude
    - location
  - outputs:
    - total number of business
    - list of businesses[]
      - businesses[x].id
      - businesses[x].alias
      - businesses[x].name
      - businesses[x].image_url
      - businesses[x].is_closed
      - businesses[x].url
      - businesses[x].price
      - businesses[x].phone
      - businesses[x].rating
      - businesses[x].review_count
      - businesses[x].categories 
      - A list of category title and alias pairs associated with this business.
    - businesses[x].categories[x].alias
      - Alias of a category, when searching for business in certain categories, use alias rather than the title.
    - businesses[x].coordinates
    - businesses[x].coordinates.latitude
    - businesses[x].coordinates.longitude
    - businesses[x].location(city,state,zip,etc.)
    - businesses[x].transactions
    
- `Business Details`(returns detailed business content):
  - inputs:
    - locale (see list here: https://www.yelp.com/developers/documentation/v3/supported_locales)
  - outputs:
    - categories
    - coordinates
    - display phone
    - hours of operation
      - open status
    - is_overnight
    - id
    - name
    - phone
    - photos
    - price
    - rating
    - review count
    - transactions
    - unique attributes (A mapping of attribute names, such as "Ambience" or "Good for Kids", to values)
    
- `Business Phone Search`
  - inputs:
    - term(optional) Search term, for example "food" or "restaurants"
    - location
    - latitude
    - longitude
    - radius(optional)
    - categories(optional)
    - locale(optional)
    - price(optional)
    - open_now(optional)
    - open_at(optional)
  - outputs:
    - same as `transactions` above plus...
    - region (Suggested area in a map to display results in.)
    - region.center 
    - region.center.lat
    - region.center.long

- `Business Search`
  - inputs: 
    - same as `Business Phone Seach` plus...
    - sort_by
    - limit
  - outputs:
    - same as `Business Phone Seach` plus...
    - businesses[x].distance
    
- `Reviews`
  - inputs:
    - locale(Defaults to en_US.)
  - outputs:
    - total
    - possible_languages
    - reviews[]
      - id
      - text
      - url
      - rating
      - time_created
      - user
      
- `Business Match` (match business data from other sources against businesses on Yelp, based on provided business information)
  - inputs:
    - name
    - address
    - city
    - state 
    - country
  - output:
    - businesses[]
      - id
      - alias
      - name
      - location
      - coordinates
      - phone
 - `Auto complete`
   - inputs:
     - text
     - lat
     - long
     - locale(opt.)
   - output:
     - terms[]
       - text
     - businesses[]
       - id
       - name
     - categories
       - title
       - alias
