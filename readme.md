## Persistence Layer 
On submitting an address, we add a single record to the "addresses" table, and also multiple records to the "lookups" table.  
The lookups records are incremental substrings of the addresses fields to facilitate type-ahead searching.
The substrings have a min length of 2, since no searches are done on 1 character queries, for performance reasons.  

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
- When deleting an address, need to delete all associated lookups records in the DB
- Each query for partial addresses returns limit: 25 records across all fields.  
  - It would be fun to play around with this to ensure a certain total and also a good distribution across the matched fields (line1, line2, city, state, zip)
- State is only matched on two characters
- Add tests
- Use a more functional DB, else if current DB used, make Create transactional
  - With a relational DB, I'd implement more robust search that puts the wildcard matching logic into the query.
  - Also, it'd be easier to sort the results based on the address part the query matched with.
- Add Auth, rate limiting
- Version in the path?
  - put v1 now vs. wait until there's a v2 to add it to the path?
- Update not implemented
- Add marker-based pagination to GET method
