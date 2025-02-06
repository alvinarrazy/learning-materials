interface Person {
  name: string;
  age: number;
}

const alvin: Person = {
  name: 'Alvin',
  age: 25,
};

function buildPerson(name: string = 'Nama belum ada', age: number = 0): Person {
  return {
    name,
    age,
  };
}

console.log(buildPerson());

interface Parent<T> extends Person {
  children?: Person[];
  goods?: T[];
}

interface House {
  length: number;
  width: number;
  height: number;
}

interface Mobil {
  doors: number;
}

const parentA: Parent<Mobil> = {
  name: 'Parent A',
  age: 35,
  goods: [
    {
      doors: 2,
    },
  ],
};
