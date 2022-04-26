const api_endpoint='https://www.cheapshark.com/api/1.0/games?title=';
const collegamento="https://www.cheapshark.com/redirect?dealID="
const risultati_giochi=10;
const risultati_canzoni=6;
let token;
const id="acfb551e2af34688ad6b588eb9e95215";
const id_segreto="65bccafca58f449caa0b4743f3dac347";


function onResponse(response){  
    return response.json();
}

function onTokenJson(json){
    token=json.access_token;
}


function visualizza_giochi(json){
    console.log(json);
    const offerte=document.querySelector('#offerte');
    offerte.innerHTML="";
    if(json.length===0){
        const noElement=document.createElement('h1');
        noElement.textContent="Non ho trovato nessun gioco" ;
        offerte.appendChild(noElement);
    }
    else{
        for(let result of json){
            const Container=document.createElement('div')
            const img=document.createElement('img');
            const nomeGioco=document.createElement('a');
            const prezzo=document.createElement('p');
            prezzo.textContent="$"+result.cheapest;
            nomeGioco.textContent=result.external;
            nomeGioco.href=collegamento+result.cheapestDealID;
            nomeGioco.target="_blank";
            img.src=result.thumb;
            Container.appendChild(img);
            Container.appendChild(nomeGioco);
            Container.appendChild(prezzo);
            offerte.appendChild(Container); 
        }
    }
}

function ricerca_gioco(event){
    event.preventDefault();
    const testo=document.querySelector('#contenuto').value;
    const testoCodificato=encodeURIComponent(testo);
    richiesta= api_endpoint+testoCodificato+'&limit='+risultati_giochi;
    fetch(richiesta).then(onResponse).then(visualizza_giochi);
}



function ricerca_playlist(event){
        const testoCodificato=encodeURIComponent("soundtrack videogames");
        fetch("https://api.spotify.com/v1/search?type=playlist&q="+testoCodificato,{
            headers:{
                'Authorization':"Bearer "+ token
            }
        }).then(onResponse).then(visualizza_playlist);
}

function visualizza_playlist(json){
    console.log(json);
    const playlist= document.querySelector("#playlist");
    playlist.innerHTML="";
    for(let i=0;i<risultati_canzoni;i++ ){
        const item=json.playlists.items[i];
        const container=document.createElement("div");
        const link=document.createElement('a');
        link.href=item.external_urls.spotify;
        link.textContent=item.name+"("+item.tracks.total+" tracks)";
        link.target="_blank";
        playlist.appendChild(link);
        const copertina=document.createElement('img');
        copertina.src=item.images[0].url;
        container.appendChild(copertina);
        container.appendChild(link);
        playlist.appendChild(container);
        
    }
    const eliminaPlaylist=document.createElement('button');
    eliminaPlaylist.textContent="Elimina playlist";
    playlist.appendChild(eliminaPlaylist);
    eliminaPlaylist.addEventListener('click',rimuoviContenuto);
}

function rimuoviContenuto(event){
    const playlist=document.querySelector('#playlist');
    playlist.innerHTML="";
}


const form=document.querySelector('#ricerca');
form.addEventListener('submit',ricerca_gioco);

const bottone=document.querySelector('button');
bottone.addEventListener('click',ricerca_playlist);

fetch("https://accounts.spotify.com/api/token",{
        method:'POST',
        body:"grant_type=client_credentials",
        headers:{
            "Authorization": "Basic "+btoa(id+":"+id_segreto),
            "Content-Type":"application/x-www-form-urlencoded"
        }
}).then(onResponse).then(onTokenJson);

