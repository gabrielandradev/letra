function toSlugCase(text) {
    return text.toLowerCase()
        .replace(/ /g, '-')
        .replace(/[-]+/g, '-')
        .replace(/[^\w-]+/g, '');
}

module.exports = toSlugCase;