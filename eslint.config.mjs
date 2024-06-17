import globals from 'globals';
import airbnbBase from 'eslint-config-airbnb-base';
import airbnbImports from 'eslint-config-airbnb-base/rules/imports';
import airbnbReact from 'eslint-config-airbnb/rules/react';
import airbnbReactHooks from 'eslint-config-airbnb/rules/react-hooks';
import typescriptParser from '@typescript-eslint/parser';
import typescriptPlugin from '@typescript-eslint/eslint-plugin';
import prettier from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';
import importPlugin from 'eslint-plugin-import';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import reactApp from 'eslint-config-react-app';

export default [
	// 브라우저 전역 변수 추가
	{ languageOptions: { globals: globals.browser } },

	// Airbnb 기본 설정 추가
	{
		files: ['**/*.{js,jsx,ts,tsx}'],
		languageOptions: {
			parserOptions: {
				ecmaVersion: 2020,
				sourceType: 'module',
				ecmaFeatures: {
					jsx: true,
				},
			},
		},
		plugins: {
			import: importPlugin,
			react: reactPlugin,
			'react-hooks': reactHooksPlugin,
		},
		settings: {
			react: {
				version: 'detect', // React 버전을 자동으로 감지합니다.
			},
		},
		rules: {
			...airbnbBase.rules,
			...airbnbImports.rules,
			...airbnbReact.rules,
			...airbnbReactHooks.rules,
			'import/no-named-as-default': 'off', // 문제를 일으키는 규칙 비활성화
			'import/no-named-as-default-member': 'off', // 문제를 일으키는 규칙 비활성화
		},
	},

	// TypeScript 설정 추가
	{
		files: ['**/*.ts', '**/*.tsx'],
		languageOptions: {
			parser: typescriptParser,
			parserOptions: {
				project: './tsconfig.json',
			},
		},
		plugins: {
			'@typescript-eslint': typescriptPlugin,
		},
		rules: {
			...typescriptPlugin.configs.recommended.rules,
			...typescriptPlugin.configs['eslint-recommended'].rules,
		},
	},

	// react-app 설정 추가
	{
		files: ['**/*.{js,jsx,ts,tsx}'],
		extends: ['react-app'],
	},

	// Prettier 설정 추가
	{
		files: ['**/*.{js,jsx,ts,tsx}'],
		plugins: {
			prettier: prettierPlugin,
		},
		rules: {
			...prettier.rules,
			'prettier/prettier': 'error',
		},
	},
];
