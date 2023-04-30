const createRentDealQuery = `
mutation CreateRentDeal($item: ID!, $startDate: DateTime!, $endDate: DateTime!) {
    createRentDeal(item: $item, start_date: $startDate, end_date: $endDate) {
      id
      start_date
      end_date
      created_date                    
    }
  }
`;

export { createRentDealQuery };
