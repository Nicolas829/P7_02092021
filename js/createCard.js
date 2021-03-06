
import { getData } from "./api.js";


//appel DOM
let cardTitle = document.querySelector("h5")
let cardPreparation = document.getElementById("card-preparation")
let cardTime = document.getElementById("card-time")
let card = document.querySelector("div[data-main='main-card']")
let container = document.getElementById("main-row")


//fonction creation des cards
async function createCard() {

    let data = await getData();
    for (let i = 0; i < data.length; i++) {




        //on crée les carte pour chacune des recettes
        let cloneCard = card.cloneNode(true)
        cloneCard.id = cardTitle.id


        // on apelle les élements de chaque recette et on le flèche dans la card
        cardTitle.innerText = data[i].name;
        cardTitle.id = data[i].id

        cardPreparation.innerText = data[i].description
        cardTime.innerText = data[i].time + " min"
        cardTime.id = data[i].time + data[i].id


        container.appendChild(cloneCard)
        if (cloneCard.id == "card-title") {
            cloneCard.remove()

        }
        card.id = 0

        for (let p = 0; p < data[i].ingredients.length; p++) {

            let ingredientQuantity = document.createElement("li")
            ingredientQuantity.style.listStyle = "none"
            let cloneIngredient = document.createElement("p")
            let quantity = document.createElement("p")

            cloneIngredient.innerText = data[i].ingredients[p].ingredient + " : "

           
            ingredientQuantity.style.display = "flex"            
            ingredientQuantity.style.marginTop="1em"
           
                

            cloneIngredient.id = data[i].id + " pour " + data[i].name
            

            if (cloneIngredient.id.replace(" pour " + data[i].name, "") == cardTitle.id) {

                cardTitle.appendChild(ingredientQuantity)
                ingredientQuantity.appendChild(cloneIngredient)
                ingredientQuantity.style.fontSize = "0.5em"
                ingredientQuantity.appendChild(quantity)
                if (window.matchMedia("(max-width: 981px)").matches) {
                    ingredientQuantity.style.marginTop="0.5em"
                    ingredientQuantity.style.fontSize = "0.7em"}

                if (data[i].ingredients[p].quantity == undefined) {
                    ingredientQuantity.removeChild(quantity),
                        cloneIngredient.innerText = data[i].ingredients[p].ingredient + " "
                }
                if (data[i].ingredients[p].unit == undefined) {
                    quantity.innerText = "  " + data[i].ingredients[p].quantity
                }

                else { quantity.innerText = "  " + data[i].ingredients[p].quantity + " " + data[i].ingredients[p].unit }

            }
        }


    }

}

export { createCard }