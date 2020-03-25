describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');
    cy.visit('http://localhost:3000');
    cy.request('POST', 'http://localhost:3003/api/users',{username: 'root', password: 'root', name: 'root'});
  });

  it('Login from is shown', function() {
    cy.visit('http://localhost:3000');
    cy.contains('Log In');
    cy.get('.loginForm');
  });

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('.loginForm').get('input:first').type('root');
      cy.get('.loginForm').get('input:last').type('root');
      cy.get('#LogIn').click();
      cy.contains('root is logged in');
      cy.contains('Log Out').click();
    })

    it('fails with wrong credentials', function() {
      cy.get('.loginForm').get('input:first').type('rotten');
      cy.get('.loginForm').get('input:last').type('rotten');
      cy.get('#LogIn').click();
      cy.get('.error');
      cy.contains('Invalid username or password');
    });
  });

  describe.only('When logged in', function() {
    beforeEach(function() {
      cy.login({username: 'root', password: 'root'});
    });

    it('A blog can be created', function() {
      cy.get('.show').click();
      cy.get('#title').type('Some title');
      cy.get('#author').type('John Madden');
      cy.get('#url').type('http://lasd.com');
      cy.get('#add').click();
      cy.contains('Some title - John Madden')
    });

    it('A blog can be liked', function() {
      cy.createBlog({
        title: 'Some title',
        author: 'John Madden',
        url: 'http://someurl.com',
        likes: 0
      })
      cy.contains('Some title - John Madden');
      cy.get('.showBlog').click();
      cy.get('.l').click();
      cy.contains('Likes: 1');
    });

    it('A blog can be deleted', function() {
      cy.createBlog({
        title: 'Some title',
        author: 'John Madden',
        url: 'http://someurl.com',
        likes: 0
      });
      cy.contains('Some title - John Madden');
      cy.get('.showBlog').click();
      cy.get('#remove').click();
    });

    it('A blogs are sorted out by likes count descending', function() {
      cy.createBlog({
        title: 'Should be second',
        author: 'John Madden',
        url: 'http://someurl.com',
        likes: 9
      });
      cy.createBlog({
        title: 'Should be third',
        author: 'John Madden',
        url: 'http://someurl.com',
        likes: 6
      });
      cy.createBlog({
        title: 'Should be first',
        author: 'John Madden',
        url: 'http://someurl.com',
        likes: 15
      });
      cy.get('.blog').eq(0).contains('Should be first');
      cy.get('.blog').eq(1).contains('Should be second');
      cy.get('.blog').eq(2).contains('Should be third');
    });
  });
});