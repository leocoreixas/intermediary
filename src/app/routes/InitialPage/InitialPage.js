import './InitialPage.css';
import Footer from '@/app/components/Footer/Footer';
import SideBar from '@/app/components/SideBar/SideBar';
import NavBarInfo from '@/app/components/NavBarInfo/NavBarInfo';
import ListInitialPage from '@/app/components/Cartesi/ListHome/ListHome';
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