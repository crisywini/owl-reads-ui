import { useMemo, useState } from 'react';
import { SelectedBookContext } from './selectedBookContextObject';

// The shelf -> open book experience has four states:
//   idle     -> nothing selected, shelves are interactive
//   pulling  -> a spine is playing its "pulled off the shelf" animation
//   open     -> the book overlay is showing title/authors/reviews
//   closing  -> the overlay is playing its closing animation
// Modelling it explicitly (instead of a couple of booleans) avoids
// impossible combinations, like a book being "open" while its spine is
// still animating.
export function SelectedBookProvider({ children }) {
    const [selectedBook, setSelectedBook] = useState(null);
    const [status, setStatus] = useState('idle');

    const value = useMemo(
        () => ({
            selectedBook,
            status,
            // Step 1: user clicks a spine -> it starts pulling itself off the shelf.
            selectBook(book) {
                if (status !== 'idle') return;
                setSelectedBook(book);
                setStatus('pulling');
            },
            // Step 2: the spine's pull animation finished -> show the open book.
            finishPulling() {
                setStatus((current) => (current === 'pulling' ? 'open' : current));
            },
            // Step 3: user closes the book -> play the closing animation.
            closeBook() {
                setStatus((current) => (current === 'open' ? 'closing' : current));
            },
            // Step 4: the closing animation finished -> back to an empty shelf.
            finishClosing() {
                setStatus((current) => {
                    if (current !== 'closing') return current;
                    setSelectedBook(null);
                    return 'idle';
                });
            },
        }),
        [selectedBook, status]
    );

    return <SelectedBookContext.Provider value={value}>{children}</SelectedBookContext.Provider>;
}
