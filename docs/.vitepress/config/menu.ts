import type {DefaultTheme} from 'vitepress'

export const nav: DefaultTheme.NavItem[] = [
    {text: 'Главная', link: '/'},
    {
        text: 'GPT и AI',
        link: '/gpt/',
        title: 'GPT',
        details: 'Интеграции, промпты, API и примеры рабочих сценариев.'
    }
]

export const sidebar: DefaultTheme.Sidebar = [
    {
        text: 'GPT и AI-инструменты',
        link: '/gpt/',
        title: 'GPT',
        details: 'Интеграции, промпты, API и примеры рабочих сценариев.'
    }
]