import OfferBar from './OfferBar'
import classes from './OffersList.module.css'
import React, {useCallback, useEffect, useState} from "react";
import {TailSpin} from "react-loader-spinner";
import {useSelector} from "react-redux";

const OffersList = (props) => {

    const [offersList, setOffersList] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchedOfferName = useSelector(state => state.filter.offerName);
    const fetchedPrimarySkill = useSelector(state => state.filter.primarySkill);
    const fetchedLevel = useSelector(state => state.filter.level);
    const fetchedPlace = useSelector(state => state.filter.place);
    const fetchedCompanyName = useSelector(state => state.filter.companyName);
    const fetchedCity = useSelector(state => state.filter.city);

    const fetchAllOffers = useCallback(async () => {
        setLoading(true);
        const preparedForSending = {
            Name: fetchedOfferName,
            PrimarySkill: fetchedPrimarySkill,
            CompanyName: fetchedCompanyName,
            City: fetchedCity,
            Level: fetchedLevel,
            Place: fetchedPlace
        }
        try {
            const response = await fetch('http://localhost:5099/api/offer/SearchOffer', {
                method: 'POST',
                    headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(preparedForSending),
            });
            if (!response.ok) {
                setLoading(false);
                // throw new Error("Something went wrong!");
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
    },[])

    useEffect(()=> {
        fetchAllOffers();
    },[fetchAllOffers, fetchedOfferName, fetchedPlace, fetchedLevel, fetchedCity, fetchedCompanyName, fetchedPrimarySkill])


    return (
        <div className={!loading ? classes.offersContainer : classes.offersContainerLoading}>
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