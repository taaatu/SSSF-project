import { useEffect, useState } from 'react';
import { doGraphQLFetch } from '../graphql/fetch';
import { createItem } from '../graphql/queriesItem';
import { Point } from 'geojson';
import { ItemInput } from '../interfaces/Item';
import { getAllCategoriesQuery } from '../graphql/queriesCategory';
import { Category } from '../interfaces/Category';
import TopNavBar from '../components/TopNavBar';
import { uploadFile } from '../utils/uploadFile';
import AddLocationMap from '../components/AddLocationMap';

function CreateItem() {
  const [itemName, setItemName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [categories, setCategories] = useState<Category[]>([]);
  const [category, setCategory] = useState<string>('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [mapIsOpen, setMapIsOpen] = useState<boolean>(false);
  const [coordinates, setCoordinates] = useState<number[]>();

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

  const openMap = (event: any) => {
    event.preventDefault();
    setMapIsOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const url = 'http://localhost:3000/graphql';
      if (coordinates === undefined) {
        alert('Location has not been set');
        return;
      }
      const testLocation = {
        type: 'Point',
        coordinates: coordinates,
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
      <TopNavBar />
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

        <button onClick={openMap}>Choose location</button>
        {mapIsOpen && (
          <AddLocationMap
            setCoordinates={setCoordinates}
            setIsMapOpen={setMapIsOpen}
            coordinates={coordinates}
          />
        )}
        <input type="submit" value="Create" />
      </form>
    </div>
  );
}

export default CreateItem;
