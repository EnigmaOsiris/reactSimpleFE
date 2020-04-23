import React, { Component } from "react";
import Slider from './Slider';
import Sidebar from './Sidebar';
import Articles from './Articles'

class Blog extends Component {

    state = {
        articles:{},
        status: null
    }

    render() {
        //let buttonString = "Ir al blog";
        return (
            <div id="blog">
                <Slider
                    title="Blog"
                    size="slider-small"
                // btn="Ir al blog"
                />
                <div className="center">
                    <div id="content">    
                        <Articles/>                                           
                    </div>
                <Sidebar
                    blog="true"
                />
            </div>
            </div >

        )
    }
}

export default Blog;