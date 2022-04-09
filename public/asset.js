function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
}

const defColor = ['#ABB7F9', '#80D8FB', '#7CD985', '#D8E082', '#FAC484', '#FA959B', '#CC9EFE', '#86E3DA', '#F392E0', '#F7DC8E', '#91A2DC'];

const defEmoji = ["relaxed", "heart_eyes", "wink", "sunglasses", "face_with_cowboy_hat", "blush", 
  "cat", "rabbit", "lion_face", "tiger", "fox_face", "koala", "panda_face", "bear", "unicorn_face", "bee", "whale", "dolphin", "cow", "tropical_fish", "dog", "hamster", "mouse", "penguin", "hatched_chick", 
  "sun_with_face", "full_moon_with_face", "snowman", "butterfly", "rose", "cherry_blossom", "four_leaf_clover", "maple_leaf", "tulip", "deciduous_tree", "star2", "umbrella", "cactus", "mushroom", "seedling", "dizzy", "cloud", 
  "watermelon", "pretzel", "green_apple", "tangerine", "mango", "avocado", "cherries", "broccoli", "grapes", "croissant", "cupcake", "candy", "custard", "shaved_ice", "beverage_box", "cookie", "pizza", "bagel", "strawberry", "lemon", "cheese_wedge", "cake", "popcorn", "doughnut", "honey_pot", "tropical_drink", "melon", "chocolate_bar", 
  "dart", "female_fairy", "male_genie", "basketball", "football", "tennis", "table_tennis_paddle_and_ball", "art", "candle", "ribbon", "boat", "gem", "cupid", "crown", "jack_o_lantern", "ghost", "rainbow-flag", "balloon", "alien", "robot_face"];

function randomColor() {
  return defColor[getRandomInt(0, defColor.length)].substring(1).toLowerCase();
}

function randomEmoji() {
  return defEmoji[getRandomInt(0, defEmoji.length)];
}
