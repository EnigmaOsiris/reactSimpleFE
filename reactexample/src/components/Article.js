import React, { Component } from 'react';
import axios from 'axios';
import Global from '../Global';
import Sidebar from './Sidebar';
import {Redirect , Link} from 'react-router-dom';
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

    deleteArticle =(id)=>{
        axios.delete(this.url+'delete/'+id)
            .then(res=>{
                this.setState({
                    article:res.data.article,
                    status:'deleted'
                });
            });
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
        if (this.state.status ==='deleted') {
            return <Redirect to='/blog' />
        }
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
                            
                            <button className="btn btn-danger" onClick={
                                ()=>{
                                    this.deleteArticle(article._id)
                                }
                            }>Eliminar</button>
                            <Link to={'/blog/editar/'+article._id}className="btn btn-warning" >Editar</Link>
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