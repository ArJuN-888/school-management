import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

export default function Home() {
    return (
        <Carousel 
            autoPlay
            infiniteLoop
            showStatus={false} // To hide the status bar
        >
            <div>
                <img 
                    src="https://images.pexels.com/photos/1122865/pexels-photo-1122865.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                    alt="slide 1" 
                    style={{ maxHeight: '300px', objectFit: 'contain' }} // Adjust the maximum height as per your requirement
                />
                <p className="legend">Legend 1</p>
            </div>
            <div>
                <img 
                    src="https://images.pexels.com/photos/4144923/pexels-photo-4144923.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                    alt="slide 2" 
                    style={{ maxHeight: '300px', objectFit: 'contain' }} // Adjust the maximum height as per your requirement
                />
                <p className="legend">Legend 2</p>
            </div>
            <div>
                <img 
                    src="https://images.pexels.com/photos/1059382/pexels-photo-1059382.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                    alt="slide 3" 
                    style={{ maxHeight: '300px', objectFit: 'contain' }} // Adjust the maximum height as per your requirement
                />
                <p className="legend">Legend 3</p>
            </div>
            <div>
                <img 
                    src="https://images.pexels.com/photos/256417/pexels-photo-256417.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                    alt="slide 4" 
                    style={{ maxHeight: '300px', objectFit: 'contain' }} // Adjust the maximum height as per your requirement
                />
                <p className="legend">Legend 4</p>
            </div>
            <div>
                <img 
                    src="https://images.pexels.com/photos/2388936/pexels-photo-2388936.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                    alt="slide 5" 
                    style={{ maxHeight: '300px', objectFit: 'contain' }} // Adjust the maximum height as per your requirement
                />
                <p className="legend">Legend 5</p>
            </div>
            <div>
                <img 
                    src="https://images.pexels.com/photos/301926/pexels-photo-301926.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                    alt="slide 6" 
                    style={{ maxHeight: '300px', objectFit: 'contain' }} // Adjust the maximum height as per your requirement
                />
                <p className="legend">Legend 6</p>
            </div>
        </Carousel>
    );
}
