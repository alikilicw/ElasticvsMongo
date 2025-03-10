# Performance Comparison: MongoDB vs. Elasticsearch

This repository contains a performance comparison between MongoDB and Elasticsearch by running various queries on a dataset of 1 million records.

## Dataset Structure

Each document follows this structure:

```json
{
    "username": "corpus85",
    "description": "Thymbra thesis defluo adeptio undique torrens vorago. Quaerat laudantium vivo vulgaris aggero adduco tabgo acceptus terga vomica. Cattus tergeo cuppedia.",
    "tags": ["range", "premium", "reach", "analogy"],
    "views": 90515,
    "createdAt": "2025-03-07T15:54:46.581Z"
}
```

## Queries and Their Explanations

### 1. Search by ID

- **MongoDB:** Uses `findById` to locate a document by its `_id`.
- **Elasticsearch:** Uses a `term` query on `_id`.

### 2. Search by Exact Username

- **MongoDB:** Finds documents where `username` matches exactly.
- **Elasticsearch:** Uses `match` query on `username`.

### 3. Search by Username Prefix

- **MongoDB:** Uses a case-insensitive regex query.
- **Elasticsearch:**
  - `prefix` query on `username`.
  - `match` query with `edge_ngram` analyzer.

### 4. Count by Username Prefix

- **MongoDB:** Uses `countDocuments` with regex filtering.
- **Elasticsearch:** Uses `prefix` and `edge_ngram` match queries.

### 5. Search by Exact Description

- **MongoDB:** Finds documents with an exact `description` match.
- **Elasticsearch:** Uses a `term` query on `description.keyword`.

### 6. Search by Partial Description (Contains)

- **MongoDB:** Uses a case-insensitive regex search.
- **Elasticsearch:** Uses a `wildcard` query with `*description*` pattern.

### 7. Count by Description Contains

- **MongoDB:** Uses `countDocuments` with regex.
- **Elasticsearch:** Uses `wildcard` query.

### 8. Search by Tag Containment

- **MongoDB:** Finds documents where `tags` array contains the given tag.
- **Elasticsearch:** Uses a `term` query on `tags`.

### 9. Search by Exact Views Count

- **MongoDB:** Finds documents with an exact `views` count.
- **Elasticsearch:** Uses a `term` query on `views`.

### 10. Search by Views Greater Than or Equal (>=)

- **MongoDB:** Uses `$gte` operator on `views`.
- **Elasticsearch:** Uses a `range` query.

### 11. Count by Views Greater Than or Equal (>=)

- **MongoDB:** Uses `countDocuments` with `$gte`.
- **Elasticsearch:** Uses a `count` query with `range` filter.

### 12. Count Past Records (createdAt < now)

- **MongoDB:** Counts documents where `createdAt` is less than the current date.
- **Elasticsearch:** Uses a `range` query with `lt: now` condition.

## Performance Results

| Query                          | MongoDB Time | Elasticsearch Time                            |
| ------------------------------ | ------------ | --------------------------------------------- |
| Search by ID                   | 938.884ms    | 356.55ms                                      |
| Search by Exact Username       | 1.905s       | 132.088ms                                     |
| Search by Username Prefix      | 3.347s       | 1.214s (Standard) / 1.585s (Edge NGram)       |
| Count by Username Prefix       | 1.025s       | 129.352ms (Standard) / 134.344ms (Edge NGram) |
| Search by Exact Description    | 752.029ms    | 130.492ms                                     |
| Search by Contains Description | 1.617s       | 3.264s                                        |
| Count by Contains Description  | 1.640s       | 133.863ms                                     |
| Search by Contains Tags        | 4.253s       | 2.481s                                        |
| Count by Views >= X            | 580.129ms    | 127.246ms                                     |

## Summary

- **MongoDB performs better for exact ID searches.**
- **Elasticsearch is significantly faster for text searches and aggregations.**
- **Regex-based searches in MongoDB are slow, while Elasticsearch handles them efficiently with appropriate analyzers.**
- **Elasticsearch provides better scalability for full-text search queries.**
