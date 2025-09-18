const user = {
  id: 123,
  profile: {
    name: "Alice",
    details: {
      age: 30,
      city: "New York"
    }
  },
  preferences: {
    theme: "dark"
  }
};

// Destructuring to extract 'name' and 'city' from nested objects
const {
  profile: {
    name,
    details: {
      city
    }
  }
} = user;

console.log(name); // Output: Alice
console.log(city); // Output: New York

const numbers = [1, 2, 3]

const newNumbers = [...numbers, 4, 5 ]

console.log(newNumbers)