This lesson shows how to test HTTP routes by way of booting an HTTP server
instance and issuing a request through the full server process. While this
method of testing _can_ be considered a unit test, it is much more akin to
an integration test. However, this sort of test is a natural inclination for
most people. So we start here and show an alternative in lesson 010.

This lesson uses [Fastify](https://fastify.io/) to provide the HTTP server.
