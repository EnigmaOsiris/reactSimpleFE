import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class Pelicula extends Component {
    top=()=>{
        this.props.topAdd(this.props.pelicula,this.props.index);
    }

    render() {
        //const pelicula= this.props.pelicula;
        const { titulo, imagen } = this.props.pelicula;
        return (
            <article className="article-item" id="article-template">
                <div className="image-wrap">
                    <img src={imagen} alt={titulo} />
                </div>
                <h2>{titulo}</h2>
                <span className="date">
                    Hace 5 minutos
                                </span>
                <Link to={"/blog"}>Leer más</Link>
                <button onClick={this.top}>A;adir a Top</button>
                <div className="clearfix"></div>
            </article>
        );
    }
}


export default Pelicula;