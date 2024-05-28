const Person = require('./personModel');

//create and save person//
const createAndSavePerson = (done) => {
  const newPerson = new Person({
    name: 'John Doe',
    age: 25,
    favoriteFoods: ['Pizza', 'Burger']
  });

  newPerson.save((err, data) => {
    if (err) return console.error(err);
    done(null, data);
  });
};


//create many people
const createManyPeople = (arrayOfPeople, done) => {
    Person.create(arrayOfPeople, (err, people) => {
      if (err) return console.error(err);
      done(null, people);
    });
  };
  
  const arrayOfPeople = [
    { name: 'Alice', age: 30, favoriteFoods: ['Pasta', 'Salad'] },
    { name: 'Bob', age: 22, favoriteFoods: ['Steak', 'Fries'] },
    { name: 'Charlie', age: 35, favoriteFoods: ['Sushi', 'Ramen'] }
  ];
  
  createManyPeople(arrayOfPeople, (err, data) => {
    if (err) return console.error(err);
    console.log(data);
  });
  

  //find people by name
  const findPeopleByName = (name, done) => {
    Person.find({ name }, (err, people) => {
      if (err) return console.error(err);
      done(null, people);
    });
  };


  //Find One Person by Favorite Food:
  const findOneByFood = (food, done) => {
    Person.findOne({ favoriteFoods: food }, (err, person) => {
      if (err) return console.error(err);
      done(null, person);
    });
  };

  //Find Person by ID:
  const findPersonById = (personId, done) => {
    Person.findById(personId, (err, person) => {
      if (err) return console.error(err);
      done(null, person);
    });
  };
  
  //Classic Update (Find, Edit, Save):
  const findEditThenSave = (personId, done) => {
    Person.findById(personId, (err, person) => {
      if (err) return console.error(err);
      
      person.favoriteFoods.push('hamburger');
      person.save((err, updatedPerson) => {
        if (err) return console.error(err);
        done(null, updatedPerson);
      });
    });
  };
  
  //Find One and Update:
  const findAndUpdate = (personName, done) => {
    const ageToSet = 20;
    
    Person.findOneAndUpdate({ name: personName }, { age: ageToSet }, { new: true }, (err, updatedPerson) => {
      if (err) return console.error(err);
      done(null, updatedPerson);
    });
  };
  
  //Delete Records
  const removeById = (personId, done) => {
    Person.findByIdAndRemove(personId, (err, removedPerson) => {
      if (err) return console.error(err);
      done(null, removedPerson);
    });
  };
  
  //Delete Many People by Name:
  const removeManyPeople = (done) => {
    const nameToRemove = 'Mary';
    
    Person.remove({ name: nameToRemove }, (err, result) => {
      if (err) return console.error(err);
      done(null, result);
    });
  };
  
  // Chain Search Query Helpers
  const queryChain = (done) => {
    Person.find({ favoriteFoods: 'burritos' })
      .sort('name')
      .limit(2)
      .select('-age')
      .exec((err, data) => {
        if (err) return console.error(err);
        done(null, data);
      });
  };
  