button = document.getElementById('generate-button');
textDisplay = document.getElementById('display-text');
resetButton = document.getElementById('reset-button')

let characters = ['Obi-Wab Kenobi', 'Darth Vader', 'Anakin Skywalker', 'Luke Skywalker', 'Yoda', 'Han Solo', 'Leia', 'Chewbacca', 'Captain Rex', 'Commander Cody', 'Darth Maul', 'Darth Sidious', 'General Grievous'];
let weapons = ['Lightsaber', 'Blaster Pistol', 'Flamethrower', 'Bo-rifle', 'Thermal Detonator', 'Rocket Launcher', 'Sniper Rifle', 'Disruptor Rifle'];
let planets = ['Hoth', 'Tatooine', 'Yavin', 'Coruscant', 'Kashyyyk', 'Naboo', 'Geonosis'];

const generateRandNum = num => {
  return Math.floor(Math.random() * num);
}

const generateMessage = () => {
  let character1 = characters[generateRandNum(characters.length)];
  // console.log(character1)
  let character2 = characters[generateRandNum(characters.length)];
  while (character1 === character2) {
    character2 = characters[generateRandNum(characters.length)];
  }
  let weapon = weapons[generateRandNum(weapons.length)]
  let planet = planets[generateRandNum(planets.length)]
  return `${character1} defeated ${character2} with a ${weapon} on ${planet}`;
}

const displayMessage = () => {
  textDisplay.innerHTML = generateMessage();
  resetButton.style.display = 'block';
}

const resetMessage = () => {
  resetButton.style.display = 'none';
  textDisplay.innerHTML = 'Click below to generate your random message!';
}  

button.addEventListener('click', displayMessage);
resetButton.addEventListener('click', resetMessage);
