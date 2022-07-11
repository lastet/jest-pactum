const { spec } = require('pactum');


describe('Retrieving data for user with ID 1', () => {

    test('should yield HTTP status code 200', async () => {

        await spec()
            .get('http://jsonplaceholder.typicode.com/users/1')
            .expectStatus(200)
    });

    test('should yield Content-Type header containing value "application/json"', async () => {

        await spec()
            .get('http://jsonplaceholder.typicode.com/users/1')
            .expectHeaderContains('content-type', 'application/json')
    });

    test('should yield "name" JSON body element with value "Leanne Graham"', async () => {

        await spec()
            .get('http://jsonplaceholder.typicode.com/users/1')
            .expectJsonMatch('name', 'Leanne Graham')
    });

    test('should yield "Gwenborough" as the city within the address', async () => {

        await spec()
            .get('http://jsonplaceholder.typicode.com/users/1')
            .expectJsonMatch('address.city', 'Gwenborough')
    });

});

describe('Posting a new post item', () => {

    test('should yield HTTP status code 201', async () => {

        let new_post = {
            "title": "My awesome new post title",
            "body": "My awesome new post body",
            "userId": 1
        }

        await spec()
            .post('http://jsonplaceholder.typicode.com/posts')
            .withJson(new_post)
            .expectStatus(201)
    });
});

describe('Retrieving user data for users with test each', () => {

    test.each(
        [[1,'Leanne Graham'], [2,'Ervin Howell'], [3,'Clementine Bauch']]
    )('User with ID %i has name %s', async (userId, expectedName) => {

        await spec()
            .get('http://jsonplaceholder.typicode.com/users/{user}')
            .withPathParams('user', userId)
            .expectJsonMatch('name', expectedName)
    });

});