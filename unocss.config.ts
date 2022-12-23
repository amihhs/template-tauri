import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'
import { FileSystemIconLoader } from '@iconify/utils/lib/loader/node-loaders'
export default defineConfig({
  // 通过组合现有实用程序来创建新的实用程序
  shortcuts: [
    // button
    ['btn-primary', 'py-1.5 px-3.5 bg-blue-500 text-3.5 text-white  rounded-md shadow-md transform transition md:hover:scale-105 lt-md:active:scale-105 duration-200'],
    ['btn-indigo', 'py-1.5 px-3.5 bg-indigo-500 text-3.5 text-white  rounded-md shadow-md transform transition md:hover:scale-105 lt-md:active:scale-105 duration-200'],
    ['menu-button', 'bg-white flex-shrink-0 h-13 leading-13 text-center text-title-600 text-4 mt-2 active:bg-gray-100 transition'],
    // title
    ['title-center', 'pb-2 mb-3 text-center font-bold text-4.5 border-(b-1 gray-200)'],

    // hover
    ['img-hover', 'hover:scale-110 transition duration-200 cursor-pointer'],
    ['public-hover', 'hover:text-red-500 cursor-pointer'],
    ['public-hover-primary', 'hover:text-green-600 cursor-pointer'],
    ['public-active', 'active:text-primary cursor-pointer'],

    // layout
    ['layout-default-container', 'w-full max-w-1000px m-auto md:px-6 lg:px-0'],
    ['layout-default-container-1100', 'w-full max-w-1100px m-auto md:px-6 lg:px-0'],

    // translate
    ['translate-hidden', '-translate-y-full'],
  ],
  theme: {
    breakpoints: {
      'mn': '400px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    colors: (() => {
      const colors: any = {
        transparent: 'transparent',
        current: 'currentColor',
        default: 'var(--color-default)',
        primary: 'var(--color-primary)',
        success: 'var(--color-success)',
        warn: 'var(--color-warn)',
        error: 'var(--color-error)',
        title: {},
      }
      for (let i = 9; i >= 1; i--)
        colors.title[String(i * 100)] = `var(--color-text-${i * 100})`

      return colors
    })(),
  },
  safelist: [
    ...Array.from(['primary', 'success', 'warn', 'error', 'default'], _ => `text-${_}`),
    ...Array.from({ length: 9 }, (_, i) => `text-title-${(i + 1) * 100}`),
  ],
  // 预设
  presets: [
    presetUno(),
    // 属性模式 <span i-custom:all text-24 />
    presetAttributify(),
    // 预设icon
    presetIcons({
      mode: 'mask', // 模式覆盖 i-carbon:list?bg
      scale: 1.2,
      extraProperties: {
        'display': 'inline-block',
        'vertical-align': 'middle',
      },
      collections: {
        custom: FileSystemIconLoader('./src/assets/icons'),
      },
    }),
    // 预设排版
    presetTypography(),
    // 预设web字体
    presetWebFonts({}),
  ],
  // 转换
  transformers: [
    // @apply用于和theme()指令的 UnoCSS 转换器
    transformerDirectives(),
    transformerVariantGroup(),
  ],
  rules: [
    // eg. grid-rows-3-20px
    [/^grid-rows-(\d+)-(.+)$/, ([, d, n]) => ({ 'grid-template-rows': `repeat(${d}, minmax(0, ${isNaN(Number(n)) ? n : `${Number(n) / 4}rem`}))` })],
    ['content-visibility', { 'content-visibility': 'auto' }],
    // <meta name="viewport" content="... viewport-fit=cover" />
    // 只有设置了 viewport-fit=cover，才能使用 env()
    ['safe-area-top', [
      ['padding-top', 'constant(safe-area-inset-top)'],
      ['padding-top', 'env(safe-area-inset-top)']],
    ],
    ['safe-area-bottom', [
      ['padding-bottom', 'constant(safe-area-inset-bottom)'],
      ['padding-bottom', 'env(safe-area-inset-bottom)']],
    ],
    ['break-words', [
      ['overflow-wrap', 'break-word'],
      ['word-break', 'break-word'],
    ]],
  ],
})

/**
 * h-[calc(100%-100px)] 不要在运算符前后加入空格，无法匹配, source tailwindcss jit
 */
