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
                    src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                    alt="slide 1" 
            
                />
                <p className="legend">Education is one thing no one can take away from you</p>
            </div>
            <div>
                <img 
                    src="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                    alt="slide 2" 
            
                />
                <p className="legend">Education is the key that unlocks the golden door to freedom</p>
            </div>
            <div>
                <img 
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                    alt="slide 3" 
            
                />
                <p className="legend">Give a man a fish and you feed him for a day; teach a man to fish and you feed him for a lifetime</p>
            </div>
            <div>
                <img 
                    src="https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                    alt="slide 4" 
            
                />
                <p className="legend">Education’s purpose is to replace an empty mind with an open one</p>
            </div>
            <div>
                <img 
                    src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                    alt="slide 5" 
            
                />
                <p className="legend">Education is what remains after one has forgotten what one has learned in school</p>
            </div>
            <div>
                <img 
                    src="https://burst.shopifycdn.com/photos/person-holds-a-book-over-a-stack-and-turns-the-page.jpg?width=1000&format=pjpg&exif=0&iptc=0" 
                    alt="slide 6" 
            
                />
                <p className="legend">Education is not preparation for life; education is life itself</p>
            </div>
            <div>
                <img 
                    src="https://images.pexels.com/photos/8926542/pexels-photo-8926542.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                    alt="slide 7" 
            
                />
                <p className="legend">The aim of education is the knowledge, not of facts, but of values</p>
            </div>
            <div>
                <img 
                    src="https://images.pexels.com/photos/8926456/pexels-photo-8926456.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                    alt="slide 8" 
            
                />
                <p className="legend">What makes a child gifted and talented may not always be good grades in school, but a different way of looking at the world and learning</p>
            </div>
            <div>
                <img 
                    src="https://images.pexels.com/photos/4778660/pexels-photo-4778660.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                    alt="slide 9" 
            
                />
                <p className="legend">Education is the vaccine of violence</p>
            </div>
            <div>
                <img 
                    src="https://images.pexels.com/photos/159775/library-la-trobe-study-students-159775.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                    alt="slide 10" 
            
                />
                <p className="legend">Learning is not compulsory… Neither is survival</p>
            </div>
            <div>
                <img 
                    src="https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                    alt="slide 11" 
            
                />
                <p className="legend">The purpose of education is to turn mirrors into windows</p>
            </div>
            <div>
                <img 
                    src="https://images.pexels.com/photos/5088022/pexels-photo-5088022.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                    alt="slide 12" 
            
                />
                <p className="legend">Intelligence plus character — that is the goal of true education</p>
            </div>
            <div>
                <img 
                    src="https://images.pexels.com/photos/1438081/pexels-photo-1438081.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                    alt="slide 13" 
            
                />
                <p className="legend">Education is the most powerful weapon which you can use to change the world</p>
            </div>
            <div>
                <img 
                    src="https://images.pexels.com/photos/1370296/pexels-photo-1370296.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                    alt="slide 14" 
            
                />
                <p className="legend">A child without education is like a bird without wings</p>
            </div>
            <div>
                <img 
                    src="https://images.pexels.com/photos/1205651/pexels-photo-1205651.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                    alt="slide 15" 
            
                />
                <p className="legend">The purpose of learning is growth, and our minds, unlike our bodies, can continue growing as we continue to live</p>
            </div>
           
        </Carousel>
    );
}
