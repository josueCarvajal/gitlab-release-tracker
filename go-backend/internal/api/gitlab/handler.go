package gitlab

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"github.com/xanzy/go-gitlab"
)
func loadEnv() (GITLAB_API_URL string, PROJECT_ID string, GITLAB_ACCESS_TOKEN string) {
	err := godotenv.Load(".env")
	if err != nil {
		log.Fatalf("Error loading .env file: %v", err)
	}
	// Access environment variables
	GITLAB_API_URL = os.Getenv("GITLAB_API_URL")
	PROJECT_ID = os.Getenv("PROJECT_ID")
	GITLAB_ACCESS_TOKEN = os.Getenv("GITLAB_ACCESS_TOKEN")
	JIRA_URL := os.Getenv("JIRA_URL")

	// Check if environment variables are set
	if GITLAB_API_URL == "" {
		log.Fatal("ADDRESS environment variable is not set")
	}
	if PROJECT_ID == "" {
		log.Fatal("TOKEN environment variable is not set")
	}
	if GITLAB_ACCESS_TOKEN == "" {
		log.Fatal("GITLAB_ACCESS_TOKEN environment variable is not set")
	}
	if JIRA_URL == "" {
		log.Fatal("JIRA_URL environment variable is not set")
	}
	return GITLAB_API_URL, PROJECT_ID, GITLAB_ACCESS_TOKEN
}


func GetMergeRequests(c *gin.Context){
	// Extract query parameters from the request
	branch := c.Query("branch")
	state := "merged"
	GITLAB_API_URL, PROJECT_ID, GITLAB_ACCESS_TOKEN := loadEnv()
	startDateStr := c.Query("startDate")
	endDateStr := c.Query("endDate")
	layout := "2006-01-02T15:04:05.000Z"
	
	// Parse startDate and endDate strings into time.Time objects
	startDate, err := time.Parse(layout, startDateStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err})
		return
	}
	endDate, err := time.Parse(layout, endDateStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err})
		return
	}
	
	// Initialize GitLab API client 
	gitlabClient, err := gitlab.NewClient(GITLAB_ACCESS_TOKEN, gitlab.WithBaseURL(GITLAB_API_URL))
	
	if err != nil {
		log.Fatalf("Failed to create client: %v", err)
	  }
	// Define options to filter merge requests
	listOptions := &gitlab.ListProjectMergeRequestsOptions{
		TargetBranch: &branch,
		State: &state,		
	}
	listOptions.PerPage = 300

	// Fetch merge requests from GitLab API
	mergeRequests, _, err := gitlabClient.MergeRequests.ListProjectMergeRequests(PROJECT_ID,listOptions)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch merge requests"})
		return
	}
	fmt.Println(len(mergeRequests))

	filteredMergeRequests := ParseGitlabMergeRequest(mergeRequests,startDate,endDate)
	c.JSON(http.StatusOK, filteredMergeRequests)
}