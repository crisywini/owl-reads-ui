import { get, post } from './httpClient';

// owl-service exposes GET /reviews (all reviews) but does not currently wire
// up a "reviews by book" route, so we fetch everything and filter here.
// owl-service serializes an empty result set as JSON null (a nil Go slice)
// rather than [], so that has to be normalized before filtering it.
export async function getReviewsByBookId(bookId) {
    const reviews = await get('/reviews');
    return (reviews ?? []).filter((review) => review.book_id === bookId);
}

// review must include book_id, rate (> 0), and description - those are the
// fields owl-service's usecase layer requires.
export function createReview(review) {
    return post('/reviews', review);
}
