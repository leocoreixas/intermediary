import Hero from '../../components/Hero/Hero';
import './Home.css';
import Navbar from '../../components/Navbar/Navbar';
import homeImg from '../../assets/home-page-banner.png'
import GetStarted from '../../components/GetStarted/GetStarted';
import Footer from '../../components/Footer/Footer';
function Home() {
  return (
    <>
      <Navbar />
      <Hero
        cName='home'
        title='Welcome to Intermediary'
        subtitle='Connecting you to the services you need, with security and efficiency.'
        button='First steps with Intermediary'
        heroImg={homeImg}
        buttonText='Get Started'
        url='/'
        btnClass='home-button'
      />
      <GetStarted />
      <Footer />
    </>
  );
}

export default Home;