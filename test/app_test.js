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
		knex('places').insert({id:1,name:'We Work',address:'123 Telegraph St, Oakland, CA 94602'}),
		knex('places').insert({id:2,name:'They Work',address:'123 Howard St, San Francisco, CA 94601'}),
		knex('places').insert({id:3,name:'I Work',address:'123 MLK St, Berkeley, CA 94600'}),
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
		// Test to check that users & places are being deleted.
		// knex('places').del().then(places=>{
		// 	console.log('users:',users,'\n','places:',places);
		// });
		knex('places').del().then(places=>done());
	});
});

// Test login
// Test Sign-up


// Contact (static)
// About (static)


// Test for Users
xdescribe('GET /users',()=>{

	it('should respond with JSON', done=>{
		request(app)
		.get('/users')
		.expect('Content-type', /json/)
		.expect(200,done);
	});

	it('returns an array of all the users objects when responding with JSON', done=>{
		request(app)
		.get('/users')
		.end((err,res)=>{
			expect(res.body).to.deep.equal([{
				id:1,
				username:'Steve',
				email:'steve@me.com'
			},{
				id:2,
				username:'Forrest',
				email:'forrest@me.com'
			},{
				id:3,
				username:'Troy',
				email:'troy@me.com'
			}]);
			done();
		});
	});
});

xdescribe('GET /users/:id',()=>{

	it('returns the user with the requested id',done=>{
		request(app)
		.get('/users/2')
		.end((err,res)=>{
			expect(res.body).to.deep.equal({
				id:2,
				username:'Forrest',
				email:'forrest@me.com',
			});	
			done();
		});
	});

	it('returns a 404 error if there is no user with the given id',done=>{
		request(app)
		.get('/users/100')
		.end((err,res)=>{
			expect(res.status).to.equal(404);
			done();
		});
	});
});

xdescribe('GET /users/:id/edit',()=>{
	it('it returns the user with the requested id to edit',done=>{
		request(app)
		.get('/users/2/edit')
		.end((err,res)=>{
			expect(res.body.user.id).to.equal(2);
			expect(res.body.user.username).to.equal('Forrest');
			done();
		});
	});

	it('returns a 404 error if there is no user with the given id',done=>{
		request(app)
		.get('/users/100')
		.end((err,res)=>{
			expect(res.status).to.equal(404);
			done();
		});
	});
});

xdescribe('POST /users',()=>{
	var newUser = {
		user:{
			id:4,
			username:'Major Lazer',
			email:'majorlazer@me.com'
		}
	};

	var wrongData = {
		user:{
			username:2,
			email:'blackpan@me.com'
		}
	};
	
	it('adds the new user to the database', done=>{
		request(app)
		.post('/users')
		.type('form')
		.send(newUser)
		.end((err,res)=>{
			knex('users').then(users=>{
				expect(users).to.have.lengthOf(4);
				expect(users).to.deep.include(newUser.user);
				done();
			});
		});
	});

	it('it returns a 400 if incorrect data type is entered',done=>{
		request(app)
		.put('/users/3')
		.type('form')
		.send(wrongData)
		.end((err,res)=>{
			expect(err.statusCode).to.equal(400);
			done();
		});
	});
});

xdescribe('PUT /users/:id',()=>{

	var updUser = {
		user:{
			username:'Black Panther',
			email:'blackpan@me.com'
		}
	};

	var wrongData = {
		user:{
			username:2,
			email:'blackpan@me.com'
		}
	};

	it('updates the user in the database',done=>{
		request(app)
		.put('/users/3')
		.type('form')
		.send(updUser)
		.end((err,res)=>{
			knex('users').where('id',3).first().then(user=>{
				expect(user.username).to.equal(
					updUser.user.username);
				expect(user.email).to.equal(updUser.user.email);
				done();
			});
		});
	});

	it('it returns a 400 if incorrect data type is entered',done=>{
		request(app)
		.put('/users/3')
		.type('form')
		.send(wrongData)
		.end((err,res)=>{
			expect(err.statusCode).to.equal(400);
			done();
		});
	});

	it('it returns a 404 if the id cannot be found',done=>{
		request(app)
		.put('/users/100')
		.type('form')
		.send(updUser)
		.end((err,res)=>{
			expect(err.statusCode).to.equal(404);
			done();
		});
	});
});

xdescribe('DELETE /users/:id',()=>{

	it('removes the user from the database',done=>{
		request(app)
		.delete('/users/3')
		.end((err,res)=>{
			expect(res.body).to.deep.equal({
				id:3,username:'Troy',email:'troy@me.com'
			});
			done();
		});
	});

	it('it returns 404 if the id cannot be found',done=>{
		request(app)
		.delete('/users/100')
		.end((err,res)=>{
			expect(err.statusCode).to.equal(404);
			done();
		});
	});
});

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