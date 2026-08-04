// Splits a flat list into fixed-size groups, e.g. chunkArray([1,2,3,4,5], 2)
// -> [[1,2], [3,4], [5]]. Used to split all books into per-shelf groups.
export function chunkArray(items, size) {
    const chunks = [];
    for (let i = 0; i < items.length; i += size) {
        chunks.push(items.slice(i, i + size));
    }
    return chunks;
}
