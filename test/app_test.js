process.env.NODE_ENV = 'test';
const request = require('supertest'),
	expect = require('chai').expect,
	app = require('../app'),
	knex = require('../db/knex');

beforeEach(done=>{
	return Promise.all([
		knex('users').insert({id:1,username:'Steve',email:'steve@me.com',password:'first'}),
		knex('users').insert({id:2,username:'Forrest',email:'forrest@me.com',password:'second'}),
		knex('users').insert({id:3,username:'Troy',email:'troy@me.com',password:'third'}),
		knex('places').inser({id:1,name:'We Work',address:'123 Telegraph St, Oakland, CA 94602'}),
		knex('places').inser({id:2,name:'They Work',address:'123 Howard St, San Francisco, CA 94601'}),
		knex('places').inser({id:3,name:'I Work',address:'123 MLK St, Berkeley, CA 94600'}),
		knex('places').insert({id:4,name:'Galvanize',address:'44 Tehama St, San Francisco, CA 94500'})
		]).then(()=>{
			return Promise.all([
				knex('photos').insert({id:1, url:'https://nyoobserver.files.wordpress.com/2015/06/gettyimages-479699835.jpg?quality=80',caption:'Oakland CodeSpot',user_id:1,place_id:1}),
				knex('photos').insert({id:2, url:'https://si.wsj.net/public/resources/images/BN-MZ759_WEWORK_P_20160309161150.jpg',caption:'SF CodeSpot',user_id:2,place_id:2}),
				knex('photos').insert({id:3, url:'https://wework-com.imgix.net/s3_images/20140304_Chinatown_DC-41.jpg',caption:'Berkeley CodeSpot',user_id:3,place_id:3}),
				knex('photos').insert({id:4, url:'https://pbs.twimg.com/media/CMZXQrMUAAAerYj.jpg',caption:'SF CodeSpot',user_id:1,place_id:4}),
				knex('reviews').insert({id:1,content:'This place rocks',user_id:2,place_id:1}),
				knex('reviews').insert({id:2,content:'It\'s an alright place.',user_id:1,place_id:2}),
				knex('reviews').insert({id:1,content:'Love it here',user_id:3,place_id:4}),
				]).then(()=>done());
		});
});

afterEach(done=>{
	knex('users').del().then(users=>{
		knex('places').del().then(places=>done());
	});
});

// Test login
// Test Sign-up


// Contact (static)
// About (static)


// Test for Users
describe('GET /users',()=>{
	it('should return JSON', done=>{
		request(app)
		.get('/users')
		.expect('Content-type', /json/)
		.expect(200,done);
	});

	
});

describe('GET /users/:id',()=>{});
describe('POST /users',()=>{});
describe('PUT /users/:id',()=>{});
describe('DELETE /users/:id',()=>{});

// Test for places
describe('GET /places',()=>{});
describe('GET /places/:id',()=>{});
describe('POST /places',()=>{});
// describe('PUT /places/:id',()=>{});
// describe('DELETE /places/:id',()=>{});

// Test for reviews
describe('GET /places/:id/reviews',()=>{});
describe('GET /places/:id/reviews/:id',()=>{});
describe('POST /places/:id/reviews',()=>{});
describe('PUT /places/:id/reviews/:id',()=>{});
describe('DELETE /places/:id/reviews/:id',()=>{});

// Test for photos
describe('GET /places/:id/photos',()=>{});
// describe('GET /places/:id/photos/:id',()=>{})
describe('POST /places/:id/photos',()=>{});
describe('PUT /places/:id/photos/:id',()=>{});
describe('DELETE /places/:id/photos/:id',()=>{});

// Using Bcrypt to hash the passwords
// bcrypt.hash('password',SALT,(err,hash)=>{
// 	knex('users').insert({username:'Stevejrmc',password:hash,email:'steve@me.com'});
// });