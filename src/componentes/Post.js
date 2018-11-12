import React from 'react'
import {Link} from "react-router-dom";
import swal from 'sweetalert2';

class Post extends React.Component{


    confirmarEliminacion = () => {
        const { id } = this.props.info;
        swal({
            title: 'Estas seguro?',
            text: "No se puede deshacer esta accion!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, borrar!',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.value) {
                this.props.borrarPost(id)
                swal(
                    'Eliminado!',
                    'El post ha sido eliminado.',
                    'success'
                )
            }
        })

    };


    render() {
        const { id, title } = this.props.info;
        return(
            <tr>
                <td>{ id }</td>
                <td>{ title }</td>
                <td>
                    <Link
                        to={`/post/${id}`} className="btn btn-primary">
                        Ver
                    </Link>
                    <Link
                        to={`/editar/${id}`} className="btn btn-warning">
                        Editar
                    </Link>
                    <button onClick={ this.confirmarEliminacion } className="btn btn-danger" type="button">Borrar</button>
                </td>
            </tr>
        )
    }
    
}

export default Post