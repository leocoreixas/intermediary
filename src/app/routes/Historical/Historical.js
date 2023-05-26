import './Historical.css';
import Footer from '../../components/Footer/Footer';
import SideBar from '@/app/components/SideBar/SideBar';
import NavBarInfo from '@/app/components/NavBarInfo/NavBarInfo';
import ListNotice from '../../components/Cartesi/ListNoticeOffers/ListNoticeOffers';
function Historical() {
    return (
        <>
            <div className='container-list-page'>
                < NavBarInfo />
                <SideBar />
                <div className='container-list'>
                    <h1>History:</h1>
                    < ListNotice />
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Historical;