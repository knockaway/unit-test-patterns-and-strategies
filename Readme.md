# Unit Test Patterns And Strategies

The purpose of this repository is to provide instruction on some common
unit test patterns and strategies. Within the [lessons](./lessons) directory
there are several subdirectories. The lessons are primarily written according to
test patterns and strategies usable with the [`tap`](https://node-tap.org)
testing framework within a [back end][backend] context. However, the majority
of concepts should be applicable to any testing framework.

Each lesson should have a short `Readme.md` that introduces the lesson. These
readmes do not constitute the lesson itself. The core of the lessons are
contained within each lesson's test files.

Some lessons will build upon concepts introduced in prior lessons. If this is
the case, the lesson should indicate this fact. Otherwise, lessons should be
self contained such that topics can be reviewed in isolation.

[backend]: https://en.wikipedia.org/wiki/Front_end_and_back_end

## Getting Started

All lessons use the same [`package.json`](./package.json). So the first thing
to do is to install all dependencies:

```sh
$ npm install
```

Subsequently, all tests across all lessons can be run by:

```sh
$ npm test
```

Throughout the lessons there will be cues to alter tests to see what might
happen with the change. To avoid having to re-run `npm test` repeatedly, there
is a script to watch for changes in tests:

```sh
$ npm run test:watch
```

## Running Tests For Specific Lessons

To run tests within an individual lesson, it is recommended that the local
`node_modules/.bin` directory be in the shell `PATH`:

```sh
$ export PATH=$(pwd)/node_modules/.bin:${PATH}
```

With the `PATH` updated, an individual lesson's tests can be run like so:

```sh
$ tap -g 001
# where "001" matches `001` in `lessons/001-basic-testing`
```
