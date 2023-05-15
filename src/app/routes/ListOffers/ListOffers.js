import './ListOffers.css';
import Footer from '../../components/Footer/Footer';
import SideBar from '@/app/components/SideBar/SideBar';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
function ListOffers() {
    return (
        <>
            <div className='container-list-page'>
                <SideBar />
                <div className='container-list'>
                    <h1>List of Offers:</h1>
                    <ul className="offer-list">
                        <li className="offer-item">
                            <h3 className="offer-title">Offer 1</h3>
                            <p className="offer-description">This is the description for Offer 1.</p>
                        </li>
                        <li className="offer-item">
                            <h3 className="offer-title">Offer 2</h3>
                            <p className="offer-description">This is the description for Offer 2.</p>
                        </li>                
                    </ul>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default ListOffers;