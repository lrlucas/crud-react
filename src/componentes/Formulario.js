import React from 'react';


class Formulario extends React.Component{

    // crear los ref
    tituloRef = React.createRef();
    entradaRef = React.createRef();


    crearPost = (e) => {
        e.preventDefault();
        const post = {
            title: this.tituloRef.current.value,
            body: this.entradaRef.current.value,
            userId: 1
        };

        // enviar por props o peticion axios
        this.props.crearPost(post)

    };


    render() {
        return(
            <form onSubmit={this.crearPost} className='col-8'>
                <legend className="text-center">
                    Crear nuevo Post
                </legend>
                <div className="form-group">
                    <label>Titulo del post:</label>
                    <input type="text" ref={this.tituloRef} className="form-control" placeholder="Titulo del post"/>
                </div>
                <div className="form-group">
                    <label>Contenido:</label>
                    <textarea className="form-control" ref={this.entradaRef} placeholder="contenido"></textarea>
                </div>
                <button type="submit" className="btn btn-primary">Guardar post</button>
            </form>
        );
    }

}

export default Formulario;