const getAllCategoriesQuery = `
query {
    categories {
      id
      category_name
    }
  }
  `;

export { getAllCategoriesQuery };
