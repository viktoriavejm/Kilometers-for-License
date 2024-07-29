

// const { max } = require("rxjs");

let navB = document.getElementById('NavPic');
let nav = document.getElementById('navBar')
let person = "";
let DateKM = "";

let max_km = localStorage.getItem('Syt_WebApp_Miles_MaxKM');

let goalAchieved = false;


let counter = 0;

loadKm()

function openNav() {
    if (navB.style.rotate == '-90deg') {
        document.getElementById('body').style.backgroundColor = 'white'
        document.getElementById('NavPic').style.transition = 'all ease-in-out 0.3s'
        navB.style.rotate = '0deg'

        document.getElementById('links').style.display = 'none'
        document.getElementById('Fortschritt').style.display = 'block'
        document.getElementById('input-content').style.display = 'grid'

        document.getElementById('info-text-bottom').style.display = 'block'
        document.getElementById('img-auto').style.display = 'block'
        document.getElementById('footer-grid').style.display = 'grid'
    }else{

        //Links werden angezeigt
        animateNav()
        
        document.getElementById('body').style.backgroundColor = '#5588A3'
        document.getElementById('NavPic').style.transition = 'all ease-in-out 0.3s'
        navB.style.rotate = '-90deg'
        document.getElementById('links').style.display = 'grid'
        document.getElementById('Fortschritt').style.display = 'none'
        document.getElementById('input-content').style.display = 'none'
        document.getElementById('info-text-bottom').style.display = 'none'
        document.getElementById('img-auto').style.display = 'none'
        document.getElementById('footer-grid').style.display = 'none'
    }

    function animateNav() {
        let element = document.getElementById("navBar");
        let opacity = 0;
        function fade() {
           if (opacity >= 1) {
              return;
           }
           opacity += 0.01;
           element.style.opacity = opacity;
           
        }
        requestAnimationFrame(fade);
    }
}

// function showFortschritt() {
//     fetch("/load-km", {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(km_data)
//     })
//     .then(response => response.json())
//     .then(data => {
//         console.log(data);

//         if (data.success) {
//           loadKm()
          
//         } else {
//             document.getElementById('ansW').innerHTML = `<h3>Something went wrong. Please try again</h3>`;
//         }
//     })
//     .catch(error => {
//         console.error('Fetch error:', error);
//     });
// }

let km = document.getElementById('kmNumber').value;
let date = document.getElementById('date').value;
let personName = document.getElementById('parent').value;

function addToList() {

  


    // let KilometerNumber = document.getElementById('kmNumber').value;

    // KmStände[counter] = KilometerNumber;
    // counter++;

    let kmNumberJS = document.getElementById("kmNumber").value;
    let dateJS = document.getElementById("date").value;
    let parentJS = document.getElementById("parent").value;

       

    let pattern1Date = /^([0-2]{1})([0-9]{1}[.])([0-1]{1})([0-9]{1}[.])([2,1]{1})([0,9]{1})([1-9]{1})([1-9]{1})$/
    let pattern2Km = /^([1-9]{1})([0-9]{1,2})?$/
    let pattern3Names = /^[a-zA-ZäöüÄÖÜß\-]+(?: [a-zA-ZäöüÄÖÜß\-]+)?$/

  if(kmNumberJS == "" || dateJS == "" || parentJS == "") {
      document.getElementById('ansW').innerHTML = `<h3>Please make sure all fields are filled out</h3>`;
  } else if(!pattern1Date.test(dateJS)){
    document.getElementById('ansW').innerHTML = `<h3>Enter a valid date (TT.MM.JJJJ)</h3>`;
  }else if (!pattern2Km.test(kmNumberJS)) {
    document.getElementById('ansW').innerHTML = `<h3>Enter numbers for kilometers that are greater than 0 and less than 1000 and that do not contain special characters and letters(z.B 325)</h3>`;
  }else if (!pattern3Names.test(parentJS)) {
    document.getElementById('ansW').innerHTML = `<h3>Enter a valid name</h3>`;
  }else{

    
    let km_data = {
        kmNumber: kmNumberJS,
        date: dateJS,
        parent: parentJS
    };

  fetch("/add-km", {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(km_data)
  })
  .then(response => response.json())
  .then(data => {
      console.log(data);

      if (data.success) {
        loadKm()
        
      } else {
          document.getElementById('ansW').innerHTML = `<h3>Something went wrong. Please try again</h3>`;
      }
  })
  .catch(error => {
      console.error('Fetch error:', error);
  });

  
}}

function loadKm() {
    fetch("/get-km", {
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);

        console.log(data.result)
        
        
        document.getElementById('Fortschritt').innerHTML = ''

        let kmFortschritt = 0;

        for (let i = 0; i < data.result.length; i++) {
            kmFortschritt += parseFloat(data.result[i].kmNumber);           
            
        }

       yesORno(kmFortschritt)

            if (max_km == null) {
                max_km = 0
            }
            
            document.getElementById('Fortschritt').innerHTML = `${kmFortschritt} / ${max_km} Km`
            document.getElementById('Fortschritt').style.textAlign = 'center'

            document.getElementById("kmNumber").value = ''
            document.getElementById("date").value = ''
            document.getElementById("parent").value = ''
        
    })
    .catch(error => {
        console.error('Fetch error:', error);
    });
}



function yesORno(fortschritt) {
    if (fortschritt >= max_km) {
        if (fortschritt == 0 && max_km == 0) {
            goalAchieved = false;
            localStorage.setItem('Syt_WebApp_Miles_Goal', goalAchieved)
        }else{
            goalAchieved = true;
            localStorage.setItem('Syt_WebApp_Miles_Goal', goalAchieved)
        }
    }else{
        goalAchieved = false;
        localStorage.setItem('Syt_WebApp_Miles_Goal', goalAchieved)

    }
}

loadKm()





