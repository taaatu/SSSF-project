const createRentDealQuery = `
mutation CreateRentDeal($item: ID!, $startDate: DateTime!, $endDate: DateTime!, $itemOwner: ID!) {
    createRentDeal(item: $item, start_date: $startDate, end_date: $endDate, item_owner: $itemOwner) {
      id
      start_date
      end_date
      created_date                    
    }
  }
`;

const rentDealsSentQuery = `
query {
  rentDealsSent {
    id
    item {
      item_name
    }
    start_date
    end_date
    status
    item_owner {
      user_name
    }
  }
}
`;

const rentDealsReceivedQuery = `
query {
  rentDealsReceived {
    id
    item {
      item_name
    }
    item_user {
      user_name
    }
    status
    start_date
    end_date
  }
}
`;

const respondRentDealQuery = `
mutation RespondRentDeal($id: ID!, $accept: Boolean!) {
  respondRentDeal(id: $id, accept: $accept) {
    id
    item {
      item_name
    }
    status
  }
}`;

const deleteRentDealQuery = `
mutation DeleteRentDeal($id: ID!) {
  deleteRentDeal(id: $id) {
    id
  }
}
`;

export {
  createRentDealQuery,
  rentDealsSentQuery,
  rentDealsReceivedQuery,
  respondRentDealQuery,
  deleteRentDealQuery,
};
