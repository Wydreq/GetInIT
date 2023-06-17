import OfferBar from './OfferBar'
import classes from './OffersList.module.css'
import React, {useCallback, useEffect, useState} from "react";
import {TailSpin} from "react-loader-spinner";

const OffersList = (props) => {

    const [offersList, setOffersList] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchAllOffers = useCallback(async () => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:5099/api/offer/SearchOffer', {
                method: 'POST',
                    headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(props.filterSettings),
            });
            if (!response.ok) {
                setLoading(false);
                setOffersList([]);
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
            setLoading(false);
        } catch(error) {}
    },[props.filterSettings])

    useEffect(()=> {
        fetchAllOffers();
    },[fetchAllOffers, props.filterSettings])


    return (
        <div className={loading || offersList.length === 0 ? classes.offersContainerLoading : classes.offersContainer}>
            {offersList.length === 0 && <p className={classes.notFound}>Offers not found!</p>}
            {loading &&
                <TailSpin
                    height="200"
                    width="200"
                    color="#1976d2"
                    ariaLabel="tail-spin-loading"
                    radius="2"
                    visible={true}
                />}
            {!loading && offersList.map((offer)=>{
                return (
                    <OfferBar key={offer.id} offer={offer} onModalOpen={props.onModalOpen}/>
                )
            })}
        </div>
    )
}

export default OffersList;