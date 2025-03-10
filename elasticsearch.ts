import { Client } from '@elastic/elasticsearch'
import { Constants } from './constants'

const elasticSearchClient = new Client({
    node: Constants.ELASTIC_URL
})

export default elasticSearchClient
