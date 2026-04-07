// 动态处理链接激活状态和国际化
function updateHeaderLinks() {
  const links = document.querySelectorAll('.internal-links a');
  const currentPath = window.location.pathname;
  
  links.forEach(link => {
    // 更新激活状态
    const href = link.getAttribute('href');
    const isActive = currentPath === href || 
                    (href !== '/' && currentPath.startsWith(href));
    
    if (isActive) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

// 监听路由变化
window.addEventListener('popstate', updateHeaderLinks);
window.addEventListener('load', updateHeaderLinks);

// 初始化
document.addEventListener('DOMContentLoaded', updateHeaderLinks);

// 观察语言变化（如果需要的话）
const observeLanguageChanges = () => {
  // 这里可以添加语言变化检测逻辑
  // 例如监听语言切换按钮的点击事件
};

// 导出函数供其他脚本使用
window.headerUtils = {
  updateHeaderLinks,
  observeLanguageChanges
};