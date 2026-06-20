/**
 * Dashboard Specific Actions and Logic
 * Commercial Real Estate Brokerage
 */

document.addEventListener('DOMContentLoaded', () => {
  initPipelineControls();
  initDocumentRoom();
  initAnalyticsCharts();
  initDashboardSidebar();
});

/**
 * Handle Dashboard pipeline stage transitions for Admin
 */
function initPipelineControls() {
  const pipelineSteps = document.querySelectorAll('.pipeline-step');
  const advanceBtn = document.getElementById('advance-pipeline-btn');

  if (advanceBtn && pipelineSteps.length > 0) {
    advanceBtn.addEventListener('click', () => {
      let currentActiveIndex = -1;
      
      // Find current active step
      pipelineSteps.forEach((step, idx) => {
        if (step.classList.contains('active')) {
          currentActiveIndex = idx;
        }
      });

      if (currentActiveIndex !== -1 && currentActiveIndex < pipelineSteps.length - 1) {
        pipelineSteps[currentActiveIndex].classList.remove('active');
        pipelineSteps[currentActiveIndex].classList.add('completed');
        
        const nextIndex = currentActiveIndex + 1;
        pipelineSteps[nextIndex].classList.add('active');
        
        // Disable button if reached the end
        if (nextIndex === pipelineSteps.length - 1) {
          advanceBtn.classList.add('disabled');
          advanceBtn.innerText = 'Pipeline Deal Closed';
        }
      }
    });
  }
}

/**
 * Simulate Due Diligence Room Document Access & Action Log
 */
function initDocumentRoom() {
  const docCheckboxes = document.querySelectorAll('.doc-checkbox');
  const downloadAllBtn = document.getElementById('download-selected-docs');

  if (downloadAllBtn && docCheckboxes.length > 0) {
    // Enable/disable download button based on checks
    docCheckboxes.forEach(checkbox => {
      checkbox.addEventListener('change', () => {
        const checkedCount = document.querySelectorAll('.doc-checkbox:checked').length;
        if (checkedCount > 0) {
          downloadAllBtn.classList.remove('disabled');
        } else {
          downloadAllBtn.classList.add('disabled');
        }
      });
    });

    downloadAllBtn.addEventListener('click', () => {
      const checkedDocs = document.querySelectorAll('.doc-checkbox:checked');
      let docNames = [];
      checkedDocs.forEach(chk => {
        docNames.push(chk.getAttribute('data-doc-name'));
      });
      alert(`Preparing secure download package containing:\n- ${docNames.join('\n- ')}\n\nDownloading encrypted zip (due_diligence_package.zip)...`);
    });
  }
}

/**
 * Renders pure SVG/CSS responsive dynamic charts for Admin Analytics
 */
function initAnalyticsCharts() {
  const chartContainers = document.querySelectorAll('.dashboard-chart');
  if (chartContainers.length === 0) return;

  // Let's populate the container with inline premium SVG bar chart / line chart
  chartContainers.forEach(container => {
    const type = container.getAttribute('data-chart-type');
    if (type === 'bar') {
      container.innerHTML = `
        <svg viewBox="0 0 400 200" class="w-100 h-100">
          <!-- Grid lines -->
          <line x1="40" y1="20" x2="380" y2="20" stroke="var(--border-color)" stroke-dasharray="4" />
          <line x1="40" y1="70" x2="380" y2="70" stroke="var(--border-color)" stroke-dasharray="4" />
          <line x1="40" y1="120" x2="380" y2="120" stroke="var(--border-color)" stroke-dasharray="4" />
          <line x1="40" y1="170" x2="380" y2="170" stroke="var(--border-color)" />
          
          <!-- Bars -->
          <rect x="60" y="80" width="30" height="90" fill="var(--primary-color)" rx="3" />
          <rect x="110" y="50" width="30" height="120" fill="var(--secondary-color)" rx="3" />
          <rect x="160" y="95" width="30" height="75" fill="var(--primary-color)" rx="3" />
          <rect x="210" y="30" width="30" height="140" fill="var(--secondary-color)" rx="3" />
          <rect x="260" y="60" width="30" height="110" fill="var(--primary-color)" rx="3" />
          <rect x="310" y="40" width="30" height="130" fill="var(--secondary-color)" rx="3" />
          
          <!-- Labels -->
          <text x="75" y="190" font-size="10" fill="var(--text-muted)" text-anchor="middle">Jan</text>
          <text x="125" y="190" font-size="10" fill="var(--text-muted)" text-anchor="middle">Feb</text>
          <text x="175" y="190" font-size="10" fill="var(--text-muted)" text-anchor="middle">Mar</text>
          <text x="225" y="190" font-size="10" fill="var(--text-muted)" text-anchor="middle">Apr</text>
          <text x="275" y="190" font-size="10" fill="var(--text-muted)" text-anchor="middle">May</text>
          <text x="325" y="190" font-size="10" fill="var(--text-muted)" text-anchor="middle">Jun</text>
          
          <text x="30" y="174" font-size="9" fill="var(--text-muted)" text-anchor="end">0</text>
          <text x="30" y="124" font-size="9" fill="var(--text-muted)" text-anchor="end">5M</text>
          <text x="30" y="74" font-size="9" fill="var(--text-muted)" text-anchor="end">10M</text>
          <text x="30" y="24" font-size="9" fill="var(--text-muted)" text-anchor="end">15M</text>
        </svg>
      `;
    } else if (type === 'line') {
      container.innerHTML = `
        <svg viewBox="0 0 400 200" class="w-100 h-100">
          <line x1="40" y1="20" x2="380" y2="20" stroke="var(--border-color)" stroke-dasharray="4" />
          <line x1="40" y1="70" x2="380" y2="70" stroke="var(--border-color)" stroke-dasharray="4" />
          <line x1="40" y1="120" x2="380" y2="120" stroke="var(--border-color)" stroke-dasharray="4" />
          <line x1="40" y1="170" x2="380" y2="170" stroke="var(--border-color)" />
          
          <!-- Path -->
          <path d="M 60 150 Q 110 90 160 120 T 260 40 T 360 80" fill="none" stroke="var(--secondary-color)" stroke-width="3" />
          
          <!-- Circles -->
          <circle cx="60" cy="150" r="5" fill="var(--primary-color)" />
          <circle cx="160" cy="120" r="5" fill="var(--primary-color)" />
          <circle cx="260" cy="40" r="5" fill="var(--primary-color)" />
          <circle cx="360" cy="80" r="5" fill="var(--primary-color)" />
          
          <text x="60" y="190" font-size="10" fill="var(--text-muted)" text-anchor="middle">W1</text>
          <text x="160" y="190" font-size="10" fill="var(--text-muted)" text-anchor="middle">W2</text>
          <text x="260" y="190" font-size="10" fill="var(--text-muted)" text-anchor="middle">W3</text>
          <text x="360" y="190" font-size="10" fill="var(--text-muted)" text-anchor="middle">W4</text>
          
          <text x="30" y="174" font-size="9" fill="var(--text-muted)" text-anchor="end">0%</text>
          <text x="30" y="124" font-size="9" fill="var(--text-muted)" text-anchor="end">25%</text>
          <text x="30" y="74" font-size="9" fill="var(--text-muted)" text-anchor="end">50%</text>
          <text x="30" y="24" font-size="9" fill="var(--text-muted)" text-anchor="end">100%</text>
        </svg>
      `;
    }
  });
}

/**
 * Handle Dashboard Sidebar Mobile Toggle
 */
function initDashboardSidebar() {
  const sidebarToggle = document.getElementById('sidebarToggle');
  const sidebar = document.getElementById('sidebarMenu');
  
  if (sidebarToggle && sidebar) {
    sidebarToggle.addEventListener('click', () => {
      sidebar.classList.toggle('show');
    });
  }
}
