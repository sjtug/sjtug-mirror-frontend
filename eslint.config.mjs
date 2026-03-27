// @ts-check
import eslint from '@eslint/js';
import eslintPluginAstro from 'eslint-plugin-astro';
import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';

export default defineConfig([
	{
		ignores: ['**/dist', '**/node_modules', '**/.astro', '**/.github', "postcss.config.cjs"],
	},

	// Global config
	// JavaScript
	eslint.configs.recommended,
	// TypeScript
	...tseslint.configs.recommended,
	{
		rules: {
			'@typescript-eslint/no-explicit-any': 'off',
		},
	},
	// Node-based config files (Astro/ESLint/PostCSS) use process.env and other Node globals.
	{
		files: ['*.config.mjs', 'astro.config.mjs', 'eslint.config.mjs', 'postcss.config.cjs'],
		languageOptions: {
			globals: {
				process: 'readonly',
			},
		},
	},
	// Allow triple-slash references in `*.d.ts` files.
	{
		files: ['**/*.d.ts'],
		rules: {
			'@typescript-eslint/triple-slash-reference': 'off',
		},
	},

	// Astro
	...eslintPluginAstro.configs.recommended,
]);