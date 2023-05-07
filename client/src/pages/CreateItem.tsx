import { useState } from 'react';
import { Point } from 'geojson';
import { ItemInput } from '../interfaces/Item';
import { uploadFile } from '../utils/file';
import AddLocationMap from '../components/map/AddLocationMap';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { descriptionMaxLength, titleMaxLength } from '../utils/validation';
import { useItem } from '../hooks/ItemHooks';
import { useNavigate } from 'react-router-dom';
import { useCategory } from '../hooks/CategoryHooks';

// Page for creating a new item

function CreateItem() {
  const [itemName, setItemName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [mapIsOpen, setMapIsOpen] = useState<boolean>(false);
  const [coordinates, setCoordinates] = useState<number[]>();

  const { categories } = useCategory();
  const { createItem } = useItem();
  const navigate = useNavigate();

  const openMap = (event: any) => {
    event.preventDefault();
    setMapIsOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (coordinates === undefined) {
      alert('Location has not been set');
      return;
    }

    const itemLocation = {
      type: 'Point',
      coordinates: coordinates,
    } as Point;

    if (imageFile === null) {
      alert('no image');
      return;
    }

    const fileName = (await uploadFile(imageFile as File)).data.filename;
    const itemData: ItemInput = {
      itemName: itemName,
      description: description,
      category: category,
      filename: fileName,
      location: itemLocation,
    };

    const res = await createItem(itemData);
    if (!res) return alert('Failed to create the item');
    alert('Item created');
    navigate('/');
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
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              maxLength={descriptionMaxLength}
              required
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
              required
              id="image"
              className="fit-content"
              name="image"
              accept="image/png, image/jpeg"
              onChange={(e) => {
                const file = (e.target as HTMLInputElement).files?.item(0);
                setImageFile(file || null);
              }}
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
