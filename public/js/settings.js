let navB = document.getElementById('NavPic');

function openNav() {
    if (navB.style.rotate == '-90deg') {
        document.getElementById('body').style.backgroundColor = 'white'
        document.getElementById('NavPic').style.transition = 'all ease-in-out 0.3s'
        navB.style.rotate = '0deg'

        document.getElementById('links').style.display = 'none'
        document.getElementById('settings-maxKM').style.display = 'grid'
        document.getElementById('sett').style.display = 'block'
        document.getElementById('saveSetting').style.display = 'grid'


    }else{

        //Links werden angezeigt
        document.getElementById('body').style.backgroundColor = '#5588A3'
        document.getElementById('NavPic').style.transition = 'all ease-in-out 0.3s'
        navB.style.rotate = '-90deg'
        document.getElementById('links').style.display = 'grid'
        
        document.getElementById('settings-maxKM').style.display = 'none'
        document.getElementById('sett').style.display = 'none'
        document.getElementById('saveSetting').style.display = 'none'
    }
}

function safeMaxKM() {

    if (document.getElementById('maxKM').value == '') {
        document.getElementById('error').innerHTML = `Enter a maximum mileage`
        return;
    }else{
        let max_km = document.getElementById('maxKM').value;

        localStorage.setItem('Syt_WebApp_Miles_MaxKM', max_km)
    }

    goalYESorNO()
   
}

function goalYESorNO() {
    console.log(localStorage.getItem('Syt_WebApp_Miles_Goal'))
    if (localStorage.getItem('Syt_WebApp_Miles_Goal') == 'true') {
    // console.log(localStorage.getItem('Syt_WebApp_Miles_Goal') == true)

        document.getElementById('goalP').innerHTML = 'Congratulations, you have reached your goal '
        document.getElementById('goalP').style.color = 'green'
        document.getElementById('goalP').style.fontSize = '1.2em'

    }
}

goalYESorNO()