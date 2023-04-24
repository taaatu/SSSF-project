interface Category extends Document {
  category_name: string;
}

interface CategoryTest {
  id?: string;
  category_name?: string;
}

export { Category, CategoryTest };
