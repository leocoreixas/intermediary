import './Historical.css';
import Footer from '../../components/Footer/Footer';
import SideBar from '../../components/SideBar/SideBar';
import NavBarInfo from '../../components/NavBarInfo/NavBarInfo';
import ListNotice from '../../components/Cartesi/ListNoticeOffers/ListNoticeOffers';
function Historical() {
    return (
        <>
            <div className='container-list-page'>
                < NavBarInfo />
                <SideBar />
                <div className='container-list'>
                    < ListNotice />
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Historical;