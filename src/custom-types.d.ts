import type { SlateDescendant } from '@wangeditor/editor'
import { SlateElement, SlateText } from '@wangeditor/editor'

declare module '@wangeditor/editor' {
  // 扩展 Text
  interface SlateText {
    text: string
  }

  // 扩展 Element
  interface SlateElement {
    type: string
    children: SlateDescendant[]
  }
}
