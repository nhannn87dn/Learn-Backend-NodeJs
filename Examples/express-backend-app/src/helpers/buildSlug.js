const slugify = require('slugify');

const buildSlug = (title) =>{
    return slugify(title, {
        lower: true,
        remove: /[*+~.()'"!:@]/g,
        strict: true,
        locale: 'vi',
    });
}

module.exports = buildSlug;