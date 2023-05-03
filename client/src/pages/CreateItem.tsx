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
import Form from 'react-bootstrap/Form';
import { Button, Card, Col, Row } from 'react-bootstrap';
import Stack from 'react-bootstrap/Stack';
import { descriptionMaxLength, titleMaxLength } from '../utils/validation';

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
      <div style={{ padding: '2em' }}>
        <h1>Create an item</h1>
        <Form className="item-form" onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Item name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Item name"
              onChange={(e) => setItemName(e.target.value)}
              maxLength={titleMaxLength}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              maxLength={descriptionMaxLength}
              placeholder="Description"
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Category</Form.Label>
            <Form.Select
              name="category"
              className="fit-content"
              onChange={(e) => setCategory(e.target.value)}
            >
              <option>Select a category</option>
              {categories.map((category) => (
                <option value={category.id}>{category.category_name}</option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group>
            <Form.Label>Choose an image:</Form.Label>
            <Form.Control
              as={'input'}
              type="file"
              id="image"
              className="fit-content"
              name="image"
              accept="image/png, image/jpeg"
              onChange={(e) => {
                const file = (e.target as HTMLInputElement).files?.item(0);
                setImageFile(file || null);
              }}
              // onChange={(e) => setImageFile(e.target.files?.item(0) || null)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>
              Location: {coordinates ? 'selected' : 'not selected'}
            </Form.Label>
            <div>
              <Button variant="secondary" onClick={openMap}>
                Choose location
              </Button>
            </div>
            {coordinates && <div>Selected</div>}

            {mapIsOpen && (
              <AddLocationMap
                setCoordinates={setCoordinates}
                setIsMapOpen={setMapIsOpen}
                coordinates={coordinates}
              />
            )}
          </Form.Group>

          <Button type="submit">Create</Button>
        </Form>
      </div>
    </div>
  );
}

export default CreateItem;
