import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import Global from '../Global';
import Sidebar from './Sidebar';
import SimpleReactValidator from 'simple-react-validator';
import imageDefault from '../assets/images/default.png';

//validacion formularios y alertas

class EditArticle extends Component {

    url = Global.url;
    titleRef = React.createRef();
    contentRef = React.createRef();
    articleId = null;

    state = {
        article: {},
        status: null,
        selectedFile: null
    }

    componentWillMount() {
        this.articleId = this.props.match.params.id;
        this.getArticle(this.articleId)
        this.validator = new SimpleReactValidator();
    }

    getArticle = (id) => {
        axios.get(this.url + 'article/' + id)
            .then(res => {
                this.setState({
                    article: res.data.article
                });
            })
    }

    chageState = () => {
        this.setState({
            article: {
                title: this.titleRef.current.value,
                content: this.contentRef.current.value,
                image:this.state.article.image
            }
        })
        this.validator.showMessages();
        this.forceUpdate();
    }


    saveArticle = (e) => {
        e.preventDefault();
        //rellena state
        this.chageState();
        //
        if (this.validator.allValid()) {
            axios.put(this.url + 'article/' + this.articleId, this.state.article)
                .then(res => {
                    if (res.data.article) {
                        this.setState({
                            article: res.data.article,
                            status: 'waiting'
                        });

                        //subir la imagen
                        if (this.state.selectedFile !== null) {
                            //sacar el id de el articulo
                            let articleId = this.state.article._id;
                            //crear form data y a;adir fichero
                            const formData = new FormData();
                            formData.append(
                                'file0',
                                this.state.selectedFile,
                                this.state.selectedFile.name
                            );
                            //peticion ajax
                            axios.post(this.url + 'upload_imagen/' + articleId, formData)
                                .then(res => {
                                    if (res.data.article) {
                                        this.setState({
                                            article: res.data.article,
                                            status: 'success'
                                        });


                                    } else {
                                        this.setState({
                                            article: res.data.article,
                                            status: 'failed'
                                        });

                                    }
                                })

                        } else {
                            this.setState({
                                status: 'success'
                            })
                        }
                    } else {
                        this.setState({
                            status: 'failed'
                        })
                    }
                })
        } else {
            this.setState({
                status: 'failed'
            })
            this.validator.showMessages();
            this.forceUpdate();
        }

    };

    fileChange = (event) => {
        //console.log("e: "+event.target.files[0].name)
        this.setState({
            selectedFile: event.target.files[0]
        })
    }

    render() {

        //console.log(this.state.article);

        if (this.state.status === 'success') {
            return <Redirect to="/blog" />
        }
        let article = this.state.article;
        return (
            <div className="center">
                <section id="content">
                    <h1 className="subheader">Editar Articulo</h1>
                    {this.state.article.title &&
                        <form className="mid-form" onSubmit={this.saveArticle}>
                            <div className="form-group">
                                <label htmlFor="title">Titulo</label>
                                <input type="text" name="title" defaultValue={article.title} ref={this.titleRef} onChange={this.chageState} />
                                {
                                    this.validator.message('title', this.state.article.title, 'required|alpha_num_space')
                                }
                            </div>
                            <div className="form-group">
                                <label htmlFor="content">Contenido</label>
                                <textarea name="content" ref={this.contentRef} defaultValue={article.content} onChange={this.chageState} ></textarea>
                                {
                                    this.validator.message('content', this.state.article.content, 'required')
                                }
                            </div>
                            <div className="form-group">
                                <label htmlFor="file0">Imagen</label>
                                <input type="file" name="file0" onChange={this.fileChange} />
                            </div>
                            <div className="image-wrap">
                                {article.image !== null ?
                                    (<img src={this.url + 'get_image/' + article.image} alt={article.title} className="thumb" />)
                                    : (<img src={imageDefault} alt={article.title} className="thumb" />)
                                }
                            </div>
                            <div className="clearfix"></div>
                            <input type="submit" value="Guardar" className="btn btn-success" />
                        </form>
                    }{!this.state.article.title &&
                        <h1 className="subheader">Cargando...</h1>
                    }

                </section>
                <Sidebar />
            </div>
        );
    }
}

export default EditArticle;