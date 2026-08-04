import { formatDate } from '../../utils/formatDate';
import './ReviewCard.css';

function StarRating({ rate }) {
    return (
        <span className="reviewCard__stars" aria-label={`${rate} out of 5 stars`}>
            {'★'.repeat(rate)}
            {'☆'.repeat(Math.max(0, 5 - rate))}
        </span>
    );
}

function ReviewCard({ review }) {
    const started = formatDate(review.start_date);
    const finished = formatDate(review.finish_date);

    return (
        <article className="reviewCard">
            <header className="reviewCard__header">
                <StarRating rate={review.rate} />
                {(started || finished) && (
                    <span className="reviewCard__dates">
                        {started ?? '—'} → {finished ?? '—'}
                    </span>
                )}
            </header>

            <p className="reviewCard__description">{review.description}</p>

            {review.favorite_phrases?.length > 0 && (
                <ul className="reviewCard__phrases">
                    {review.favorite_phrases.map((phrase, index) => (
                        <li key={`${index}-${phrase}`}>&ldquo;{phrase}&rdquo;</li>
                    ))}
                </ul>
            )}
        </article>
    );
}

export default ReviewCard;
