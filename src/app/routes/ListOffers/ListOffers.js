import './ListOffers.css';
import Footer from '../../components/Footer/Footer';
import SideBar from '@/app/components/SideBar/SideBar';
import NavBarInfo from '@/app/components/NavBarInfo/NavBarInfo';
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