import objectdiff from "objectdiff";

const { diff } = objectdiff;

const diffForConsole = (changes, _depth = 0) => {
    let styles = [];
    const INDENT = 4;
    const DEL = "color: red;";
    const INS = "color: green;";
    const RST = "color: black;";

    const properties = [];

    const diff = changes.value;
    if (changes.changed == "equal") {
        return { properties: "NO CHANGE", styles: [] };
    }

    const indent = depth => Array.from(new Array(depth * INDENT)).map(() => " ").join("");

    const stringify = val => {
        const lines = JSON.stringify(val, null, 4).split("\n");
        return lines.map((line, idx) => idx === 0 ? line : indent(_depth + 1) + line).join("\n");
    };

    Object.keys(diff).forEach(key => {
        const changed = diff[key].changed;

        switch (changed) {
            case "equal":
                properties.push(key + ": " + stringify(diff[key].value) + ",");
                break;

            case "removed":
                properties.push("%c" + key + ": " + stringify(diff[key].value) + ",%c");
                styles.push(DEL, RST);
                break;

            case "added":
                properties.push("%c" + key + ": " + stringify(diff[key].value) + ",%c");
                styles.push(INS, RST);
                break;

            case "primitive change":
                {
                    const prefix = key + ": ";
                    properties.push("%c" + prefix + stringify(diff[key].removed) + ",%c");
                    styles.push(DEL, RST);
                    properties.push("%c" + prefix + stringify(diff[key].added) + ",%c");
                    styles.push(INS, RST);
                    break;
                }

            case "object change":
                {
                    const { properties: subProperties, styles: subStyles } = diffForConsole(diff[key], _depth + 1);
                    properties.push(key + ": " + subProperties);
                    styles = styles.concat(subStyles);
                    break;
                }
        }
    });

    return {
        properties: " {\n" + properties.map(str => indent(_depth + 1) + str).join("\n") + "\n" + indent(_depth) + "},",
        styles
    };
};

export const logDiff = (prev, next) => {
    const { properties, styles } = diffForConsole(diff(prev, next));
    console.log(properties, ...styles); // eslint-disable-line no-console
};
