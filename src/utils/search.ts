import type { CollectionEntry } from 'astro:content';

export function searchArticles(
  articles: CollectionEntry<'articles'>[],
  searchTerm: string,
  category: string = 'all'
): CollectionEntry<'articles'>[] {
  const normalizedSearch = searchTerm.toLowerCase().trim();
  
  return articles.filter(article => {
    // Category filter
    if (category !== 'all') {
      const articleCategory = getArticleCategory(article);
      if (articleCategory !== category) return false;
    }
    
    // Search term filter
    if (normalizedSearch === '') return true;
    
    return (
      article.data.title.toLowerCase().includes(normalizedSearch) ||
      article.data.description.toLowerCase().includes(normalizedSearch) ||
      article.data.author.toLowerCase().includes(normalizedSearch) ||
      article.data.tags.some(tag => tag.toLowerCase().includes(normalizedSearch))
    );
  });
}

export function getArticleCategory(article: CollectionEntry<'articles'>): string {
  const tags = article.data.tags.map(tag => tag.toLowerCase());
  
  if (tags.some(tag => tag.includes('quantum'))) return 'quantum';
  if (tags.some(tag => tag.includes('ai') || tag.includes('machine learning'))) return 'ai-ml';
  return 'misc';
}