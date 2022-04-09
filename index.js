const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  // Iteration 3
  .then(() => {
    return Recipe.insertMany(data);
    /*
    return Recipe.create({
      title: 'Paella',
      level: 'UltraPro Chef',
      ingredients: ['rice', 'chicken', 'vegetables', 'saffron'],
      cuisine: 'Spanish',
      dishType: 'main_course',
      duration: 30,
      creator: 'Umar Bermejo'
    });
    */
  })
  // Logging my recipe's title
  //.then((recipe) => console.log(recipe.title))
  .then((recipes) =>
    recipes.forEach((recipe) =>
      console.log('These are the recipes names: ', recipe.title)
    )
  )
  // Iteration 4
  .then(() => {
    return Recipe.findOneAndUpdate(
      { title: 'Rigatoni alla Genovese' },
      { duration: 100 }
    );
  })
  .then(() => console.log('Success! The recipe was updated!'))
  // Iteration 5
  .then((recipes) => {
    return Recipe.deleteOne({ title: 'Carrot Cake' });
  })
  // Iteration 6
  .then(() => {
    console.log('The recipe was deleted successfully');
    return mongoose.disconnect;
  })
  .catch((error) => {
    console.error('Error connecting to the database', error);
  });
