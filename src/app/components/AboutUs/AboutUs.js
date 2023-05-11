import "./AboutUs.css";

const AboutUs = () => {
  return (
    <div className="about-us">
      <h1>About Us</h1>
      <p>We are a team of passionate developers who have created this platform to provide a safer and easier way for people to make and accept offers. Our goal is to make the process of negotiation more secure and transparent.</p>
      <p>With our platform, you can create and accept offers with confidence, knowing that our system is designed to protect both buyers and sellers.</p>
      <h2 className="meet-the-team">Meet the Team</h2>
      <div className="team-members">
        <div className="team-member">
          <h3>John Doe</h3>
          <p>Lead Developer</p>
        </div>
        <div className="team-member">
          <h3>Jane Doe</h3>
          <p>UI Designer</p>
        </div>
        <div className="team-member">
          <h3>Bob Smith</h3>
          <p>Marketing Manager</p>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;