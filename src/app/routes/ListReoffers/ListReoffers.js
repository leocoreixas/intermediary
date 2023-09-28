import './ListReoffers.css';
import Footer from '../../components/Footer/Footer';
import SideBar from '../../components/SideBar/SideBar';
import NavBarInfo from '../../components/NavBarInfo/NavBarInfo';
import ListInspectReOffers from '../../components/Cartesi/ListInspectReoffers/ListInspectReoffers';

function ListOffers() {
    return (
        <>
            <div className='container-list-page'>
                < NavBarInfo />
                <SideBar />
                <div className='container-list'>
                    <ListInspectReOffers />
                </div>
            </div>
            <Footer />
        </>
    );
}

export default ListOffers;