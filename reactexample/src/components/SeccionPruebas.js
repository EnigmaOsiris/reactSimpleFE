import React, { Component } from 'react';
import MiComponente from './MiComponente'

class SeccionPruebas extends Component {

    contador = 0;

    // constructor(props){
    //     super(props);
    //     this.state={
    //         contador:0
    //     };
    // }

    state = {
        contador: 0
    };

    HolaMundo(mensaje, sujeto) {
        let presentacion = (
            <div>
                <h1>{mensaje + " " + sujeto}</h1>
            </div>
        );
        return presentacion;
    }
    sumar=(e)=>{
        this.setState({
            contador: (this.state.contador + 1)
        });
    }

    restar =(e)=> {
        this.setState({
            contador: (this.state.contador - 1)
        });
    }

    render() {
        let mensaje = "Hola ", sujeto = "Mundo"
        return (
            <section id="content">
                <h2 className="subheader">Ultimos articulos</h2>
                <p>
                    Hola
                </p>
                <h2>Funciones y JSX basico</h2>
                {this.HolaMundo(mensaje, sujeto)}
                <h2>Componentes</h2>
                <section className="componentes">
                    <MiComponente />
                    <MiComponente />
                </section>
                <h2>Estados</h2>
                <p>
                    {this.state.contador}
                </p>
                <p>
                    <input type="button" value="Sumar" onClick={this.sumar} />
                    <input type="button" value="Restar" onClick={this.restar} />
                </p>
            </section>
        );
    }
}

export default SeccionPruebas;