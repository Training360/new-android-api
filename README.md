# T360 Jingle Randi - Demo Backend

Ahogy azt a kódból láthatod is, rendkívül egyszerű kis Node script szolgál most backendként. 

Amit a működésről érdemes tudni:
* Indításkor a data.json-ből tölti be azt a néhány adatot. Ezt majd később bővítem kicsit.
* Az adatokkal memóriában dolgozik, nem menti őket se diskre, se adatbázisba. 
* Lassúnak tűnhet a response, ez szándékos, van benne egy random 1-5 mp-es várakozás, így jobban lehet a loading animációkkal is dolgozni.
* A képeket az ./uploads könyvtárba tölti fel. 

Ennyi!

## Szerver setup

Mindenek előtt legyen telepítve a legfrissebb [*Node.js*](https://nodejs.org/en/). 

Innentől két parancs az egész:
* npm install
* npm run start

Ha elhasalna valahol azt a konzolból szépen látni fogod, ez esetben csak simán indítsd újra.

## Lekérdezések

Az összes személy lekérése:
`curl localhost:8080/persons`

Egy konkrét személy lekérése index alapján: 
`curl localhost:8080/persons/3`

Kép feltöltése (a bradley_cooper1.jpg-et mellékeltem):
`curl -F "image=@bradley_cooper1.jpg" localhost:8080/upload`

Kép elérése (ezt curl helyett a böngészőben nézd meg):
`localhost:8080/static/bradley_cooper1.jpg`

Személy feltöltése:
`curl -H "Content-Type: application/json" -X POST -d '{
        "avatar": "localhost:8080/static/bradley_cooper1.jpg",
        "name": "Bradley",
        "rating": 3,
        "job": "Mesterlövész",
        "age": 35,
        "introduction": "Alapvetően mesterlövész vagyok, meg másnapos, de mostanában musicalekben is szerepelek.\n\n Wannabe kémikus is vagyok."
}' localhost:8080/persons`