// Go's zero-value time.Time serializes to "0001-01-01T00:00:00Z" when a
// review was created without dates, so treat anything before 1900 as unset.
export function formatDate(isoDate) {
    if (!isoDate) return null;

    const date = new Date(isoDate);
    if (Number.isNaN(date.getTime()) || date.getFullYear() < 1900) {
        return null;
    }

    return date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
}
