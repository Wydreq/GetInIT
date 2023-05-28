import OfferBar from './OfferBar'
import classes from './OffersList.module.css'
import img from '../assets/infover.jpg'

const DUMMY_OFFERS = [
    {
        id: 'o1',
        offerName: 'Junior C# Developer',
        city: 'Kielce',
        company: 'Infover',
        image: img,
        salary: '10 000 - 15000',
        description: 'Maecenas porta, tellus vel vulputate mollis, lacus dui commodo est, ac tristique libero sapien faucibus felis. Integer vel neque lorem. Cras non diam tempor, bibendum sapien vitae, cursus erat. Integer sodales, justo sit amet aliquet varius, orci est maximus risus, ut consequat ex tortor ultricies ipsum. Aenean accumsan laoreet lorem, ac porttitor leo feugiat in. Proin elementum odio quis justo fermentum, non ultrices velit rhoncus. Mauris mollis posuere egestas. Sed volutpat, est accumsan ornare ornare, dui elit sodales arcu, eget pulvinar risus sapien quis ante. Etiam vestibulum porttitor nulla vitae condimentum. In venenatis enim sit amet felis dictum, vitae porttitor turpis tempus. In a eros ut quam auctor tempus. In fermentum purus mollis, vehicula lectus eu, tempor nibh. Class aptent taciti sociosqu ad litora torquent per conubia nostra.'
    },
    {
        id: 'o2',
        offerName: 'Senior C# Developer',
        city: 'Kielce',
        company: 'Infover',
        image: img,
        salary: '10 000 - 15000',
        description: 'Maecenas porta, tellus vel vulputate mollis, lacus dui commodo est, ac tristique libero sapien faucibus felis. Integer vel neque lorem. Cras non diam tempor, bibendum sapien vitae, cursus erat. Integer sodales, justo sit amet aliquet varius, orci est maximus risus, ut consequat ex tortor ultricies ipsum. Aenean accumsan laoreet lorem, ac porttitor leo feugiat in. Proin elementum odio quis justo fermentum, non ultrices velit rhoncus. Mauris mollis posuere egestas. Sed volutpat, est accumsan ornare ornare, dui elit sodales arcu, eget pulvinar risus sapien quis ante. Etiam vestibulum porttitor nulla vitae condimentum. In venenatis enim sit amet felis dictum, vitae porttitor turpis tempus. In a eros ut quam auctor tempus. In fermentum purus mollis, vehicula lectus eu, tempor nibh. Class aptent taciti sociosqu ad litora torquent per conubia nostra.'
    },
    {
        id: 'o3',
        offerName: 'Junior C# Developer',
        city: 'Kielce',
        company: 'Infover',
        image: img,
        salary: '10 000 - 15000',
        description: 'Maecenas porta, tellus vel vulputate mollis, lacus dui commodo est, ac tristique libero sapien faucibus felis. Integer vel neque lorem. Cras non diam tempor, bibendum sapien vitae, cursus erat. Integer sodales, justo sit amet aliquet varius, orci est maximus risus, ut consequat ex tortor ultricies ipsum. Aenean accumsan laoreet lorem, ac porttitor leo feugiat in. Proin elementum odio quis justo fermentum, non ultrices velit rhoncus. Mauris mollis posuere egestas. Sed volutpat, est accumsan ornare ornare, dui elit sodales arcu, eget pulvinar risus sapien quis ante. Etiam vestibulum porttitor nulla vitae condimentum. In venenatis enim sit amet felis dictum, vitae porttitor turpis tempus. In a eros ut quam auctor tempus. In fermentum purus mollis, vehicula lectus eu, tempor nibh. Class aptent taciti sociosqu ad litora torquent per conubia nostra.'
    },
    {
        id: 'o4',
        offerName: 'Junior C# Developer',
        city: 'Kielce',
        company: 'Infover',
        image: img,
        salary: '10 000 - 15000',
        description: 'Maecenas porta, tellus vel vulputate mollis, lacus dui commodo est, ac tristique libero sapien faucibus felis. Integer vel neque lorem. Cras non diam tempor, bibendum sapien vitae, cursus erat. Integer sodales, justo sit amet aliquet varius, orci est maximus risus, ut consequat ex tortor ultricies ipsum. Aenean accumsan laoreet lorem, ac porttitor leo feugiat in. Proin elementum odio quis justo fermentum, non ultrices velit rhoncus. Mauris mollis posuere egestas. Sed volutpat, est accumsan ornare ornare, dui elit sodales arcu, eget pulvinar risus sapien quis ante. Etiam vestibulum porttitor nulla vitae condimentum. In venenatis enim sit amet felis dictum, vitae porttitor turpis tempus. In a eros ut quam auctor tempus. In fermentum purus mollis, vehicula lectus eu, tempor nibh. Class aptent taciti sociosqu ad litora torquent per conubia nostra.'
    },
    {
        id: 'o5',
        offerName: 'Junior C# Developer',
        city: 'Kielce',
        company: 'Infover',
        image: img,
        salary: '10 000 - 15000',
        description: 'Maecenas porta, tellus vel vulputate mollis, lacus dui commodo est, ac tristique libero sapien faucibus felis. Integer vel neque lorem. Cras non diam tempor, bibendum sapien vitae, cursus erat. Integer sodales, justo sit amet aliquet varius, orci est maximus risus, ut consequat ex tortor ultricies ipsum. Aenean accumsan laoreet lorem, ac porttitor leo feugiat in. Proin elementum odio quis justo fermentum, non ultrices velit rhoncus. Mauris mollis posuere egestas. Sed volutpat, est accumsan ornare ornare, dui elit sodales arcu, eget pulvinar risus sapien quis ante. Etiam vestibulum porttitor nulla vitae condimentum. In venenatis enim sit amet felis dictum, vitae porttitor turpis tempus. In a eros ut quam auctor tempus. In fermentum purus mollis, vehicula lectus eu, tempor nibh. Class aptent taciti sociosqu ad litora torquent per conubia nostra.'
    },
    {
        id: 'o6',
        offerName: 'Junior C# Developer',
        city: 'Kielce',
        company: 'Infover',
        image: img,
        salary: '10 000 - 15000',
        description: 'Maecenas porta, tellus vel vulputate mollis, lacus dui commodo est, ac tristique libero sapien faucibus felis. Integer vel neque lorem. Cras non diam tempor, bibendum sapien vitae, cursus erat. Integer sodales, justo sit amet aliquet varius, orci est maximus risus, ut consequat ex tortor ultricies ipsum. Aenean accumsan laoreet lorem, ac porttitor leo feugiat in. Proin elementum odio quis justo fermentum, non ultrices velit rhoncus. Mauris mollis posuere egestas. Sed volutpat, est accumsan ornare ornare, dui elit sodales arcu, eget pulvinar risus sapien quis ante. Etiam vestibulum porttitor nulla vitae condimentum. In venenatis enim sit amet felis dictum, vitae porttitor turpis tempus. In a eros ut quam auctor tempus. In fermentum purus mollis, vehicula lectus eu, tempor nibh. Class aptent taciti sociosqu ad litora torquent per conubia nostra.'
    },
]

const OffersList = (props) => {
    return (
        <div className={classes.offersContainer}>
            {DUMMY_OFFERS.map((offer)=>{
                return (
                    <OfferBar key={offer.id} offer={offer} onModalOpen={props.onModalOpen}/>
                )
            })}
        </div>
    )
}

export default OffersList;