This lesson shows how to perform test setup before each subtest and state
clearing after each subtest. To do so, this lesson uses
[Knex](https://knexjs.org) for functionality and [`mock-knex`][mockknex] within
the tests. The `mock-knex` library relies upon a singleton, thus complicating
unit tests and requiring setup and state clearing between subtests.

[mockknex]: https://www.npmjs.com/package/mock-knex
