import React, { Component } from "react";
import Slider from './Slider';
import Sidebar from './Sidebar';
import Articles from './Articles';

class Home extends Component {
    render() {
        //let buttonString = "Ir al blog";
        return (
            <div id="home">
                <Slider
                    title="Bienvenido"
                    btn="Ir al blog"
                    size="slider-big"
                />
                <div className="center">
                    <div id="content">
                        <h1 className="subheader">Ultimos Articulos</h1>
                        <Articles 
                            home="true"
                        />
                    </div>
                    <Sidebar />
                </div>
            </div>

        )
    }
}

export default Home;