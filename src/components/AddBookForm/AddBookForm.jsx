import { useState } from 'react';
import { createBook } from '../../services/bookService';
import { SPINE_PALETTE } from '../../utils/spineColor';
import { readFileAsDataUrl } from '../../utils/readFileAsDataUrl';
import './AddBookForm.css';

// Catalogs a new book: title, one or more authors, a portrait picked from
// disk, and a shelf color picked from the same palette every spine already
// draws from. Saves straight to owl-service, then asks the parent to
// refetch so the new spine shows up on the shelf.
function AddBookForm({ onBookAdded }) {
    const [title, setTitle] = useState('');
    const [authorDraft, setAuthorDraft] = useState('');
    const [authors, setAuthors] = useState([]);
    const [coverImage, setCoverImage] = useState(null);
    const [spineColor, setSpineColor] = useState(SPINE_PALETTE[0]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState(null);

    const canSubmit = title.trim() !== '' && authors.length > 0 && !isSubmitting;

    function addAuthor() {
        const author = authorDraft.trim();
        if (!author) return;
        setAuthors((current) => [...current, author]);
        setAuthorDraft('');
    }

    function removeAuthor(indexToRemove) {
        setAuthors((current) => current.filter((_, index) => index !== indexToRemove));
    }

    async function handleCoverImageChange(event) {
        const file = event.target.files[0];
        if (!file) return;
        setCoverImage(await readFileAsDataUrl(file));
    }

    async function handleSubmit(event) {
        event.preventDefault();
        if (!canSubmit) return;

        setIsSubmitting(true);
        setSubmitError(null);

        try {
            await createBook({
                title: title.trim(),
                authors,
                cover_image: coverImage ?? '',
                spine_color: spineColor,
            });
            setTitle('');
            setAuthors([]);
            setCoverImage(null);
            setSpineColor(SPINE_PALETTE[0]);
            await onBookAdded();
        } catch (err) {
            setSubmitError(err.message);
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <form className="addBookForm" onSubmit={handleSubmit}>
            <label className="addBookForm__field">
                <span className="addBookForm__label">Title</span>
                <input type="text" value={title} onChange={(event) => setTitle(event.target.value)} />
            </label>

            <div className="addBookForm__field">
                <span className="addBookForm__label">Authors</span>
                <div className="addBookForm__authorInput">
                    <input
                        type="text"
                        value={authorDraft}
                        onChange={(event) => setAuthorDraft(event.target.value)}
                        onKeyDown={(event) => {
                            if (event.key === 'Enter') {
                                event.preventDefault();
                                addAuthor();
                            }
                        }}
                        placeholder="Author name..."
                    />
                    <button type="button" onClick={addAuthor}>
                        Add
                    </button>
                </div>

                {authors.length > 0 && (
                    <ul className="addBookForm__authors">
                        {authors.map((author, index) => (
                            <li key={`${index}-${author}`}>
                                {author}
                                <button
                                    type="button"
                                    onClick={() => removeAuthor(index)}
                                    aria-label={`Remove author: ${author}`}
                                >
                                    ×
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <div className="addBookForm__field">
                <span className="addBookForm__label">Portrait</span>
                <input type="file" accept="image/*" onChange={handleCoverImageChange} />
                {coverImage && (
                    <img className="addBookForm__preview" src={coverImage} alt="Cover preview" />
                )}
            </div>

            <div className="addBookForm__field">
                <span className="addBookForm__label">Shelf color</span>
                <div className="addBookForm__swatches">
                    {SPINE_PALETTE.map((color) => (
                        <button
                            key={color}
                            type="button"
                            className={`addBookForm__swatch${color === spineColor ? ' addBookForm__swatch--selected' : ''}`}
                            style={{ backgroundColor: color }}
                            onClick={() => setSpineColor(color)}
                            aria-label={`Use color ${color}`}
                        />
                    ))}
                </div>
            </div>

            {submitError && <p className="addBookForm__error">Couldn't save this book: {submitError}</p>}

            <button type="submit" className="addBookForm__submit" disabled={!canSubmit}>
                {isSubmitting ? 'Adding...' : 'Add to shelf'}
            </button>
        </form>
    );
}

export default AddBookForm;
