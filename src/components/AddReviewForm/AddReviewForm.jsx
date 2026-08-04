import { useState } from 'react';
import { createReview } from '../../services/reviewService';
import './AddReviewForm.css';

const STAR_VALUES = [1, 2, 3, 4, 5];

// Lets a reader add a review for the open book: a star rating, a written
// description, and any favorite phrases from the book. Saves straight to
// owl-service, then asks the parent to refetch so the new review shows up
// in the list above.
function AddReviewForm({ bookId, onReviewAdded }) {
    const [rate, setRate] = useState(0);
    const [description, setDescription] = useState('');
    const [phraseDraft, setPhraseDraft] = useState('');
    const [favoritePhrases, setFavoritePhrases] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState(null);

    const canSubmit = rate > 0 && description.trim() !== '' && !isSubmitting;

    function addPhrase() {
        const phrase = phraseDraft.trim();
        if (!phrase) return;
        setFavoritePhrases((phrases) => [...phrases, phrase]);
        setPhraseDraft('');
    }

    function removePhrase(indexToRemove) {
        setFavoritePhrases((phrases) => phrases.filter((_, index) => index !== indexToRemove));
    }

    async function handleSubmit(event) {
        event.preventDefault();
        if (!canSubmit) return;

        setIsSubmitting(true);
        setSubmitError(null);

        try {
            await createReview({
                book_id: bookId,
                rate,
                description: description.trim(),
                favorite_phrases: favoritePhrases,
            });
            setRate(0);
            setDescription('');
            setFavoritePhrases([]);
            await onReviewAdded();
        } catch (err) {
            setSubmitError(err.message);
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <form className="addReviewForm" onSubmit={handleSubmit}>
            <h3>Add a review</h3>

            <div className="addReviewForm__field">
                <span className="addReviewForm__label">Rating</span>
                <div className="addReviewForm__stars">
                    {STAR_VALUES.map((value) => (
                        <button
                            key={value}
                            type="button"
                            className={`addReviewForm__star${value <= rate ? ' addReviewForm__star--filled' : ''}`}
                            onClick={() => setRate(value)}
                            aria-label={`${value} star${value > 1 ? 's' : ''}`}
                        >
                            ★
                        </button>
                    ))}
                </div>
            </div>

            <label className="addReviewForm__field">
                <span className="addReviewForm__label">Description</span>
                <textarea
                    className="addReviewForm__textarea"
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                    placeholder="What did you think of this book?"
                    rows={3}
                />
            </label>

            <div className="addReviewForm__field">
                <span className="addReviewForm__label">Favorite phrases</span>
                <div className="addReviewForm__phraseInput">
                    <input
                        type="text"
                        value={phraseDraft}
                        onChange={(event) => setPhraseDraft(event.target.value)}
                        onKeyDown={(event) => {
                            if (event.key === 'Enter') {
                                event.preventDefault();
                                addPhrase();
                            }
                        }}
                        placeholder="A line worth remembering..."
                    />
                    <button type="button" onClick={addPhrase}>
                        Add
                    </button>
                </div>

                {favoritePhrases.length > 0 && (
                    <ul className="addReviewForm__phrases">
                        {favoritePhrases.map((phrase, index) => (
                            <li key={`${index}-${phrase}`}>
                                &ldquo;{phrase}&rdquo;
                                <button
                                    type="button"
                                    onClick={() => removePhrase(index)}
                                    aria-label={`Remove phrase: ${phrase}`}
                                >
                                    ×
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {submitError && <p className="addReviewForm__error">Couldn't save your review: {submitError}</p>}

            <button type="submit" className="addReviewForm__submit" disabled={!canSubmit}>
                {isSubmitting ? 'Saving...' : 'Save review'}
            </button>
        </form>
    );
}

export default AddReviewForm;
