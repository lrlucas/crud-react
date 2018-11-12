import React, {Component} from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import axios from "axios";

import Header from "./Header";
import Navegacion from "./navegacion/Navegacion";
import Posts from "./Posts";
import SinglePost from "./SinglePost";
import Formulario from './Formulario';
import swal from 'sweetalert2'
import Editar from "./Editar";


class Router extends Component {
    state = {
        posts: []
    };

    componentDidMount() {
        this.obtenerPost();
    }

    obtenerPost = () => {
        axios.get(`https://jsonplaceholder.typicode.com/posts`)
            .then(data => {
                this.setState({
                    posts: data.data
                })
            })
    };


    borrarPost = (id) => {
        axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
            .then(data => {
                if (data.status) {
                    const post = [...this.state.posts];
                    let resultado = post.filter(post => (
                        post.id !== id
                    ));
                    this.setState({
                        posts: resultado
                    });
                }
            })
    };

    crearPost = (post) => {
        axios.post(`https://jsonplaceholder.typicode.com/posts`, {post})
            .then(data => {
                if (data.status === 201) {
                    swal(
                        'Post creado!',
                        'Se creo correctamente!',
                        'success'
                    );
                    let postId = {id: data.data.id}
                    const nuevoPost = Object.assign({}, data.data.post, postId)
                    console.log(nuevoPost)
                    this.setState(prevState => ({
                        posts: [...prevState.posts, nuevoPost]
                    }))
                }
            })
    };

    editarPost = (postActualizado) => {
        const { id } = postActualizado;
        axios.put(`https://jsonplaceholder.typicode.com/posts/${id}`, {postActualizado})
            .then( data => {
               if (data.status === 200) {
                   swal(
                       'Post actualizado',
                       'Se guardo correctamente',
                       'success'
                   );
                   let postId = data.data.id;
                   const posts = [...this.state.posts];
                   const postEditar = posts.findIndex(post => postId === post.id)
                   posts[postEditar] = postActualizado;
                   this.setState({
                       posts
                   })
               }
            });
    };

    render() {
        return (
            <BrowserRouter>
                <div className="container">
                    <div className="row justify-content-center">
                        <Header/>
                        <Navegacion/>
                        <Switch>
                            <Route exact path="/" render={() => {
                                return (
                                    <Posts
                                        posts={this.state.posts}
                                        borrarPost={this.borrarPost}
                                    >

                                    </Posts>
                                )
                            }}/>

                            <Route
                                exact path="/post/:postId" render={(props) => {
                                let idPost = props.location.pathname.replace('/post/', '');
                                const posts = this.state.posts;
                                let filtro;
                                filtro = posts.filter(post => (
                                    post.id === Number(idPost)
                                ));
                                return (
                                    <SinglePost
                                        post={filtro[0]}
                                    />
                                )
                            }}

                            />

                            <Route
                                exact path='/crear' render={() => {
                                return (
                                    <Formulario
                                        crearPost={this.crearPost}

                                    />
                                )
                            }}
                            />


                            <Route
                                exact path="/editar/:postId" render={(props) => {
                                let idPost = props.location.pathname.replace('/editar/', '');
                                const posts = this.state.posts;
                                let filtro;
                                filtro = posts.filter(post => (
                                    post.id === Number(idPost)
                                ));
                                return (
                                    <Editar
                                        post={filtro[0]}
                                        editarPost={this.editarPost}
                                    />
                                )
                            }}

                            />

                        </Switch>
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}

export default Router;
