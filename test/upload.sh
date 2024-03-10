#!/bin/sh

curl -k -X POST https://localhost/api/api/icsr -H "Content-Type: application/json" --data @./example_request.json
