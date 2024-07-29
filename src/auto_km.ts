import express from 'express'
import fsp from 'fs/promises'
import { interval  } from 'rxjs';
import { take } from 'rxjs';

const app = express();
app.use(express.json());
//server konfigurieren
const port = 4000;

const refreshInterval$ = interval(10000).pipe(
    take(1000000)
);

refreshInterval$.subscribe(() => {
    console.log('Aktualisiert');
})

interface Eingabe {
    kmNumber: number;
    date: string;
    parent: string;
}
let kmEingaben:Eingabe [] = [];

async function readKm() {
    const data:string = await fsp.readFile(__dirname + '/../data/kmStand.json', 'utf-8');
    kmEingaben = JSON.parse(data);

}
readKm();

//static file server starten
app.use(express.static(__dirname + '/../public'))

//server starten
app.listen(port,() =>{
    console.log('**Server gestartet**');
    console.log(`Erreichbar unter http://localhost:${port}`);
})

import ngrok from 'ngrok';
(async function () {
    const url = await ngrok.connect({
        authtoken: '2d20SNKZ3j4szIRQn2W2iHSIH08_89waxctUaQnXZ3B178mua',
        addr: port
    });
    console.log('**********ngrok Tunnel offen**********');
    console.log(url)
    console.log('');
})();

//GET ROUTE definieren
//Hocht auf http://localhost:3000/get-books

app.get('/get-km', (_req, res) => {
    let answer_json = {
        'result': kmEingaben
    }
    res.send(answer_json)
})

//GET ROUTE definieren
//Hocht auf http://localhost:3000 mit ID als Zahl
app.post('/add-km', (req, res) => {
    
    let auto_kmNumber = req.body.kmNumber;
    let auto_date = req.body.date;
    let auto_parent = req.body.parent;
    
    let pattern1Date = /^([0-2]{1})([0-9]{1}[.])([0-1]{1})([0-9]{1}[.])([2,1]{1})([0,9]{1})([1-9]{1})([1-9]{1})$/
    let pattern2Km = /^([1-9]{1}[0-9]{1,2})$/
    let pattern3Names = /^[a-zA-ZäöüÄÖÜß\-]+(?: [a-zA-ZäöüÄÖÜß\-]+)?$/

        if(pattern1Date.test(auto_date) && pattern2Km.test(auto_kmNumber) && pattern3Names.test(auto_parent)){
            let new_kmStand:Eingabe = {
                "kmNumber": auto_kmNumber,
                "date": auto_date,
                "parent": auto_parent
            
            }

   

    kmEingaben.push(new_kmStand);

    try{
        fsp.writeFile(__dirname + '/../data/kmStand.json', JSON.stringify(kmEingaben, null, 2), 'utf-8');
        console.log('New mileage');
        let answer_json = {'success': true}
        res.send(answer_json);
    }catch(error){
        let answer_json = {'success': false}
        res.send(answer_json)
    }
} else {
        res.send("Error")
    }
})

