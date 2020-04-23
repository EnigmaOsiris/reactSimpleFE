import React, { Component } from "react";
import Slider from './Slider';
import Sidebar from './Sidebar';
import Articles from './Articles'

class Search extends Component {

    state = {
        articles:{},
        status: null
    }

    render() {
        let searched= this.props.match.params.search;
        return (
            <div id="blog">
                <Slider
                    title={"Resultados: "+searched}
                    size="slider-small"
                // btn="Ir al blog"
                />
                <div className="center">
                    <div id="content">    
                        <Articles
                            search={searched}
                        />                                           
                    </div>
                <Sidebar
                    blog="true"
                />
            </div>
            </div >

        )
    }
}

export default Search;