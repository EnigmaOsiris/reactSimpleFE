import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Global from '../Global';
import Moment from 'react-moment';
import 'moment/locale/es';
import imageDefault from '../assets/images/default.png';

class Articles extends Component {
    url = Global.url;

    state = {
        articles: [],
        status: null
    }

    componentWillMount() {
        let home = this.props.home;
        let search = this.props.search;
        if (home === 'true') {
            this.getLastArticles();
        } else if (search && search !== null && search !== undefined) {
            this.getArticlesbySearch(search);
        }
        else {
            this.getArticles();
        }

    }

    getLastArticles = () => {
        axios.get(this.url + "articles/last").then(res => {
            this.setState({
                articles: res.data.articles,
                status: 'success'
            })
            console.log(this.state);

        })
    }

    getArticles = () => {
        axios.get(this.url + "articles").then(res => {
            this.setState({
                articles: res.data.articles,
                status: 'success'
            })
            console.log(this.state);

        })
    }

    getArticlesbySearch = (searched) => {
        axios.get(this.url + "/search/" + searched).then(res => {
            this.setState({
                articles: res.data.articles,
                status: 'success'
            })
        })
        .catch(error=>{
            this.setState({
                articles: [],
                status: 'success'
            })
            
        })
    }

    render() {
        if (this.state.articles.length >= 1) {

            let listArticles = this.state.articles.map((article) => {
                return (
                    <article className="article-item" id="article-template" key={article._id}>
                        <div className="image-wrap">
                            {article.image !== null ?
                                (<img src={this.url + 'get_image/' + article.image} alt={article.title} />)
                                : (<img src={imageDefault} alt={article.title} />)
                            }
                        </div>

                        <h2>{article.title}</h2>
                        <span className="date">
                            <Moment locale="es" fromNow>{article.date}</Moment>
                        </span>
                        <Link to={'/blog/articulo/' + article._id}>Leer más</Link>

                        <div className="clearfix"></div>
                    </article>
                );
            })
            return (
                <div id="articles">
                    {listArticles}
                </div>
            );
        } else if (this.state.articles.length === 0 && this.state.status === 'success') {
            return (
                <div id="articles">
                    <h2 className="subheader">No hay articulos para mostrar</h2>
                    <p>Todavia no hay contenido</p>
                </div>
            );
        } else {
            return (
                <div id="articles">
                    <h2 className="subheader">Cargando...%</h2>
                </div>
            );
        }

    };
}

export default Articles;

// {
//     this.state.status === 'success' &&
//     < div >
//         {this.state.articles.map((article) => {
//             return (<h2 key={article._id}>{article.title}</h2>)
//         })

//         }
//     </div>
// }