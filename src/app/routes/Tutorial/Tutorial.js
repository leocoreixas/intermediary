import './Tutorial.css';
import Footer from '../../components/Footer/Footer';
import SideBar from '@/app/components/SideBar/SideBar';
import NavBarInfo from '@/app/components/NavBarInfo/NavBarInfo';
import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';

function ScrollTutorial() {
    const [images, setImages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        // Simulated image URLs
        const newImages = Array.from({ length: 10 }, (_, index) => `https://via.placeholder.com/150x150?text=Image${index + 1}`);
        setImages((prevImages) => [...prevImages, ...newImages]);
    }, []);

    const handleScroll = () => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 && !isLoading) {
            setIsLoading(true);

            // Simulate loading new images
            setTimeout(() => {
                const newImages = Array.from({ length: 5 }, (_, index) => `https://via.placeholder.com/150x150?text=NewImage${index + 1}`);
                setImages((prevImages) => [...prevImages, ...newImages]);
                setIsLoading(false);
            }, 1000);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    return (
        <>
            <div className='container-list-page'>
                < NavBarInfo />
                <SideBar />
                <div className="tutorial-page">
                <h1 className='tutorial-title'>Tutorial</h1>
                    <Box
                        sx={{
                            height: '750px', // Set the initial height of the container
                            overflowY: 'scroll', // Enable vertical scrolling
                            border: '1px solid #ccc',
                            padding: '10px',
                        }}
                    >
                        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                            {images.map((imageUrl, index) => (
                                <img
                                    key={index}
                                    src={imageUrl}
                                    alt={`Image ${index + 1}`}
                                    style={{ width: '150px', height: '150px', margin: '10px' }}
                                />
                            ))}
                        </div>
                        {isLoading && <p>Loading more images...</p>}
                    </Box>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default ScrollTutorial;
