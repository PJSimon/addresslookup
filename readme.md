## Note on the Data Store implementation 
The implementation here is not ideal as it is constrained by the AWS DynamoDB store, which has the following constraints:
- Only TABLE and KEY fields can be queried
- No wildcard queries

I overcame this with the following design workaround:
- On adding an address, we add a single record to the "addresses" table, and also multiple records to the "lookups" table.  
- The lookups records are incremental substrings of the addresses fields to facilitate type-ahead searching.
- The substrings have a min length of 2, since no searches are done on 1 character queries, for performance reasons.
- Searches are performed on the "lookups" table's KEY field, to retrieve the addressFK field.
- The addressFK field matches with a KEY in the addresses table, we essentially do a join to return the addresses record as the result of the search.   

| TABLE     | addressFK  | KEY          | CREATED       | line1        | line2 | city     | state | zip   |
|-----------|------------|--------------|---------------|--------------|-------|----------|-------|-------|
| addresses |            | 4WrgREOpFE   | 1621655407206 | 123 Main St. |       | Hartford | CT    | 06103 |
| lookups   | 4WrgREOpFE | 12           |               |              |       |          |       |       |
| lookups   | 4WrgREOpFE | 123          |               |              |       |          |       |       |
| lookups   | 4WrgREOpFE | 123          |               |              |       |          |       |       |
| lookups   | 4WrgREOpFE | 123 M        |               |              |       |          |       |       |
| lookups   | 4WrgREOpFE | 123 Ma       |               |              |       |          |       |       |
| lookups   | 4WrgREOpFE | 123 Mai      |               |              |       |          |       |       |
| lookups   | 4WrgREOpFE | 123 Main     |               |              |       |          |       |       |
| lookups   | 4WrgREOpFE | 123 Main     |               |              |       |          |       |       |
| lookups   | 4WrgREOpFE | 123 Main S   |               |              |       |          |       |       |
| lookups   | 4WrgREOpFE | 123 Main St  |               |              |       |          |       |       |
| lookups   | 4WrgREOpFE | 123 Main St. |               |              |       |          |       |       |
| lookups   | 4WrgREOpFE | Ha           |               |              |       |          |       |       |
| lookups   | 4WrgREOpFE | Har          |               |              |       |          |       |       |
| lookups   | 4WrgREOpFE | Hart         |               |              |       |          |       |       |
| lookups   | 4WrgREOpFE | Hartf        |               |              |       |          |       |       |
| lookups   | 4WrgREOpFE | Hartfo       |               |              |       |          |       |       |
| lookups   | 4WrgREOpFE | Hartfor      |               |              |       |          |       |       |
| lookups   | 4WrgREOpFE | Hartford     |               |              |       |          |       |       |
| lookups   | 4WrgREOpFE | CT           |               |              |       |          |       |       |
| lookups   | 4WrgREOpFE | 06           |               |              |       |          |       |       |
| lookups   | 4WrgREOpFE | 061          |               |              |       |          |       |       |
| lookups   | 4WrgREOpFE | 0610         |               |              |       |          |       |       |
| lookups   |            | 06103        |               |              |       |          |       |       |

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
- Sanitize and standardize input 
  - already storing and searching case-sensitive, but special characters could be filtered, etc.
  - Could make an API call to an external service to get USPS-formatted address
