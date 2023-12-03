import { Helmet } from "react-helmet-async";
import Banner from "../Banner/Banner";
import Featured from "../Featured/Featured/Featured";
import About from "../About/About";
import Newsletter from "../Newsletter/Newsletter";
import TeamSection from "../TeamSection/TeamSection";

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Active Pulse | Home</title>
            </Helmet>
            <Banner />
            <Featured />
            <About />
            <Newsletter />
            <TeamSection />

        </div>
    );
};

export default Home;