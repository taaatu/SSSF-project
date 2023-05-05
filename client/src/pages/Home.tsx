import ItemList from '../components/ItemList';
import '../styles.css';

// App's home page which displays all the items

function Home() {
  return (
    <div id="home-page">
      <h1>Home</h1>
      <ItemList />
    </div>
  );
}

export default Home;
