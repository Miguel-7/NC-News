const request = require("supertest");
const app = require("../app.js");
const seed = require("../db/seeds/seed.js");
const testData = require("../db/data/test-data/index.js");
const connection = require("../db/connection.js");

beforeEach(() => seed(testData));

afterAll(() => connection.end());

xdescribe("GET /api/topics", () => {
  test("has status 200", () => {
    return request(app).get("/api/topics").expect(200);
  });
  test("status: 200 - responds with an array which has a length of at least 3 topic objects", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then(res => {
        expect(res.body.topics).toHaveLength(3);
      });
  });
  test('status: 200 - responds with an array of topic objects, each having two properties: "slug" and "description"', () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then(({ body: { topics } }) => {
        topics.forEach(topic => {
          expect(topic).toEqual(
            expect.objectContaining({
              slug: expect.any(String),
              description: expect.any(String),
            })
          );
        });
      });
  });
  // test('status: 404 - responds with the message: "path not found"', () => {
  //   return (
  //     request(app)
  //       // .get("/*")
  //       .get("/notARoute")
  //       .expect(404)
  //     // .then(res => {
  //     //   console.log(res.body);
  //     //   expect(res.body.msg).toBe("Path not found");
  //     // })
  //   );
  // });
});

describe("GET /api/articles/:article_id", () => {
  test("Status: 200 - get single article object by id - it has at least all these 7 specific properties, including an author that is the username from the users table)", () => {
    const articleId = 9;
    return request(app)
      .get(`/api/articles/${articleId}`)
      .expect(200)
      .then(res => {
        expect(res.body.article).toEqual(
          expect.objectContaining({
            author: expect.any(String),
            title: expect.any(String),
            article_id: expect.any(Number),
            body: expect.any(String),
            topic: expect.any(String),
            created_at: expect.any(String),
            votes: expect.any(Number),
          })
        );
      });
  });
  test("Status: 400 - responds with an error message when passed an invalid article ID", () => {
    return request(app)
      .get("/api/articles/notAnID")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad Request: Invalid input");
      });
  });
  test("Status: 404 - responds with an error message when passed an article ID in a valid format but that doesn't exist in the database", () => {
    return request(app)
      .get("/api/articles/999999999")
      .expect(404)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("No article found for Article ID: 999999999");
      });
  });
});
