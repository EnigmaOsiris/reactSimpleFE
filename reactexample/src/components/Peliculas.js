import React, { Component } from 'react';
import Pelicula from './Pelicula';
import Slider from './Slider';
import Sidebar from './Sidebar';

class Peliculas extends Component {
    state = {
    };

    cambiarTitulo = () => {
        let { peliculas } = this.state;
        // let random = Math.floor(Math.random()*3);
        // peliculas[random].titulo="El club de la pelea"
        peliculas[0].titulo = "El club de la pelea"
        this.setState({
            peliculas: peliculas
        })
    }

    favorita = (pelicula, index) => {
        console.log("Fav");
        console.log(pelicula, index);
        this.setState({
            favorita: pelicula
        })
    }

    //antes
    componentWillMount() {
        this.setState({
            peliculas: [
                { titulo: 'The Fight Club', imagen: 'https://dam.empireonline.com.mx/wp-content/uploads/2019/10/fight-club-20-anos.jpg' },
                { titulo: 'Pi', imagen: 'https://puntocritico.com/ausajpuntocritico/wp-content/uploads/2018/09/PI678x381.jpg' },
                { titulo: 'Pi', imagen: 'https://puntocritico.com/ausajpuntocritico/wp-content/uploads/2018/09/PI678x381.jpg' }
            ],
            nombre: 'Enigma',
            favorita: {}
        })
    }
    //despues
    componentDidMount() {
        //alert("ya se monto");
    }
    //quitar de ejecuccion
    componentWillUnmount() {
        //alert("se va a desmontar");
    }
    // muestra en pantalla
    render() {
        let pStyle = {
            background: 'green',
            color: 'white',
            padding: '10px'
        }

        let favorita
        if (this.state.favorita.titulo) {
            favorita = (
                <p className="favorita"
                    style={pStyle}>
                    <strong>Top movie: </strong>
                    <span>{this.state.favorita.titulo}</span>
                </p>
            )
        } else {
            favorita = (
                <p>Sin Top</p>
            )
        }
        return (
            <React.Fragment>
                <Slider
                    title="Peliculas"                    
                    size="slider-small"
                />
                <div className="center">
                    <div id="content" className="peliculas">
                        <h2 className="subheader">Listado de Peliculas</h2>
                        <p>Recomendacion {this.state.nombre}</p>
                        <p><button onClick={this.cambiarTitulo}>Change title</button></p>
                        {favorita}

                        {/*componente pelicula */}
                        <div id="articles">
                            {
                                this.state.peliculas.map((pelicula, i) => {
                                    return (
                                        <Pelicula
                                            key={i}
                                            pelicula={pelicula}
                                            index={i}
                                            topAdd={this.favorita}
                                        />
                                    )
                                })
                            }
                        </div>

                    </div>
                    <Sidebar
                        blog="true"
                    />
                </div>
            </React.Fragment>

        );
    }
}

export default Peliculas;