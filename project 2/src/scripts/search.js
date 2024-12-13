let articles = [];
let currentCategory = 'all';

function initializeSearch() {
  const searchInput = document.getElementById('article-search');
  const filterTags = document.querySelectorAll('.filter-tag');
  const articlesContainer = document.querySelector('.articles-grid');
  
  // Get initial articles data
  articles = JSON.parse(articlesContainer.dataset.articles || '[]');
  
  // Search input handler
  searchInput?.addEventListener('input', (e) => {
    const searchTerm = e.target.value;
    updateArticlesDisplay(searchTerm, currentCategory);
  });
  
  // Filter tags handler
  filterTags.forEach(tag => {
    tag.addEventListener('click', () => {
      // Update active state
      filterTags.forEach(t => t.setAttribute('data-active', 'false'));
      tag.setAttribute('data-active', 'true');
      
      // Update articles
      currentCategory = tag.dataset.category;
      updateArticlesDisplay(searchInput?.value || '', currentCategory);
    });
  });
}

function updateArticlesDisplay(searchTerm, category) {
  const articlesContainer = document.querySelector('.articles-grid');
  const filteredArticles = filterArticles(articles, searchTerm, category);
  
  // Update DOM
  articlesContainer.innerHTML = filteredArticles.length > 0
    ? filteredArticles.map(article => createArticleCard(article)).join('')
    : '<p class="no-results">No articles found matching your criteria.</p>';
}

function filterArticles(articles, searchTerm, category) {
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
      article.title.toLowerCase().includes(normalizedSearch) ||
      article.description.toLowerCase().includes(normalizedSearch) ||
      article.author.toLowerCase().includes(normalizedSearch) ||
      article.tags.some(tag => tag.toLowerCase().includes(normalizedSearch))
    );
  });
}

function getArticleCategory(article) {
  const tags = article.tags.map(tag => tag.toLowerCase());
  
  if (tags.some(tag => tag.includes('quantum'))) return 'quantum';
  if (tags.some(tag => tag.includes('ai') || tag.includes('machine learning'))) return 'ai-ml';
  return 'misc';
}

function createArticleCard(article) {
  return `
    <article class="article-card">
      ${article.image ? `<img src="${article.image}" alt="" class="article-image" />` : ''}
      <div class="article-content">
        <h3 class="article-title">
          <a href="/articles/${article.slug}">${article.title}</a>
        </h3>
        <p class="article-description">${article.description}</p>
        <div class="article-meta">
          <span>${article.author}</span>
          <span>${new Date(article.pubDate).toLocaleDateString()}</span>
        </div>
      </div>
    </article>
  `;
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeSearch);