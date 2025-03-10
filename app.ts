import mongoose from 'mongoose'
import DataInsertion from './data-insertion'
import connectToDatabase from './db'
import TestQueries from './test-queries'

async function insertDatas() {
    const dataInsertion = DataInsertion.getInstance()
    await dataInsertion.startInsertion()
}

async function runTests() {
    await connectToDatabase()
    const testQueries = new TestQueries()

    try {
        await testQueries.testById('67cb14f3ae21d8344d91e676')
        await testQueries.testByUsername('corpus', 'corpus85')
        await testQueries.testByDesc(
            'vo bonus tribuo ce',
            'Carmen cum theatrum ustilo amaritudo bibo coniuratio speciosus curia nobis. Alioqui tepidus unde. Baiulus patria sulum suadeo umquam voco accusamus suasoria terror alias. Reprehenderit arcesso testimonium. Studio alius volup dedecor demo. Solus armarium angulus concedo neque uredo pecus. Praesentium defungo decens creptio incidunt alii. Tamdiu sui compello.'
        )
        await testQueries.testByTags('premium')
        await testQueries.testByViews(4000)
    } catch (error) {
        console.log(error)
    } finally {
        mongoose.disconnect()
    }
}

async function main() {
    // insertDatas()
    runTests()
}

main()
