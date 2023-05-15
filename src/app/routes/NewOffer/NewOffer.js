import './NewOffer.css';
import Footer from '../../components/Footer/Footer';
import SideBar from '@/app/components/SideBar/SideBar';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useState } from 'react';

function NewOffer() {
    return (
        <>
            <div className='container-new-offer-page'>
                <SideBar />
                <div className='container-new-offer'>
                    <h1>Create a new offer:</h1>
                    <p>Fill out the form below to create a new offer</p>
                    <div className="card">
                        <div className="card-content">
                            <h2>NEW OFFER</h2>
                            <button className="add-offer-button"><FontAwesomeIcon icon={faPlus} /></button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default NewOffer;