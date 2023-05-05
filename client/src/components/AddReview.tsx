import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';
import { useReviews } from '../hooks/ReviewHooks';
import { Review, ReviewInput } from '../interfaces/Review';
import StarRating from './StarRating';

// Component for adding a review to an item. If the user has already reviewed
// it shows the review and allows the user to delete it.

function AddReview({ itemId }: { itemId: string }) {
  const [text, setText] = useState<string>('');
  const [review, setReview] = useState<number>();
  const [oldReview, setOldReview] = useState<Review>();
  const { addReview, getReviewByUser, deleteReview } = useReviews();

  const getOldReview = async () => {
    const res = await getReviewByUser(itemId);
    if (res === undefined) return;
    setOldReview(res);
  };

  const handleSubmit = async () => {
    if (review === undefined) return alert('Please rate first');
    const data: ReviewInput = {
      item: itemId,
      value: review,
      text: text,
    };
    const res = await addReview(data);
    if (res === undefined) return alert('Failed to add review');
    alert('Review added');
    window.location.reload();
  };

  const handleDelete = async () => {
    if (oldReview === undefined) return alert('Failed to delete review');
    const res = await deleteReview(oldReview.id);
    if (res === undefined) return alert('Failed to delete review');
    alert('Review deleted');
    window.location.reload();
  };

  useEffect(() => {
    getOldReview();
  }, []);

  if (itemId === undefined) return <></>;

  return (
    <Card>
      {oldReview == undefined ? (
        <>
          <h4>Submit review</h4>
          <StarRating size={50} setRating={setReview} />
          <textarea
            style={{ resize: 'none' }}
            onChange={(e) => setText(e.target.value)}
          ></textarea>
          <Button onClick={handleSubmit} style={{ marginTop: 10 }}>
            Submit
          </Button>
        </>
      ) : (
        <>
          <h4>Your review</h4>
          <div style={{ display: 'none' }}>{oldReview.value}</div>
          <StarRating size={50} edit={false} value={oldReview.value} />

          <p>{oldReview.text}</p>
          <div className="flex-row" style={{ gap: 10 }}>
            <Button variant="danger" onClick={handleDelete}>
              Delete
            </Button>
          </div>
        </>
      )}
    </Card>
  );
}

export default AddReview;
