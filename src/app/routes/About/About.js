import Navbar from "@/app/components/Navbar/Navbar";
import './About.css'
import homeImg from '../../assets/about-us-banner.png'
import Hero from '@/app/components/Hero/Hero';
import AboutUs from "@/app/components/AboutUs/AboutUs";
import Footer from '../../components/Footer/Footer';

function About() {
    return (
        <>
            <Navbar />
            <Hero
                cName='about'
                title='About Us'
                subtitle='Understanding the idea behind Intermediary.'
                button='Contact Us'
                heroImg={homeImg}
                buttonText='About Us'
                url='/'
                btnClass='about-button'
            />
            <AboutUs />
            <Footer />
        </>
    )
}

export default About;