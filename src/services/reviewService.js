import { get } from './httpClient';

// owl-service exposes GET /reviews (all reviews) but does not currently wire
// up a "reviews by book" route, so we fetch everything and filter here.
export async function getReviewsByBookId(bookId) {
    const reviews = await get('/reviews');
    return reviews.filter((review) => review.book_id === bookId);
}
