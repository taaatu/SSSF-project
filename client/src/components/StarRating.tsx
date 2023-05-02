import { Dispatch, SetStateAction, useState } from 'react';

// https://dev.to/michaelburrows/create-a-custom-react-star-rating-component-5o6

function StarRating({
  value = 0,
  edit = true,
  size = 25,
  setRating,
}: {
  value?: number;
  edit?: boolean;
  size?: number;
  setRating?: Dispatch<SetStateAction<number | undefined>>;
}) {
  //   const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(value);
  const [selected, setSelected] = useState(0);
  return (
    <div className="star-rating">
      {[...Array(5)].map((_star, index) => {
        index += 1;
        return (
          <button
            type="button"
            style={{ fontSize: size }}
            key={index}
            className={`${index <= (hover || selected) ? 'on' : 'off'} ${
              edit ? 'edit' : 'no-edit'
            }`}
            onClick={
              setRating
                ? () => {
                    setRating(index);
                    setSelected(index);
                  }
                : undefined
            }
            onMouseEnter={edit ? () => setHover(index) : undefined}
            onMouseLeave={edit ? () => setHover(selected) : undefined}
          >
            <span className="star">&#9733;</span>
          </button>
        );
      })}
    </div>
  );
}

export default StarRating;
