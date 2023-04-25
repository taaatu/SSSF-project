import { useState } from 'react';
import { doGraphQLFetch } from '../graphql/fetch';
import { createItem } from '../graphql/queriesItem';
import { Point } from 'geojson';
import { ItemInput } from '../interfaces/Item';

function CreateItem() {
  const [itemName, setItemName] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const url = 'http://localhost:3000/graphql';
      const testLocation = {
        type: 'Point',
        coordinates: [24.9384, 60.1699],
      } as Point;
      const itemData: ItemInput = {
        itemName: itemName,
        createdDate: new Date(),
        description: description,
        category: '6446a92d5f7d0d6eb23b3153',
        filename: 'testfile.jpg',
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
          <select name="category"></select>
        </label>

        <button>Select an image</button>
        <button>Choose location</button>
        <input type="submit" value="Create" />
      </form>
    </div>
  );
}

export default CreateItem;
