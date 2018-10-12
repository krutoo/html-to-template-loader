const JSDOM = require('jsdom').JSDOM;

/**
 * Returns a string with HTML of importable web component based on HTML markup.
 * Only inline styles and static markup can be in base .html file!
 * @param {string} html HTML markup of a page.
 */
function packHTMLToTemaplate (html) {
	const dom = new JSDOM(html);
    const hash = Math.random().toString(16).slice(2);
    const ids = {
        body: `body-${hash}`,
        html: `html-${hash}`,
    };
    const styles = Array.from(dom.window.document.querySelectorAll('style'))
        .map(element => {
			// аккуратно переносим стили для html и body на альтернативные элементы
            const modifiedStyles = element.textContent
                .replace(/html/g, `#${ids.html}`)
                .replace(/body/g, `#${ids.body}`)
            return `<style>${modifiedStyles}</style>`;
        })
        .join('');
    const template = `
        ${styles}
        <div id="${ids.html}">
            <div id="${ids.body}">
                ${dom.window.document.body.innerHTML}
            </div>
        </div>
	`;
    return template;
}

module.exports = packHTMLToTemaplate;