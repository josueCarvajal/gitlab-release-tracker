package main

import (
	"go-backend/internal/api/gitlab"
	"log"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)



func main(){
	// Initialize Gin router
	router := gin.Default()
	config := cors.DefaultConfig()
    config.AllowOrigins = []string{"http://localhost:3000", "http://localhost:8080"} // Allow requests from this origin
    config.AllowMethods = []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"}
    config.AllowHeaders = []string{"Origin", "Content-Type"}

    // Use CORS middleware with the configuration
    router.Use(cors.New(config))
	// Define route to handle GitLab merge requests
	router.GET("/merge-requests", gitlab.GetMergeRequests)

	// Start the HTTP server
	err := router.Run(":8080")
	if err != nil {
		log.Fatalf("Failed to start server: %v", err)
	}
}