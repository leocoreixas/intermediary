import "./GetStarted.css";

const GetStarted = () => {
    return (
        <div className="get-started">
            <h1 className="title">Get Started</h1>
            <p className="introduction">
                Welcome to Intermediary, the platform that allows you to make and receive offers in a safe and efficient way.
                With Intermediary, you can create an offer for any type of product and a buyer can accept the offer or make a
                counter-proposal. All offer steps are recorded on the Cartesi blockchain for security and transparency.
            </p>
            <h1 className="get-started-title">How It Works</h1>
            <div className="get-started-steps">
                <div className="get-started-step">
                    <h3 className="get-started-step-title">Step 1</h3>
                    <p className="get-started-step-text">
                        Create an offer for a product that you want to sell or buy.
                    </p>
                </div>
                <div className="get-started-step">
                    <h3 className="get-started-step-title">Step 2</h3>
                    <p className="get-started-step-text">
                        A buyer can accept your offer or make a counter-proposal.
                    </p>
                </div>
                <div className="get-started-step">
                    <h3 className="get-started-step-title">Step 3</h3>
                    <p className="get-started-step-text">
                        You can assess the counter-proposal and decide whether to accept or
                        not.
                    </p>
                </div>
                <div className="get-started-step">
                    <h3 className="get-started-step-title">Step 4</h3>
                    <p className="get-started-step-text">
                        All the offer steps are recorded on the Cartesi blockchain for
                        transparency and security.
                    </p>
                </div>
            </div>
            <p className="connect-metamask">
                Now that you know how it works, connect your MetaMask wallet to get started.
            </p>
        </div>
    );
};

export default GetStarted;
