const request = require("supertest");
const app = require("../app");
const { response } = require("express");

describe("Likes", () => {
  it('Should be able to give a like to the repository', async () => {
    const repository = await request(app)
      .post("/repositories")
      .send({
        url: "https://github.com/mandrecorrea5/gostack-challange2-nodejsconcepts",
        title: "GoStack Challange 2 - NodeJs Concepts",
        techs: ["NodeJs", "Express"]
      });

      let response = await request(app)
      .post(`/repositories/${repository.body.idSuccess}/like`);      

      expect(response.body).toMatchObject({
        likes: 1
      });

      response = await request(app)
        .post(`/repositories/${repository.body.idSuccess}/like`);

      console.log(response.body);
      
      expect(response.body).toMatchObject({
          likes: 2
        });

      response = await request(app)
        .post(`/repositories/${repository.body.idSuccess}/like`);
      
      expect(response.body).toMatchObject({
          likes: 3
        });  

  });

  it("Should not be able to like a repository that does not exist", async () => {
    await request(app)
      .post(`/repositories/123/like`)
      .expect(400)
  });
});
