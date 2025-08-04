// fetch('https: // something.com').then().catch().finally() 
/* NOTES: 
1.  new Promise(..) -> Creating a new Promise object
2. reslove,reject -> executor functions
3. setTimout() -> Is used to simulate asynchronous task.
4. If we don't call resolve() or reject() then the Promise never finishes and stays stuck in 'pending state'.
5. Promise allows you to write clean code for tasks that take time(like API Calls)
6. .then() => Run this when promise finishes.
7. When we use fetch(), it makes a request and returns a response object - but not the actual data yet. 




*/

/* 1. Creating separate promiseOne.then function */ 

const promiseOne = new Promise(function(resolve,reject){
    // Do an async task 
    // DB calls, cryptography, network

    setTimeout(function(){
        console.log('Async task 1 completed');
            resolve();  // if not present then promise will get stuck in penidng state.
    }, 1000)
    // resolve();  // If we place resolve here, then it will be executed first and then after 1 second the setTimeout function will be executed, which is not something we want.
});

promiseOne.then(function(){
    console.log("Promise 1 consumed");
});

/* 2. Using .then when creating a Promise */ 


new Promise(function(resolve, reject){
    setTimeout(function(){
        console.log("Async task 2 complete");
        resolve()
    }, 1000)
}).then(function(){
    console.log("Promise 2 consumed");
})


/* 3. Promise where parameters are being passed through */ 

const promiseThree = new Promise(function(resolve, reject){
    setTimeout(function(){
        console.log('Promise 3 in action');
        resolve({username: "Azhar", email: "azhar.s.alvi@gmail.com"})
    },1000)
});

promiseThree.then(function(user){
    console.log(user);
    console.log(user.username);
})


/* 4. Understanding how does reject work in promise 

a) if error = TRUE | A CATCH BLOCK IS A MUST ELSE IT WILL THROW AN ERROR! 
b) .finally() : Is a defualt command which will always run. 

*/ 

// const promiseFour = new Promise(function(resolve, reject){
//     setTimeout(function(){
//     let error = true; 
//     if(!error){
//         console.log('Promise 4 in action')
//         resolve({username:"Azhar", password: "123"})
//     }else {
//         reject("ERROR: Reject command is triggered")
//     }
// },1000)
// })
// No Catch Block


const promiseFour = new Promise(function(resolve, reject){
    setTimeout(function(){
    let error = false; 
    if(!error){
        console.log('Promise 4 in action')
        resolve({username:"Azhar", password: "123"})
    }else {
        reject("ERROR: Reject command is triggered")
    }
},1000)
})

promiseFour
.then((user) => {
    return user.username
}).
then((username) => {
    console.log(username);
}).
catch(function(error){
    console.log(error);
}).finally(() => console.log("This promise is either resolved or rejected | .finally is like a default command that will always run"))


/* 5.  Promise using the 'async' method

    a) "Hold on, let me wait until I get the result before moving on." (await)
    b) Without await, you'd just start everything at once and the tea would be a mess! 😅
    c) Async marks your code as asynchronous and allows us to use await.
    d) try ... catch handles any error that happens and gives a response.




*/ 


const promiseFive = new Promise(function(resolve, reject){
    setTimeout(function(){
        let error = false; 
        if(!error){
            console.log("Promise 5 in action");
            resolve({username: 'Azhar', password: '1234'})
        }else{
            reject("Error: The value of error is 'True'")
        }
    }, 1000)
})


async function consumerPromiseFive(){
    try{ 
        const response = await promiseFive
        console.log(response);
        console.log(response.username);
    } catch(error){
        console.log(error);
    }
}

consumerPromiseFive()


/* Sample example how we use async in action */ 
/*If you want something to run after the data loads,
 you need to put it after the await inside the async function — or trigger it from inside the .then() or try block. */


async function getAllUsers(){
    try{
        const response = await fetch('https://api.github.com/users/azharsaeedalvi')

        const data = await response.json()
        console.log(data);
    }catch(error){
        console.log("E: ", error);
    }
}

getAllUsers();



/* PROMISE CHAINING */ 

// fetch('https://api.github.com/users/azharsaeedalvi')
// .then((response) => {
//     return response.json(); 
// })
// .then((data) => {
//     console.log(data);
// })
// .catch((error) => {
// console.log(error);https://api.github.com/users/azharsaeedalvi
// });




fetch('https://api.github.com/users/azharsaeedalvi')
.then( function (response) {
    return response.json();
})
.then(function (data){
    console.log(`username : ${data.username}` )
})
.catch(function (error){
    console.log("Error you are getting: " + error )
});


/* Promise.all() : helps you run multiple promises in parallel and wait for all of them to finish.  */ 


const user1 = fetch('https://api.github.com/users/hiteshchoudhary').then(res => res.json());
const user2 = fetch('https://api.github.com/users/azharsaeedalvi').then(res => res.json());

Promise.all([user1, user2])
.then((users)=> {
    console.log("All users fetched"); 
    console.log(users);   // users.username will not work since users is returning an array.
})
.catch((err) => {
    console.log("Something went wrong:", err);
});

/* If you have to pull only user name in the above code then, you would require the code shown below */ 
const user5 = fetch('https://api.github.com/users/azharsaeedalvi');   // won't return an actual data, as this is 'RESPONSE OBJECT'
console.log(typeof user5, "TYPE OFFFFFFFFFFFFFFFFFFFFFFFFF");

const user3 = fetch('https://api.github.com/users/hiteshchoudhary').then(res => res.json());  //When we use fetch(), it makes a request and returns a response object - but not the actual data yet. 
const user4 = fetch('https://api.github.com/users/azharsaeedalvi').then(res => res.json());   // .json() part converts the response into usable JSON data. // even though before it, it is still of the type object, but it is in unreadable format.  
console.log(typeof user4, "TYPE 22222222222222OFFFFFFFFFFFFFFFFFFFFFFFFF");

Promise.all([user3,user4])
.then((users) => {
    console.log("All users fetched 2");
// METHOD 1: Show each username one by one
    console.log(users[0].login); // This will pull in the login information for the 1st user
    console.log(users[1].login) // This will pull in the login infrormation for the 2nd user
//METHOD 2: Loop through users and log usernames

users.forEach(users => {
    console.log("Username: ", users.login);
});

})
.catch((errors) => {
    console.log("Somthing went wrong :", errors);
});
