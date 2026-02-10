// Agent Feedback Widget - 可嵌入的反馈组件
class AgentFeedback {
  constructor(containerId, options = {}) {
    this.container = document.getElementById(containerId);
    this.agentName = options.agentName || 'Agent';
    this.onFeedback = options.onFeedback || (() => {});
    this.init();
  }

  init() {
    this.container.innerHTML = `
      <div class="agent-feedback">
        <p>Was this helpful?</p>
        <button class="fb-btn" data-type="positive">👍</button>
        <button class="fb-btn" data-type="negative">👎</button>
        <div class="fb-comment" style="display:none;">
          <textarea placeholder="Optional feedback..."></textarea>
          <button class="fb-submit">Submit</button>
        </div>
      </div>
      <style>
        .agent-feedback { padding: 10px; background: #1a1a1a; border-radius: 8px; }
        .fb-btn { margin: 0 5px; font-size: 20px; cursor: pointer; }
        .fb-comment textarea { width: 100%; margin-top: 10px; }
      </style>
    `;

    this.bindEvents();
  }

  bindEvents() {
    this.container.querySelectorAll('.fb-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const type = e.target.dataset.type;
        this.handleFeedback(type);
      });
    });
  }

  handleFeedback(type) {
    const commentDiv = this.container.querySelector('.fb-comment');
    
    if (type === 'negative') {
      commentDiv.style.display = 'block';
    } else {
      this.submit(type);
    }
  }

  submit(type, comment = '') {
    const feedback = {
      agent: this.agentName,
      type,
      comment,
      timestamp: new Date().toISOString()
    };

    // 存储
    const history = JSON.parse(localStorage.getItem('agent_feedback') || '[]');
    history.push(feedback);
    localStorage.setItem('agent_feedback', JSON.stringify(history));

    this.onFeedback(feedback);
    this.container.innerHTML = '<p>Thanks for the feedback! 🙏</p>';
  }
}

// 使用示例
// new AgentFeedback('feedback-container', {
//   agentName: 'Airui',
//   onFeedback: (fb) => console.log('Feedback:', fb)
// });
