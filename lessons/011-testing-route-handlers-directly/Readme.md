This lesson shows how [Fastify](https://fastify.io) route handlers can be
tested directly as opposed to through requests as shown in lessons 009 and 010.
To do so, this lesson refactors the code from lesson 010 into a structure that
would be common in a real code base: routes are defined as a Fastify plugin,
and route handlers are defined as independent testable functions. As a result,
[`index.test.js`](./index.test.js) is not the complete lesson. Additional
test suites should be read:

+ [`routes/handlers/foo.test.js`](./routes/handlers/foo.test.js)
+ [`routes/handlers/root.test.js`](./routes/handlers/root.test.js)
