//lib imports
import { useSelector } from 'react-redux';

//file import
import './App.css';

//reusable components
import Navbar from 'UI/Navbar';
import Pizza from 'Components/Pizza/Pizza';
import styles from 'Components/Pizza/Pizza.module.css';
import Cart from './Components/Cart/Cart';
import otherConstants from 'Constants/OtherConstants';
import ButtonComponent from 'UI/Button';

const App = () =>
{

  const totalCost = useSelector( state => state.cart.orderTotal );

  return (
    <div className="App">
      <Navbar />
      <div className={styles.splitLeft}>
        <h3 className={styles.title}>Best Sellers</h3>
        <hr className={styles.hLine} />
        <Pizza />
      </div>
      <div className={styles.splitRight} >
        <Cart />
        <ButtonComponent
          class={styles.cardPriceButton}>
          {otherConstants.ORDER_TOTAL + totalCost}
        </ButtonComponent>
      </div>

    </div>
  );
}

export default App;
