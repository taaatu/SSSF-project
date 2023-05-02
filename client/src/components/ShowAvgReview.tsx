import { useEffect, useState } from 'react';
import { useReviews } from '../hooks/ReviewHooks';
import Card from 'react-bootstrap/esm/Card';
import StarRating from './StarRating';

function ShowAvgReview({
  itemId,
  partial = false,
}: {
  itemId: string;
  partial?: boolean;
}) {
  const [review, setReview] = useState<number>();
  const [count, setCount] = useState<number>(0);
  const { getReviewsByItem } = useReviews();
  const getReview = async () => {
    const res = await getReviewsByItem(itemId);
    if (!res || res.length === 0) {
      setReview(0);
      return;
    }
    const sum = res.reduce((a, b) => a + b.value, 0);
    setReview(sum / res.length);
    setCount(res.length);
  };
  useEffect(() => {
    getReview();
  }, []);
  return (
    <>
      {partial ? (
        <div>
          {review !== undefined && <StarRating edit={false} value={review} />}
        </div>
      ) : (
        <Card.Footer style={{ whiteSpace: 'nowrap' }}>
          Review: {review}
          {review !== undefined && (
            <div className="flex-row">
              <StarRating edit={false} value={review} />
              {/* Review: {review} */}
            </div>
            // <ReactStars isHalf={true} edit={false} value={review} size={24} />
          )}
          {count} Reviews
        </Card.Footer>
      )}
    </>
  );
}

export default ShowAvgReview;
