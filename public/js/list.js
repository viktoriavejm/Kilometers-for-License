let navB = document.getElementById('NavPic');

function openNav() {
    if (navB.style.rotate == '-90deg') {
        document.getElementById('body').style.backgroundImage = 'url(./img/straße.webp)'
        // document.getElementById('body').style.backgroundImage = 'none'
        // document.getElementById('body').style.backgroundColor = 'white'
        document.getElementById('NavPic').style.transition = 'all ease-in-out 0.3s'
        navB.style.rotate = '0deg'

        document.getElementById('links').style.display = 'none'
        document.getElementById('list-km-grid').style.display = 'grid'

        
    }else{

        //Links werden angezeigt
        document.getElementById('body').style.backgroundImage = 'none'
        document.getElementById('body').style.backgroundColor = '#5588A3'
        document.getElementById('NavPic').style.transition = 'all ease-in-out 0.3s'
        navB.style.rotate = '-90deg'
        document.getElementById('links').style.display = 'grid'
        document.getElementById('list-km-grid').style.display = 'none'
    }
}

function loadList() {
    fetch(`/get-km`)
    .then( (response) => {
        return response.json();
    })
    .then( (data) => {
        console.log(data);

        let html_code =
			`<div>
				<p class="gridhead">Kilometers</p>
				<p class="gridhead">Date</p>
				<p class="gridhead">Companion</p>	
			 </div>`;
		for (let i = 0; i < data.result.length; i++) {
            
			html_code +=
				`<div>
					<p>${data.result[i].kmNumber}</p>
					<p>${data.result[i].date}</p>
					<p>${data.result[i].parent}</p>
				</div>`
		}
		// HTML Code ins DOM einfügen
		document.getElementById('list-km-grid').innerHTML = html_code;

    })
    .catch( (error) => {
        throw error;
    })
}

loadList()