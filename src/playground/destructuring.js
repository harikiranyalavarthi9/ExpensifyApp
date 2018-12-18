//Object Destructuring

const person = {
    name: 'Hari',
    age: 23,
    location: {
        city: 'Atlanta',
        temp: 55
    }
};

const {name: firstName = 'Anonymous', age} = person;
console.log(`${firstName} is ${age}.`);

const {temp: temperature, city: cityName} = person.location;

console.log(`It's ${temperature} in ${cityName}`);

//Personal Challenge
const book = {
    title: 'Baahubali',
    author: 'Vijayendra Prasad',
    publisher: {
        name: 'Arka Media'
    }
};

const {name: publisherName = 'K Ragavendra Rao Presents'} = book.publisher;

console.log(publisherName);

//Array destructuring

const address = ['550 Pharr Rd NE', 'Atlanta', 'GA', 30324];

const [, , state='Georgia'] = address;

console.log(`You are in ${state}`);


const item = ['Coffee (hot)', '$2.00', '$2.50', '$2.75'];

const[itemName, , mediumPrice] = item;

console.log(`A medium ${itemName} costs ${mediumPrice}`);