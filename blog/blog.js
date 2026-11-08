(() => {
  const container = document.getElementById('allBlogPosts') || document.getElementById('latestBlogPosts');
  if (!container) return;

  const isListingPage = container.id === 'allBlogPosts';
  const listing = document.getElementById('blog-listing');
  const article = document.getElementById('blog-article');
  const articleSlug = new URLSearchParams(window.location.search).get('post');
  const manifestUrl = new URL(container.dataset.source || 'blogs/index.json', document.baseURI);

  function showMessage(message) {
    const status = document.createElement('p');
    status.className = 'blog-status';
    status.textContent = message;
    container.replaceChildren(status);
  }

  function formatDate(value) {
    const date = new Date(`${value}T00:00:00`);
    if (Number.isNaN(date.getTime())) return 'Date to be announced';
    return new Intl.DateTimeFormat(undefined, { year: 'numeric', month: 'long', day: 'numeric' }).format(date);
  }

  function safeImageUrl(value) {
    if (typeof value !== 'string' || !value.trim()) return '';
    try {
      const url = new URL(value, manifestUrl);
      return url.protocol === 'https:' && url.origin === window.location.origin ? url.href : '';
    } catch {
      return '';
    }
  }

  function publishedPosts(data) {
    if (!data || !Array.isArray(data.posts)) throw new Error('The blog data file must contain a posts list.');
    const posts = data.posts.filter(post => post && post.published === true);
    for (const post of posts) {
      if (typeof post.slug !== 'string' || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(post.slug)) {
        throw new Error(`Published post "${post.title || 'Untitled'}" needs a lowercase, hyphen-separated URL slug.`);
      }
      if (!post.title || typeof post.date !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(post.date) || Number.isNaN(Date.parse(`${post.date}T00:00:00`))) {
        throw new Error(`Published post "${post.title}" needs a title and a valid publish date.`);
      }
    }
    return posts.sort((a, b) => Date.parse(`${b.date}T00:00:00`) - Date.parse(`${a.date}T00:00:00`));
  }

  function makeCard(post) {
    const card = document.createElement('article');
    card.className = 'blog-card';

    const imageUrl = safeImageUrl(post.image);
    if (imageUrl) {
      const image = document.createElement('img');
      image.src = imageUrl;
      image.alt = post.title || 'Blog post';
      image.loading = 'lazy';
      card.append(image);
    }

    const meta = document.createElement('div');
    meta.className = 'blog-card-meta';
    meta.textContent = `${formatDate(post.date)}${post.author ? ` · ${post.author}` : ''}`;

    const title = document.createElement('h2');
    title.textContent = post.title || 'Untitled post';

    const summary = document.createElement('p');
    summary.textContent = post.summary || '';

    const link = document.createElement('a');
    link.className = 'blog-card-link';
    link.href = isListingPage ? `?post=${encodeURIComponent(post.slug)}` : `blog/?post=${encodeURIComponent(post.slug)}`;
    link.textContent = 'Read story →';

    card.append(meta, title, summary, link);
    return card;
  }

  async function showArticle(posts, slug) {
    const post = posts.find(item => item.slug === slug);
    if (!post || !article || !listing) {
      showMessage('That post could not be found. Browse all stories instead.');
      return;
    }

    const title = document.getElementById('article-title');
    const meta = document.getElementById('article-meta');
    const summary = document.getElementById('article-summary');
    const image = document.getElementById('article-image');
    const body = document.getElementById('article-body');

    title.textContent = post.title || 'Untitled post';
    meta.textContent = `${formatDate(post.date)}${post.author ? ` · ${post.author}` : ''}`;
    summary.textContent = post.summary || '';

    const imageUrl = safeImageUrl(post.image);
    if (imageUrl) {
      image.src = imageUrl;
      image.alt = post.title || 'Blog post';
      image.hidden = false;
    } else {
      image.hidden = true;
      image.removeAttribute('src');
    }

    document.title = `${post.title || 'Blog'} | Sapphire`;
    listing.hidden = true;
    article.hidden = false;
    body.textContent = 'Loading article...';

    if (!window.marked || !window.DOMPurify) {
      throw new Error('The Markdown renderer did not load.');
    }

    const response = await fetch(new URL(`posts/${post.slug}.md`, manifestUrl));
    if (!response.ok) throw new Error(`Article request failed with status ${response.status}.`);
    const markdown = await response.text();
    body.innerHTML = window.DOMPurify.sanitize(window.marked.parse(markdown), { USE_PROFILES: { html: true } });
  }

  fetch(manifestUrl)
    .then(response => {
      if (!response.ok) throw new Error(`Blog data request failed with status ${response.status}.`);
      return response.json();
    })
    .then(data => {
      const posts = publishedPosts(data);
      if (articleSlug && isListingPage) {
        return showArticle(posts, articleSlug);
      }

      const visiblePosts = isListingPage ? posts : posts.slice(0, 3);
      if (!visiblePosts.length) {
        showMessage(isListingPage ? 'No stories published yet. Check back soon.' : 'New stories are on the way. Check back soon.');
        return;
      }

      container.replaceChildren(...visiblePosts.map(makeCard));
    })
    .catch(error => {
      console.error('Unable to load Sapphire blog posts:', error);
      if (articleSlug && article && !article.hidden) {
        document.getElementById('article-body').textContent = 'This article could not be loaded right now. Please try again later.';
      } else {
        showMessage('Blog posts could not be loaded right now. Please try again later.');
      }
    });
})();
