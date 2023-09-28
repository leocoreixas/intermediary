import './NewOffer.css';
import Footer from '../../components/Footer/Footer';
import SideBar from '../../components/SideBar/SideBar';
import { useState } from 'react';
import CreateForm from '../../components/Cartesi/CreateForm/CreateForm';
import NavBarInfo from '../../components/NavBarInfo/NavBarInfo';

function NewOffer() {
    return (
        <>
            <div className='container-new-offer-page'>
                < NavBarInfo />
                <SideBar />
                <div className='container-new-offer'>
                    <p>Fill out the form below to create a new offer</p>
                    <CreateForm />
                </div>
            </div>
            <Footer />
        </>
    );
}

export default NewOffer;