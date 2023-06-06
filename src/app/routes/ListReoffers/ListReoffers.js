import './ListOffers.css';
import Footer from '../../components/Footer/Footer';
import SideBar from '@/app/components/SideBar/SideBar';
import NavBarInfo from '@/app/components/NavBarInfo/NavBarInfo';
import ListInspectReOffers from '@/app/components/Cartesi/ListInspectReoffers/ListInspectReoffers';

function ListOffers() {
    return (
        <>
            <div className='container-list-page'>
                < NavBarInfo />
                <SideBar />
                <div className='container-list'>
                    <h1>Offers listed:</h1>
                    <ListInspectReOffers />
                </div>
            </div>
            <Footer />
        </>
    );
}

export default ListOffers;