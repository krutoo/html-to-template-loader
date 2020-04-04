const { JSDOM } = require('jsdom');
const css = require('css');
const parser = require('postcss-selector-parser');

/**
 * Returns a string with HTML of importable web component based on HTML markup.
 * Only inline styles and static markup can be in base .html file!
 * @param {string} html HTML markup of a page.
 */
function packHTMLToTemplate (html) {
	const dom = new JSDOM(html);
    const hash = Math.random().toString(16).slice(2);
    const substituteIds = {
        body: `body-${hash}`,
        html: `html-${hash}`,
    };
    const styles = Array.from(dom.window.document.querySelectorAll('style'))
        .map(element => {
            const modifiedStyles = processStyles(element.textContent, substituteIds);
            const clone = element.cloneNode(true);
            clone.textContent = modifiedStyles;
            return clone.outerHTML;
        })
        .join('');
    const template = `
        ${styles}
        <div id="${substituteIds.html}">
            <div id="${substituteIds.body}">
                ${dom.window.document.body.innerHTML}
            </div>
        </div>
	`;

    return template;
}

function processStyles (styleTextContent, substituteIds) {
    const ast = css.parse(styleTextContent)
    const rules = ast && ast.stylesheet && ast.stylesheet.rules;

    if (Array.isArray(rules)) {
        rules.forEach(rule => {
            if (Array.isArray(rule.selectors)) {
                rule.selectors = rule.selectors.map(fullSelector => {
                    const normalized = parser(selectors => {
                        selectors.walk(selector => {
                            if (selector.type === 'tag') {
                                if (selector.value === 'html') {
                                    selector.replaceWith(parser.id({ value: substituteIds.html }));
                                } else if (selector.value === 'body') {
                                    selector.replaceWith(parser.id({ value: substituteIds.body }));
                                }
                            }
                        });
                    }).processSync(fullSelector, { lossless: false });
                    return normalized;
                });
            }
        });
    }

    return css.stringify(ast);
}

module.exports = packHTMLToTemplate;
