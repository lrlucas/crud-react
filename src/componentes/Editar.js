import React from 'react';


class Editar extends React.Component{

    // crear los ref
    tituloRef = React.createRef()
    entradaRef = React.createRef()


    editarPost = (e) => {
        e.preventDefault();
        const post = {
            title: this.tituloRef.current.value,
            body: this.entradaRef.current.value,
            userId: 1,
            id: this.props.post.id
        };
        // console.log(post)

        // enviar por props o peticion axios
        this.props.editarPost(post)

    };

    cargarFormulario = () => {
        if (!this.props.post) return null;
        const {title, body} = this.props.post;
        return(
            <form onSubmit={this.editarPost} className='col-8'>
                <legend className="text-center">
                Editar el Post
                </legend>
                <div className="form-group">
                    <label>Titulo del post:</label>
                    <input type="text" ref={this.tituloRef} className="form-control" defaultValue={title}/>
                </div>
                <div className="form-group">
                    <label>Contenido:</label>
                    <textarea className="form-control" ref={this.entradaRef} defaultValue={body}></textarea>
                </div>
                <button type="submit" className="btn btn-primary">Guardar post</button>
            </form>
        )
    };


    render() {



        return(
            <React.Fragment>
                {this.cargarFormulario()}
            </React.Fragment>

        );
    }

}

export default Editar;