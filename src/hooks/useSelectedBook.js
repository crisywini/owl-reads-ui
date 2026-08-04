import { useContext } from 'react';
import { SelectedBookContext } from '../context/selectedBookContextObject';

// Reads the shelf/open-book state machine from SelectedBookContext. Lives in
// its own file (rather than alongside the provider) so the context file only
// exports components, which is what keeps React Fast Refresh working.
export function useSelectedBook() {
    const context = useContext(SelectedBookContext);
    if (!context) {
        throw new Error('useSelectedBook must be used within a SelectedBookProvider');
    }
    return context;
}
