import FilterBar from '../components/FilterBar';
import OffersList from '../components/OffersList';
import classes from './HomePage.module.css'

const HomePage = () => {
    return (
    <div className={classes.container}>
        <FilterBar/>
        <OffersList/>
    </div>
    );
};

export default HomePage;