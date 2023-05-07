import { useEffect, useState } from 'react';
import { Review } from '../../interfaces/Review';
import { useReviews } from '../../hooks/ReviewHooks';
import Card from 'react-bootstrap/Card';
import AddReview from './AddReview';
import StarRating from '../StarRating';

// This component displays the add review form and the list of reviews for an item.

function ItemReviews({ itemId }: { itemId: string }) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const { getReviewsByItem } = useReviews();

  const getReviews = async () => {
    const res = await getReviewsByItem(itemId);
    if (!res || res.length === 0) return;
    setReviews(res);
  };

  useEffect(() => {
    getReviews();
  }, []);

  return (
    <Card style={{ gap: '1em' }}>
      <AddReview itemId={itemId} />
      <div>
        <h1>Reviews ({reviews.length})</h1>
        <div id="reviews-list">
          {reviews.map((review) => (
            <Card>
              <StarRating value={review.value} edit={false} />
              <h4>{review.user.user_name}</h4>
              {review.text}
            </Card>
          ))}
        </div>
      </div>
    </Card>
  );
}

export default ItemReviews;
