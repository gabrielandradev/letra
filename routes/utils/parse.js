function toSlugCase(text) {
    return text.toLowerCase()
        .replace(/ /g, '-')
        .replace(/[-]+/g, '-')
        .replace(/[^\w-]+/g, '');
}

function createBookFilename(title, author) {
    return toSlugCase(title + " " + author);
}

module.exports = createBookFilename;