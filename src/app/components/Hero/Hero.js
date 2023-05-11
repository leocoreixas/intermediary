import './Hero.css';
import Image from 'next/image';

function Hero(props) {
    return (
        <>
            <div className={props.cName}>
                <Image
                    className='hero-banner'
                    src={props.heroImg}
                    alt="home page"
                />
                <div className="hero-container">
                    <h1 className='hero-title'>{props.title}</h1>
                    <p className='hero-subtitle'>{props.subtitle}</p>
                    <a href={props.url} className={props.btnClass}>{props.buttonText}</a>
                </div>
            </div>
        </>
    );
}

export default Hero;