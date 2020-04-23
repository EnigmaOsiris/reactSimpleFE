import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import Global from '../Global';
import Sidebar from './Sidebar';
//validacion formularios y alertas

class CreateArticle extends Component {

    url = Global.url;
    titleRef = React.createRef();
    contentRef = React.createRef();

    state = {
        article: {},
        status: null,
        selectedFile: null
    }

    chageState = () => {
        this.setState({
            article: {
                title: this.titleRef.current.value,
                content: this.contentRef.current.value
            }
        })
    }


    saveArticle = (e) => {
        e.preventDefault();
        //rellena state
        this.chageState();
        //
        axios.post(this.url + 'save', this.state.article)
            .then(res => {
                if (res.data.article) {
                    this.setState({
                        article: res.data.article,
                        status: 'success'
                    })
                } else {
                    this.setState({
                        status: 'failed'
                    })
                }
            })
    };

    fileChange = (event) => {
        this.setState({
            selectedFile: event.target.files[0]
        });
        console.log(this.state);        
    }


    render() {

        if (this.state.status === 'success') {
            return <Redirect to="/blog" />
        }
        return (
            <div className="center">
                <section id="content">
                    <h1 className="subheader">Crear Articulo</h1>
                    <form className="mid-form" onSubmit={this.saveArticle}>
                        <div className="form-group">
                            <label htmlFor="title">Titulo</label>
                            <input type="text" name="title" ref={this.titleRef} onChange={this.chageState} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="content">Contenido</label>
                            <textarea name="content" ref={this.contentRef} onChange={this.chageState} ></textarea>
                        </div>
                        <div className="form-group">
                            <label htmlFor="file0">Imagen</label>
                            <input type="file" name="file0" onChange={this.fileChange} />
                        </div>
                        <input type="submit" value="Guardar" className="btn btn-success" />
                    </form>
                </section>
                <Sidebar />
            </div>
        );
    }
}

export default CreateArticle;