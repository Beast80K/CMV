const _ = require('lodash');

const Capitalized = (text) => {
    try {
        return _.startCase(text);

    } catch (e) {
        return text
    }
}

export default Capitalized