const createDOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');

const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);

const sanitize = (input) => {
    if (typeof input !== 'string') return input;
    return DOMPurify.sanitize(input);
};

module.exports = sanitize;
