import { useEffect, useState } from 'react';
import { Review } from '../interfaces/Review';
import { useReviews } from '../hooks/ReviewHooks';
import Card from 'react-bootstrap/Card';
// import ReactStars from 'react-rating-stars-component';
import AddReview from './AddReview';
import StarRating from './StarRating';

function ItemReviews({ itemId }: { itemId: string }) {
  const [reviews, setReviews] = useState<Review[]>([]);
  // const [reviewAvg, setReviewAvg] = useState<number>(0);
  const { getReviewsByItem } = useReviews();

  const getReviews = async () => {
    const res = await getReviewsByItem(itemId);
    if (!res || res.length === 0) return;

    // const sum = res.reduce((a, b) => a + b.value, 0);
    // setReviewAvg(sum / res.length);
    // setCount(res.length);
    setReviews(res);
  };

  useEffect(() => {
    getReviews();
  }, []);
  return (
    <Card>
      <AddReview itemId={itemId} />
      <h1>Reviews ({reviews.length})</h1>
      <div id="reviews-list">
        {reviews.map((review) => (
          <Card>
            {/* <ReactStars
              isHalf={true}
              edit={false}
              value={review.value}
              size={24}
            /> */}
            <StarRating value={review.value} edit={false} />
            <h4>{review.user.user_name}</h4>
            {review.text}
          </Card>
        ))}
      </div>
    </Card>
  );
}

export default ItemReviews;
