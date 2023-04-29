import { useParams } from 'react-router-dom';
import TopNavBar from '../components/TopNavBar';
import { doGraphQLFetch } from '../graphql/fetch';
import { itemByIdQuery, modifyItemQuery } from '../graphql/queriesItem';
import { graphqlUrl } from '../utils/url';
import { Item, ItemInput } from '../interfaces/Item';
import { useEffect, useState } from 'react';
import { getAllCategoriesQuery } from '../graphql/queriesCategory';
import { Category } from '../interfaces/Category';
import { uploadFile } from '../utils/uploadFile';

function ModifyItem() {
  const { id } = useParams();
  const [item, setItem] = useState<Item>();

  const [itemName, setItemName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [category, setCategory] = useState<Category>();
  const [categories, setCategories] = useState<Category[]>([]);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const itemData: Partial<ItemInput> & { id: string | undefined } = {
        id: id,
        itemName: itemName,
        description: description,
        category: category?.id,
      };
      if (imageFile !== null) {
        const fileName = (await uploadFile(imageFile as File)).data.filename;
        itemData.filename = fileName;
      }
      const res = await doGraphQLFetch(
        graphqlUrl,
        modifyItemQuery,
        itemData,
        localStorage.getItem('token') || undefined
      );
      console.log('res', res);
      if (res.modifyItem) {
        alert('Item modified');
        return;
      }
      alert('Failed to modify item');
    } catch (error) {
      console.error('modify item', error);
    }
  };
  const getItem = async () => {
    try {
      const res = await doGraphQLFetch(graphqlUrl, itemByIdQuery, { id });
      setItem(res.itemById as Item);
      setItemName(res.itemById.item_name);
      setDescription(res.itemById.description);
      setCategory(res.itemById.category);
    } catch (error) {
      console.error('getItem', error);
    }
  };
  const getCategories = async () => {
    const res = await doGraphQLFetch(graphqlUrl, getAllCategoriesQuery, {});
    setCategories(res.categories);
  };
  useEffect(() => {
    getItem();
    getCategories();
  }, []);
  return (
    <div>
      <TopNavBar />
      <form className="column" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Item name"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <label>
          Choose a category:
          <select
            name="category"
            onChange={(e) =>
              setCategory(categories.find(({ id }) => id === e.target.value))
            }
          >
            {categories.map((category) => (
              <option
                selected={
                  category.category_name === item?.category.category_name
                }
                value={category.id}
              >
                {category.category_name}
              </option>
            ))}
          </select>
        </label>

        <label>
          Choose an image:
          <input
            type="file"
            id="image"
            name="image"
            accept="image/png, image/jpeg"
            onChange={(e) => setImageFile(e.target.files?.item(0) || null)}
          ></input>
        </label>

        {/* <button>Choose location</button> */}
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default ModifyItem;
