const _ = require('lodash');

const ShortText = (Text, Len) => {

    try {

        return _.truncate(Text, { 'length': Len })
    } catch (e) {

        return Text.slice(0, Len) + " ..."
    }

}

export default ShortText