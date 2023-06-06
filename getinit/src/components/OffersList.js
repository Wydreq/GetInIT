import OfferBar from './OfferBar'
import classes from './OffersList.module.css'
import {useCallback, useEffect, useState} from "react";

const OffersList = (props) => {

    const [offersList, setOffersList] = useState([]);

    const fetchAllOffers = useCallback(async () => {
        try {
            const response = await fetch('http://localhost:5099/api/offer/GetEveryExistingOffer');
            if (!response.ok) {
                throw new Error("Something went wrong!");
            }

            const data = await response.json();
            const loadedOffers = [];
            for (const key in data) {
                loadedOffers.push({
                    id: data[key].id,
                    companyName: data[key].companyName,
                    description: data[key].description,
                    name: data[key].name,
                    phoneNumber: data[key].phoneNumber,
                    email: data[key].email,
                    city: data[key].city,
                    level: data[key].level,
                    place: data[key].place,
                    primarySkill: data[key].primarySkill,
                    salaryFrom: data[key].salaryFrom,
                    salaryTo: data[key].salaryTo,
                    technologies: data[key].technologies
                });
            }
            setOffersList(loadedOffers);
        } catch(error) {}
    },[])

    useEffect(()=> {
        fetchAllOffers();
    },[fetchAllOffers])


    return (
        <div className={classes.offersContainer}>
            {offersList.map((offer)=>{
                return (
                    <OfferBar key={offer.id} offer={offer} onModalOpen={props.onModalOpen}/>
                )
            })}
        </div>
    )
}

export default OffersList;