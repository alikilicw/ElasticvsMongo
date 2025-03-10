import { faker } from '@faker-js/faker'
import mongoose from 'mongoose'
import connectToDatabase from './db'
import { TestDocument } from './test-document.model'
import elasticSearchClient from './elasticsearch'

export default class DataInsertion {
    private static instance: DataInsertion
    private BATCH_SIZE = 10000
    private TOTAL_DATA = 1000000

    constructor() {}

    public static getInstance(): DataInsertion {
        if (!DataInsertion.instance) DataInsertion.instance = new DataInsertion()
        return DataInsertion.instance
    }

    private generateFakeData(count: number) {
        return Array.from({ length: count }, () =>
            new TestDocument({
                username: `${faker.lorem.words(1)}${Math.floor(Math.random() * 100) + 1}`,
                description: faker.lorem.sentences(Math.floor(Math.random() * 10) + 1),
                tags: Array.from({ length: Math.floor(Math.random() * 5) + 1 }, () =>
                    faker.word.noun()
                ),
                views: faker.number.int({ min: 0, max: 100000 }),
                userId: new mongoose.Types.ObjectId()
            }).toObject()
        )
    }

    private async insertDataToMongoBatch(data: any[]) {
        await TestDocument.insertMany(data)
    }

    private async insertDataToElasticBatch(data: any[]) {
        const body = data.flatMap((doc) => {
            const { _id, ...restOfDoc } = doc
            return [{ index: { _index: 'test-documents', _id: doc._id.toString() } }, restOfDoc]
        })

        const response = await elasticSearchClient.bulk({ refresh: true, body })
        if (response.errors) {
            console.error('❌ Elasticsearch Bulk Insert Hatası!')
            throw new Error('Elastic Error: ' + response.items[0].index?.error?.caused_by?.reason)
        }
    }

    private async processData() {
        await connectToDatabase()

        try {
            for (let i = 0; i < this.TOTAL_DATA / this.BATCH_SIZE; i++) {
                const data = this.generateFakeData(this.BATCH_SIZE)

                await this.insertDataToMongoBatch(data)

                await this.insertDataToElasticBatch(data)

                console.log(
                    `✅ ${this.BATCH_SIZE * (i + 1)} data inserted into MongoDB and Elasticsearch!.`
                )
            }

            console.log(
                `🎉 Successfully added ${this.TOTAL_DATA} data into MongoDB and Elasticsearch!`
            )
        } catch (error) {
            if (error instanceof Error) console.log(error.message)
            else console.log(error)
        } finally {
            mongoose.disconnect()
        }
    }

    public async startInsertion() {
        await this.processData()
    }
}
