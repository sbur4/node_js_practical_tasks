# Practical task 10

Congratulations, we are almost on the finish line! In this task you will need to modify your Node.js application to make it production ready.

## Acceptance criteria
   
1. Application has proper config management: environment variables are used instead of any hardcoded values 
2. Graceful shutdown is implemented 
3. Healthcheck API endpoint is implemented. It checks if server is running and if connection with database is established. It returns status code 200 if everything is ok, otherwise 500. 
4. [Winston](https://www.npmjs.com/package/winston) is used for all application logs. All logs are reviewed, proper log levels are set for all of them. Application logs are written to console. 
5. Logging of incoming requests is added: it contains date, log level, request method, request path and request duration. The format is the following:

``` 
[Mon, 01 Jan 2024 14:00:00] INFO GET /api/profile/cart - 112ms
[Mon, 01 Jan 2024 14:00:00] INFO PUT /api/profile/cart - 45ms
```

6. Update npm the scripts for running application to support production and non-productions environments.
- If ``NODE_ENV=production``, no DEBUG logs are printed
- If ``NODE_ENV=test``, all logs are printed
7. Dockerize the application according to best practices, try getting an image with as minimal size as possible.

### Additional tasks:

[]()
If you're looking to push your boundaries and take more challenging tasks, consider the list below. Although these will not be evaluated as part of the Node.js Mentoring Program, if you feel power inside, feel free to dive into.

1. Use Docker compose for all the local infrastructure (app and DB)
2. Add few [husky](https://www.npmjs.com/package/husky) hooks to your app to: check the [commit](https://www.npmjs.com/package/@commitlint/config-conventional) message, run linting script on commit, run unit tests 
on push; setup any static code analyser and perform quality scan over your app; check whether you have secure npm dependencies
3. Set up a [local](https://docs.docker.com/registry/) or any free container registry ([DockerHub](https://hub.docker.com/), 
[AWS ECR](https://docs.aws.amazon.com/AmazonECR/latest/userguide/what-is-ecr.html), 
[Azure Container Registry](https://azure.microsoft.com/en-us/products/container-registry/), 
or [Google Artifact Registry](https://cloud.google.com/blog/products/application-development/understanding-artifact-registry-vs-container-registry))
and publish your image there; pull image from registry and run it; publish few different versions of your app (with proper tags) to the registry
4. Create a repository in internal [GitBud.epam.com](https://gitbud.epam.com/); push the code of your Node.js app there; based on the [sample template](https://docs.gitlab.com/ee/ci/index.html#the-gitlab-ciyml-file) 
create [.gitlab-ci.yml](https://gitlab.com/gitlab-org/gitlab/-/blob/master/lib/gitlab/ci/templates/Nodejs.gitlab-ci.yml) template to run a simple CI/CD which will contain all the jobs from the mandatory part (``eslit``, ``tests``,
``npm audit``, ``build stage`` (dockerise the app), and (optionally) static code analysis) that will be executed by shared worker;
investigate [GitLab CI/CD](https://docs.gitlab.com/ee/ci/) capabilities, and push the template to start and test the pipeline (note, that your pipeline can 
be executed with some delay due to a limited capacity of shared workers); providing you created a cloud container registry 
(AWS ECR, DockerHub, etc.), configure credentials and push the built docker image to the container registry from the pipeline.

## Evaluation criteria

### 5-point scoring system

- `3` - Acceptance criteria 1-2 are implemented.
- `4` - Acceptance criteria 1-3 are implemented.
- `5` - Acceptance criteria 1-4 are implemented.

### 100-point scoring system

- `60 - 69` - Acceptance criteria 1-2 are partially implemented.
- `70 - 79` - Acceptance criteria 1-2 are implemented.
- `80 - 89` - Acceptance criteria 1-3 are implemented.
- `90 - 100` - Acceptance criteria 1-4 are implemented.