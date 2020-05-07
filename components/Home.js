import React, { Fragment } from 'react';
import {Helmet} from 'react-helmet';
import logo from './logo.png';
import {Link} from 'react-router-dom';



const Home = () => (
    <Fragment>
        <Helmet><title>Quiz App - Home</title></Helmet>
        <div id="home">
            <section>
                <div align="center">
                <img src={logo} height="300" width="300" />
                </div>
                <h1>Quick Quiz</h1>

                <div align="center" className="start-button-container">
                    <ul>
                        <li className="start-button"><Link to="/play">Start</Link></li> 
                    </ul>
                </div>
            </section>
        </div>
    </Fragment>


);


export default Home;