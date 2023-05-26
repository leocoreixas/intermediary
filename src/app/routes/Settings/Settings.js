import './Settings.css';
import Footer from '../../components/Footer/Footer';
import SideBar from '@/app/components/SideBar/SideBar';
import NavBarInfo from '@/app/components/NavBarInfo/NavBarInfo';

function Settings() {
    const userInfo = {
        name: "John Doe",
        email: "johndoe@example.com",
        username: "johndoe123",
        age: 30,
        address: "123 Main St, City, Country",
    };
    return (
        <>
            <div className='container-list-page'>
                < NavBarInfo />
                <SideBar />
                <div className="settings-page">
                    <h1 className="page-title">Settings</h1>
                    <div className="user-info-container">
                        <h2 className="section-title">User Information</h2>
                        <p><strong>Name:</strong> {userInfo.name}</p>
                        <p><strong>Email:</strong> {userInfo.email}</p>
                        <p><strong>Username:</strong> {userInfo.username}</p>
                        <p><strong>Age:</strong> {userInfo.age}</p>
                        <p><strong>Address:</strong> {userInfo.address}</p>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Settings;