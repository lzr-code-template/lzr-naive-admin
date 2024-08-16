import { stefanobartoletti, tailwind, vue } from '@stefanobartoletti/eslint-config'

export default stefanobartoletti(
  {}, // @antfu/eslint-config options, must always be present as first item even if empty
  vue,
  tailwind,
  {
    // ESlint Flat config rule object
    'no-unused-expressions': 'off',
  },
)
