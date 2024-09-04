import { stefanobartoletti, tailwind, vue } from '@stefanobartoletti/eslint-config'

export default stefanobartoletti(
  {},
  vue,
  tailwind,
  {
    rules: {
      // 禁用 no-use-before-define 规则，允许在定义前使用变量、函数和类
      'ts/no-use-before-define': ['error', { classes: false, functions: false, variables: false }],
    },
  },
)
