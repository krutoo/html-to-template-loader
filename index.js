const packHTMLToTemplate = require('./src/packHTMLToTemplate.js');

module.exports = function loader (source) {
    return `export default ${JSON.stringify(packHTMLToTemplate(source))}`;
};
