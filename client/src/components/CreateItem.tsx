import { useEffect, useState } from 'react';
import { doGraphQLFetch } from '../graphql/fetch';
import { createItem } from '../graphql/queriesItem';
import { Point } from 'geojson';
import { ItemInput } from '../interfaces/Item';
import { getAllCategoriesQuery } from '../graphql/queriesCategory';
import { Category } from '../interfaces/Category';
import UploadMessageResponse from '../interfaces/UploadMessageResponse';

function CreateItem() {
  const [itemName, setItemName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [categories, setCategories] = useState<Category[]>([]);
  const [category, setCategory] = useState<string>('');
  const [imageFile, setImageFile] = useState<File | null>(null);

  const getCategories = async () => {
    const res = await doGraphQLFetch(
      'http://localhost:3000/graphql',
      getAllCategoriesQuery,
      {}
    );
    console.log('categories', res.categories);
    setCategories(res.categories);
  };

  useEffect(() => {
    getCategories();
  }, []);

  const uploadFile = async (file: File): Promise<UploadMessageResponse> => {
    const formData = new FormData();
    formData.append('item', file);
    const res = await fetch('http://localhost:3002/api/v1/upload', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: formData,
    });
    const json = (await res.json()) as UploadMessageResponse;
    return json;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const url = 'http://localhost:3000/graphql';
      const testLocation = {
        type: 'Point',
        coordinates: [24.9384, 60.1699],
      } as Point;
      if (imageFile === null) {
        alert('no image');
        return;
      }
      const fileName = (await uploadFile(imageFile as File)).data.filename;
      console.log('filename', fileName);
      const itemData: ItemInput = {
        itemName: itemName,
        description: description,
        category: category,
        filename: fileName,
        location: testLocation,
      };
      const res = await doGraphQLFetch(
        url,
        createItem,
        itemData,
        localStorage.getItem('token') || undefined
      );
      console.log('submit item', res);
    } catch (error) {
      console.error('item submit', error);
    }
  };
  return (
    <div>
      <h1>Create an item</h1>
      <form className="column" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Item name"
          onChange={(e) => setItemName(e.target.value)}
        />
        <textarea
          placeholder="Description"
          onChange={(e) => setDescription(e.target.value)}
        />
        <label>
          Choose a category:
          <select name="category" onChange={(e) => setCategory(e.target.value)}>
            {categories.map((category) => (
              <option value={category.id}>{category.category_name}</option>
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
        <input type="submit" value="Create" />
      </form>
    </div>
  );
}

export default CreateItem;
