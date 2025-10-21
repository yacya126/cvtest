module.exports = {
  content: ["./*.html", "./pages/**/*.html"], // 告诉 Tailwind 要处理哪些 HTML 文件。
  // 在这里，她自动处理的是主文件夹下的所有html文件，以及pages文件夹下的所有子文件夹下的所有html文件。
  safelist: [
    // 布局和大小
    'w-full','flex','flex-col','items-center','h-4',
    // 间距
    'gap-4','mb-4','mt-2',
    // 字体和颜色 (使用正则匹配范围，以处理不同的文本颜色和深色模式)
    'text-xl','font-bold','text-sm','text-red-500',
    // 文本颜色
    'text-gray-800','text-gray-500',
    // 深色模式 (Dark Mode) 变体
    'dark:text-gray-200','dark:text-gray-400',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}