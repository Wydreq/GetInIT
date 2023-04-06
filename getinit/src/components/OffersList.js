import OfferBar from './OfferBar'
import classes from './OffersList.module.css'

const DUMMY_OFFERS = [
    {
        id: 'o1',
        offerName: 'Junior C# Developer',
        city: 'Kielce'
    },
    {
        id: 'o2',
        offerName: 'Junior C# Developer',
        city: 'Kielce'
    },
    {
        id: 'o3',
        offerName: 'Junior C# Developer',
        city: 'Kielce'
    },
    {
        id: 'o4',
        offerName: 'Junior C# Developer',
        city: 'Kielce'
    },
    {
        id: 'o5',
        offerName: 'Junior C# Developer',
        city: 'Kielce'
    },
    {
        id: 'o6',
        offerName: 'Junior C# Developer',
        city: 'Kielce'
    },
]

const OffersList = () => {
    return (
        <div className={classes.offersContainer}>
            {DUMMY_OFFERS.map((offer)=>{
                return (
                    <OfferBar/>
                )
            })}
        </div>
    )
}

export default OffersList;