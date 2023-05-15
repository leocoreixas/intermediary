import './Settings.css';
import Footer from '../../components/Footer/Footer';
import SideBar from '@/app/components/SideBar/SideBar';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

function Settings() {
    return (
        <>
            <div className='container-settings-page'>
                <SideBar />
                <div className='container-settings'>
                    <h1>Settings</h1>
                    <form>
                        <label htmlFor='name'>Name:</label>
                        <input type='text' id='name' name='name' />

                        <label htmlFor='email'>Email:</label>
                        <input type='email' id='email' name='email' />

                        <label htmlFor='password'>Password:</label>
                        <input type='password' id='password' name='password' />

                        <button type='submit'>Save</button>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Settings;