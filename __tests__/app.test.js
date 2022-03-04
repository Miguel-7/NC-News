const request = require("supertest");
const app = require("../app.js");
const seed = require("../db/seeds/seed.js");
const testData = require("../db/data/test-data/index.js");
const connection = require("../db/connection.js");

beforeEach(() => seed(testData));

afterAll(() => connection.end());

describe("app", () => {
  test('status: 404 - responds with the message: "path not found"', () => {
    return (
      request(app)
        // .get("/*")
        .get("/notARoute")
        .expect(404)
      // .then(res => {
      //   console.log(res.body);
      //   expect(res.body.msg).toBe("Path not found");
      // })
    );
  });
  describe("/api/topics", () => {
    describe("GET", () => {
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
    });
  });
});
