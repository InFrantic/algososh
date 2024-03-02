describe('App routes', () => {
	beforeEach(() => {
		cy.visit('http://localhost:3000')
	})
	it('Works on localhost:3000/recursion', () => {
		cy.visit('localhost:3000/recursion')
	})
	it('Works on localhost:3000/fibonacci', () => {
		cy.visit('localhost:3000/fibonacci')
	})
	it('Works on localhost:3000/sorting', () => {
		cy.visit('localhost:3000/sorting')
	})
	it('Works on localhost:3000/stack', () => {
		cy.visit('localhost:3000/stack')
	})
	it('Works on localhost:3000/queue', () => {
		cy.visit('localhost:3000/queue')
	})
	it('Works on localhost:3000/list', () => {
		cy.visit('localhost:3000/list')
	})
})