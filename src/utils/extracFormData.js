const extractFormData = (formShcema, valoresFormulario) =>{
    for(let valor in formShcema) {
        formShcema[valor] = valoresFormulario.get(valor)
    }
    return formShcema
}

export default extractFormData