import Navbar from "../../components/Navbar/Navbar";
import './Contact.css'
import homeImg from '../../assets/contact-us-banner.png'
import Hero from '../../components/Hero/Hero';
import ContactUs from "../../components/ContactUs/ContactUs";
import Footer from '../../components/Footer/Footer';

function Contact() {
    return (
        <>
            <Navbar />
            <Hero
                cName='contact'
                title='Contact Us'
                subtitle='Feel free to reach out to us with any questions or concerns'
                button='Contact Us'
                heroImg={homeImg}
                buttonText='Contact Us'
                url='/'
                btnClass='contact-button'
            />
            <ContactUs />
            <Footer />
        </>
    )
}

export default Contact;