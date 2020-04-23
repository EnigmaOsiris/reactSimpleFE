import React, { Component } from "react";
import Sidebar from './Sidebar';

class Formulario extends Component {
    nombreRef = React.createRef();
    apellidosRef = React.createRef();
    bioRef = React.createRef();
    genMRef = React.createRef();
    genFRef = React.createRef();

    state={
        user:{

        }
    }

    recibirFormulario = (e)=>{
        e.preventDefault();
        let genero='Hombre';
        if (this.genMRef.current.checked) {
            genero=this.genMRef.current.value;
        } else {
            genero=this.genFRef.current.value;
        }
        let user ={
            nombre:this.nombreRef.current.value,
            apellidos:this.apellidosRef.current.value,
            bio:this.bioRef.current.value,
            genero:genero

        }
        //console.log(user);
        this.setState({
            user:user
        })
        
        
    }
    
    render() {   
        if (this.state.user.nombre) {
            var user = this.state.user;
        }     
        return (
            <div id="Formulario">
                <h1 className="subheader">Formulario</h1>
                {/* {etiqueta} */}
                {this.state.user.nombre&&
                    <div id="user-data">
                        <p>Nombre: <strong>{user.nombre}</strong></p>
                        <p>Apellidos: <strong>{user.apellidos}</strong></p>
                        <p>bio: <strong>{user.bio}</strong></p>
                        <p>Genero: <strong>{user.genero}</strong></p>
                    </div>
                }

                <div className="center">
                    <div id="content">
                        {/* {Formulario} */}
                        <form className="mid-form" onSubmit={this.recibirFormulario} onChange={this.recibirFormulario}>
                            <div className="form-group">
                                <label htmlFor="nombre">Nombre</label>
                                <input type="text" name="nombre" ref={this.nombreRef}/>
                            </div>

                            <div className="form-group">
                                <label htmlFor="apellidos">Apellidos</label>
                                <input type="text" name="apellidos" ref={this.apellidosRef}/>
                            </div>

                            <div className="form-group">
                                <label htmlFor="bio">Biografia</label>
                                <textarea name="bio" ref={this.bioRef}></textarea>
                            </div>

                            <div className="form-group radibuttons">
                                <input type="radio" name="genero" value="hombre" ref={this.genMRef} /> Hombre
                                <input type="radio" name="genero" value="mujer" ref={this.genFRef}/> Mujer                            
                            </div>

                            <div className="clearfix"></div>

                            <input type="submit" value="Enviar" className="btn btn-success" />

                        </form>
                    </div>
                    <Sidebar
                        blog="false"
                    />
                </div>
            </div>

        )
    }
}

export default Formulario;