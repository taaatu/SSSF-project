import ItemList from '../components/ItemList';
import TopNavBar from '../components/TopNavBar';
import '../styles.css';

function Home() {
  return (
    <div id="home-page">
      <h1>Home</h1>
      <ItemList />
    </div>
  );
}

export default Home;
