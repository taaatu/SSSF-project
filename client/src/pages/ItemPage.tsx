import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { doGraphQLFetch } from '../graphql/fetch';
import { fileUrl, graphqlUrl } from '../utils/url';
import { deleteItemQuery, itemByIdQuery } from '../graphql/queriesItem';
import { Item } from '../interfaces/Item';
import TopNavBar from '../components/TopNavBar';
import ShowLocation from '../components/ShowLocation';
import { Card } from 'react-bootstrap';
import useUser from '../hooks/UserHook';
// import ReactStars from 'react-rating-stars-component';
import { useReviews } from '../hooks/ReviewHooks';
import ItemReviews from '../components/ItemReview';
import StarRating from '../components/StarRating';
import ShowAvgReview from '../components/ShowAvgReview';

function ItemPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState<Item>();
  const [showLocation, setShowLocation] = useState<boolean>(false);
  const { currentUser } = useUser();

  const getItem = async () => {
    try {
      const res = await doGraphQLFetch(graphqlUrl, itemByIdQuery, { id });
      setItem(res.itemById as Item);
    } catch (error) {
      console.error('getItem', error);
    }
  };
  useEffect(() => {
    getItem();
  }, []);

  if (item === undefined || id === undefined) {
    return <div>loading...</div>;
  }
  return (
    <div>
      <TopNavBar />
      {/* <p>Owner id: {item.owner.id}</p>
      <p>User id: {currentUser?.id || ''}</p>
      <p>Role: {currentUser?.role}</p> */}
      <Card id="item-page">
        {/* <h1>ID: {id}</h1> */}
        <Card className="flex-row">
          <Card.Img id="item-img" src={`${fileUrl}${item.filename}`} />
          <Card.Body>
            <h2>{item.item_name}</h2>
            <p>{item.description}</p>
            <div>
              owner:{' '}
              <Link to={`/profile/${item.owner.user_name}`}>
                {item.owner.user_name}
              </Link>
            </div>
            <button onClick={() => setShowLocation(true)}>Show location</button>
            {showLocation && (
              <ShowLocation
                setIsMapOpen={setShowLocation}
                coordinates={item.location.coordinates}
              />
            )}
            <p>category: {item.category.category_name}</p>
            <div>Role {currentUser?.role}</div>
            {id !== undefined &&
              (currentUser?.role === 'admin' ||
                item.owner.id === currentUser?.id) && (
                <>
                  <DeleteButton itemId={id} />
                  <button onClick={() => navigate(`/item/modify/${id}`)}>
                    Modify
                  </button>
                </>
              )}

            <button onClick={() => navigate(`/item/rent/${id}`)}>
              Ask for rent
            </button>
          </Card.Body>
          {/* <ShowReviews itemId={id} /> */}
          <ShowAvgReview itemId={id} />
          {/* <AddReview itemId={id} /> */}
        </Card>
        <ItemReviews itemId={id} />
      </Card>
    </div>
  );
}

// const ShowReviews = ({ itemId }: { itemId: string }) => {
//   const [review, setReview] = useState<number>();
//   const [count, setCount] = useState<number>(0);
//   const { getReviewsByItem } = useReviews();
//   const getReview = async () => {
//     const res = await getReviewsByItem(itemId);
//     if (!res || res.length === 0) {
//       setReview(0);
//       return;
//     }
//     const sum = res.reduce((a, b) => a + b.value, 0);
//     setReview(sum / res.length);
//     setCount(res.length);
//   };
//   useEffect(() => {
//     getReview();
//   }, []);
//   return (
//     <Card.Footer>
//       Review: {review}
//       {review !== undefined && (
//         <div className="flex-row">
//           <StarRating edit={false} value={review} />
//           {/* Review: {review} */}
//         </div>
//         // <ReactStars isHalf={true} edit={false} value={review} size={24} />
//       )}
//       {count} Reviews
//     </Card.Footer>
//   );
// };

// const AddReview = ({ itemId }: { itemId: string }) => {
//   const [review, setReview] = useState<number>();
//   const [newReview, setNewReview] = useState<number>();
//   const { getReviewByUser, addReview } = useReviews();
//   const getReview = async () => {
//     const res = await getReviewByUser(itemId);
//     console.log('getReview', res);
//     if (!res) return;
//     setReview(res.value);
//   };
//   const handleReview = async () => {
//     if (newReview === undefined) return alert('Please rate first');
//     const reviewInput: ReviewInput = {
//       item: itemId,
//       value: newReview,
//     };
//     const res = await addReview(reviewInput);
//     if (!res) return;
//     alert('Review added');
//     getReview();
//   };
//   const reviewChanged = (newReview: number) => {
//     setReview(newReview);
//   };
//   useEffect(() => {
//     getReview();
//   }, []);
//   return (
//     <Card>
//       {review !== undefined && (
//         <div>
//           Your: {review}
//           <ReactStars isHalf={true} edit={false} value={review} size={24} />
//         </div>
//       )}
//       <div>
//         New review: {review}
//         <ReactStars onChange={reviewChanged} />
//         <button onClick={handleReview}>Rate</button>
//       </div>
//     </Card>
//   );
// };

const DeleteButton = ({ itemId }: { itemId: string }) => {
  const navigate = useNavigate();
  const handleClick = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token === null) {
        alert('Please login first');
        return;
      }
      const res = await doGraphQLFetch(
        graphqlUrl,
        deleteItemQuery,
        {
          id: itemId,
        },
        token
      );
      if (res.deleteItem) {
        alert('Item deleted');
        navigate('/');
        return;
      }
      alert('Failed to delete item');
    } catch (error) {
      console.error('deleteItem', error);
    }
  };
  return <button onClick={handleClick}>Delete</button>;
};

export default ItemPage;
