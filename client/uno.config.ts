import { defineConfig, presetIcons, presetWind, transformerVariantGroup } from "unocss";

export default defineConfig({
	presets: [presetWind(), presetIcons()],
	transformers: [transformerVariantGroup()],
});
