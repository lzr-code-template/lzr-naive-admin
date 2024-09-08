import type { GlobalThemeOverrides } from 'naive-ui'

export const defaultPrimaryColor: string = '#4D80F0'
export const naiveThemeOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor: '#4D80F0',
    primaryColorHover: '#6B9AF3',
    primaryColorPressed: '#305BC7',
    primaryColorSuppl: '#6B9AF3',
  },
  Tree: {
    fontSize: '14px',
    nodeTextColor: '#606266',
  },
  Alert: {
    borderRadius: '8px',
  },
}
