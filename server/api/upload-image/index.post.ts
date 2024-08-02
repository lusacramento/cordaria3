import { useHelpers } from '~/composables/utils/helpers'

export default defineEventHandler(async (event) => {
	const { name, file } = await readBody(event)

	const response = await storeFileLocally(
		file, // the file object
		name, // you can add a name for the file or length of Unique ID that will be automatically generated!
		'/', // the folder the file will be stored in
	)

	if (!response) {
		throw new Error('Ocorreu um erro')
	}

	// Parses a data URL and returns an object with the binary data and the file extension.
	const { binaryString, ext } = parseDataUrl(file.content)
	// }

	const extensionFile = useHelpers().getFileExtension(file.name)
	const nameReturn = `${name as string}.${extensionFile}`

	return {
		name: nameReturn,
		message: 'Avatar carregado com sucesso!',
	}
})
