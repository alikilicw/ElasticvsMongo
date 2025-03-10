import DatabaseQueries from './database-queries'

export default class TestQueries {
    private dbQueries: DatabaseQueries

    public constructor() {
        this.dbQueries = new DatabaseQueries()
    }

    async testById(id: string) {
        await this.dbQueries.searchByIdMongoDB(id)
        await this.dbQueries.searchByIdElasticsearch(id)
    }

    async testByUsername(username: string, exactUsername: string) {
        await this.dbQueries.searchByExactUsernameMongoDB(exactUsername)
        await this.dbQueries.searchByExactUsernameElasticsearch(exactUsername)

        await this.dbQueries.searchByPrefixUsernameMongoDB(username)
        await this.dbQueries.searchByPrefixUsernameStandartAnalyzerElasticsearch(username)
        await this.dbQueries.searchByPrefixUsernameEdgeNGramAnalyzerElasticsearch(username)

        await this.dbQueries.countByPrefixUsernameMongoDB(username)
        await this.dbQueries.countByPrefixUsernameStandartAnalyzerElasticsearch(username)
        await this.dbQueries.countByPrefixUsernameEdgeNGramAnalyzerElasticsearch(username)
    }

    async testByDesc(description: string, exactDescription: string) {
        await this.dbQueries.searchByExactDescMongoDB(exactDescription)
        await this.dbQueries.searchByExactDescElasticsearch(exactDescription)

        await this.dbQueries.searchByContainsDescMongoDB(description)
        await this.dbQueries.searchByContainsDescElasticsearch(description)

        await this.dbQueries.countByContainsDescMongoDB(description)
        await this.dbQueries.countByContainsDescElasticsearch(description)
    }

    async testByTags(tag: string) {
        await this.dbQueries.searchByContainsTagsMongoDB(tag)
        await this.dbQueries.searchByContainsTagsElasticsearch(tag)
    }

    async testByViews(views: number) {
        await this.dbQueries.countByGteViewsMongoDB(views)
        await this.dbQueries.countByGteViewsElasticsearch(views)
    }

    async testByDate(date?: Date) {
        await this.dbQueries.countByPastRecordsMongoDB()
        await this.dbQueries.countByPastRecordsElasticsearch()
    }
}
