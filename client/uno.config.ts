import { defineConfig, presetAttributify, presetWind } from 'unocss'

export default defineConfig({
	presets: [presetAttributify({ strict: true }), presetWind()]
})
