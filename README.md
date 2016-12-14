# void.js
Extremely small (less then 1 kb gzipped prod build ) JS front end framework.

Here is [demo](https://kirill-gavrilyuk.github.io/void.js-demo/index.html).
Here is [Demo sources](https://github.com/kirill-gavrilyuk/void.js-demo).


You can install it from npm:
```
npm install void.js
```

Void.js provides very simple interface of 3 functions:
```javascript
const Void = {
    init: fn,
    annotate: fn,
    curry: fn
}
```

# Void.init
`Void.init` accepts an object with fields: 
```javascript
const $ = Void.init({
    model: any, // Your model ( can be anything ).
    view: fn, // View function, accepts model and returns something that render function can render.  
    render: fn, // Function that renders data, returned by view function into DOM.
});
```
What is `$` explained below.

- `model` can be anything, but it is an objects in most of cases

- `view` function is a function of form:
    ```javascript
    const view = (model, $) => /* returns someViewData */
    ```
    `YOU SHOULD NOT CHANGE MODEL INTO VIEW`
    What is `$` explained below.

- `render` function is a function of form:
    ```javascript
    const render = someViewData => /* renders someViewData to DOM */
    ```

`Void.init` will:
- Call view and pass (model, $) as it's arguments
- Render `someViewData` 

# Void.curry
`Void.curry` is just a [currying](https://en.wikipedia.org/wiki/Currying) function. ( Surprise! )
```javascript
const add3 = (a, b, c) => a + b + c; // Some function of 3 args.
const add3Curried = Void.curry(add3);
// add3Curried(1, 2, 3) === add3Curried(1, 2)(3) === add3Curried(1)(2, 3) === add3Curried(1)(2)(3)
```

# Void.annotate
`Void.annotate` is just function for logging. Nothing special. But you should allways use it with your handlers (details below);
```javascript
const add3 = Void.annotate("Add a, b and c", (a, b, c) => a + b + c);
const sum = add3(1, 2, 3); // Each call of add3 will log some info to console (in dev build only).
```

# $
`$` is a set of similar functions of form:
```javascript
const $ = curry((handler, data) => /* ... */);
```
`$` accepts handler as it's single argument, and returns `function`, that accepts some `data`. When this `function` will be called, it will:
- Call handler and pass (model, `data`, $) as it's arguments
- Apply returned by handler patch to model;
- ReRender view with new model.

Note, that `$` function passed to `handler` is Async, to prevent nested `$` calls.

# Handlers
Is a set of functions of form:
```javascript
// Some handler
const onMyShinyButtonClick = annotate("Shiny button click, toggle someThing", (model, data, $) => ({ isSomeThingActive: !model.isSomeThingActive }));
```
You can used it into your view in such way (React Example): 
```javascript
view = (model, $) => {
    return <div>
        <div> { model.isSomeThingToggled ? "Some Thing active" : "Some Thing inactive" } </div>
        <button onClick={ $(onMyShinyButtonClick) }> Shiny Button </button>
    </div>;
};
```
`handler's data will be just react's event, in this case`

Some docs improvements and Demo will be here soon. Stay tuned!

