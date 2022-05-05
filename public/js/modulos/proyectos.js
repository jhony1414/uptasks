import Swal from 'sweetalert2'
import axios from 'axios'

const btnEliminar = document.querySelector('#eliminar-proyecto')

if (btnEliminar){

    btnEliminar.addEventListener('click', (e) =>{

        const urlProyecto = e.target.dataset.proyectoUrl
        //console.log(urlProyecto);
        


        Swal.fire({
            title: 'Quieres borrar este proyecto?',
            text: "Si lo eliminas, no se puede recuperar!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar!',
            cancelButtonText: 'No, cancelar!'
        }).then((result) => {
            if (result.isConfirmed) {

                //Peticion a axios
                const url = `${location.origin}/proyectos/${urlProyecto}`
                axios.delete(url, { params: { urlProyecto } })
                    .then((response) => {
                        console.log( response )

                            Swal.fire(
                                'Proyecto Eliminado!',
                                'El proyecto ha sido eliminado.',
                                'success',
                            )
                            //redireccionar al inicio
                            setTimeout( () => {
                                window.location.href = '/'
                            }, 3000)
                     })
                     .catch( ()=> {
                        Swal.fire({
                            icon: 'error',
                            type: 'error',
                            title: 'Hay un error',
                            text: 'Nose ha podido elimiar el proyecto'
                        })
                     } )
                
            }
        })

    })

}
export default btnEliminar
