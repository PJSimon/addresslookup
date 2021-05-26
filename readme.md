<img src="https://static.begin.app/node-crud/readme-banner.png" width="641">

[![Begin build status](https://buildstatus.begin.app/goat-xf2/status.svg)](https://begin.com)

A super simple Begin **c**reate **r**ead **u**pdate **d**elete app that exemplifies a basic todo app that uses one static html page and three API endpoints.

## Deploy your own

[![Deploy to Begin](https://static.begin.com/deploy-to-begin.svg)](https://begin.com/apps/create?template=https://github.com/begin-examples/node-crud)

Deploy your own clone of this app to Begin!

## Getting started

- Start the local dev server: `npm start`

## Reference

- [Quickstart](https://docs.begin.com/en/guides/quickstart/) - basics on working locally, project structure, deploying, and accessing your Begin app
- [Creating new routes](https://docs.begin.com/en/functions/creating-new-functions) - basics on expanding the capabilities of your app

Head to [docs.begin.com](https://docs.begin.com/) to learn more!


On submitting an address, we add a single record to the "fullAddress" table, and also multiple records to the "partialAddress" table.  
The partialAddress records are incremental substrings of the fullAddress fields to facilitate type-ahead searching 
The substrings have a min length of 3, since no searches are done on 1 or 2 character queries, for performance reasons.  

| TABLE          | KEY       | CREATED       | line1        | line2 | city     | state | zip   | FULL ADDRESS (FK) |
|----------------|-----------|---------------|--------------|-------|----------|-------|-------|-------------------|
| addresses      | 123456789 | 1621655407206 | 123 Main St. |       | Hartford | CT    | 06103 |                   |
| lookups        | 987654321 | 1621655407206 | 123          |       | Har      |       | 061   | 123456789         |
| lookups        | 987654322 | 1621655407206 | 123          |       | Hart     |       | 0610  | 123456789         |
| lookups        | 987654323 | 1621655407206 | 123 M        |       | Hartf    |       |       | 123456789         |
| lookups        | 987654324 | 1621655407206 | 123 Ma       |       | Hartfo   |       |       | 123456789         |
| lookups        | 987654325 | 1621655407206 | 123 Mai      |       | Hartfor  |       |       | 123456789         |
| lookups        | 987654326 | 1621655407206 | 123 Main     |       |          |       |       | 123456789         |
| lookups        | 987654327 | 1621655407206 | 123 Main     |       |          |       |       | 123456789         |
| lookups        | 987654328 | 1621655407206 | 123 Main S   |       |          |       |       | 123456789         |
| lookups        | 987654329 | 1621655407206 | 123 Main St  |       |          |       |       | 123456789         |



## Todo
- Add better error handling / messages 
  - Check if req obj can be resolved (Create, Update when no param passed)
- When deleting and address, need to delete all associated partialAddress records in the DB
- Research and report Begin bug with CRUD app delete functionality
- Each query for partial addresses returns limit: 5 records.  It would be fun to play around with this to ensure a certain total and also a good distribution across the matched fields (line1, line2, city, state, zip)
- State is only matched on two characters
- Make Delete clear out partialAddresses
- Make clear database method
- make Load Addresses method
- Add tests
- Use a more functional DB, else if current DB used, make Create transactional
  - With a relational DB, I'd implement more robust search that puts the wildcard matching logic into the query.
  - Also, it'd be easier to sort the results based on the address part the query matched with.
- Add Auth, rate limiting
- Version in the path?
  - put v1 now vs. wait until there's a v2 to add it to the path?
- Update not implemented
- Add marker-based pagination to GET method
