// A small set of book-cloth colors. Exported so the "add a book" form can
// offer the exact same swatches a reader picks from when cataloging a book.
export const SPINE_PALETTE = [
    '#7f1d1d', // maroon
    '#1e3a5f', // navy
    '#14532d', // forest green
    '#78350f', // saddle brown
    '#3f2d54', // plum
    '#854d0e', // mustard
    '#134e4a', // teal
    '#581c2e', // wine
];

function hashString(value) {
    let hash = 0;
    for (let i = 0; i < value.length; i += 1) {
        hash = (hash << 5) - hash + value.charCodeAt(i);
        hash |= 0; // keep it a 32-bit int
    }
    return Math.abs(hash);
}

// Prefers the color chosen when the book was added; older/seeded books that
// don't have one fall back to a color hashed from their id/title, so every
// spine still looks intentional instead of defaulting to one flat color.
export function getSpineColor(book) {
    if (book.spine_color) return book.spine_color;

    const seed = book.id || book.title || '';
    return SPINE_PALETTE[hashString(seed) % SPINE_PALETTE.length];
}

const MIN_SPINE_HEIGHT = 150;
const MAX_SPINE_HEIGHT = 210;

// Real shelves don't line up perfectly, so vary each spine's height a bit
// based on the same book seed used for its color.
export function getSpineHeight(book) {
    const seed = book.id || book.title || '';
    const range = MAX_SPINE_HEIGHT - MIN_SPINE_HEIGHT;
    return `${MIN_SPINE_HEIGHT + (hashString(seed) % range)}px`;
}
