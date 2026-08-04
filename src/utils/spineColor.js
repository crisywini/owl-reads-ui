// A small set of book-cloth colors, picked once instead of at random so a
// given book always renders with the same spine color across re-renders.
const SPINE_PALETTE = [
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

export function getSpineColor(book) {
    const seed = book.id || book.title || '';
    return SPINE_PALETTE[hashString(seed) % SPINE_PALETTE.length];
}
