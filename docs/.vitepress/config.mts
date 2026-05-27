import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'AI Memory',
  description: 'Knowledge base and operating memory for memory.oldphoto.site',
  cleanUrls: true,
  lastUpdated: true,
  lang: 'zh-CN',
  themeConfig: {
    siteTitle: 'AI Memory',
    logo: '/logo.svg',
    search: {
      provider: 'local'
    },
    nav: [
      { text: '首页', link: '/' },
      { text: '关于我', link: '/about' },
      { text: 'Artifacts', link: '/artifacts/' },
      { text: 'Memory', link: '/memory/' },
      { text: 'Projects', link: '/projects/' },
      { text: 'AI 路线图', link: '/ai-learning-roadmap/' },
      { text: '最简地基', link: '/ai-foundation-plain' },
      { text: '自测', link: '/ai-quiz/' },
      { text: '错题本', link: '/ai-quiz/wrong/' },
      { text: '30天冲刺', link: '/30-day-agent-plan' },
      { text: 'AI 学习笔记', link: '/ai-learning-notes/' },
      { text: '数学之美', link: '/math-beauty/' },
      { text: '思考录', link: '/thoughts/' }
    ],
    sidebar: {
      '/artifacts/': [
        {
          text: 'Artifacts',
          items: [
            { text: '概览', link: '/artifacts/' },
            { text: '去重总结', link: '/artifacts/artifacts_summary_dedup' },
            { text: 'Clash 代理模式指南', link: '/artifacts/clash_proxy_modes_guide' },
            { text: '部署报告', link: '/artifacts/deployment_report' },
            { text: '网络问题详解', link: '/artifacts/network_explained' },
            { text: '服务注册表', link: '/artifacts/service_registry' }
          ]
        }
      ],
      '/memory/': [
        {
          text: 'Memory',
          items: [
            { text: '概览', link: '/memory/' },
            { text: 'Hermes 记忆快照', link: '/memory/hermes_memory_snapshot' }
          ]
        }
      ],
      '/projects/': [
        {
          text: 'Projects',
          items: [
            { text: '概览', link: '/projects/' },
            { text: '项目化方案', link: '/projects/project_plan' },
            { text: 'Cloudflare Pages 部署', link: '/projects/cloudflare_pages_deploy' },
            { text: 'Vercel 部署', link: '/projects/vercel_deploy' }
          ]
        }
      ],
      '/ai-learning-notes/': [
        {
          text: 'AI 学习笔记',
          items: [
            { text: '目录', link: '/ai-learning-notes/' },
            { text: 'RNN 循环神经网络', link: '/ai-learning-notes/rnn' },
            { text: 'Transformer 编码器与解码器', link: '/ai-learning-notes/transformer-encoder-decoder' },
            { text: 'GPT/Claude 纯解码器架构', link: '/ai-learning-notes/decoder-only' },
            { text: 'Softmax、欧拉数 e 与求导', link: '/ai-learning-notes/softmax-e-derivatives' }
          ]
        }
      ],
      '/thoughts/': [
        {
          text: '思考录',
          items: [
            { text: '文章列表', link: '/thoughts/' },
            { text: '为什么要记录思考', link: '/thoughts/why-write' },
            { text: '欲望、自由与自我控制', link: '/thoughts/desire-and-self-control' }
          ]
        }
      ]
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/' }
    ],
    footer: {
      message: 'Built with VitePress',
      copyright: 'memory.oldphoto.site'
    }
  }
})
