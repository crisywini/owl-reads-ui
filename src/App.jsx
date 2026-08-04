import { SelectedBookProvider } from './context/SelectedBookContext';
import LibraryPage from './pages/LibraryPage';

function App() {
    return (
        <SelectedBookProvider>
            <LibraryPage />
        </SelectedBookProvider>
    );
}

export default App;
