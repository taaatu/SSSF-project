const createItem = `
mutation CreateItem($itemName: String!, $description: String!, $category: ID!, $filename: String!, $location: LocationInput!) {
    createItem(item_name: $itemName, description: $description, category: $category, filename: $filename, location: $location) {
      id
      item_name
      created_date
      description
      owner {
        user_name
      }
      category {
        category_name
      }
      filename
    }
}
`;

export { createItem };
