const dayjs = require('dayjs');

function formatDate(date) {
    return dayjs(date).format('DD-MM-YYYY');
}

module.exports = formatDate;
