import React, { Component } from 'react';
import axios from 'axios';
import Global from '../Global';
import Sidebar from './Sidebar';
import Moment from 'react-moment';
import 'moment/locale/es';
import imageDefault from '../assets/images/default.png';

class Article extends Component {

    url = Global.url;

    state = {
        article: false,
        status: null
    }

    componentWillMount() {
        this.getArticle();
    }

    getArticle = () => {
        let id = this.props.match.params.id;
        axios.get(this.url + 'article/' + id)
            .then(
                res => {
                    this.setState({
                        article: res.data.article,
                        status: 'success'
                    })
                }
            ).catch(err => {
                this.setState({
                    article: false,
                    status: 'success'
                })
            })
    }

    render() {
        let article = this.state.article;
        return (
            <div className="center">
                <section id="content">
                    {article &&
                        <article className="article-item article-detail">
                            <div className="image-wrap">
                                {article.image !== null ?
                                    (<img src={this.url + 'get_image/' + article.image} alt={article.title} />)
                                    : (<img src={imageDefault} alt={article.title} />)
                                }
                            </div>

                            <h1 className="subheader">{article.title}</h1>
                            <span className="date">
                                <Moment locale="es" fromNow>{article.date}</Moment>
                            </span>
                            <p>
                                {article.content}
                            </p>
                            <a href="#" className="btn btn-warning">Editar</a>
                            <a href="#" className="btn btn-danger">Eliminar</a>
                            <div className="clearfix"></div>
                        </article>
                    }
                    {!this.state.article && this.state.status === "success" &&
                        <div id="article">
                            <h2 className="subheader">El articulo no Existe</h2>
                        </div>
                    }
                    {this.state.status == null &&
                        <div id="article">
                            <h2 className="subheader">Cargando...%</h2>
                        </div>
                    }
                </section>
                <Sidebar />
            </div>
        );
    };
}

export default Article;