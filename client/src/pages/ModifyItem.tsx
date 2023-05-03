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
import { Button, Form } from 'react-bootstrap';
import { descriptionMaxLength, titleMaxLength } from '../utils/validation';
import { Point } from 'geojson';
import AddLocationMap from '../components/AddLocationMap';

function ModifyItem() {
  const { id } = useParams();
  const [item, setItem] = useState<Item>();

  const [itemName, setItemName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [category, setCategory] = useState<Category>();
  const [categories, setCategories] = useState<Category[]>([]);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [mapIsOpen, setMapIsOpen] = useState<boolean>(false);
  const [coordinates, setCoordinates] = useState<number[]>();

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
      if (coordinates !== undefined) {
        const testLocation = {
          type: 'Point',
          coordinates: coordinates,
        } as Point;
        itemData.location = testLocation;
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
  const openMap = (event: any) => {
    event.preventDefault();
    setMapIsOpen(true);
  };
  useEffect(() => {
    getItem();
    getCategories();
  }, []);
  return (
    <div>
      <TopNavBar />
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

          {/* <button>Choose location</button> */}
          <Button type="submit">Submit</Button>
        </Form>
      </div>
    </div>
  );
}

export default ModifyItem;
