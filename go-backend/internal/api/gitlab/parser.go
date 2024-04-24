package gitlab

import (
	// "fmt"

	"fmt"
	"go-backend/internal/models"
	"net/url"
	"os"
	"path"
	"regexp"
	"time"

	"github.com/xanzy/go-gitlab"
)

// check if the merge request is between the given dates
func isMergeBetweenDate(startDate time.Time, endDate time.Time, mergeDate time.Time) bool {
    if (mergeDate.After(startDate) && mergeDate.Before(endDate)){
        return true
    }else {
        return false
    }
}
// parse the merge requests based on the custom definition
func ParseGitlabMergeRequest(mergeRequest[] *gitlab.MergeRequest, startDate time.Time, endDate time.Time) []models.ParsedMergeRequest { 
    parsedMergeRequest := make([]models.ParsedMergeRequest, len(mergeRequest) )
    index := 0
    for _, mr := range mergeRequest {
        fmt.Println("StartDate:" + startDate.String() + " EndDate: " + endDate.String() + " Merged At" + mr.MergedAt.String())
        if isMergeBetweenDate(startDate,endDate,*mr.MergedAt) {
            parsedTitle := parseMergeRequetTitle(mr.Title)
            parsedMergeRequest[index].MergedAt      = mr.MergedAt.String()
            parsedMergeRequest[index].TargetRelease = parsedTitle["target_release"]
            parsedMergeRequest[index].IssueType     = parsedTitle["issue_type"]
            parsedMergeRequest[index].JiraTicket    = parsedTitle["ticket_id"]
            parsedMergeRequest[index].MergeTitle    = parsedTitle["title"]
            parsedMergeRequest[index].Description   = mr.Description
            parsedMergeRequest[index].State         = mr.State
            parsedMergeRequest[index].Source        = mr.SourceBranch
            parsedMergeRequest[index].Target        = mr.TargetBranch
            parsedMergeRequest[index].CreatedAt     = mr.CreatedAt.String()
            parsedMergeRequest[index].Draft         = mr.Draft
            parsedMergeRequest[index].WithBaseURL   = mr.WebURL
            parsedMergeRequest[index].MergeNumber   = parseMergeLink(mr.WebURL)
            parsedMergeRequest[index].JiraLink      = os.Getenv("JIRA_URL") + parsedTitle["ticket_id"]
            index++
        }
	}
    return parsedMergeRequest
}

// parse the title and builds a map with it
func parseMergeRequetTitle(title string) map[string]string  {
    // Regular expression pattern to match content inside square brackets
    pattern := `\[([^\]]+)\]`

    // Compile the regular expression pattern
    re := regexp.MustCompile(pattern)

    // Find all matches of the pattern in the input string
    matches := re.FindAllStringSubmatch(title, -1)

    // Initialize a map to store parsed values
    result := make(map[string]string)

    // Define keys corresponding to the order of matches
    keys := []string{"target_release", "ticket_id", "issue_type", "title"}

    // Iterate over matches and map them to keys in the result map
    for i, match := range matches {
        if i < len(keys) && len(match) > 1 {
            // Extract the content inside the square brackets
            content := match[1]
            // Map the content to the corresponding key
            result[keys[i]] = content
        }
    }

    return result
}

// return the last segment of the URL in order to present a shorthand variable in the UIis
func parseMergeLink(mergeLink string) string {
    u, _ := url.Parse(mergeLink)
    mergeNumber := path.Base(u.Path)
    return mergeNumber + "!"
}
