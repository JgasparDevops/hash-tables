const pokemons = require('./data-ramdom.json')
class HashTable {
  constructor(size) {
    this.data = new Array(size);
  }
  hashMethod(key) {                                            // get hash
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash = (hash + key.charCodeAt(i) * i) % this.data.length;
    }
    return hash;
  }
  set(key, value) {                                            // add a new item
    const address = this.hashMethod(key);
    if (!this.data[address])this.data[address] = [];
    this.data[address].push([key, value]);
    return this.data;
  }

  get(key) {                                                    // get a item
    const address = this.hashMethod(key);
    const currentBucket = this.data[address]
    if(currentBucket){
      for(let i = 0; i < currentBucket.length; i++) {
        if(currentBucket[i][0] === key){
          return currentBucket[i][1]
        }
      }
    }
    return undefined
  }

  delete(key) {                                                 // delete item
    const address = this.hashMethod(key);
    const currentBucket = this.data[address]
    if(currentBucket.length ){
      for(let i = 0; i < currentBucket.length; i++) {
        if(currentBucket[i][0] === key){
          const deleted = currentBucket[i]
          currentBucket.splice(i, 1)
          if(this.data[address].length === 0) delete this.data[address]
          return deleted
        }
      }
      
    }
    return undefined
  }

  getAllKeys(){                                                 // get all keys 
   return  this.data.flat().map(a => a[0]);
  }
}

const myHashTable = new HashTable(pokemons.results.length);
console.log(myHashTable)
console.time('set')
pokemons.results.forEach(pokemon => {
  myHashTable.set(pokemon.name, pokemon.url)
})
console.timeEnd('set') // between 4 - 5 ms 


console.time('get')
console.log(myHashTable.get('meowth-galar')) // of 5000 records the longest it lasted was 0.05 ms
console.timeEnd('get')

console.time('delete')
console.log(myHashTable.delete('ambipom')) // // between 1 - 2 ms 
console.timeEnd('delete')

console.time('getAllKeys')
console.log(myHashTable.getAllKeys()) // between 4 -  9 ms 
console.timeEnd('getAllKeys')





