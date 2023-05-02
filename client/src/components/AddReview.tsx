import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
// import ReactStars from 'react-rating-stars-component';
import { useEffect, useState } from 'react';
import { useReviews } from '../hooks/ReviewHooks';
import { Review, ReviewInput } from '../interfaces/Review';
import StarRating from './StarRating';

function AddReview({ itemId }: { itemId: string }) {
  const [text, setText] = useState<string>('');
  const [review, setReview] = useState<number>();
  const [oldReview, setOldReview] = useState<Review>();
  const { addReview, getReviewByUser } = useReviews();

  //   const reviewChanged = (newReview: number) => {
  //     setReview(newReview);
  //   };

  const getOldReview = async () => {
    const res = await getReviewByUser(itemId);
    if (res === undefined) return;
    console.log('getOldReview', res);
    setOldReview(res);
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

  useEffect(() => {
    getOldReview();
  }, []);

  if (itemId === undefined) return <></>;

  return (
    <Card>
      {oldReview == undefined ? (
        <>
          <h4>Submit review</h4>
          <div>r: {review}</div>
          <StarRating size={50} setRating={setReview} />
          {/* <ReactStars size={50} onChange={reviewChanged} /> */}
          <textarea onChange={(e) => setText(e.target.value)}></textarea>
          <Button onClick={handleClick}>Submit</Button>
        </>
      ) : (
        <>
          <h4>Your review</h4>
          {/* <ReactStars edit={false} value={oldReview.value} size={50} /> */}
          <StarRating size={50} edit={false} value={oldReview.value} />
          <p>{oldReview.text}</p>
          <div className="flex-row" style={{ gap: 10 }}>
            <Button>Edit</Button>
            <Button variant="danger">Delete</Button>
          </div>
        </>
      )}
    </Card>
  );
}

export default AddReview;
