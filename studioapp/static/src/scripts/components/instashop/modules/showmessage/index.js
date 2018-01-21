
export function showMessage(text,className){
    
    const showMassage = document.getElementById('showMassage');
    showMassage.className = `${className} alert fade`;      
    showMassage.innerHTML = text;          
    showMassage.classList.add('in'); 
    setTimeout(function(){
        showMassage.classList.remove('in');
    },2000);

}
