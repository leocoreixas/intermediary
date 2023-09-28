import './ListOffers.css';
import Footer from '../../components/Footer/Footer';
import SideBar from '../../components/SideBar/SideBar';
import NavBarInfo from '../../components/NavBarInfo/NavBarInfo';
import ListAllInspectOffers from '../../components/Cartesi/ListAllInspectOffers/ListAllInspectOffers';
function ListOffers() {
    return (
        <>
            <div className='container-list-page'>
                < NavBarInfo />
                <SideBar />
                <div className='container-list'>
                    <ListAllInspectOffers />
                </div>
            </div>
            <Footer />
        </>
    );
}

export default ListOffers;