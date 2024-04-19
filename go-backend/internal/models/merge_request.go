package models

type MergeRequest struct {
	ID          int    `json:"id"`
    Title       string `json:"title"`
	Description string `json:"description"`
	State       string `json:"state"`
    Source      string `json:"source_branch"`
    Target      string `json:"target_branch"`
    CreatedAt   string `json:"created_at"`
	MergedAt    string `json:"merged_at"`
	Draft  		bool   `json:"draft"`
}

type ParsedMergeRequest struct {
	MergedAt      string `json:"merged_at"`
	TargetRelease string `json:"target_release"`
	JiraTicket 	  string `json:"jira_ticket"`
	IssueType 	  string `json:"issue_type"`
	MergeTitle    string `json:"merge_title"`
	Description   string `json:"description"`
	State         string `json:"state"`
    Source        string `json:"source_branch"`
    Target        string `json:"target_branch"`
    CreatedAt     string `json:"created_at"`
	Draft  		  bool   `json:"draft"`
}