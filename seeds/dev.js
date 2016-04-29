// const bcrypt = require("bcrypt"),
//     salt1 = bcrypt.genSaltSync(10),
//     salt2 = bcrypt.genSaltSync(10),
//     salt3 = bcrypt.genSaltSync(10);
//     hash1 = bcrypt.hashSync('feb61968', salt1)
//     hash2 = bcrypt.hashSync('passw0rd!', salt2)
//     hash3 = bcrypt.hashSync('breXi7%oon', salt3)

// exports.seed = function(knex, Promise) {
//   return Promise.join(
//     // Deletes ALL existing entries
//     knex('users').del(), 
    
//     // Inserts seed entries
//     knex('users').insert({id: 1,username: 'user1',email: 'email1@gmail.com',password:hash1, profile_pic:'http://i.imgur.com/fREIhi6.jpg'}),
//     knex('users').insert({id: 2,username: 'user2',email: 'email2@gmail.com',password:hash2}),
//     knex('users').insert({id: 3,username: 'user3',email: 'email3@gmail.com',password:hash3})
//     )//.then (() => {
//   //     return Promise.join(
//   //       // Deletes ALL existing entries
//   //       knex('reviews').del(), 
//   //       knex('photos').del(),
//   //       knex('places').del(),

//   //       // Inserts seed entries
//   //       knex('places').insert({id: 1, name: 'Galvanize', address: '44 Tehama St, San Francisco', lat: '37.775', lng: '-122.4183333',wifi:true,restrooms:true,coffee:true}),
//   //       knex('places').insert({id: 2, name: 'Java Beach Cafe', address: '1396 La Playa St, San Francisco',lat: '37.7604',lng: '-122.50914',wifi:false,restrooms:true,coffee:false}),
//   //       knex('places').insert({id: 3, name: 'Chinese Pavilion at Stow Lake', address: 'Golden Gate Park', lat: '37.7684', lng: '-122.4736', wifi:true,restrooms:true,coffee:true}),
//   //       knex('reviews').insert({id: 1, user_id: 1, place_id: 1, rating:4, wifi:true, restrooms:true, coffee:false, content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vitae quas nesciunt, cum dolorem. Amet quisquam doloribus illo quis provident sint quia recusandae ipsum molestias, architecto, modi pariatur consequuntur, laboriosam debitis?'}),
//   //       knex('reviews').insert({id: 7, user_id: 2, place_id: 1, rating:4, wifi:true, restrooms:true, coffee:false, content: 'test'}),

//   //       knex('reviews').insert({id: 2, user_id: 2, place_id: 2, rating:5, wifi:true, restrooms:true, coffee:true, content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vitae quas nesciunt, cum dolorem. Amet quisquam doloribus illo quis provident sint quia recusandae ipsum molestias, architecto, modi pariatur consequuntur, laboriosam debitis?'}),
//   //       knex('reviews').insert({id: 3, user_id: 3, place_id: 2, rating:4, wifi:true, restrooms:true, coffee:false, content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vitae quas nesciunt, cum dolorem. Amet quisquam doloribus illo quis provident sint quia recusandae ipsum molestias, architecto, modi pariatur consequuntur, laboriosam debitis?'}),
//   //       knex('reviews').insert({id: 4, user_id: 1, place_id: 2, rating:3, wifi:true, restrooms:false, coffee:true, content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vitae quas nesciunt, cum dolorem. Amet quisquam doloribus illo quis provident sint quia recusandae ipsum molestias, architecto, modi pariatur consequuntur, laboriosam debitis?'}),
//   //       knex('reviews').insert({id: 5, user_id: 2, place_id: 2, rating:2, wifi:false, restrooms:true, coffee:false, content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vitae quas nesciunt, cum dolorem. Amet quisquam doloribus illo quis provident sint quia recusandae ipsum molestias, architecto, modi pariatur consequuntur, laboriosam debitis?'}),
//   //       knex('reviews').insert({id: 6, user_id: 3, place_id: 2, rating:4, wifi:true, restrooms:false, coffee:true, content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vitae quas nesciunt, cum dolorem. Amet quisquam doloribus illo quis provident sint quia recusandae ipsum molestias, architecto, modi pariatur consequuntur, laboriosam debitis?'}),
//   //       knex('photos').insert({id: 1, user_id: 1, place_id: 1, url: 'http://galvanize-wp.s3.amazonaws.com/wp-content/uploads/2015/03/02192543/roof.jpg', caption: 'sunny day on the roof'}),
//   //       knex('photos').insert({id: 2, user_id: 1, place_id: 1, url: 'http://galvanize-wp.s3.amazonaws.com/wp-content/uploads/2015/03/02192456/Kubik-141013-Galvanize_0475.jpg'}),
//   //       knex('photos').insert({id: 3, user_id: 2, place_id: 2, url: 'http://www.davidsanger.com/images/sanfrancisco/3-1012-58.stowlake.m.jpg'})
//   //     )
//   //   });
// };
