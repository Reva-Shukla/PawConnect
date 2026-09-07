export const SHELTERS = [
  { name: "Animals Care Association Rajpura", city: "Rajpura", code: "RJP" },
  { name: "Tricity Stray Rescue Network & Helpline", city: "Chandigarh", code: "TRI" },
  { name: "Pets Heaven Boarding & Welfare Registry", city: "Zirakpur", code: "HEV" },
  { name: "Society for the Prevention of Cruelty to Animals (SPCA)", city: "Chandigarh", code: "SPC" },
  { name: "Animal Birth Control (ABC) Programme Centre", city: "Chandigarh", code: "ABC" },
  { name: "Furever Friends Foundation", city: "Mohali", code: "FUR" },
  { name: "Guardians of All Voiceless Animals", city: "Patiala", code: "GAV" },
  { name: "Furnfluffs Animal Welfare Association", city: "Zirakpur", code: "FLF" },
  { name: "Dog Rescue Organisation", city: "Yamunanagar", code: "DRO" },
  { name: "JUSTDOGS Pet Welfare Network", city: "Chandigarh", code: "JDG" },
  { name: "Whooftown - The Dog Kingdom", city: "New Chandigarh", code: "WTF" },
  { name: "Waheguru Animal Welfare Group", city: "Zirakpur", code: "WAH" },
];
export const ANIMAL_TYPES = ["Dog", "Cat", "Rabbit", "Bird"];
const BREEDS = {
  Dog: ["Golden Retriever", "Labrador", "German Shepherd", "Beagle", "Indie Dog"],
  Cat: ["Persian", "Indian Shorthair", "Siamese", "Maine Coon", "Domestic Shorthair"],
  Rabbit: ["Holland Lop", "Mini Rex", "Dutch Rabbit", "Lionhead", "Netherland Dwarf"],
  Bird: ["Budgerigar", "Cockatiel", "Lovebird", "Finch", "Canary"],
};
const TYPE_COUNTS = [
  { type: "Dog", count: 12 },
  { type: "Cat", count: 6 },
  { type: "Rabbit", count: 4 },
  { type: "Bird", count: 3 },
];
const HEALTH_STATUSES = ["Healthy", "Healthy", "Healthy", "Under Observation", "Recovering"];
const VACCINATION_STATUSES = [
  "Fully Vaccinated",
  "Fully Vaccinated",
  "Partially Vaccinated",
  "Due for Booster",
];
const PET_NAMES = [
  "Bruno", "Bella", "Luna", "Milo", "Coco", "Rocky", "Daisy", "Max", "Lucy", "Oreo",
  "Charlie", "Bailey", "Molly", "Buddy", "Sadie", "Duke", "Zoe", "Jack", "Chloe", "Toby",
  "Rosie", "Cooper", "Ruby", "Oscar", "Lily", "Leo", "Gracie", "Teddy", "Nala", "Winston",
  "Piper", "Bear", "Maggie", "Finn", "Sasha", "Loki", "Ellie", "Simba", "Roxy", "Diesel",
  "Stella", "Zeus", "Penny", "Rex", "Mia", "Bandit", "Willow", "Thor", "Hazel", "Shadow",
  "Pepper", "Blue", "Sunny", "Ginger", "Peanut", "Biscuit", "Cookie", "Waffles", "Pretzel", "Noodle",
  "Marbles", "Pickle", "Muffin", "Jellybean", "Cinnamon", "Nutmeg", "Maple", "Clover", "Pumpkin", "Honey",
  "Amber", "Ash", "Aspen", "Autumn", "Birch", "Blaze", "Breeze", "Brooke", "Cedar", "Cloud",
  "Comet", "Cosmo", "Crystal", "Dash", "Dawn", "Dusty", "Ebony", "Echo", "Ember", "Fable",
  "Falcon", "Feather", "Fern", "Flame", "Flint", "Fog", "Forest", "Frost", "Gem", "Glacier",
  "Gypsy", "Harbor", "Haze", "Hunter", "Ivy", "Jasper", "Jet", "Juniper", "Kiwi", "Lark",
  "Laurel", "Meadow", "Mist", "Moss", "Nova", "Ocean", "Onyx", "Opal", "Orion", "Pearl",
  "Phoenix", "Prairie", "Rain", "Raven", "Reef", "River", "Rowan", "Sage", "Sky", "Slate",
  "Snow", "Sparrow", "Spirit", "Star", "Storm", "Summer", "Sunrise", "Thistle", "Timber", "Vale",
  "Violet", "Petunia", "Wren", "Aurora", "Sable", "Wisp", "Zephyr", "Blossom", "Brambly", "Cider",
  "Marigold", "Poppy", "Saffron", "Tulip", "Basil", "Dill", "Sorrel", "Chives", "Rosemary", "Basilio",
  "Barnaby", "Percy", "Reggie", "Wallace", "Gus", "Otis", "Hank", "Walter", "Arlo", "Chester",
  "Murphy", "Louie", "Sammy", "Benny", "Rufus", "Archie", "Ozzy", "Digby", "Chip", "Scout",
  "Copper", "Cardamom", "Gunner", "Marley", "Boomer", "Tucker", "Garnet", "Beau", "Doughy", "Biggie",
  "Kona", "Mochi", "Boba", "Taro", "Sushi", "Miso", "Ramen", "Udon", "Wasabi", "Ginseng",
  "Sprout", "Petal", "Buttercup", "Dandy", "Fizz", "Bubbles", "Pixie", "Fairy", "Sprite", "Glimmer",
  "Twinkle", "Shimmer", "Whisper", "Melody", "Harmony", "Serenade", "Lyric", "Ballad", "Sonnet", "Verse",
  "Casper", "Salem", "Jinx", "Midnight", "Domino", "Mocha", "Latte", "Espresso", "Java", "Brew",
  "Chai", "Matcha", "Bagel", "Croissant", "Bun", "Roll", "Crumpet", "Scone", "Tart", "Truffle",
  "Nugget", "Nibbles", "Whiskers", "Paws", "Socks", "Boots", "Patches", "Speckles", "Freckles", "Dots",
  "Stripe", "Spots", "Ziggy", "Iggy", "Fizzy", "Buzzy", "Buzz", "Dizzy", "Wiggle", "Wobble",
  "Bounce", "Hopper", "Skip", "Jump", "Rocket", "Sprint", "Zoom", "Flash", "Bolt", "Blitz",
  "Ranger", "Cadet", "Trooper", "Captain", "Major", "Colonel", "Sarge", "Chief", "Duchess", "Baronet",
  "Baron", "Countess", "Princess", "King", "Queenie", "Empress", "Earl", "Lady", "Sir", "Knight",
  "Wizard", "Sorcerer", "Merlin", "Sherlock", "Watson", "Sam", "Biscotti", "Archer", "Boulder", "Pocket",
];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
function pad2(n) {
  return n < 10 ? "0" + n : "" + n;
}
function buildCheckupDate(seed) {
  const day = (seed % 28) + 1;
  const month = MONTHS[(seed * 3) % 12];
  const year = seed % 5 === 0 ? 2026 : 2025;
  return `${pad2(day)} ${month} ${year}`;
}
function buildDescription(name, type, breed, gender, shelterName) {
  const pronoun = gender === "Male" ? "He" : "She";
  return `${name} is a friendly ${breed} ${type.toLowerCase()} currently cared for at ${shelterName}. ${pronoun} is affectionate, good with people, and settling in well while waiting for a loving forever home.`;
}
export function buildPetImage(type, breed, id) {
  const typeQuery = (type || "dog").toLowerCase();
  const breedQuery = (breed || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  const query = breedQuery ? `${typeQuery},${breedQuery}` : typeQuery;
  return `https://loremflickr.com/400/300/${query}?lock=${id}`;
}
function generatePets() {
  const pets = [];
  let id = 1;
  let nameIndex = 0;
  for (const shelter of SHELTERS) {
    let genderToggle = 0;
    for (const { type, count } of TYPE_COUNTS) {
      const breedList = BREEDS[type];
      for (let i = 0; i < count; i++) {
        const name = PET_NAMES[nameIndex];
        nameIndex++;
        const breed = breedList[i % breedList.length];
        const gender = genderToggle % 2 === 0 ? "Male" : "Female";
        genderToggle++;
        const age = ((id * 7) % 10) + 1; // deterministic 1-10 years
        const health = HEALTH_STATUSES[id % HEALTH_STATUSES.length];
        const vaccination = VACCINATION_STATUSES[id % VACCINATION_STATUSES.length];
        const lastCheckup = buildCheckupDate(id);
        const image = buildPetImage(type, breed, id);
        pets.push({
          id,
          name,
          type,
          breed,
          age,
          gender,
          location: shelter.city,
          shelter: shelter.name,
          health,
          vaccination,
          lastCheckup,
          description: buildDescription(name, type, breed, gender, shelter.name),
          image,
        });

        id++;
      }
    }
  }
  return pets;
}
export const PETS = generatePets();

export default PETS;