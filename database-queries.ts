import elasticSearchClient from './elasticsearch'
import { ITestDocument, TestDocument } from './test-document.model'

export default class DatabaseQueries {
    private indexName = 'test-documents'

    async searchByIdMongoDB(id: string): Promise<void> {
        try {
            console.time('searchByIdMongoDB Query Time.')
            const result = await TestDocument.findById(id)
            if (result) console.log(result._id)
            console.timeEnd('searchByIdMongoDB Query Time.')
        } catch (error) {
            throw error
        }
    }

    async searchByIdElasticsearch(id: string): Promise<void> {
        try {
            console.time('searchByIdElasticsearch Query Time.')
            const result = await elasticSearchClient.search({
                index: this.indexName,
                body: {
                    query: {
                        term: {
                            _id: id
                        }
                    }
                }
            })
            if (result) console.log(result.hits.hits[0]._id)
            console.timeEnd('searchByIdElasticsearch Query Time.')
        } catch (error) {
            throw error
        }
    }

    async searchByExactUsernameMongoDB(username: string): Promise<void> {
        try {
            console.time('searchByExactUsernameMongoDB Query Time.')
            const result = await TestDocument.find({ username })
            console.log(result.length)
            console.timeEnd('searchByExactUsernameMongoDB Query Time.')
        } catch (error) {
            throw error
        }
    }

    async searchByExactUsernameElasticsearch(username: string): Promise<void> {
        try {
            console.time('searchByExactUsernameElasticsearch Query Time.')
            const result = await elasticSearchClient.search({
                index: this.indexName,
                body: {
                    query: {
                        match: {
                            username
                        }
                    }
                }
            })
            console.log(result.hits.hits.length)
            console.timeEnd('searchByExactUsernameElasticsearch Query Time.')
        } catch (error) {
            throw error
        }
    }

    async searchByPrefixUsernameMongoDB(username: string): Promise<void> {
        try {
            console.time('searchByPrefixUsernameMongoDB Query Time.')
            const result = await TestDocument.find({
                username: { $regex: username, $options: 'i' }
            })
            console.log(result.length)
            console.timeEnd('searchByPrefixUsernameMongoDB Query Time.')
        } catch (error) {
            throw error
        }
    }

    async searchByPrefixUsernameStandartAnalyzerElasticsearch(username: string): Promise<void> {
        try {
            console.time('searchByPrefixUsernameStandartAnalyzerElasticsearch Query Time.')
            const result = await elasticSearchClient.search({
                index: this.indexName,
                size: 5000,
                body: {
                    query: {
                        prefix: {
                            username
                        }
                    }
                }
            })
            console.log(result.hits.hits.length)
            console.timeEnd('searchByPrefixUsernameStandartAnalyzerElasticsearch Query Time.')
        } catch (error) {
            throw error
        }
    }

    async searchByPrefixUsernameEdgeNGramAnalyzerElasticsearch(username: string): Promise<void> {
        try {
            console.time('searchByPrefixUsernameEdgeNGramAnalyzerElasticsearch Query Time.')
            const result = await elasticSearchClient.search({
                index: this.indexName,
                size: 5000,
                body: {
                    query: {
                        match: {
                            'username.edge_ngram': username
                        }
                    }
                }
            })
            console.log(result.hits.hits.length)
            console.timeEnd('searchByPrefixUsernameEdgeNGramAnalyzerElasticsearch Query Time.')
        } catch (error) {
            throw error
        }
    }

    async countByPrefixUsernameMongoDB(username: string): Promise<void> {
        try {
            console.time('countByPrefixUsernameMongoDB Query Time.')
            const result = await TestDocument.countDocuments({
                username: { $regex: username, $options: 'i' }
            })
            console.log(result)
            console.timeEnd('countByPrefixUsernameMongoDB Query Time.')
        } catch (error) {
            throw error
        }
    }

    async countByPrefixUsernameStandartAnalyzerElasticsearch(username: string): Promise<void> {
        try {
            console.time('countByPrefixUsernameStandartAnalyzerElasticsearch Query Time.')
            const result = await elasticSearchClient.count({
                index: this.indexName,
                body: {
                    query: {
                        prefix: {
                            username
                        }
                    }
                }
            })
            console.log(result.count)
            console.timeEnd('countByPrefixUsernameStandartAnalyzerElasticsearch Query Time.')
        } catch (error) {
            throw error
        }
    }

    async countByPrefixUsernameEdgeNGramAnalyzerElasticsearch(username: string): Promise<void> {
        try {
            console.time('countByPrefixUsernameEdgeNGramAnalyzerElasticsearch Query Time.')
            const result = await elasticSearchClient.count({
                index: this.indexName,
                body: {
                    query: {
                        match: {
                            'username.edge_ngram': username
                        }
                    }
                }
            })
            console.log(result.count)
            console.timeEnd('countByPrefixUsernameEdgeNGramAnalyzerElasticsearch Query Time.')
        } catch (error) {
            throw error
        }
    }

    async searchByContainsDescMongoDB(description: string): Promise<void> {
        try {
            const regex = new RegExp(description, 'i')
            console.time('searchByContainsDescMongoDB Query Time.')
            const result = await TestDocument.find({ description: regex }).limit(10000)
            console.log(result.length)
            console.timeEnd('searchByContainsDescMongoDB Query Time.')
        } catch (error) {
            throw error
        }
    }

    async searchByContainsDescElasticsearch(description: string): Promise<void> {
        try {
            console.time('searchByContainsDescElasticsearch Query Time.')
            const result = await elasticSearchClient.search({
                index: this.indexName,
                size: 10000,
                body: {
                    query: {
                        wildcard: {
                            'description.keyword': `*${description}*`
                        }
                    }
                }
            })
            console.log(result.hits.hits.length)
            console.timeEnd('searchByContainsDescElasticsearch Query Time.')
        } catch (error) {
            throw error
        }
    }

    async searchByExactDescMongoDB(description: string): Promise<void> {
        try {
            console.time('searchByExactDescMongoDB Query Time.')
            const result = await TestDocument.find({ description: description })
            console.log(result.length)
            console.timeEnd('searchByExactDescMongoDB Query Time.')
        } catch (error) {
            throw error
        }
    }

    async searchByExactDescElasticsearch(description: string): Promise<void> {
        try {
            console.time('searchByExactDescElasticsearch Query Time.')
            const result = await elasticSearchClient.search({
                index: this.indexName,
                size: 500,
                body: {
                    query: {
                        term: {
                            'description.keyword': description
                        }
                    }
                }
            })
            console.log(result.hits.hits.length)
            console.timeEnd('searchByExactDescElasticsearch Query Time.')
        } catch (error) {
            throw error
        }
    }

    async countByContainsDescMongoDB(description: string): Promise<void> {
        try {
            const regex = new RegExp(description, 'i')
            console.time('countByContainsDescMongoDB Query Time.')
            const result = await TestDocument.countDocuments({ description: regex })
            console.log(result)
            console.timeEnd('countByContainsDescMongoDB Query Time.')
        } catch (error) {
            throw error
        }
    }

    async countByContainsDescElasticsearch(description: string): Promise<void> {
        try {
            console.time('countByContainsDescElasticsearch Query Time.')
            const result = await elasticSearchClient.count({
                index: this.indexName,
                body: {
                    query: {
                        wildcard: {
                            'description.keyword': `*${description}*`
                        }
                    }
                }
            })
            console.log(result.count)
            console.timeEnd('countByContainsDescElasticsearch Query Time.')
        } catch (error) {
            throw error
        }
    }

    async searchByContainsTagsMongoDB(tag: string): Promise<void> {
        try {
            console.time('searchByContainsTagsMongoDB Query Time.')
            const result = await TestDocument.find({ tags: tag })
            console.log(result.length)
            console.timeEnd('searchByContainsTagsMongoDB Query Time.')
        } catch (error) {
            throw error
        }
    }

    async searchByContainsTagsElasticsearch(tag: string): Promise<void> {
        try {
            console.time('searchByContainsTagsElasticsearch Query Time.')
            const result = await elasticSearchClient.search({
                index: this.indexName,
                size: 10000,
                body: {
                    query: {
                        term: {
                            tags: tag
                        }
                    }
                }
            })
            console.log(result.hits.hits.length)
            console.timeEnd('searchByContainsTagsElasticsearch Query Time.')
        } catch (error) {
            throw error
        }
    }

    async searchByExactViewsMongoDB(views: number): Promise<void> {
        try {
            console.time('searchByExactViewsMongoDB Query Time.')
            const result = await TestDocument.find({ views })
            console.log(result.length)
            console.timeEnd('searchByExactViewsMongoDB Query Time.')
        } catch (error) {
            throw error
        }
    }

    async searchByExactViewsElasticsearch(views: number): Promise<void> {
        try {
            console.time('ElassearchByExactViewsElasticsearchtic Query Time.')
            const result = await elasticSearchClient.search({
                index: this.indexName,
                size: 10000,
                body: {
                    query: {
                        term: {
                            views
                        }
                    }
                }
            })
            console.log(result.hits.hits.length)
            console.timeEnd('searchByExactViewsElasticsearch Query Time.')
        } catch (error) {
            throw error
        }
    }

    async searchByGteViewsMongoDB(views: number): Promise<void> {
        try {
            console.time('searchByGteViewsMongoDB Query Time.')
            const result = await TestDocument.find({ views: { $gte: views } })
            console.log(result.length)
            console.timeEnd('searchByGteViewsMongoDB Query Time.')
        } catch (error) {
            throw error
        }
    }

    async searchByGteViewsElasticsearch(views: number): Promise<void> {
        try {
            console.time('searchByGteViewsElasticsearch Query Time.')
            const result = await elasticSearchClient.search({
                index: this.indexName,
                size: 10000,
                body: {
                    query: {
                        range: {
                            views: {
                                gte: views
                            }
                        }
                    }
                }
            })
            console.log(result.hits.hits.length)
            console.timeEnd('searchByGteViewsElasticsearch Query Time.')
        } catch (error) {
            throw error
        }
    }

    async countByGteViewsMongoDB(views: number): Promise<void> {
        try {
            console.time('countByGteViewsMongoDB Query Time.')
            const result = await TestDocument.countDocuments({ views: { $gte: views } })
            console.log(result)
            console.timeEnd('countByGteViewsMongoDB Query Time.')
        } catch (error) {
            throw error
        }
    }

    async countByGteViewsElasticsearch(views: number): Promise<void> {
        try {
            console.time('countByGteViewsElasticsearch Query Time.')
            const result = await elasticSearchClient.count({
                index: this.indexName,
                body: {
                    query: {
                        range: {
                            views: {
                                gte: views
                            }
                        }
                    }
                }
            })
            console.log(result.count)
            console.timeEnd('countByGteViewsElasticsearch Query Time.')
        } catch (error) {
            throw error
        }
    }

    async countByPastRecordsMongoDB(): Promise<void> {
        try {
            console.time('countByPastRecordsMongoDB Query Time.')
            const result = await TestDocument.countDocuments({ createdAt: { $lt: new Date() } })
            console.log(result)
            console.timeEnd('countByPastRecordsMongoDB Query Time.')
        } catch (error) {
            throw error
        }
    }

    async countByPastRecordsElasticsearch(): Promise<void> {
        try {
            console.time('countByPastRecordsElasticsearch Query Time.')
            const result = await elasticSearchClient.count({
                index: this.indexName,
                body: {
                    query: {
                        range: {
                            createdAt: {
                                lt: 'now'
                            }
                        }
                    }
                }
            })
            console.log(result.count)
            console.timeEnd('countByPastRecordsElasticsearch Query Time.')
        } catch (error) {
            throw error
        }
    }
}
