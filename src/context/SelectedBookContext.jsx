import { createContext, useContext, useMemo, useState } from 'react';

const SelectedBookContext = createContext(null);

// The shelf -> open book experience has four states:
//   idle     -> nothing selected, shelves are interactive
//   pulling  -> a spine is playing its "pulled off the shelf" animation
//   open     -> the book overlay is showing title/authors/reviews
//   closing  -> the overlay is playing its closing animation
// Modelling it explicitly (instead of a couple of booleans) avoids
// impossible combinations, like a book being "open" while its spine is
// still animating.
const STATUS = {
    IDLE: 'idle',
    PULLING: 'pulling',
    OPEN: 'open',
    CLOSING: 'closing',
};

export function SelectedBookProvider({ children }) {
    const [selectedBook, setSelectedBook] = useState(null);
    const [status, setStatus] = useState(STATUS.IDLE);

    const value = useMemo(
        () => ({
            selectedBook,
            status,
            // Step 1: user clicks a spine -> it starts pulling itself off the shelf.
            selectBook(book) {
                if (status !== STATUS.IDLE) return;
                setSelectedBook(book);
                setStatus(STATUS.PULLING);
            },
            // Step 2: the spine's pull animation finished -> show the open book.
            finishPulling() {
                setStatus((current) => (current === STATUS.PULLING ? STATUS.OPEN : current));
            },
            // Step 3: user closes the book -> play the closing animation.
            closeBook() {
                setStatus((current) => (current === STATUS.OPEN ? STATUS.CLOSING : current));
            },
            // Step 4: the closing animation finished -> back to an empty shelf.
            finishClosing() {
                setStatus((current) => {
                    if (current !== STATUS.CLOSING) return current;
                    setSelectedBook(null);
                    return STATUS.IDLE;
                });
            },
        }),
        [selectedBook, status]
    );

    return <SelectedBookContext.Provider value={value}>{children}</SelectedBookContext.Provider>;
}

export function useSelectedBook() {
    const context = useContext(SelectedBookContext);
    if (!context) {
        throw new Error('useSelectedBook must be used within a SelectedBookProvider');
    }
    return context;
}
