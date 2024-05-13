# Use an official Go runtime as a parent image
FROM golang:1.22.1 AS go-builder

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the Go project into the container
COPY . .

# Build the Go binary
RUN go build -o backend ./cmd/main.go

EXPOSE 8080

CMD [ "./backend" ]