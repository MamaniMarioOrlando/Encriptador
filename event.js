const texto = document.querySelector(".primer-textarea");
const textAreaDos = document.querySelector(".seg-textarea");
const parrafo = document.querySelector(".mensaje");
const imgMunieco = document.querySelector(".img-muñeco");
const buttonCopiar = document.querySelector(".btn-copiar");
const divBotonPegar = document.querySelector(".div-boton-pegar")
const mensajeError = document.querySelector(".div-terminos");
const segundaSeccion = document.querySelector(".segunda-section");
const divSegundaSeccion = document.querySelector(".div-mensaje-text");
const divBotones = document.querySelector(".div-botones");

const mayuscula = /[A-Z]/;
const acentos = /[áéíóúÁÉÍÓÚ]/;
const caracteres = /[^a-zA-Z0-9\s]/;

function desencriptar(textoADesencriptado){

    let matris = [["a","ai"]
                ,["i","imes"]
                ,["e","enter"]
                ,["o","ober"]
                ,["u","ufat"]];
    for(let i=0; i < matris.length ;i++){
        if(textoADesencriptado.includes(matris[i][1])){
            textoADesencriptado = textoADesencriptado.replaceAll(matris[i][1],matris[i][0]);
        }
    }
    return textoADesencriptado;
}
function encriptar(texto){

    let matris = [["e","enter"]
                ,["i","imes"]
                ,["a","ai"]
                ,["o","ober"]
                ,["u","ufat"]];
    for(let i=0; i < matris.length ;i++){
        if(texto.includes(matris[i][0])){
            texto = texto.replaceAll(matris[i][0],matris[i][1]);
        }
    }
    return texto;
}
function buttonDescencriptar(){
    if(verificarTextoValido(texto)){
        visibleOhiddenEtiqeta(mensajeError,"visible");
    }
    else{
        visibleOhiddenEtiqeta(mensajeError,"hidden")
        cambiosDeLaSegundaSeccion(parrafo
            ,imgMunieco
            ,buttonCopiar
            ,segundaSeccion
            ,textAreaDos
            ,divSegundaSeccion);
        let textoEncriptado = desencriptar(texto.value);
        textAreaDos.value = textoEncriptado;
    }
}
function buttonEncriptar(){
    
    if(verificarTextoValido(texto)){
        visibleOhiddenEtiqeta(mensajeError,"visible");
    }
    else{
        visibleOhiddenEtiqeta(mensajeError,"hidden")
        cambiosDeLaSegundaSeccion(parrafo
            ,imgMunieco
            ,buttonCopiar
            ,segundaSeccion
            ,textAreaDos
            ,divSegundaSeccion);
        let textoEncriptado = encriptar(texto.value);
        textAreaDos.value = textoEncriptado;
    }
}
function copiar(texto){
    navigator.clipboard.writeText(texto)
    .then(()=>{
        alert(`El texto ${texto} fue copiado!!`);
    })
    .catch((err)=>{
        alert("Se produjo un error al copiar el texto");
    })
}
function pegar(etiqueta){
    navigator.clipboard.readText()
    .then(text => {
        etiqueta.value = text;
        console.log('Texto del portapapeles:', text);
    })
    .catch(err => {
        console.error('Error al leer del portapapeles:', err);
    })

}
function btnCopiar(){
    copiar(textAreaDos.value);
    limpiarTexto(texto);
    limpiarTexto(textAreaDos);
    activeTags(parrafo,imgMunieco,buttonCopiar,textAreaDos);
    noneOrBlockTag(divBotonPegar,"block");
    noneOrBlockTag(divBotones,"none");
}
function btnPegar(){
    
    noneOrBlockTag(divBotonPegar,"none");
    noneOrBlockTag(divBotones,"block");
    pegar(texto);
}
function verificarTextoValido(textoValidar){

    return(mayuscula.test(textoValidar.value) 
        || acentos.test(textoValidar.value)
        || caracteres.test(textoValidar.value))
}
function cambiosDeLaSegundaSeccion(parrafo
    ,imgMunieco
    ,buttonCopiar
    ,segundaSeccion
    ,textAreaDos
    ,divSegundaSeccion){

        noneOrBlockTag(parrafo, "none");
        noneOrBlockTag(imgMunieco,"none");
        stylesForSecondSeccion(segundaSeccion);
        stylesForSecondTextArea(textAreaDos,"left","1.8em","84%");
        stylesForDivSecondSection(divSegundaSeccion)
        visibleOhiddenEtiqeta(buttonCopiar,"visible");
    
}
function limpiarTexto(etiqueta){
    etiqueta.value = "";
}
function noneOrBlockTag(etiqueta,valor){
    etiqueta.style.display = valor;
}

function visibleOhiddenEtiqeta(etiqueta, value){
    etiqueta.style.visibility = value;   
}
function stylesForSecondSeccion(etiqueta){
    etiqueta.style.justifyContent = "initial";
}
function stylesForSecondTextArea(etiqueta,left,size,height){
    etiqueta.style.textAlign = left; 
    etiqueta.style.fontSize = size;
    etiqueta.style.height = height;
}
function stylesForDivSecondSection(etiqueta){
    etiqueta.style.top = "8%";
    etiqueta.style.position = "relative";
    etiqueta.style.height = "84%";
}
function activeTags(parrafo,imgMunieco,buttonCopiar,textAreaDos){
    noneOrBlockTag(parrafo,"block");
    noneOrBlockTag(imgMunieco, "block");
    visibleOhiddenEtiqeta(buttonCopiar,"hidden");
    limpiarTexto(textAreaDos);
    stylesForSecondTextArea(textAreaDos,"","12px","")

}
function eventTextArea(){
    limpiarTexto(texto)
    activeTags(parrafo,imgMunieco,buttonCopiar,textAreaDos);
}

