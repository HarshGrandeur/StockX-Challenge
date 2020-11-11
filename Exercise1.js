
let shoeData = [
  {
    name: "Jordan 1",
    size: 9,
  },
  {
    name: "Yeezy 350",
    size: 10,
  },
  {
    name: "SB Dunk",
    size: 10,
  },
  {
    name: "SB Dunk",
    size: 9,
  },
  {
    name: "Jordan 1",
    size: 8,
  },
  {
    name: "Jordan 1",
    size: 3,
  },
  {
    name: "Jordan 1",
    size: 4,
  },
  {
    name: "Jordan 11",
    size: 3,
  },
];

function findMany(shoeData, filter){

 var my_json = JSON.stringify(shoeData);
 var filtered_json = find_in_object(JSON.parse(my_json), filter);
  
  return filtered_json;
  
      
}

function find_in_object(my_object, my_criteria){

  return my_object.filter(function(obj) {
    return Object.keys(my_criteria).every(function(c) {
      return obj[c] == my_criteria[c];
    });
  });

}

describe("findMany", function () {
  it("returns shoes that match by size", function () {
    let results = findMany(shoeData, { size: 9 });
    expect(results.length).toEqual(2);
    expect(results[0].size).toEqual(9);
    expect(results[1].size).toEqual(9);
  });

  it("returns shoes that match by name", function () {
    let results = findMany(shoeData, { name: "Jordan 1" });
    expect(results.length).toEqual(4);
    expect(results[0].name).toEqual("Jordan 1");
    expect(results[1].name).toEqual("Jordan 1");
    expect(results[2].name).toEqual("Jordan 1");
    expect(results[3].name).toEqual("Jordan 1");
  });

  it("returns shoes that match by name and size", function () {
    let results = findMany(shoeData, { name: "Jordan 1", size: 3 });
    expect(results.length).toEqual(1);
    expect(results[0].name).toEqual("Jordan 1");
    expect(results[0].size).toEqual(3);
  });
});


//  function definition of findOne
function findOne(shoeData, filter){

     var shoe = null;
     var shoes = findMany(shoeData, filter);
     
     if(shoes != null)
        return shoes[0];
     return shoe;
}



describe("findOne", function () {
  it("returns a shoe that matches by size", function () {
    let result = findOne(shoeData, { size: 4 });
    expect(result.size).toEqual(4);
  });

  it("returns a shoe that matches by name", function () {
    let result = findOne(shoeData, { name: "Jordan 11" });
    expect(result.name).toEqual("Jordan 11");
  });

  it("returns a shoe that matches by name and size", function () {
    let result = findOne(shoeData, { name: "Jordan 1", size: 3 });
    expect(result.name).toEqual("Jordan 1");
    expect(result.size).toEqual(3);
  });
});

// load jasmine htmlReporter
(function () {
  var env = jasmine.getEnv();
  env.addReporter(new jasmine.HtmlReporter());
  env.execute();
})();
