const request = require("supertest");
const app = require("../app");
const { response } = require("express");

describe("Likes", () => {
  it('Should be able to give a like to the repository', async () => {
    const repository = await request(app)
      .post("/repositories")
      .send({
        url: "https://github.com/Rocketseat/umbriel",
        title: "Umbriel",
        techs: ["Node", "Express", "TypeScript"]
      });

    let response = await request(app).post(
      `/repositories/${repository.body.id}/like`
    );

    expect(response.body).toMatchObject({
      likes: 1
    });

    response = await request(app).post(
      `/repositories/${repository.body.id}/like`
    );

    expect(response.body).toMatchObject({
      likes: 2
    });
  });

  it("Should not be able to like a repository that does not exist", async () => {
    await request(app)
      .post(`/repositories/123/like`)
      .expect(400);
  });
});
