# Event sourced REST api example

An example of a REST api using even sourcing inspired by this article: [Listen to yourself](https://medium.com/@odedia/listen-to-yourself-design-pattern-for-event-driven-microservices-16f97e3ed066)

## Getting Started

- start application dev server `docker-compose up -d`

an http server will start listening to port 5001!

## Tests

 - log into application container `docker-compose exec app bash`
 - run tests `npm run test`
