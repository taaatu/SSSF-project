const reviewsByItemQuery = `
query ReviewsByItem($id: ID!) {
    reviewsByItem(id: $id) {
        id
        value
        text
        user {
            user_name
            id
        }
    }
}
`;

const reviewByUserQuery = `
query ReviewByUser($itemid: ID!) {
    reviewByUser(id: $itemid) {
      id
        value
        text
        user {
            user_name
        }
    }
  }
`;

const addReviewQuery = `
mutation AddReview($item: ID!, $text: String!, $value: Int!) {
    addReview(item: $item, text: $text, value: $value) {
      id
    }
  }
`;

export { reviewsByItemQuery, reviewByUserQuery, addReviewQuery };
