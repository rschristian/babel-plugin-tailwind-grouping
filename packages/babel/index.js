import { parse as twindParse, stringify as twindStringify } from './vendor/twind/parse.js';

export const process = (classAttrVal) =>
    twindParse(classAttrVal)
        .map((rule) => twindStringify(rule))
        .join(' ');

export default function tailwindGroupingPlugin({ types: _t }) {
    return {
        name: 'tailwind-grouping',
        visitor: {
            JSXAttribute(path) {
                if (
                    (path.node.name.name !== 'class' && path.node.name.name !== 'className') ||
                    !path.node.value.value ||
                    !path.node.value.value.includes('(')
                )
                    return;
                path.node.value.value = process(path.node.value.value);
            },
        },
    };
}
