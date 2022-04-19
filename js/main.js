//The user will enter a cocktail. Get a cocktail name, photo, and instructions and place them in the DOM

let ul = document.querySelector("ul");

function createList(cocktailsList) {
  for (let i = 0; i < cocktailsList.length; i++) {
    let li = document.createElement("li");
    let image = `<img src=${cocktailsList[i].strDrinkThumb}>`;
    li.innerHTML = `
    
    ${image}
        <h4>${cocktailsList[i].strDrink}</h4>
        <span class='hidden'>${cocktailsList[i].idDrink}</span>
    `;
    ul.appendChild(li);
  }
}

let cocktails;
fetch("https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic")
  .then((response) => response.json())
  .then((data) => {
    cocktails = data.drinks;
    createList(cocktails);
    let lis = document.querySelectorAll("li");
    return lis;
  })
  .then((x) => {
    x.forEach((l) => l.addEventListener("click", () => clickItem(l)));
  });

function clickItem(e) {
  console.log("clicked");
  let id = e.children[2].innerText;
  document.querySelector(".list").classList.toggle("hidden");
  document.querySelector(".details").classList.toggle("hidden");
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then((response) => response.json())
    .then((data) => data.drinks[0])
    .then((drink) => {
      console.log(drink);
      document.querySelector(".details img").src = drink.strDrinkThumb;
      document.querySelector(".details h2").innerText = drink.strDrink;
      document.querySelector(".details .ingredients").innerText =
        getIngredients(drink);
      document.querySelector(".details .instructions").innerText =
        drink.strInstructions;
    });
}

document.querySelector("button").addEventListener("click", backToAll);
function backToAll() {
  document.querySelector(".list").classList.toggle("hidden");
  document.querySelector(".details").classList.toggle("hidden");
}

function getIngredients(ing) {
  console.log(ing);
  let ingredients = "";
  for (let i = 1; i <= 15; i++) {
    ing[`strIngredient${i}`]
      ? (ingredients += `${ing[`strIngredient${i}`]} (${
          ing[`strMeasure${i}`]
        })\n`)
      : "";
  }
  return ingredients;
}
