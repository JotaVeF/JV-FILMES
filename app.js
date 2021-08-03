const TMDB_ENDPOINT = 'https://api.themoviedb.org/3';
const APIKEY = '9c2c75d9d67c3f98cc98bb29450115c5';
const IMG_PREFIX = 'https://image.tmdb.org/t/p/w500';
let xhr;

function carregaFilmes () {
    xhr = new XMLHttpRequest ();

    xhr.open ('GET', TMDB_ENDPOINT + '/movie/popular' + '?api_key=' + APIKEY, true);
    xhr.onload = exibeFilmes;
    xhr.send();
}

const handleSearch = () => {
    let inputSearch = document.getElementById("inputSearch").value;
    console.log(inputSearch);
    let result;
    let divResultados = document.getElementById("resultSearch");
    
    
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=3860a142a4bd3cc6ec1b30a2a29096c9&language=pt-br-US&query=${inputSearch}&page=1&include_adult=false`)
        .then(response => response.json())
        .then(data => {
            console.log(data.results)
            result = data.results;
            let divResults = document.getElementById("results");
            divResults.innerHTML = '';

            if(result.length > 0){
                divResultados.classList.remove("resultados");
                result.map(movie=> {
                    const url = `https://www.themoviedb.org/movie/${movie.id}?language=pt-BR`;
                    //divResults.insertAdjacentHTML("beforeend", `<li><a class = "linkMovies" href = "${url}">${movie.title}</a></li>`);
                    divResults.insertAdjacentHTML("beforeend", `
                    <div class = "container" id = "results">
                        <div class="row">
                            <div class = "col-12" id = "box-filmes">
                                <div class = "col-12 col-sm-12 col-md-12 col-lg-3 col-xl-3">
                                    <img src="https://www.themoviedb.org/t/p/w220_and_h330_face/${movie.poster_path}">
                                </div>
                                <div class = "col-12 col-sm-12 col-md-12 col-lg-9 col-xl-9">
                                    <span class = "movieTitle">${movie.title}</span><br>
                                    <span class = "movieCreditos">${movie.overview}</span><br>
                                    <span class = "movieText">${movie.release_date}</span><br>
                                    <a href="${url}"> Leia mais...</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    `);
                });
            }else{
                divResults.insertAdjacentHTML("beforeend", `<p>Nenhum filme encontrado!</p>`);
            }
            
        });
}

function exibeFilmes () {
    
    let data = JSON.parse (xhr.responseText);
    let textoHTML = '';

    for (let i = 0; i < 6; i++) {
        let nomeFilme = data.results[i].title;
        let sinopse = data.results[i].overview;
        let imagem = IMG_PREFIX + data.results[i].poster_path;
        let id =  data.results[i].id;
        const url = `https://www.themoviedb.org/movie/${id}?language=pt-BR`;

        textoHTML += `<div class="card-dark col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3 m-4  ">
            <img src="${imagem}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${nomeFilme}</h5>
                <p class="card-text">${sinopse}</p>
                
                <a target= "_blank" href="${url}" class="btn-mv btn btn-secondary"> Leia mais...</a>
            </div>
        </div>`
    }

    document.getElementById('tela').innerHTML = textoHTML;
}

carregaFilmes()



//fetch('http://example.com/movies.json').then(response => response.json()).then(data => console.log(data));//