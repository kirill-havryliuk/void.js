import { deepFreeze, merge, curry } from "utils.js";

if (process.env.NODE_ENV !== "production")
    var { logDiff } = require("log.js"); // eslint-disable-line no-var

export const init = config => {
    let model = config.model;
    const { view, render } = config;

    const $ = curry((fn, data) => {
        const patch = fn(deepFreeze(model), data, curry((fn, data) => setTimeout($, 0, fn, data)));
        const newModel = merge(model, patch);
        if (newModel === model)
            return;

        if (process.env.NODE_ENV !== "production") {
            if (window._DIFF_)
                logDiff(model, newModel);
            else
                console.log("NEW MODEL:", newModel); // eslint-disable-line no-console
        }

        model = newModel;
        render(view(deepFreeze(model), fn => $(fn)));
    });

    render(view(deepFreeze(model), fn => $(fn)));
    return $;
};
