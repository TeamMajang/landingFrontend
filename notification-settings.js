// Notification Settings Page JavaScript

let categoriesData = []; // 카테고리 데이터 저장

document.addEventListener('DOMContentLoaded', function() {
  // Check if this is part of signup flow
  checkSignupFlow();
  
  // Load categories from API first
  loadCategories();
});

// 회원가입 플로우인지 확인하고 진행 상태 표시
function checkSignupFlow() {
  // referrer를 확인하여 signup-step3.html에서 온 경우
  const referrer = document.referrer;
  const isFromSignup = referrer.includes('signup-step3.html') || 
                       referrer.includes('signup-step2.html') ||
                       referrer.includes('signup.html');
  
  if (isFromSignup) {
    const progressSection = document.getElementById('signup-progress-section');
    const headerSection = document.getElementById('notification-header-section');
    if (progressSection) {
      progressSection.style.display = 'flex';
    }
    // 회원가입 플로우인 경우 기본 헤더 숨기기
    if (headerSection) {
      headerSection.style.display = 'none';
    }
  }
}

// API에서 카테고리 데이터 로드
async function loadCategories() {
  const API_BASE_URL = window.CONFIG?.API_BASE_URL || 'http://localhost:8080/api/v1';
  const categoriesEndpoint = window.CONFIG?.ENDPOINT?.CATEGORIES || '/categories';
  
  try {
    const response = await fetch(`${API_BASE_URL}${categoriesEndpoint}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: window.CONFIG?.USE_CREDENTIALS ? 'include' : 'omit',
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    categoriesData = data;
    
    // 카테고리 렌더링
    renderCategories(data);
    
    // Initialize checkboxes and event listeners after rendering
    initializeCheckboxes();
    setupEventListeners();
    
    // Load saved settings
    loadSavedSettings();
    
    // Hide loading message
    const loadingElement = document.getElementById('notification-loading');
    if (loadingElement) {
      loadingElement.style.display = 'none';
    }
  } catch (error) {
    console.error('Error loading categories:', error);
    const loadingElement = document.getElementById('notification-loading');
    if (loadingElement) {
      loadingElement.innerHTML = '<p style="color: rgba(239, 68, 68, 1);">카테고리 정보를 불러오는데 실패했습니다.</p>';
    }
  }
}

// 카테고리 데이터를 HTML로 렌더링
function renderCategories(categories) {
  const container = document.getElementById('notification-categories-section');
  if (!container) return;
  
  // 기존 로딩 메시지 제거
  const loadingElement = document.getElementById('notification-loading');
  if (loadingElement) {
    loadingElement.remove();
  }
  
  // 카테고리 HTML 생성
  const categoriesHTML = categories.map(category => {
    const categoryName = category.categoryName;
    const parts = category.parts || [];
    
    const partsHTML = parts.map(part => {
      return `
        <div class="notification-item-row">
          <div class="notification-check" data-item-id="${part.id}" data-item="${categoryName}-${part.part}"></div>
          <p class="notification-item-label">${part.part}</p>
        </div>
      `;
    }).join('');
    
    return `
      <div class="notification-category" data-category="${categoryName}">
        <div class="notification-category-header">
          <div class="notification-category-check-row">
            <p class="notification-category-title">${categoryName}</p>
          </div>
          <div class="notification-select-actions">
            <button class="notification-select-all-btn" data-category="${categoryName}">전체선택</button>
            <span class="notification-divider">|</span>
            <button class="notification-deselect-all-btn" data-category="${categoryName}">전체해제</button>
          </div>
        </div>
        <div class="notification-items-grid">
          ${partsHTML}
        </div>
      </div>
    `;
  }).join('');
  
  container.innerHTML = categoriesHTML;
}

function initializeCheckboxes() {
  // Add click handlers to all checkboxes
  const checkboxes = document.querySelectorAll('.notification-check');
  checkboxes.forEach(checkbox => {
    checkbox.addEventListener('click', function(e) {
      e.stopPropagation();
      toggleCheckbox(this);
      updateCategoryCheckbox(this);
    });
  });
  
  // Add click handlers to item rows (clicking label also toggles checkbox)
  const itemRows = document.querySelectorAll('.notification-item-row');
  itemRows.forEach(row => {
    row.addEventListener('click', function(e) {
      if (e.target.classList.contains('notification-check')) {
        return; // Already handled by checkbox click
      }
      const checkbox = row.querySelector('.notification-check');
      if (checkbox) {
        toggleCheckbox(checkbox);
        updateCategoryCheckbox(checkbox);
      }
    });
  });
}

function toggleCheckbox(checkbox) {
  checkbox.classList.toggle('checked');
}

function updateCategoryCheckbox(itemCheckbox) {
  // 카테고리 체크박스가 제거되었으므로 이 함수는 더 이상 필요하지 않음
  // 하지만 호환성을 위해 유지
}

function setupEventListeners() {
  // 카테고리 체크박스가 제거되었으므로 관련 이벤트 핸들러 제거
  
  // Select all button handlers
  const selectAllButtons = document.querySelectorAll('.notification-select-all-btn');
  selectAllButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.stopPropagation();
      const category = this.getAttribute('data-category');
      const categoryItems = document.querySelectorAll(`[data-item^="${category}-"]`);
      
      categoryItems.forEach(item => {
        item.classList.add('checked');
      });
    });
  });
  
  // Deselect all button handlers
  const deselectAllButtons = document.querySelectorAll('.notification-deselect-all-btn');
  deselectAllButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.stopPropagation();
      const category = this.getAttribute('data-category');
      const categoryItems = document.querySelectorAll(`[data-item^="${category}-"]`);
      
      categoryItems.forEach(item => {
        item.classList.remove('checked');
      });
    });
  });
  
  // Save button handler
  const saveButton = document.getElementById('notification-save-btn');
  if (saveButton) {
    saveButton.addEventListener('click', function() {
      saveSettings();
    });
  }
}

function saveSettings() {
  const selectedItems = [];
  const checkedItems = document.querySelectorAll('.notification-check.checked[data-item-id]');
  
  checkedItems.forEach(item => {
    const itemId = item.getAttribute('data-item-id');
    if (itemId) {
      selectedItems.push(parseInt(itemId));
    }
  });
  
  // 회원가입 플로우인지 확인
  const referrer = document.referrer;
  const isFromSignup = referrer.includes('signup-step3.html') || 
                       referrer.includes('signup-step2.html') ||
                       referrer.includes('signup.html');
  
  if (isFromSignup) {
    // 회원가입 플로우인 경우: 모든 단계 데이터를 모아서 회원가입 API로 전송
    submitSignup(selectedItems);
  } else {
    // 일반 알림 설정인 경우: 기존 로직 유지
    // Save to localStorage
    localStorage.setItem('notificationSettings', JSON.stringify(selectedItems));
    
    // Send to API
    sendSettingsToAPI(selectedItems);
  }
}

function loadSavedSettings() {
  const savedSettings = localStorage.getItem('notificationSettings');
  if (!savedSettings) return;
  
  try {
    const selectedItemIds = JSON.parse(savedSettings);
    // selectedItemIds는 숫자 배열 (part id들)
    selectedItemIds.forEach(itemId => {
      const checkbox = document.querySelector(`[data-item-id="${itemId}"]`);
      if (checkbox) {
        checkbox.classList.add('checked');
        updateCategoryCheckbox(checkbox);
      }
    });
  } catch (e) {
    console.error('Failed to load saved settings:', e);
  }
}

// 회원가입 데이터 수집 및 전송
function submitSignup(categoryIds) {
  // Step 2 데이터 가져오기
  const step2DataStr = localStorage.getItem('signup_step2_data');
  if (!step2DataStr) {
    alert('사업자 정보를 찾을 수 없습니다. 회원가입을 처음부터 다시 진행해주세요.');
    return;
  }
  
  // Step 3 데이터 가져오기
  const step3DataStr = localStorage.getItem('signup_step3_data');
  if (!step3DataStr) {
    alert('개인정보를 찾을 수 없습니다. 회원가입을 처음부터 다시 진행해주세요.');
    return;
  }
  
  try {
    const step2Data = JSON.parse(step2DataStr);
    const step3Data = JSON.parse(step3DataStr);
    
    // 전화번호 형식 변환 (01012345678 -> 010-1234-5678)
    // 요청 스펙: ^(010|011|016|017|018|019)-\d{3,4}-\d{4}$
    let phoneNumber = step3Data.phoneNumber || '';
    // 숫자만 추출
    const phoneDigits = phoneNumber.replace(/[^0-9]/g, '');
    if (phoneDigits.length === 11) {
      // 010-1234-5678 형식으로 변환 (010, 011, 016, 017, 018, 019로 시작)
      const prefix = phoneDigits.substring(0, 3);
      const middle = phoneDigits.substring(3, 7);
      const last = phoneDigits.substring(7);
      phoneNumber = `${prefix}-${middle}-${last}`;
    } else if (phoneDigits.length === 10) {
      // 010-123-4567 형식 (구형 번호, 010으로 시작하는 경우만)
      const prefix = phoneDigits.substring(0, 3);
      const middle = phoneDigits.substring(3, 6);
      const last = phoneDigits.substring(6);
      phoneNumber = `${prefix}-${middle}-${last}`;
    }
    
    // 사업자 등록번호 형식 확인 및 변환
    let businessRegistrationNumber = step2Data.businessRegistrationNumber || '';
    // 하이픈이 없고 숫자만 있으면 그대로, 있으면 그대로 유지
    // (1234567890 또는 123-45-67890 형식 모두 허용)
    
    // 회원가입 요청 데이터 구성
    const signupRequest = {
      loginId: step3Data.loginId,
      password: step3Data.password,
      name: step3Data.name,
      storeName: step2Data.storeName,
      businessRegistrationNumber: businessRegistrationNumber,
      phoneNumber: phoneNumber,
      categoryIds: categoryIds, // 선택된 카테고리 ID 리스트
      businessAddress: step2Data.businessAddress,
      businessAddressDetail: step2Data.businessAddressDetail || ''
    };
    
    console.log('Signup request:', signupRequest);
    
    // 회원가입 API 호출
    const API_BASE_URL = window.CONFIG?.API_BASE_URL || 'http://localhost:8080/api/v1';
    const signupEndpoint = window.CONFIG?.ENDPOINT?.SIGNUP || '/members/signup';
    
    fetch(`${API_BASE_URL}${signupEndpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: window.CONFIG?.USE_CREDENTIALS ? 'include' : 'omit',
      body: JSON.stringify(signupRequest)
    })
    .then(response => {
      console.log('Signup response status:', response.status);
      
      if (!response.ok) {
        // 에러 응답 처리
        return response.json().then(errorData => {
          throw new Error(errorData.message || `회원가입에 실패했습니다. (상태 코드: ${response.status})`);
        }).catch(() => {
          throw new Error(`회원가입에 실패했습니다. (상태 코드: ${response.status})`);
        });
      }
      return response.json();
    })
    .then(data => {
      console.log('Signup successful:', data);
      
      // 회원가입 성공 시 localStorage 정리
      localStorage.removeItem('signup_step2_data');
      localStorage.removeItem('signup_step3_data');
      localStorage.removeItem('notificationSettings');
      
      // 회원가입 완료 페이지로 이동
      window.location.href = 'signup-complete.html';
    })
    .catch(error => {
      console.error('Error during signup:', error);
      alert(error.message || '회원가입 중 오류가 발생했습니다. 다시 시도해주세요.');
    });
    
  } catch (error) {
    console.error('Error parsing signup data:', error);
    alert('회원가입 데이터를 처리하는 중 오류가 발생했습니다. 다시 시도해주세요.');
  }
}

// Send settings to API (일반 알림 설정용)
function sendSettingsToAPI(selectedItemIds) {
  const API_BASE_URL = window.CONFIG?.API_BASE_URL || 'http://localhost:8080/api/v1';
  
  fetch(`${API_BASE_URL}/notifications/settings`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: window.CONFIG?.USE_CREDENTIALS ? 'include' : 'omit',
    body: JSON.stringify({
      partIds: selectedItemIds
    })
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    console.log('Settings saved:', data);
    alert('알림 설정이 저장되었습니다.');
  })
  .catch(error => {
    console.error('Error saving settings:', error);
    alert('알림 설정 저장에 실패했습니다. 다시 시도해주세요.');
  });
}


