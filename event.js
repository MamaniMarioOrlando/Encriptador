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

const mqLarge  = window.matchMedia( '(max-width: 375px)' );

const mqLargeTable  = window.matchMedia( '(max-width: 768px)' );


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
        if(mqLarge.matches){
            cambiosDeLaSegundaSeccionLarge(parrafo
                ,imgMunieco
                ,buttonCopiar
                ,segundaSeccion
                ,textAreaDos
                ,divSegundaSeccion)
        }
        if(mqLargeTable.matches){
            noneOrBlockTag(parrafo,"none");
            noneOrBlockTag(imgMunieco, "none");
            segundaSeccion.style.height = "300px";
            stylesForSecondSeccion(segundaSeccion,"initial");
            stylesForSecondTextArea(textAreaDos,"left","1.8em","84%");
            textAreaDos.style.position = "relative";
            textAreaDos.style.top= "11%";
            noneOrBlockTag(buttonCopiar,"block");
            limpiarTexto(textAreaDos);
            
        }
        else{
            cambiosDeLaSegundaSeccion(parrafo
                ,imgMunieco
                ,buttonCopiar
                ,segundaSeccion
                ,textAreaDos
                ,divSegundaSeccion);
        }
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
        if(mqLarge.matches){
            cambiosDeLaSegundaSeccionLarge(parrafo
                ,imgMunieco
                ,buttonCopiar
                ,segundaSeccion
                ,textAreaDos
                ,divSegundaSeccion)
        }
        if(mqLargeTable.matches){
            noneOrBlockTag(parrafo,"none");
            noneOrBlockTag(imgMunieco, "none");
            segundaSeccion.style.height = "300px";
            stylesForSecondSeccion(segundaSeccion,"initial");
            stylesForSecondTextArea(textAreaDos,"left","1.8em","84%");
            textAreaDos.style.position = "relative";
            textAreaDos.style.top= "11%";
            noneOrBlockTag(buttonCopiar,"block");
            limpiarTexto(textAreaDos);
            
        }
        else{
            cambiosDeLaSegundaSeccion(parrafo
                ,imgMunieco
                ,buttonCopiar
                ,segundaSeccion
                ,textAreaDos
                ,divSegundaSeccion);
        }
        
        let textoEncriptado = encriptar(texto.value);
        textAreaDos.value = textoEncriptado;
    }
}
function copiar(texto){
    localStorage.setItem("texto",texto);
    navigator.clipboard.writeText(texto)

    .then(()=>{
        alert(`El texto ${texto} fue copiado!!`);
    })
    .catch((err)=>{
        alert("Se produjo un error al copiar el texto");
    })
}
async function pegar(etiqueta){

    try{
        const text = await navigator.clipboard.readText();
        etiqueta.value = text;

    }catch(error){
        etiqueta.value = localStorage.getItem("texto");
    }
    
  
    
}
function btnCopiar(){
    copiar(textAreaDos.value);
    if(mqLarge.matches){
        
        limpiarTexto(texto);
        limpiarTexto(textAreaDos);
        eventActiveTagsMedia(parrafo,imgMunieco,buttonCopiar,textAreaDos,segundaSeccion,divSegundaSeccion)
        noneOrBlockTag(divBotonPegar,"block");
        noneOrBlockTag(divBotones,"none");
    }
    if(mqLargeTable.matches){
        
        limpiarTexto(texto);
        limpiarTexto(textAreaDos);
        styleForMediaTable();
        noneOrBlockTag(divBotonPegar,"block");
        noneOrBlockTag(divBotones,"none");
    }
    else{
        
        limpiarTexto(texto);
        limpiarTexto(textAreaDos);
        activeTags(parrafo,imgMunieco,buttonCopiar,textAreaDos);
        noneOrBlockTag(divBotonPegar,"block");
        noneOrBlockTag(divBotones,"none");
    }
}
function btnPegar(){
    if(mqLarge.matches){
        
        divBotones.style.display = "flex";
    }
    else if(mqLargeTable.matches){
        noneOrBlockTag(divBotones,"block");

    }
    else{
        noneOrBlockTag(divBotones,"block");
    }
    
    noneOrBlockTag(divBotonPegar,"none");

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
        stylesForSecondSeccion(segundaSeccion,"initial");
        stylesForSecondTextArea(textAreaDos,"left","1.8em","84%");
        stylesForDivSecondSection(divSegundaSeccion,"8%","relative","84%")
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
function stylesForSecondSeccion(etiqueta,justifyContent){
    etiqueta.style.justifyContent = justifyContent;
}
function stylesForSecondTextArea(etiqueta,left,size,height){
    etiqueta.style.textAlign = left; 
    etiqueta.style.fontSize = size;
    etiqueta.style.height = height;
}
function stylesForDivSecondSection(etiqueta,top,position,height){
    etiqueta.style.top = top;
    etiqueta.style.position = position;
    etiqueta.style.height = height;
}
function activeTags(parrafo,imgMunieco,buttonCopiar,textAreaDos){
    noneOrBlockTag(parrafo,"block");
    noneOrBlockTag(imgMunieco, "block");
    visibleOhiddenEtiqeta(buttonCopiar,"hidden");
    limpiarTexto(textAreaDos);
    stylesForSecondTextArea(textAreaDos,"","12px","")

}
function eventActiveTagsMedia(parrafo,imgMunieco,buttonCopiar,textAreaDos,segundaSeccion,divSegundaSeccion){
    noneOrBlockTag(parrafo,"block");
    noneOrBlockTag(imgMunieco, "none");
    segundaSeccion.style.height ="124px";
    visibleOhiddenEtiqeta(buttonCopiar,"hidden");
    stylesForSecondTextArea(textAreaDos,"center","","24px")
    stylesForDivSecondSection(divSegundaSeccion,"","unset","124px")
    limpiarTexto(textAreaDos);

}
function cambiosDeLaSegundaSeccionLarge(parrafo
    ,imgMunieco
    ,buttonCopiar
    ,segundaSeccion
    ,textAreaDos
    ,divSegundaSeccion){
        noneOrBlockTag(parrafo, "none");
        noneOrBlockTag(imgMunieco,"none");
        segundaSeccion.style.height ="400px";
        stylesForSecondTextArea(textAreaDos,"left","1.8em","100%");
        stylesForDivSecondSection(divSegundaSeccion,"0%","relative","67%")
        visibleOhiddenEtiqeta(buttonCopiar,"visible");
}
function styleForMediaTable(){
    noneOrBlockTag(parrafo,"block");
        noneOrBlockTag(imgMunieco, "none");
        segundaSeccion.style.height = "108px";
        textAreaDos.style.position = "unset";
        stylesForSecondSeccion(segundaSeccion,"center")
        stylesForSecondTextArea(textAreaDos,"center","","24px")
        noneOrBlockTag(buttonCopiar,"none");
        limpiarTexto(textAreaDos);
}
function eventTextArea(){
    limpiarTexto(texto)
    if(mqLarge.matches){
        
        eventActiveTagsMedia(parrafo,imgMunieco,buttonCopiar,textAreaDos,segundaSeccion,divSegundaSeccion)
    }
    else if(mqLargeTable.matches){
        styleForMediaTable();
    }
    else{
        activeTags(parrafo,imgMunieco,buttonCopiar,textAreaDos)
    }

    
}

