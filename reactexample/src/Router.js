import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';


//importar componentes
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Blog from './components/Blog';
import Formulario from './components/Formulario';
import MiComponente from './components/MiComponente';
import Peliculas from './components/Peliculas';
import Error from './components/Error';
import Article from './components/Article';
import Search from './components/Search';
import CreateArticle from './components/CreateArticle';
import EditArticle from './components/EditArticle';



class Router extends Component {

    render() {

        return (

            //Congigurar
            <BrowserRouter>
                <Header />



                <Switch>
                    <Route exact path="/" component={Peliculas} />
                    <Route exact path="/home" component={Home} />
                    <Route exact path="/blog" component={Blog} />
                    <Route exact path="/blog/articulo/:id" component={Article}/>
                    <Route exact path="/blog/crear" component={CreateArticle}/>
                    <Route exact path="/blog/editar/:id" component={EditArticle}/>
                    <Route exact path="/formulario" component={Formulario} />
                    <Route exact path="/peliculas" component={Peliculas} />
                    <Route exact path="/blog/busqueda/:search" component={Search} />
                    <Route exact path="/redirect/:search" render={
                        (props)=>{
                            let search= props.match.params.search;
                            return(<Redirect to={'/blog/busqueda/'+search} />)
                        }
                    } />
                    <Route exact path="/segunda-ruta" component={MiComponente} />
                    <Route exact path="/pagina-1" render={() => (
                        <h1>jsx</h1>
                    )} />

                    <Route exact path="/pruebas/:id/:otro?" render={(props) => {
                        let id = props.match.params.id;
                        let otro = props.match.params.otro;
                        return (
                            <div id="content">
                                <h2 className="subheader">pagina pruebas</h2>
                                <h2 className="subheader">
                                    {id && !otro &&
                                        <React.Fragment>{id}</React.Fragment>
                                    }
                                    {id && otro &&
                                        <React.Fragment>{id + " " + otro}</React.Fragment>
                                    }
                                </h2>
                            </div>);
                    }} />
                    <Route component={Error} />
                </Switch>
                {/* <Peliculas/> */}

                <div className="clearfix"></div>

                <Footer />
            </BrowserRouter>

        );
    }
}

export default Router;