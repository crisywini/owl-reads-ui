import { get, post } from './httpClient';

// owl-service exposes GET /reviews (all reviews) but does not currently wire
// up a "reviews by book" route, so we fetch everything and filter here.
export async function getReviewsByBookId(bookId) {
    const reviews = await get('/reviews');
    return reviews.filter((review) => review.book_id === bookId);
}

// review must include book_id, rate (> 0), and description - those are the
// fields owl-service's usecase layer requires.
export function createReview(review) {
    return post('/reviews', review);
}
