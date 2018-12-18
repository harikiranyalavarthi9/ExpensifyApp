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

const {temp: temperature, city} = person.location;

console.log(`It's ${temperature} in ${city}`);


const book = {
    title: 'Baahubali',
    author: 'Vijayendra Prasad',
    publisher: {
        name: 'Arka Media'
    }
};

const {name: publisherName = 'K Ragavendra Rao Presents'} = book.publisher;

console.log(publisherName);