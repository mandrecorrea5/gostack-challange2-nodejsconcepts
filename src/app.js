const express = require("express");
const cors = require("cors");
const { uuid, isUuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

function validateRepositoryId(request, response, next) {
  const { id } = request.params;

  if (!isUuid) {
    return response.status(400).json({
      error: 'Invalid repository ID.'
    });
  }

  return next();
}

app.use('/repository/:id', validateRepositoryId);

app.get("/repositories", (request, response) => {
  const { title } = request.query;
  
  const results = title 
    ? repositories.filter(repository => repository.title.includes(title))
    : repositories;

  return response.json(results);  
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;

  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    like:0
  };

  repositories.push(repository);

  return response.json({
    message: 'Success to save repository',    
    idSuccess: repository.id,
    title: repository.title
  });

});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;

  const repoIndex = repositories.findIndex(repository => repository.id === id);

  if(repoIndex < 0) {
    return response.status(400).json({
      error: "Repository not found"
    });
  }

  const repository = {
    id,
    title,
    url,
    techs,
  };

  repositories[repoIndex] = repository;

  return response.json({
    message: 'Success to update repository',    
    idSuccess: repository.id,
    title: repository.title, 
  });
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const repoIndex = repositories.findIndex(repository => repository.id === id);

  if(repoIndex < 0) {
    return response.status(400).json({
      error: "Repository not found"
    });
  }

  repositories.splice(repoIndex, 1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const repoIndex = repositories.findIndex(repositories => repositories.id === id);

  if(repoIndex < 0){
      return response.status(400).json({ error: "Repository not found" });
  }

  const { title, url, techs, like } = repositories[repoIndex];

  const repository = { 
    id, 
    title, 
    url, 
    techs,
    like: like + 1
  };

  repositories[repoIndex] = repository;

  return response.json(repository);
});

module.exports = app;
