import { useEffect, useState } from 'react';
import { Category } from '../interfaces/Category';
import { graphqlUrl } from '../utils/url';
import { doGraphQLFetch } from '../graphql/fetch';
import { getAllCategoriesQuery } from '../graphql/queriesCategory';

const useCategory = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  const getCategories = async () => {
    try {
      const res = await doGraphQLFetch(graphqlUrl, getAllCategoriesQuery, {});
      setCategories(res.categories as Category[]);
    } catch (error) {
      console.error('get categories', error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return { categories };
};

export { useCategory };
