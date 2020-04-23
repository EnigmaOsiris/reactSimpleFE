import React, {Component} from 'react';

class MiComponente extends Component{

    render(){
        let receta={
            nombre:'pizza',
            ingredientes:['tomates','queso','peperoni'],
            peso:'400'
        };
        return(
            //solo retorna una etiqueta
            <div className="mi-componente">
                <h1>Hola soy component</h1>
                <h2>{'receta: '+receta.nombre}</h2>
                <h2>{receta.peso}</h2>
                <ol>
                    {
                        receta.ingredientes.map((ingrediente,i)=>{
                            console.log(ingrediente)
                            return (
                                <li key={i}>
                                    {ingrediente}
                                </li>
                            );
                            
                        })
                    }
                </ol>    
            </div>
            
            
        );
    }
}

export default MiComponente;