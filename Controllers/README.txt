In the application you can add flight, delete flight, upgrade flight, get all flights and get a specific flight.


API:

Authorization:
/api/auth -> check authentication of the user and provide a key for 10 minutes.
    Needs to send "id" in the body.
    Valid IDs: 313412355, 721777450

Once the authentication succeed, the user can make full CRUD on flights.
each request shoud include an Authorization header when the value is: 
"Bearer {Key}" - it should be space between the word "Bearer" and the key the user got.
example for header value: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiIxMjM0IiwiaWF0IjoxNjM4MzQ5MDg1LCJleHAiOjE2MzgzNDk2ODV9.xFMfiG3MRRe6H6fKECRkU0FqTmbxJOKAqSjMF4ZWIjk"

GET:
/api/flights -> get all flights.
/api/flights/:flightNumber -> get a specific flight with weather info.
    The flightNumber is the "_id" the mongoDB generates to the flight when creating it.
    the user can get the flight numbers from "get all flights" request.

POST:
/api/flights -> add new flight.
    To add a new flight the user needs to send the flight's details in the body:
    destination, origin, date(YYYY-D-M)
    example:
        {
            "destination":"London",
            "origin":"Tel-Aviv",
            "date":"2021-7-12"
        }

DELETE:
/api/flights/flightNumber -> delete a flight.