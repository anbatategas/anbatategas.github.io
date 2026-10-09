// 筛选功能
document.addEventListener('DOMContentLoaded', function() {
  console.log('Filter script loaded');
  
  // 检测是否为平板模式（1024px以下，769px以上）
  function isTabletMode() {
    return window.innerWidth >= 769 && window.innerWidth <= 1024;
  }
  
  // 当前筛选状态 - 支持多重筛选
  let currentFilters = {
    search: null,
    venue: null,
    year: null,
    keywords: [] // 改为数组支持多选
  };
  
  // 获取DOM元素
  const searchInput = document.getElementById('search-input');
  const searchResults = document.getElementById('search-results');
  if (searchInput) searchInput.placeholder = 'Quick Search...';
  
  // 为清除按钮添加事件监听
  const clearFiltersBtn = document.getElementById('clear-filters');
  if (clearFiltersBtn) {
    clearFiltersBtn.addEventListener('click', function() {
      clearAllFilters();
    });
  }
  
  // 为新的清除过滤器按钮添加事件监听
  const clearFiltersBtnNew = document.getElementById('clear-filters-btn');
  if (clearFiltersBtnNew) {
    clearFiltersBtnNew.addEventListener('click', function() {
      clearAllFilters();
    });
  }
  
  // 清除所有筛选的函数
  function clearAllFilters() {
    // 重置筛选状态
    currentFilters.search = null;
    currentFilters.venue = null;
    currentFilters.year = null;
    currentFilters.keywords = [];
    
    // 清除搜索框
    if (searchInput) {
      searchInput.value = '';
    }
    
    // 移除所有高亮
    removeHighlights();
    
    // 移除所有活跃样式
    document.querySelectorAll('.tag-venue-active').forEach(el => el.classList.remove('tag-venue-active'));
    document.querySelectorAll('.tag-keyword-active').forEach(el => el.classList.remove('tag-keyword-active'));
    document.querySelectorAll('.archive-year-active').forEach(el => el.classList.remove('archive-year-active'));
    
    // 隐藏搜索结果
    if (searchResults) {
      searchResults.style.display = 'none';
    }
    
    // 应用筛选（显示所有文章）
    filterPosts();
    
    // 重新处理标签颜色
    if (window.processTagColors) {
      window.processTagColors();
    }
    
    console.log('已清除所有筛选');
  }
  
  // 更新清除按钮状态
  function updateClearButtonState() {
    const clearButton = document.getElementById('clear-filters');
    if (clearButton) {
      const hasActiveFilters = currentFilters.search || 
                               currentFilters.venue || 
                               currentFilters.year || 
                               currentFilters.keywords.length > 0;
      clearButton.disabled = !hasActiveFilters;
    }
  }
  
  // 文章筛选功能
  function filterPosts() {
    const posts = document.querySelectorAll('.post-card');
    const postContainer = document.querySelector('.posts-container') || document.querySelector('main');
    let matchCount = 0;
    
    console.log('开始筛选，找到文章数量:', posts.length);
    console.log('当前筛选条件:', currentFilters);
    
    // 先移除之前的"无结果"消息和高亮（如果有）
    const existingNoResults = document.querySelector('.no-results-message');
    if (existingNoResults) {
      existingNoResults.remove();
    }
    
    // 移除所有现有的高亮
    removeHighlights();
    
    // 获取当前所有筛选条件
    const searchValue = currentFilters.search ? currentFilters.search.toLowerCase() : null;
    const venueValue = currentFilters.venue ? currentFilters.venue.toLowerCase() : null;
    const yearValue = currentFilters.year ? currentFilters.year : null;
    const selectedKeywords = currentFilters.keywords.length > 0 ? currentFilters.keywords.map(k => k.toLowerCase()) : [];
    
    console.log('筛选值 - search:', searchValue, 'venue:', venueValue, 'year:', yearValue, 'keywords:', selectedKeywords);
    
    // 如果没有任何筛选条件，显示所有文章
    if (!searchValue && !venueValue && !yearValue && selectedKeywords.length === 0) {
      console.log('没有筛选条件，显示所有文章');
      posts.forEach(post => {
        post.style.display = '';
      });
      return;
    }
    
    posts.forEach(post => {
      let shouldShow = true;
      
      // 检查搜索条件
      if (searchValue && shouldShow) {
        // 搜索标题
        const title = post.querySelector('h2')?.textContent?.toLowerCase() || '';
        
        // 搜索正文内容
        const contentNode = post.querySelector('.post-full-content') || post.querySelector('.post-content');
        const content = contentNode ? contentNode.textContent.toLowerCase() : '';
        const summary = post.querySelector('.post-summary') ?
                        post.querySelector('.post-summary').textContent.toLowerCase() : '';
        
        // 搜索meta部分 - 日期
        const dateElement = post.querySelector('time');
        const date = dateElement ? dateElement.textContent.toLowerCase() : '';
        
        // 搜索meta部分 - venue
        const venueElements = post.querySelectorAll('.tag-venue');
        const venues = Array.from(venueElements).map(el => el.textContent.toLowerCase()).join(' ');
        
        // 搜索meta部分 - keywords
        const keywordElements = post.querySelectorAll('.tag-keyword');
        const keywords = Array.from(keywordElements).map(el => el.textContent.toLowerCase()).join(' ');
        
        // 搜索meta部分 - 其他可能的meta信息
        const metaElements = post.querySelectorAll('.post-meta *');
        const metaText = Array.from(metaElements).map(el => el.textContent.toLowerCase()).join(' ');
        
        // 组合所有可搜索的文本
        const searchableText = `${title} ${content} ${summary} ${date} ${venues} ${keywords} ${metaText}`;
        
        shouldShow = searchableText.includes(searchValue);
        
        // 如果搜索匹配，高亮文本
        if (shouldShow) {
          highlightText(post, searchValue);
        }
      }
      
      // 检查venue条件
      if (venueValue && shouldShow) {
        const venueElements = post.querySelectorAll('.tag-venue');
        console.log('文章venue元素数量:', venueElements.length, '查找venue:', venueValue);
        let venueMatch = false;
        venueElements.forEach(venueEl => {
          const postVenue = venueEl.textContent.trim().toLowerCase();
          console.log('比较:', postVenue, '===', venueValue);
          if (postVenue === venueValue) {
            venueMatch = true;
            console.log('找到匹配的venue!');
          }
        });
        shouldShow = shouldShow && venueMatch;
        console.log('venue筛选结果:', shouldShow);
      }
      
      // 检查keywords条件（需要全部匹配）
      if (selectedKeywords.length > 0 && shouldShow) {
        // 查找文章中的keyword元素和tag-group
        const keywordElements = post.querySelectorAll('.tag-keyword');
        const tagGroups = post.querySelectorAll('.tag-group');
        console.log('文章keyword元素数量:', keywordElements.length, 'tag-group数量:', tagGroups.length, '查找keywords:', selectedKeywords);
        
        // 收集文章中所有的关键词
        const postKeywords = [];
        
        // 检查单个keyword标签
        keywordElements.forEach(keywordEl => {
          const postKeyword = keywordEl.textContent.trim().toLowerCase();
          postKeywords.push(postKeyword);
        });
        
        // 检查层级keyword标签组
        tagGroups.forEach(tagGroup => {
          const groupKeywords = Array.from(tagGroup.querySelectorAll('.tag-keyword')).map(el => el.textContent.trim().toLowerCase());
          postKeywords.push(...groupKeywords);
        });
        
        console.log('文章中的所有keywords:', postKeywords);
        
        // 检查是否所有选中的关键词都在文章中（AND逻辑）
        const allKeywordsMatch = selectedKeywords.every(selectedKeyword => 
          postKeywords.includes(selectedKeyword)
        );
        
        shouldShow = shouldShow && allKeywordsMatch;
        console.log('keywords筛选结果 (AND逻辑):', shouldShow);
      }
      
      // 检查年份条件
      if (yearValue && shouldShow) {
        const dateEl = post.querySelector('time');
        shouldShow = shouldShow && (dateEl && dateEl.textContent.includes(yearValue));
      }
      
      post.style.display = shouldShow ? '' : 'none';
      if (shouldShow) matchCount++;
    });
    
    // 如果没有匹配的文章，显示"无结果"消息
    if (matchCount === 0 && postContainer) {
      const noResultsMsg = document.createElement('div');
      noResultsMsg.className = 'no-results-message';
      let filterDesc = [];
      if (searchValue) filterDesc.push(`search: "${searchValue}"`);
      if (venueValue) filterDesc.push(`venue: "${venueValue}"`);
      if (selectedKeywords.length > 0) filterDesc.push(`keywords: "${selectedKeywords.join(' + ')}"`);
      if (yearValue) filterDesc.push(`year: "${yearValue}"`);
      
      noResultsMsg.innerHTML = `No posts found for <strong>${filterDesc.join(', ')}</strong>.`;
      postContainer.appendChild(noResultsMsg);
    }
    
    // 更新清除按钮状态
    updateClearButtonState();
    
    // 重新处理标签颜色以确保筛选后的文章标签颜色正确
    if (window.processTagColors) {
      window.processTagColors();
    }
  }
  
  // 高亮搜索文本
  function highlightText(post, searchTerm) {
    if (!searchTerm) return;
    
    const highlightElements = [
      post.querySelector('h2'),
      post.querySelector('.post-full-content'),
      post.querySelector('.post-summary')
    ].filter(el => el !== null);
    
    highlightElements.forEach(element => {
      highlightInElement(element, searchTerm);
    });
  }
  
  // 在元素中高亮文本
  function highlightInElement(element, searchTerm) {
    const walker = document.createTreeWalker(
      element,
      NodeFilter.SHOW_TEXT,
      null,
      false
    );
    
    const textNodes = [];
    let node;
    while (node = walker.nextNode()) {
      textNodes.push(node);
    }
    
    textNodes.forEach(textNode => {
      const parent = textNode.parentNode;
      if (parent.tagName === 'MARK') return; // 跳过已经高亮的文本
      
      const text = textNode.textContent;
      const lowerText = text.toLowerCase();
      const lowerSearchTerm = searchTerm.toLowerCase();
      
      if (lowerText.includes(lowerSearchTerm)) {
        const regex = new RegExp(`(${escapeRegExp(searchTerm)})`, 'gi');
        const highlightedHTML = text.replace(regex, '<mark class="search-highlight">$1</mark>');
        
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = highlightedHTML;
        
        while (tempDiv.firstChild) {
          parent.insertBefore(tempDiv.firstChild, textNode);
        }
        parent.removeChild(textNode);
      }
    });
  }
  
  // 移除所有高亮
  function removeHighlights() {
    const highlights = document.querySelectorAll('.search-highlight');
    highlights.forEach(highlight => {
      const parent = highlight.parentNode;
      parent.replaceChild(document.createTextNode(highlight.textContent), highlight);
      parent.normalize();
    });
  }
  
  // 高亮文章
  function highlightAndCenterPost(post) {
    // 移除所有其他文章的高亮状态
    document.querySelectorAll('.post-card').forEach(card => {
      card.classList.remove('search-highlighted');
    });
    
    // 添加临时高亮样式
    post.classList.add('search-highlighted');
    
    // 3秒后移除高亮
    setTimeout(() => {
      post.classList.remove('search-highlighted');
    }, 3000);
  }
  
  // 转义正则表达式特殊字符
  function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }
  
  // 搜索功能增强
  if (searchInput) {
    console.log('搜索框找到');
    searchInput.addEventListener('input', function() {
      const query = this.value.toLowerCase();
      console.log('搜索输入:', query);
      
      // 更新当前筛选状态
      currentFilters.search = query.length > 0 ? query : null;
      
      // 应用筛选
      filterPosts();
      
      if (query.length > 0) {
        // 为搜索结果更新下拉列表
        if (searchResults) {
          searchResults.style.display = 'block';
          searchResults.innerHTML = '';
          
          const visiblePosts = document.querySelectorAll('.post-card:not([style*="none"])');
          let matchFound = false;
          
          visiblePosts.forEach(post => {
            // 搜索标题
            const title = post.querySelector('h2')?.textContent?.toLowerCase() || '';
            
            // 搜索正文内容
            const contentNode = post.querySelector('.post-full-content') || post.querySelector('.post-content');
            const content = contentNode ? contentNode.textContent.toLowerCase() : '';
            const summary = post.querySelector('.post-summary') ?
                        post.querySelector('.post-summary').textContent.toLowerCase() : '';

            // 搜索meta部分 - 日期
            const dateElement = post.querySelector('time');
            const date = dateElement ? dateElement.textContent.toLowerCase() : '';
            
            // 搜索meta部分 - venue
            const venueElements = post.querySelectorAll('.tag-venue');
            const venues = Array.from(venueElements).map(el => el.textContent.toLowerCase()).join(' ');
            
            // 搜索meta部分 - keywords
            const keywordElements = post.querySelectorAll('.tag-keyword');
            const keywords = Array.from(keywordElements).map(el => el.textContent.toLowerCase()).join(' ');
            
            // 搜索meta部分 - 其他可能的meta信息
            const metaElements = post.querySelectorAll('.post-meta *');
            const metaText = Array.from(metaElements).map(el => el.textContent.toLowerCase()).join(' ');
            
            // 组合所有可搜索的文本
            const searchableText = `${title} ${content} ${summary} ${date} ${venues} ${keywords} ${metaText}`;
            
            if (searchableText.includes(query)) {
              matchFound = true;
              const result = document.createElement('div');
              result.className = 'search-result-item';
              
              // 创建更丰富的搜索结果显示
              const titleText = post.querySelector('h2')?.textContent || '';
              const dateText = dateElement ? dateElement.textContent : '';
              const venueText = venueElements.length > 0 ? venueElements[0].textContent : '';
              
              result.innerHTML = `
                <div class="search-result-title"><strong>${titleText}</strong></div>
                ${dateText ? `<div class="search-result-meta">📅 ${dateText}</div>` : ''}
                ${venueText ? `<div class="search-result-meta">📄 ${venueText}</div>` : ''}
                ${keywords ? `<div class="search-result-meta">🏷️ ${keywords.split(' ').slice(0, 3).join(', ')}${keywords.split(' ').length > 3 ? '...' : ''}</div>` : ''}
              `;
              
              result.addEventListener('click', () => {
                // 清除搜索输入框
                searchInput.value = '';
                
                // 清除当前筛选状态中的搜索
                currentFilters.search = null;
                
                // 移除所有高亮
                removeHighlights();
                
                // 重新应用筛选（没有搜索条件）
                filterPosts();
                
                // 隐藏搜索结果
                searchResults.style.display = 'none';
                
                // 使用通用函数展开并居中显示post
                window.expandAndCenterPost(post);
                
                // 添加高亮效果
                // highlightAndCenterPost(post);
                
                // 滚动到文章
                // post.scrollIntoView({ behavior: 'smooth' });
              });
              searchResults.appendChild(result);
            }
          });
          
          if (!matchFound) {
            searchResults.innerHTML = '<div class="no-results">No results found</div>';
          }
        }
      } else {
        // 当搜索框为空时，清除所有高亮
        removeHighlights();
        
        if (searchResults) {
          searchResults.style.display = 'none';
        }
      }
    });
  } else {
    console.log('搜索框未找到');
  }
  
  // 点击外部隐藏搜索结果
  document.addEventListener('click', function(e) {
    if (searchResults && !e.target.closest('.search-box')) {
      searchResults.style.display = 'none';
    }
  });
  
  // 为 venue 标签添加点击筛选事件
  const venueTags = document.querySelectorAll('.tags-cloud .tag-venue');
  console.log('找到venue标签数量:', venueTags.length);
  venueTags.forEach(tag => {
    tag.addEventListener('click', function(e) {
      e.preventDefault();
      const venueValue = this.textContent.trim();
      console.log('点击了venue:', venueValue);
      
      // 如果已经选中了这个标签，则取消选择
      if (currentFilters.venue === venueValue) {
        currentFilters.venue = null;
        console.log('取消选择venue');
        // 移除所有活跃venue标签的样式
        document.querySelectorAll('.tag-venue-active').forEach(t => t.classList.remove('tag-venue-active'));
      } else {
        currentFilters.venue = venueValue;
        console.log('选择venue:', venueValue);
        // 移除所有活跃venue标签的样式
        document.querySelectorAll('.tag-venue-active').forEach(t => t.classList.remove('tag-venue-active'));
        // 添加活跃样式到当前标签
        this.classList.add('tag-venue-active');
        // 同时高亮post中对应的标签
        const postTags = document.querySelectorAll(`.post-meta .tag-venue`);
        postTags.forEach(postTag => {
          if (postTag.textContent.trim() === venueValue) {
            postTag.classList.add('tag-venue-active');
          }
        });
      }
      
      console.log('当前筛选状态:', currentFilters);
      // 应用筛选
      filterPosts();
      return false;
    });
  });
  
  // 为归档年份添加点击筛选事件
  const archiveYears = document.querySelectorAll('.archive-year');
  console.log('找到年份按钮数量:', archiveYears.length);
  archiveYears.forEach(yearDiv => {
    yearDiv.addEventListener('click', function(e) {
      e.preventDefault();
      // 从 data-year 属性或者 a 标签的文本内容获取年份值
      const yearLink = this.querySelector('a[data-year]');
      const yearValue = yearLink ? (yearLink.getAttribute('data-year') || yearLink.textContent.trim()) : null;
      
      if (!yearValue) return;
      
      console.log('点击了年份按钮:', yearValue);
      
      // 如果已经选中了这个年份，则取消选择
      if (currentFilters.year === yearValue) {
        currentFilters.year = null;
        console.log('取消选择年份');
        // 移除所有活跃年份的样式
        document.querySelectorAll('.archive-year-active').forEach(y => y.classList.remove('archive-year-active'));
      } else {
        currentFilters.year = yearValue;
        console.log('选择年份:', yearValue);
        // 移除所有活跃年份的样式
        document.querySelectorAll('.archive-year-active').forEach(y => y.classList.remove('archive-year-active'));
        // 添加活跃样式到当前年份
        this.classList.add('archive-year-active');
      }
      
      console.log('当前筛选状态:', currentFilters);
      // 应用筛选
      filterPosts();
      return false;
    });
  });
  
  // 为 keyword 标签添加点击筛选事件（支持多选）
  const keywordTags = document.querySelectorAll('.tags-cloud .tag-keyword.sidebar-tag');
  console.log('找到keyword标签数量:', keywordTags.length);
  keywordTags.forEach(tag => {
    tag.addEventListener('click', function(e) {
      e.preventDefault();
      // 优先使用data-keyword属性，如果没有则使用textContent
      const keywordValue = this.getAttribute('data-keyword') || this.textContent.trim();
      console.log('点击了keyword:', keywordValue);
      
      // 检查是否已经选中了这个关键词
      const keywordIndex = currentFilters.keywords.indexOf(keywordValue);
      
      if (keywordIndex > -1) {
        // 如果已选中，则移除（取消选择）
        currentFilters.keywords.splice(keywordIndex, 1);
        console.log('移除keyword:', keywordValue);
        this.classList.remove('tag-keyword-active');
        
        // 移除post中对应标签的活跃样式
        const postTags = document.querySelectorAll(`.post-keywords .tag-keyword`);
        postTags.forEach(postTag => {
          if (postTag.textContent.trim() === keywordValue) {
            postTag.classList.remove('tag-keyword-active');
          }
        });
      } else {
        // 如果未选中，则添加（选择）
        currentFilters.keywords.push(keywordValue);
        console.log('添加keyword:', keywordValue);
        this.classList.add('tag-keyword-active');
        
        // 高亮post中对应的标签
        const postTags = document.querySelectorAll(`.post-keywords .tag-keyword`);
        postTags.forEach(postTag => {
          if (postTag.textContent.trim() === keywordValue) {
            postTag.classList.add('tag-keyword-active');
          }
        });
      }
      
      console.log('当前选中的keywords:', currentFilters.keywords);
      console.log('当前筛选状态:', currentFilters);
      // 应用筛选
      filterPosts();
      return false;
    });
  });
  
  // 为 post 中的 venue 标签添加点击筛选事件
  const postVenueTags = document.querySelectorAll('.post-meta .tag-venue');
  console.log('找到post中venue标签数量:', postVenueTags.length);
  postVenueTags.forEach(tag => {
    tag.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation(); // 防止触发post的折叠/展开
      
      const venueValue = this.textContent.trim();
      console.log('点击了post中的venue:', venueValue);
      
      // 如果已经选中了这个标签，则取消选择
      if (currentFilters.venue === venueValue) {
        currentFilters.venue = null;
        console.log('取消选择venue');
        // 移除所有活跃venue标签的样式
        document.querySelectorAll('.tag-venue-active').forEach(t => t.classList.remove('tag-venue-active'));
      } else {
        currentFilters.venue = venueValue;
        console.log('选择venue:', venueValue);
        // 移除所有活跃venue标签的样式
        document.querySelectorAll('.tag-venue-active').forEach(t => t.classList.remove('tag-venue-active'));
        // 添加活跃样式到当前标签和右侧栏对应标签
        this.classList.add('tag-venue-active');
        // 同时高亮右侧栏对应的标签
        const sidebarTags = document.querySelectorAll(`.tags-cloud .tag-venue.sidebar-tag`);
        sidebarTags.forEach(sidebarTag => {
          if (sidebarTag.textContent.trim() === venueValue) {
            sidebarTag.classList.add('tag-venue-active');
          }
        });
        // 同时高亮所有posts中对应的venue标签
        const allPostVenueTags = document.querySelectorAll(`.post-meta .tag-venue`);
        allPostVenueTags.forEach(postTag => {
          if (postTag.textContent.trim() === venueValue) {
            postTag.classList.add('tag-venue-active');
          }
        });
      }
      
      console.log('当前筛选状态:', currentFilters);
      // 应用筛选
      filterPosts();
      return false;
    });
  });
  
  // 为 post 中的 keyword 标签添加点击筛选事件（支持多选）
  const postKeywordTags = document.querySelectorAll('.post-keywords .tag-keyword');
  console.log('找到post中keyword标签数量:', postKeywordTags.length);
  postKeywordTags.forEach(tag => {
    tag.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation(); // 防止触发post的折叠/展开
      
      const keywordValue = this.textContent.trim();
      console.log('点击了post中的keyword:', keywordValue);
      
      // 检查是否已经选中了这个关键词
      const keywordIndex = currentFilters.keywords.indexOf(keywordValue);
      
      if (keywordIndex > -1) {
        // 如果已选中，则移除（取消选择）
        currentFilters.keywords.splice(keywordIndex, 1);
        console.log('移除keyword:', keywordValue);
        this.classList.remove('tag-keyword-active');
        
        // 移除右侧栏对应标签的活跃样式
        const sidebarTag = document.querySelector(`.tags-cloud .tag-keyword.sidebar-tag[data-keyword="${keywordValue}"]`);
        if (sidebarTag) {
          sidebarTag.classList.remove('tag-keyword-active');
        }
        
        // 移除其他post中对应标签的活跃样式
        const allPostTags = document.querySelectorAll(`.post-keywords .tag-keyword`);
        allPostTags.forEach(postTag => {
          if (postTag.textContent.trim() === keywordValue) {
            postTag.classList.remove('tag-keyword-active');
          }
        });
      } else {
        // 如果未选中，则添加（选择）
        currentFilters.keywords.push(keywordValue);
        console.log('添加keyword:', keywordValue);
        this.classList.add('tag-keyword-active');
        
        // 高亮右侧栏对应的标签
        const sidebarTag = document.querySelector(`.tags-cloud .tag-keyword.sidebar-tag[data-keyword="${keywordValue}"]`);
        if (sidebarTag) {
          sidebarTag.classList.add('tag-keyword-active');
        }
        
        // 高亮其他post中对应的标签
        const allPostTags = document.querySelectorAll(`.post-keywords .tag-keyword`);
        allPostTags.forEach(postTag => {
          if (postTag.textContent.trim() === keywordValue) {
            postTag.classList.add('tag-keyword-active');
          }
        });
      }
      
      console.log('当前选中的keywords:', currentFilters.keywords);
      console.log('当前筛选状态:', currentFilters);
      // 应用筛选
      filterPosts();
      return false;
    });
  });
  
  // 通用的post展开/折叠函数（全局函数）
  window.expandAndCenterPost = function(targetPost) {
    // 获取目标post的信息
    const postCard = targetPost.closest('.post-card');
    const postHeader = targetPost.querySelector('.post-header') || targetPost;
    const postId = postHeader.getAttribute('data-post-id');
    
    if (!postId || !postCard) {
      console.log('Post ID or card not found');
      return;
    }
    
    const content = document.getElementById('content-' + postId);
    
    if (!content) {
      console.log('Content element not found');
      return;
    }
    
    // 先折叠所有其他post
    document.querySelectorAll('.post-card').forEach(card => {
      if (card !== postCard) {
        // 移除居中状态
        card.classList.remove('centered');
        
        // 折叠其他post的内容
        const otherPostHeader = card.querySelector('.post-header');
        if (otherPostHeader) {
          const otherPostId = otherPostHeader.getAttribute('data-post-id');
          if (otherPostId) {
            const otherContent = document.getElementById('content-' + otherPostId);
            if (otherContent) {
              otherContent.style.display = 'none';
            }
          }
        }
      }
    });
    
    // 展开目标post
    content.style.display = 'block';
    
    // 添加居中状态
    postCard.classList.add('centered');
    
    // 滚动到居中的post，让标题显示在页面顶端
    setTimeout(() => {
      postCard.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    }, 100);
    
    console.log('Expanded and centered post:', postId);
  };

// 文章折叠/展开功能和居中显示
console.log('Setting up post toggle functionality');
document.addEventListener('click', function(e) {
  console.log('Click detected on:', e.target);
  
  // 如果点击的是标签，则不处理post的折叠/展开
  if (e.target.classList.contains('tag') || e.target.classList.contains('tag-venue') || e.target.classList.contains('tag-keyword')) {
    console.log('Click on tag detected, skipping post toggle');
    return;
  }
  
  const postHeader = e.target.closest('.post-header');
  console.log('Post header found:', postHeader);
  if (postHeader) {
    const postCard = postHeader.closest('.post-card');
    const postId = postHeader.getAttribute('data-post-id');
    console.log('Post ID:', postId);
    if (postId && postCard) {
      const content = document.getElementById('content-' + postId);
      console.log('Content element:', content);
      
      if (content) {
        console.log('Toggling post content');
        
        // 检查当前状态
        const isExpanded = content.style.display === 'block';
        const isCentered = postCard.classList.contains('centered');
        
        if (!isExpanded) {
          // 使用通用函数展开并居中显示
          window.expandAndCenterPost(postCard);
        } else {
          // 折叠并移除居中状态
          content.style.display = 'none';
          postCard.classList.remove('centered');
          console.log('Collapsed post');
        }
      } else {
        console.log('Content element not found');
      }
    }
  }
});
});

// 可折叠侧边栏功能
function toggleSection(sectionId) {
  console.log('toggleSection called with:', sectionId);
  const section = document.getElementById(sectionId);
  let toggleIcon;
  
  console.log('Found section element:', section);
  
  // 根据内容ID找到对应的toggle图标ID
  if (sectionId === 'archives-content') {
    toggleIcon = document.getElementById('archives-toggle');
  } else if (sectionId === 'venues-section') {
    toggleIcon = document.getElementById('venues-toggle');
  } else if (sectionId === 'keywords-section') {
    toggleIcon = document.getElementById('keywords-toggle');
  }
  
  console.log('Found toggle icon:', toggleIcon);
  
  if (section && toggleIcon) {
    console.log('Both section and toggleIcon found, current state:', section.classList.contains('collapsed'));
    if (section.classList.contains('collapsed')) {
      section.classList.remove('collapsed');
      toggleIcon.textContent = '🔽';
      toggleIcon.style.transform = '';
      console.log('Expanded section');
    } else {
      section.classList.add('collapsed');
      toggleIcon.textContent = '◀️';
      toggleIcon.style.transform = '';
      console.log('Collapsed section');
    }
  } else {
    console.log('Missing elements - section:', !!section, 'toggleIcon:', !!toggleIcon);
  }
}

// 页面加载时不再默认折叠Keywords和Venues部分
document.addEventListener('DOMContentLoaded', function() {
  // Keywords和Venues现在默认展开，不需要设置折叠状态
  
  // 控制Archives的滚动条显示
  function setupScrollableSection(containerSelector, itemSelector, maxItems = 3) {
    const container = document.querySelector(containerSelector);
    if (container) {
      const items = container.querySelectorAll(itemSelector);
      if (items.length <= maxItems) {
        // 少于等于maxItems条，移除滚动
        container.style.maxHeight = 'none';
        container.style.overflowY = 'visible';
      }
      // 超过maxItems条时保持CSS中的滚动设置
    }
  }
  
  // 设置Archives滚动
  setupScrollableSection('.archives-list', '.archive-year', 3);
  
  // Recent News现在延伸到左侧栏底部，不需要特殊控制
  
  // 监听窗口大小变化，动态更新标签的点击状态
  window.addEventListener('resize', function() {
    // 在窗口大小变化时，可以在这里添加一些逻辑
    // 比如重新检查是否需要禁用某些功能
    console.log('窗口大小变化，当前宽度:', window.innerWidth, '平板模式:', isTabletMode());
  });
  
  // 初始化时检查一次
  console.log('初始化时检查 - 当前宽度:', window.innerWidth, '平板模式:', isTabletMode());
});
