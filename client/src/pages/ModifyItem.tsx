import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { Item, ModifyItemInput } from '../interfaces/Item';
import { useContext, useEffect, useState } from 'react';
import { Category } from '../interfaces/Category';
import { uploadFile } from '../utils/file';
import { Button, Form } from 'react-bootstrap';
import { descriptionMaxLength, titleMaxLength } from '../utils/validation';
import { Point } from 'geojson';
import AddLocationMap from '../components/map/AddLocationMap';
import { useItem } from '../hooks/ItemHooks';
import { useCategory } from '../hooks/CategoryHooks';
import { MainContext } from '../context/MainContext';

// Page for modifying an item

function ModifyItem() {
  const { id } = useParams();
  const { modifyItem, getItemById } = useItem();
  const { categories } = useCategory();
  const navigate = useNavigate();

  const [item, setItem] = useState<Item>();
  const [itemName, setItemName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [category, setCategory] = useState<Category>();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [mapIsOpen, setMapIsOpen] = useState<boolean>(false);
  const [coordinates, setCoordinates] = useState<number[]>();
  const { isLoggedIn } = useContext(MainContext);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (id === undefined) return;
    const itemData: ModifyItemInput = {
      id: id,
      itemName: itemName,
      description: description,
      category: category?.id,
    };
    if (imageFile !== null) {
      const fileName = (await uploadFile(imageFile as File)).data.filename;
      itemData.filename = fileName;
    }
    if (coordinates !== undefined) {
      const testLocation = {
        type: 'Point',
        coordinates: coordinates,
      } as Point;
      itemData.location = testLocation;
    }
    const res = await modifyItem(itemData);

    if (res) {
      alert('Item modified');
      navigate('/');
      return;
    }
    alert('Failed to modify item');
  };

  const getItem = async () => {
    if (id === undefined) return;
    const res = await getItemById(id);
    if (!res) return;
    setItem(res);
    setItemName(res.item_name);
    setDescription(res.description);
    setCategory(res.category);
  };

  const openMap = (event: any) => {
    event.preventDefault();
    setMapIsOpen(true);
  };

  useEffect(() => {
    getItem();
  }, []);

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <div style={{ padding: '2em' }}>
        <h1>Modify item</h1>
        <Form className="item-form" onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Item name</Form.Label>
            <Form.Control
              type="text"
              maxLength={titleMaxLength}
              placeholder="Item name"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              maxLength={descriptionMaxLength}
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Category</Form.Label>
            <Form.Select
              name="category"
              className="fit-content"
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
            </Form.Select>
          </Form.Group>

          <Form.Group>
            <Form.Label>Choose an image:</Form.Label>
            <Form.Control
              type="file"
              id="image"
              name="image"
              accept="image/png, image/jpeg"
              onChange={(e) => {
                const file = (e.target as HTMLInputElement).files?.item(0);
                setImageFile(file || null);
              }}
            ></Form.Control>
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

          <Button type="submit">Submit</Button>
        </Form>
      </div>
    </div>
  );
}

export default ModifyItem;
