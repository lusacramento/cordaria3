import mongoose from 'mongoose'
const config = useRuntimeConfig()
export default async () => {
	try {
		const uri = config.mongorUrl
		console.info('url: ', uri, ': ', typeof uri)
		await mongoose.connect(uri)
		console.log('DB connection established.')
	} catch (err) {
		console.error('DB connection failed.', err)
	}
}
