import './InitialPage.css';
import Footer from '../../components/Footer/Footer';
import SideBar from '../../components/SideBar/SideBar';
import NavBarInfo from '../../components/NavBarInfo/NavBarInfo';
import ListInitialPage from '../../components/Cartesi/ListHome/ListHome';
function InitialPage() {
    return (
        <>
            <div className='container-list-page'>
                < NavBarInfo />
                <SideBar />
                <div className='container-list'>
                    < ListInitialPage />
                </div>
            </div>
            <Footer />
        </>
    );
}

export default InitialPage;