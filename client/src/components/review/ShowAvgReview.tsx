import { useEffect, useState } from 'react';
import { useReviews } from '../../hooks/ReviewHooks';
import Card from 'react-bootstrap/esm/Card';
import StarRating from '../StarRating';

// A component that shows the average review of an item
// if props partial is true, it will only show the stars

type Props = {
  itemId: string;
  partial: boolean;
};

function ShowAvgReview({ itemId, partial = false }: Props) {
  const [review, setReview] = useState<number>();
  const [count, setCount] = useState<number>(0);
  const { getReviewsByItem } = useReviews();

  const getReview = async () => {
    const res = await getReviewsByItem(itemId);
    if (!res || res.length === 0) {
      setReview(0);
      return;
    }
    // Count the average from sum
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
          <h5>Review: {review}</h5>
          {review !== undefined && (
            <div className="flex-row">
              <StarRating edit={false} value={review} size={35} />
            </div>
          )}
          <h5>{count} Reviews</h5>
        </Card.Footer>
      )}
    </>
  );
}

export default ShowAvgReview;
