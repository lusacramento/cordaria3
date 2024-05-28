export const useBody = () => {
	interface IRequestBody {
		email: string
		password: string
		name: string
	}

	const test1: IRequestBody = {
		email: 'test1@test1.com',
		password: '12345',
		name: 'test1',
	}

	return test1
}
