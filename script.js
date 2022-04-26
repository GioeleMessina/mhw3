/* TODO: inserite il codice JavaScript necessario a completare il MHW! */

const elencoRisposte = [];
let scelteDefinitiva={};
const risposte1=[];
const risposte2=[];
const risposte3=[];


function selezione1(event){

    const rispostaSelezionata=event.currentTarget;
    const indice=risposte1.indexOf(rispostaSelezionata);
    let elencoIndici;
    let imgCheckbox;

    for(let risposta of risposte1){
        elencoIndici=risposte1.indexOf(risposta);
        imgCheckbox=risposta.querySelector('.checkbox ');
        

        if(elencoIndici != indice){
            if(risposta.className==="attiva"){
                risposta.classList.remove('attiva');
                risposta.classList.add('nonAttiva');
                imgCheckbox.src='images/unchecked.png';
                
            }
            else{
                risposta.classList.add('nonAttiva');
                imgCheckbox.src='images/unchecked.png';
            }
        }
        else{
            risposta.classList.remove('nonAttiva');
            risposta.classList.add('attiva');
            imgCheckbox.src='images/checked.png';
        }

     
    }
    scelteDefinitiva[rispostaSelezionata.dataset.questionId]=rispostaSelezionata.dataset.choiceId;
    controllaRisposte();
}

function selezione2(event){

    const rispostaSelezionata=event.currentTarget;
    const indice=risposte2.indexOf(rispostaSelezionata);
    let elencoIndici;
    let imgCheckbox;

    for(let risposta of risposte2){
        elencoIndici=risposte2.indexOf(risposta);
        imgCheckbox=risposta.querySelector('.checkbox ');

        if(elencoIndici != indice){
            if(risposta.className==="attiva"){
                risposta.classList.remove('attiva');
                risposta.classList.add('nonAttiva');
                imgCheckbox.src='images/unchecked.png';
            }
            else{
                risposta.classList.add('nonAttiva');
                imgCheckbox.src='images/unchecked.png';
            }
        }
        else{
            risposta.classList.remove('nonAttiva');
            risposta.classList.add('attiva');
            imgCheckbox.src='images/checked.png';
        }

     
    }
    scelteDefinitiva[rispostaSelezionata.dataset.questionId]=rispostaSelezionata.dataset.choiceId;
    controllaRisposte();
}

function selezione3(event){

    const rispostaSelezionata=event.currentTarget;
    const indice=risposte3.indexOf(rispostaSelezionata);
    let  elencoIndici;
    let imgCheckbox;
  
    for(let risposta of risposte3){
        elencoIndici=risposte3.indexOf(risposta);
        imgCheckbox=risposta.querySelector('.checkbox ');
        
        if(elencoIndici != indice){
            if(risposta.className==="attiva"){
                risposta.classList.remove('attiva');
                risposta.classList.add('nonAttiva');
                imgCheckbox.src='images/unchecked.png';
                
            }
            else{
                risposta.classList.add('nonAttiva');
                imgCheckbox.src='images/unchecked.png';
            }
        }
        else{
            risposta.classList.remove('nonAttiva');
            risposta.classList.add('attiva');
            imgCheckbox.src='images/checked.png';
        }

     
    }
    scelteDefinitiva[rispostaSelezionata.dataset.questionId]=rispostaSelezionata.dataset.choiceId;
    controllaRisposte();
}


function controllaRisposte(){

    let contatore=0;
    for(let i in scelteDefinitiva){
        contatore++;
    }

    if(contatore===3){
        
        for(const risposta of allRisposte){
            if(risposta.dataset.questionId==="one"){
                risposta.removeEventListener('click',selezione1);
            }
        
            else if(risposta.dataset.questionId==="two"){
                risposta.removeEventListener('click',selezione2);  
            }

            else
                risposta.removeEventListener('click',selezione3);     
            
        
        }
        calcolaPersonalita();
    }
}


function calcolaPersonalita(){

    let contatore1=0;
    let contatore3=0;
    let contatore2=0;

    let scelta1=scelteDefinitiva['one'];
    let scelta2=scelteDefinitiva['two'];    
    let scelta3=scelteDefinitiva['three'];   
     
    
    for(let scelta in scelteDefinitiva){
        if(scelteDefinitiva[scelta]===scelta1)
            contatore1++;
         else if(scelteDefinitiva[scelta]===scelta2)
            contatore2++;
        else
            contatore3++;
    }


    if(contatore1===contatore2 && contatore1===contatore3){
        creazioneTesto(scelta1);
    }

    else{
        if(contatore1>contatore2)
         creazioneTesto(scelta1);

        else 
          creazioneTesto(scelta2);
    
    }
  
}


function creazioneTesto(scelta){

    const h1=document.createElement('h1');
    h1.textContent=RESULTS_MAP[scelta].title;
    const p=document.createElement('p');
    p.textContent=RESULTS_MAP[scelta].contents;
    const bottone=document.createElement('button');
    bottone.textContent='Ricomincia il quiz';
    const personalita=document.querySelector('#personalita');
    personalita.appendChild(h1);
    personalita.appendChild(p);
    personalita.appendChild(bottone);
    bottone.addEventListener('click',restart);

}


function restart(){

    const personalita=document.querySelector('#personalita');
    personalita.innerHTML='';

    for(let i in scelteDefinitiva){
        delete scelteDefinitiva[i];

    }

    for(const risposta of allRisposte){

        if(risposta.dataset.questionId==="one"){
        risposta.addEventListener('click',selezione1);
        risposta.classList.remove('attiva');
        risposta.classList.remove('nonAttiva');
        const imgCheckbox=risposta.querySelector('.checkbox ');
        imgCheckbox.src='images/unchecked.png';
        }
    
        else if(risposta.dataset.questionId==="two"){
            risposta.addEventListener('click',selezione2);

            risposta.classList.remove('attiva');
            risposta.classList.remove('nonAttiva');
            const imgCheckbox=risposta.querySelector('.checkbox ');
            imgCheckbox.src='images/unchecked.png';
        }
    
        else{
            risposta.addEventListener('click',selezione3);
            risposta.classList.remove('attiva');
            risposta.classList.remove('nonAttiva');
            const imgCheckbox=risposta.querySelector('.checkbox ');
            imgCheckbox.src='images/unchecked.png';
        }
    
    }

}



const allRisposte=document.querySelectorAll('.choice-grid div');
for(const risposta of allRisposte){

    if(risposta.dataset.questionId==="one"){
    risposta.addEventListener('click',selezione1);
    risposte1.push(risposta);
    }

    if(risposta.dataset.questionId==="two"){
        risposta.addEventListener('click',selezione2);
        risposte2.push(risposta);
    }

    if(risposta.dataset.questionId==="three"){
        risposta.addEventListener('click',selezione3);
        risposte3.push(risposta);
    }

}


