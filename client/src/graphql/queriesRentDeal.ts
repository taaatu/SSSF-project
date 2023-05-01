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
      created_date
    } 
  }
`;

export { createRentDealQuery, rentDealsSentQuery };
