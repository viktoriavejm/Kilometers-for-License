"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const promises_1 = __importDefault(require("fs/promises"));
const rxjs_1 = require("rxjs");
const rxjs_2 = require("rxjs");
const app = (0, express_1.default)();
app.use(express_1.default.json());
const port = 4000;
const refreshInterval$ = (0, rxjs_1.interval)(10000).pipe((0, rxjs_2.take)(1000000));
refreshInterval$.subscribe(() => {
    console.log('Aktualisiert');
});
let kmEingaben = [];
function readKm() {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield promises_1.default.readFile(__dirname + '/../data/kmStand.json', 'utf-8');
        kmEingaben = JSON.parse(data);
    });
}
readKm();
app.use(express_1.default.static(__dirname + '/../public'));
app.listen(port, () => {
    console.log('**Server gestartet**');
    console.log(`Erreichbar unter http://localhost:${port}`);
});
const ngrok_1 = __importDefault(require("ngrok"));
(function () {
    return __awaiter(this, void 0, void 0, function* () {
        const url = yield ngrok_1.default.connect({
            authtoken: '2d20SNKZ3j4szIRQn2W2iHSIH08_89waxctUaQnXZ3B178mua',
            addr: port
        });
        console.log('**********ngrok Tunnel offen**********');
        console.log(url);
        console.log('');
    });
})();
app.get('/get-km', (_req, res) => {
    let answer_json = {
        'result': kmEingaben
    };
    res.send(answer_json);
});
app.post('/add-km', (req, res) => {
    let auto_kmNumber = req.body.kmNumber;
    let auto_date = req.body.date;
    let auto_parent = req.body.parent;
    let new_kmStand = {
        "kmNumber": auto_kmNumber,
        "date": auto_date,
        "parent": auto_parent
    };
    kmEingaben.push(new_kmStand);
    try {
        promises_1.default.writeFile(__dirname + '/../data/kmStand.json', JSON.stringify(kmEingaben, null, 2), 'utf-8');
        console.log('New mileage');
        let answer_json = { 'success': true };
        res.send(answer_json);
    }
    catch (error) {
        let answer_json = { 'success': false };
        res.send(answer_json);
    }
});
