import './NewOffer.css';
import Footer from '../../components/Footer/Footer';
import SideBar from '@/app/components/SideBar/SideBar';
import { useState } from 'react';
import CreateForm from '@/app/components/Cartesi/CreateForm/CreateForm';
import NavBarInfo from '@/app/components/NavBarInfo/NavBarInfo';

function NewOffer() {
    return (
        <>
            <div className='container-new-offer-page'>
                < NavBarInfo />
                <SideBar />
                <div className='container-new-offer'>
                    <h1>Create a new offer:</h1>
                    <p>Fill out the form below to create a new offer</p>
                    <CreateForm />
                </div>
            </div>
            <Footer />
        </>
    );
}

export default NewOffer;