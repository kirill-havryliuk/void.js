const _curry = (arity, fn) => (...args) => args.length < arity ? _curry(arity - args.length, (...nextArgs) => fn(...args, ...nextArgs)) : fn(...args);
export const curry = fn => _curry(fn.length, fn);


export const deepFreeze = obj => {
    if (process.env.NODE_ENV !== "production") {
        const propNames = Object.getOwnPropertyNames(obj);
        propNames.forEach(name => {
            const prop = obj[name];
            if (typeof prop == "object" && prop !== null)
                deepFreeze(prop);
        });
        return Object.freeze(obj);
    }

    return obj;
};


const _checkNotPlainObj = obj => typeof obj !== "object" || obj === null || Array.isArray(obj) || obj instanceof RegExp;
export const merge = (model, patch) => {
    if (_checkNotPlainObj(model) || _checkNotPlainObj(patch))
        return patch;

    const patchKeys = Object.keys(patch);
    if (patchKeys.length === 0)
        return model;

    const newModel = { ...model };
    return patchKeys.reduce((model, key) => {
        model[key] = merge(model[key], patch[key]);
        return model;
    }, newModel);
};


export const annotate = (descr, fn) => {
    if (process.env.NODE_ENV !== "production")
        return (...args) => {
            /* eslint-disable no-console */
            console.group(descr);
            console.time(descr);
            console.log("ARGUMENTS", args);
            const ret = fn(...args);
            console.log("RET", ret);
            console.timeEnd(descr);
            console.groupEnd(descr);
            /* eslint-enable no-console */
            return ret;
        };
    return fn;
};
