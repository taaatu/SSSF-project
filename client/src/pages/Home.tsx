import ItemList from '../components/ItemList';
import TopNavBar from '../components/TopNavBar';
import '../styles.css';

function Home() {
  return (
    <div>
      <TopNavBar />
      <h1>Home page</h1>
      <ItemList />
    </div>
  );
}

export default Home;
