import { Testimonial } from "../models/Testimoniales.js";

const guardarTestimonial = async (req, res) => {

    //Validar..
    const {nombre, correo, mensaje} = req.body;

    const errores = [];

    if(nombre.trim() === ''){
        errores.push({mensaje : 'El nombre esta vacion'});
    }
    
    if(correo.trim() === ''){
        errores.push({mensaje : 'El correo esta vacion'});
    }
    
    if(mensaje.trim() === ''){
        errores.push({mensaje : 'El mensaje esta vacion'});
    }
    

    if(errores.length > 0){

        //Consultar testimoniales existentes 
        const testimoniales = await Testimonial.findAll();

        //show the view with errors
        res.render('testimoniales', {
            pagina: 'Testimoniales', 
            errores,
            nombre, 
            correo,
            mensaje,
            testimoniales
        });
    }else{
        //Almacenarlo enla base de datos
        try {
            await Testimonial.create({
                nombre, 
                correo,
                mensaje
            });

            res.redirect('/testimoniales');
        } catch (error) {
            console.log(error);
        }
    }
}

export {
    guardarTestimonial
}