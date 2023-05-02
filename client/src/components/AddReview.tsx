import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ReactStars from 'react-rating-stars-component';
import { useState } from 'react';
import { useReviews } from '../hooks/ReviewHooks';
import { ReviewInput } from '../interfaces/Review';

function AddReview({ itemId }: { itemId: string }) {
  const [text, setText] = useState<string>('');
  const [review, setReview] = useState<number>();
  const { addReview } = useReviews();

  const reviewChanged = (newReview: number) => {
    setReview(newReview);
  };

  const handleClick = async () => {
    if (review === undefined) return alert('Please rate first');
    const data: ReviewInput = {
      item: itemId,
      value: review,
      text: text,
    };
    const res = await addReview(data);
    if (res === undefined) return alert('Failed to add review');
    alert('Review added');
  };

  if (itemId === undefined) return <></>;

  return (
    <Card>
      <h4>Submit review</h4>
      <ReactStars size={50} onChange={reviewChanged} />
      <textarea onChange={(e) => setText(e.target.value)}></textarea>
      <Button onClick={handleClick}>Submit</Button>
    </Card>
  );
}

export default AddReview;
