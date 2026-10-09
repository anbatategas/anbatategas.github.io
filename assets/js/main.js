(function() {
  const htmlElement = document.documentElement;

  // 1. 设置主题的函数 (Set Theme & Save to Memory)
  function setTheme(theme) {
    if (theme === 'dark') {
      htmlElement.setAttribute('data-theme', 'dark');
    } else {
      htmlElement.removeAttribute('data-theme');
    }
    localStorage.setItem('site-theme', theme);
  }

  // 2. 获取当前主题偏好 (Check Memory -> Fallback to System)
  function getTheme() {
    const savedTheme = localStorage.getItem('site-theme');
    if (savedTheme) {
      return savedTheme;
    }
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? 'dark' : 'light';
  }

  // 3. 页面加载时的主题初始化 & Button Listener
  function initializeTheme() {
    // 1. Apply the theme instantly so the screen doesn't flash white
    setTheme(getTheme());
    
    // 2. Define the button wiring logic
    const attachButton = () => {
      const themeBtn = document.getElementById('theme-toggle');
      if (themeBtn) {
        themeBtn.addEventListener('click', () => {
          const currentTheme = htmlElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
          const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
          setTheme(newTheme);
        });
      }
    };

    // 3. Wait for the HTML to be fully drawn before attaching the button
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', attachButton);
    } else {
      attachButton();
    }
  }

  // 4. 监听系统主题变化并自动切换 (Only if user hasn't set a preference)
  function setupSystemThemeListener() {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', (e) => {
      if (!localStorage.getItem('site-theme')) {
        setTheme(e.matches ? 'dark' : 'light');
      }
    });
  }

  // 5. 左侧栏折叠功能（平板端和移动端）
  function setupSidebarToggle() {
    // 检查是否在平板端或移动端
    const isTablet = window.innerWidth >= 769 && window.innerWidth <= 1024;
    const isMobile = window.innerWidth <= 768;
    
    if (!isTablet && !isMobile) return;

    // 检查是否已经存在按钮，如果存在则不再创建
    if (document.querySelector('.sidebar-toggle')) {
      console.log('sidebar-toggle按钮已存在');
      return;
    }

    // 创建左侧栏切换按钮
    const sidebarToggle = document.createElement('button');
    sidebarToggle.className = 'sidebar-toggle';
    sidebarToggle.innerHTML = 'ℹ️';
    sidebarToggle.setAttribute('aria-label', 'Toggle sidebar');
    sidebarToggle.setAttribute('title', 'Toggle sidebar');
    document.body.appendChild(sidebarToggle);
    console.log('创建了sidebar-toggle按钮');

    // 创建遮罩层
    const sidebarOverlay = document.createElement('div');
    sidebarOverlay.className = 'sidebar-overlay';
    document.body.appendChild(sidebarOverlay);

    // 获取左侧栏
    const sidebarLeft = document.querySelector('.sidebar-left');
    if (!sidebarLeft) return;

    // 切换左侧栏显示状态
    function toggleSidebar() {
      const isActive = sidebarLeft.classList.contains('active');
      
      if (isActive) {
        // 隐藏左侧栏
        sidebarLeft.classList.remove('active');
        sidebarOverlay.classList.remove('active');
        document.body.style.overflow = '';
      } else {
        // 显示左侧栏
        sidebarLeft.classList.add('active');
        sidebarOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    }

    // 隐藏左侧栏
    function hideSidebar() {
      sidebarLeft.classList.remove('active');
      sidebarOverlay.classList.remove('active');
      document.body.style.overflow = '';
    }

    // 绑定事件
    sidebarToggle.addEventListener('click', function(e) {
      e.stopPropagation();
      toggleSidebar();
    });

    // 点击遮罩层隐藏左侧栏
    sidebarOverlay.addEventListener('click', hideSidebar);

    // 点击左侧栏内部不隐藏
    sidebarLeft.addEventListener('click', function(e) {
      e.stopPropagation();
    });

    // 点击页面其他区域隐藏左侧栏
    document.addEventListener('click', function(e) {
      if (!sidebarLeft.contains(e.target) && !sidebarToggle.contains(e.target)) {
        hideSidebar();
      }
    });

    // 监听窗口大小变化
    window.addEventListener('resize', function() {
      const isTablet = window.innerWidth >= 769 && window.innerWidth <= 1024;
      const isMobile = window.innerWidth <= 768;
      if (!isTablet && !isMobile) {
        hideSidebar();
      }
    });
  }

  // 6. 移动端搜索功能
  function setupMobileSearch() {
    // 检查是否在移动端
    const isMobile = window.innerWidth <= 768;
    if (!isMobile) return;

    const searchToggle = document.getElementById('search-toggle');
    const mobileSearchOverlay = document.getElementById('mobile-search-overlay');
    const mobileSearchClose = document.getElementById('mobile-search-close');
    const mobileSearchInput = document.getElementById('mobile-search-input');
    if (mobileSearchInput) mobileSearchInput.placeholder = 'Quick Search...';
    const mobileSearchResults = document.getElementById('mobile-search-results');

    if (!searchToggle || !mobileSearchOverlay) return;

    // 显示搜索弹窗
    function showSearchOverlay() {
      mobileSearchOverlay.style.display = 'flex';
      if (mobileSearchInput) {
        mobileSearchInput.focus();
      }
      document.body.style.overflow = 'hidden';
    }

    // 隐藏搜索弹窗
    function hideSearchOverlay() {
      mobileSearchOverlay.style.display = 'none';
      if (mobileSearchInput) {
        mobileSearchInput.value = '';
      }
      if (mobileSearchResults) {
        mobileSearchResults.innerHTML = '';
      }
      document.body.style.overflow = '';
    }

    // 搜索功能
    function performSearch(query) {
      if (!query.trim()) {
        if (mobileSearchResults) {
          mobileSearchResults.innerHTML = '';
        }
        return;
      }

      // 获取所有文章
      const posts = document.querySelectorAll('.post-card');
      const results = [];

      posts.forEach(post => {
        // 搜索标题
        const title = post.querySelector('.post-header h2')?.textContent || '';
        
        // 搜索正文内容
        const contentNode = post.querySelector('.post-content') || post.querySelector('.post-full-content') || post.querySelector('.post-summary');
        const content = contentNode ? contentNode.textContent : '';
        
        // 搜索meta部分 - 日期
        const dateElement = post.querySelector('time');
        const date = dateElement ? dateElement.textContent : '';
        
        // 搜索meta部分 - venue
        const venueElements = post.querySelectorAll('.tag-venue');
        const venues = Array.from(venueElements).map(tag => tag.textContent).join(' ');
        
        // 搜索meta部分 - keywords
        const keywordElements = post.querySelectorAll('.tag-keyword');
        const keywords = Array.from(keywordElements).map(tag => tag.textContent).join(' ');
        
        // 搜索meta部分 - 其他可能的meta信息
        const metaElements = post.querySelectorAll('.post-meta *');
        const metaText = Array.from(metaElements).map(el => el.textContent).join(' ');

        // 组合所有可搜索的文本
        const searchText = `${title} ${content} ${date} ${venues} ${keywords} ${metaText}`.toLowerCase();
        const queryLower = query.toLowerCase();

        if (searchText.includes(queryLower)) {
          results.push({
            title: title,
            element: post,
            date: date,
            venue: venues,
            keywords: keywords
          });
        }
      });

      // 显示搜索结果
      if (mobileSearchResults) {
        if (results.length === 0) {
          mobileSearchResults.innerHTML = '<div class="no-results">No results found</div>';
        } else {
          mobileSearchResults.innerHTML = results.map(result => {
            const postId = result.element.querySelector('.post-header')?.getAttribute('data-post-id');
            return `<div class="search-result-item" data-post-id="${postId}">
              <div class="search-result-title"><strong>${result.title}</strong></div>
              ${result.date ? `<div class="search-result-meta">📅 ${result.date}</div>` : ''}
              ${result.venue ? `<div class="search-result-meta">📄 ${result.venue}</div>` : ''}
              ${result.keywords ? `<div class="search-result-meta">🏷️ ${result.keywords.split(' ').slice(0, 3).join(', ')}${result.keywords.split(' ').length > 3 ? '...' : ''}</div>` : ''}
            </div>`;
          }).join('');
          
          // 为搜索结果添加点击事件
          mobileSearchResults.querySelectorAll('.search-result-item').forEach((item, index) => {
            item.addEventListener('click', () => {
              const targetPost = results[index].element;
              if (window.expandAndCenterPost) {
                window.expandAndCenterPost(targetPost);
              }
              hideSearchOverlay();
            });
          });
        }
      }
    }

    // 绑定事件
    searchToggle.addEventListener('click', showSearchOverlay);
    mobileSearchClose.addEventListener('click', hideSearchOverlay);

    // 点击遮罩层关闭搜索
    mobileSearchOverlay.addEventListener('click', function(e) {
      if (e.target === mobileSearchOverlay) {
        hideSearchOverlay();
      }
    });

    // 搜索输入事件
    if (mobileSearchInput) {
      mobileSearchInput.addEventListener('input', function() {
        performSearch(this.value);
      });

      // 回车键搜索
      mobileSearchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
          performSearch(this.value);
        }
      });
    }

    // ESC键关闭搜索
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && mobileSearchOverlay.style.display === 'flex') {
        hideSearchOverlay();
      }
    });
  }

  // 7. 初始化：设置初始主题并开始监听系统变化
  initializeTheme();
  setupSystemThemeListener();
  
  // 8. 初始化功能
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      setupSidebarToggle();
      setupMobileSearch();
    });
  } else {
    setupSidebarToggle();
    setupMobileSearch();
  }

  // 9. 监听窗口大小变化，重新初始化功能
  window.addEventListener('resize', function() {
    setupSidebarToggle();
    setupMobileSearch();
  });
})();
