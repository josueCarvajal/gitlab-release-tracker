# Release tracker

## Problem description
With parallel releases, there is a chance that some changes did not make it into the repository at a given time, when a build is going to be triggered,
this causes problems and false positives of bugs that were fixed but were introduced minutes after the build was already kicked! 

Knowing this, the release tracker helps you keep control of your merges in an easy-to-use format!


## What this tool does?
This tool allow you to connect to your gitlab repository and get the merge requests filtered by date.
With this functionality it will be easier to track JIRA, Issue Types, Source branch, and MR Links if you are running parallel releases!


## How to run it?
- Clone this repo
- Go inside the go-backend repository and create a .env file, and add the following content
  ```
  GITLAB_API_URL="" # Your gitlab url in the following format https://gitlab.DOMAIN/api/v4
  JIRA_URL="" # Your JIRA URL for example https://jira.com/browse
  PROJECT_ID="" # Your project ID, can be retrieved from gitlab UI
  GITLAB_ACCESS_TOKEN="" #Your GITLAB access token with READ priviledges
  ```
- Inside the go-backend repository run `docker build -t test/release-manager-be:1.0.0 .`
- Go inside the release-tracker-front and run `docker build -t test/release-manager-ui:1.0.0`
- Run the images and make sure to put the same ports that the docker exposes!



## How to use it?
- Once the application is running, open your http://localhost:3000
- Select a branch and a date range and click FETCH!
- If matches, it will retrieve the list of files

![image](https://github.com/josueCarvajal/gitlab-release-tracker/assets/20409801/2098e560-f499-46a0-a597-c3af5ea9b4c3)

