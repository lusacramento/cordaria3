import type { Settings } from '~/types/Settings'

const urlSettings = '/api/settings'

export const useISettings = () => {
	function getSettings(userId: string) {
		return $fetch(urlSettings, {
			method: 'get',
			params: { userId },
		})
	}

	function postSettings(settings: Settings) {
		return $fetch(urlSettings, {
			method: 'post',
			body: settings,
		})
	}

	function updateSettings(userId: string, body: any) {
		return $fetch(urlSettings, {
			method: 'put',
			body: body,
			params: { userId: userId },
		})
	}

	return { getSettings, postSettings, updateSettings }
}
