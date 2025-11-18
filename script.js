// API Configuration - Use common config from config.js
const API_BASE_URL = window.CONFIG.API_BASE_URL;

// Update header after login
function updateHeaderAfterLogin(userInfo) {
  const loginButton = document.querySelector('.login-button-7');
  const signupButton = document.querySelector('.signup-button-9');
  
  // Change login button to logout button
  if (loginButton) {
    const loginText = loginButton.querySelector('.text-8');
    if (loginText) {
      loginText.innerHTML = '<span class="text-rgb-55-65-81">로그아웃</span>';
    }
    
    // Remove all existing event listeners by cloning
    const newLoginButton = loginButton.cloneNode(true);
    loginButton.parentNode.replaceChild(newLoginButton, loginButton);
    
    // Add logout functionality
    newLoginButton.addEventListener('click', async function() {
      try {
        // Call logout API
        const response = await fetch(`${API_BASE_URL}/members/logout`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: window.CONFIG?.USE_CREDENTIALS ? 'include' : 'omit',
        });
        
        console.log('Logout API Response:', response);
        
        // Clear local storage regardless of API response
        localStorage.removeItem('savedLoginId');
        localStorage.removeItem('userInfo');
        
        // Reload page to show login/signup buttons again
        location.reload();
      } catch (error) {
        console.error('Logout error:', error);
        // Even if API call fails, clear local storage and reload
        localStorage.removeItem('savedLoginId');
        localStorage.removeItem('userInfo');
        location.reload();
      }
    });
  }
  
  // Change signup button to mypage button
  if (signupButton) {
    const signupText = signupButton.querySelector('.text-10');
    if (signupText) {
      signupText.innerHTML = '<span class="text-white">마이페이지</span>';
    }
    
    // Remove all existing event listeners by cloning
    const newSignupButton = signupButton.cloneNode(true);
    signupButton.parentNode.replaceChild(newSignupButton, signupButton);
    
    // Get dropdown container
    const dropdownContainer = document.getElementById('mypage-dropdown-container');
    
    // Add hover functionality to show/hide dropdown with delay
    let hideTimeout = null;
    
    if (newSignupButton && dropdownContainer) {
      const showDropdown = function() {
        // Clear any pending hide timeout
        if (hideTimeout) {
          clearTimeout(hideTimeout);
          hideTimeout = null;
        }
        dropdownContainer.style.display = 'block';
      };
      
      const hideDropdown = function() {
        // Add delay before hiding to allow mouse to move to dropdown
        hideTimeout = setTimeout(function() {
          dropdownContainer.style.display = 'none';
        }, 200); // 200ms delay
      };
      
      // Show dropdown on button hover
      newSignupButton.addEventListener('mouseenter', showDropdown);
      
      // Keep dropdown open when hovering over it
      dropdownContainer.addEventListener('mouseenter', function() {
        if (hideTimeout) {
          clearTimeout(hideTimeout);
          hideTimeout = null;
        }
        dropdownContainer.style.display = 'block';
      });
      
      // Hide dropdown when mouse leaves button (with delay)
      newSignupButton.addEventListener('mouseleave', function(e) {
        const relatedTarget = e.relatedTarget;
        // Only hide if mouse is not moving to dropdown
        if (!dropdownContainer.contains(relatedTarget)) {
          hideDropdown();
        }
      });
      
      // Hide dropdown when mouse leaves dropdown (with delay)
      dropdownContainer.addEventListener('mouseleave', function(e) {
        const relatedTarget = e.relatedTarget;
        // Only hide if mouse is not moving to button
        if (relatedTarget !== newSignupButton && !newSignupButton.contains(relatedTarget)) {
          hideDropdown();
        }
      });
    }
    
    // Add click functionality for menu items
    const personalInfoItem = document.querySelector('.personal-info-item');
    const notificationItem = document.querySelector('.notification-item');
    
    if (personalInfoItem) {
      personalInfoItem.addEventListener('click', function() {
        window.location.href = 'mypage.html';
      });
    }
    
    if (notificationItem) {
      notificationItem.addEventListener('click', function() {
        // Navigate to notification settings
        window.location.href = 'signup-step4.html';
      });
    }
  }
}

// Restore header on page load if user is logged in
function restoreHeaderIfLoggedIn() {
  const userInfo = localStorage.getItem('userInfo');
  if (userInfo) {
    try {
      const parsedUserInfo = JSON.parse(userInfo);
      updateHeaderAfterLogin(parsedUserInfo);
    } catch (e) {
      console.error('Error parsing user info:', e);
    }
  }
}

// Login Modal functionality
document.addEventListener('DOMContentLoaded', function() {
  // Check if user is logged in
  const userInfo = localStorage.getItem('userInfo');
  
  if (!userInfo) {
    // Only add login modal trigger if user is not logged in
    const loginButton = document.querySelector('.login-button-7');
    const loginModal = document.getElementById('login-modal');
    
    // Open modal when login button is clicked
    if (loginButton && loginModal) {
      loginButton.addEventListener('click', function() {
        loginModal.style.display = 'flex';
        document.body.style.overflowY = 'hidden'; /* overflow-y만 숨김, 스크롤바 공간은 유지 */
      });
    }
  } else {
    // User is logged in, restore header
    restoreHeaderIfLoggedIn();
  }
  
  const loginModal = document.getElementById('login-modal');
  const closeModal = document.getElementById('close-login-modal');
  const modalOverlay = document.querySelector('.modal-overlay');

  // Close modal when close button is clicked
  if (closeModal) {
    closeModal.addEventListener('click', function() {
      if (loginModal) {
        loginModal.style.display = 'none';
        document.body.style.overflowY = 'scroll'; /* 스크롤바 공간 유지 */
      }
    });
  }

  // Close modal when overlay is clicked
  if (modalOverlay) {
    modalOverlay.addEventListener('click', function() {
      if (loginModal) {
        loginModal.style.display = 'none';
        document.body.style.overflowY = 'scroll'; /* 스크롤바 공간 유지 */
      }
    });
  }

  // Find ID Success Modal functionality - define close function first
  const findIdSuccessModal = document.getElementById('find-id-success-modal');
  const closeFindIdSuccessModal = document.getElementById('close-find-id-success-modal');
  const findIdSuccessCloseBtn = document.getElementById('find-id-success-close-btn');
  const findIdSuccessModalOverlay = findIdSuccessModal ? findIdSuccessModal.querySelector('.modal-overlay') : null;
  
  function closeFindIdSuccessModalFunc() {
    if (findIdSuccessModal) {
      findIdSuccessModal.style.display = 'none';
      document.body.style.overflowY = 'scroll'; /* 스크롤바 공간 유지 */
    }
  }
  
  if (closeFindIdSuccessModal) {
    closeFindIdSuccessModal.addEventListener('click', closeFindIdSuccessModalFunc);
  }
  
  if (findIdSuccessCloseBtn) {
    findIdSuccessCloseBtn.addEventListener('click', closeFindIdSuccessModalFunc);
  }
  
  if (findIdSuccessModalOverlay) {
    findIdSuccessModalOverlay.addEventListener('click', closeFindIdSuccessModalFunc);
  }

  // Reset Password Modal functionality
  const resetPasswordModal = document.getElementById('reset-password-modal');
  const closeResetPasswordModal = document.getElementById('close-reset-password-modal');
  const resetPasswordModalOverlay = resetPasswordModal ? resetPasswordModal.querySelector('.modal-overlay') : null;
  const resetPasswordSubmitBtn = document.getElementById('reset-password-submit-btn');
  const resetPasswordIdInput = document.getElementById('reset-password-id');
  const resetPasswordErrorMessage = document.getElementById('reset-password-error-message');
  
  // Reset Password Info Modal (Success Message)
  const resetPasswordInfoModal = document.getElementById('reset-password-info-modal');
  const closeResetPasswordInfoModal = document.getElementById('close-reset-password-info-modal');
  const resetPasswordInfoCloseBtn = document.getElementById('reset-password-info-close-btn');
  const resetPasswordInfoModalOverlay = resetPasswordInfoModal ? resetPasswordInfoModal.querySelector('.modal-overlay') : null;
  
  function closeResetPasswordModalFunc() {
    if (resetPasswordModal) {
      resetPasswordModal.style.display = 'none';
      document.body.style.overflowY = 'scroll'; /* 스크롤바 공간 유지 */
      // 입력 필드 초기화
      if (resetPasswordIdInput) {
        resetPasswordIdInput.value = '';
      }
      // 에러 메시지 숨기기
      if (resetPasswordErrorMessage) {
        resetPasswordErrorMessage.classList.remove('visible');
      }
    }
  }
  
  function closeResetPasswordInfoModalFunc() {
    if (resetPasswordInfoModal) {
      resetPasswordInfoModal.style.display = 'none';
      document.body.style.overflowY = 'scroll'; /* 스크롤바 공간 유지 */
    }
  }
  
  function openResetPasswordInfoModal() {
    if (resetPasswordInfoModal) {
      resetPasswordInfoModal.style.display = 'flex';
      document.body.style.overflowY = 'hidden'; /* overflow-y만 숨김, 스크롤바 공간은 유지 */
    }
  }
  
  if (closeResetPasswordModal) {
    closeResetPasswordModal.addEventListener('click', closeResetPasswordModalFunc);
  }
  
  if (resetPasswordModalOverlay) {
    resetPasswordModalOverlay.addEventListener('click', closeResetPasswordModalFunc);
  }

  if (closeResetPasswordInfoModal) {
    closeResetPasswordInfoModal.addEventListener('click', closeResetPasswordInfoModalFunc);
  }
  
  if (resetPasswordInfoCloseBtn) {
    resetPasswordInfoCloseBtn.addEventListener('click', closeResetPasswordInfoModalFunc);
  }
  
  if (resetPasswordInfoModalOverlay) {
    resetPasswordInfoModalOverlay.addEventListener('click', closeResetPasswordInfoModalFunc);
  }

  // Hide error message when user starts typing in reset password input
  if (resetPasswordIdInput) {
    resetPasswordIdInput.addEventListener('input', function() {
      if (resetPasswordErrorMessage) {
        resetPasswordErrorMessage.classList.remove('visible');
      }
    });
  }

  // 비밀번호 재설정 버튼 클릭 핸들러
  if (resetPasswordSubmitBtn) {
    resetPasswordSubmitBtn.addEventListener('click', async function() {
      const id = resetPasswordIdInput ? resetPasswordIdInput.value.trim() : '';
      
      // 아이디 입력 검증
      if (!id) {
        if (resetPasswordErrorMessage) {
          const errorText = resetPasswordErrorMessage.querySelector('span');
          if (errorText) {
            errorText.textContent = '아이디를 정확히 입력해 주세요.';
          }
          resetPasswordErrorMessage.classList.add('visible');
        }
        return;
      }
      
      // 에러 메시지 숨기기
      if (resetPasswordErrorMessage) {
        resetPasswordErrorMessage.classList.remove('visible');
      }
      
      try {
        const resetPasswordEndpoint = window.CONFIG.ENDPOINT.RESET_PASSWORD;
        console.log('Calling API:', `${API_BASE_URL}${resetPasswordEndpoint}`);
        // API 호출: /api/v1/members/reset-password
        const response = await fetch(`${API_BASE_URL}${resetPasswordEndpoint}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: window.CONFIG?.USE_CREDENTIALS ? 'include' : 'omit',
          body: JSON.stringify({
            loginId: id
          })
        });
        
        console.log('Reset Password API Response:', response);
        console.log('Response status:', response.status);
        
        if (!response.ok) {
          const errorText = await response.text();
          console.error('API Error Response:', errorText);
          let errorData;
          try {
            errorData = JSON.parse(errorText);
          } catch (e) {
            errorData = { message: errorText || '비밀번호 재설정에 실패했습니다.' };
          }
          throw new Error(errorData.message || '비밀번호 재설정에 실패했습니다.');
        }
        
        const data = await response.json();
        console.log('Response data:', data);
        
        // 입력 모달 닫기
        closeResetPasswordModalFunc();
        
        // 성공 모달 표시
        openResetPasswordInfoModal();
      } catch (error) {
        // Network error or other error
        console.error('Reset Password error:', error);
        if (resetPasswordErrorMessage) {
          const errorText = resetPasswordErrorMessage.querySelector('span');
          if (errorText) {
            errorText.textContent = '아이디를 정확히 입력해 주세요.';
          }
          resetPasswordErrorMessage.classList.add('visible');
        }
      }
    });
  }

  // Signup page navigation
  const signupLinks = document.querySelectorAll('.login-link');
  const signupButton = document.querySelector('.signup-button-9');
  
  // Navigate to signup page when "회원가입" link is clicked
  signupLinks.forEach(link => {
    if (link.textContent.includes('회원가입')) {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        window.location.href = 'signup.html';
      });
    }
  });
  
  // Navigate to signup page when signup button is clicked
  if (signupButton) {
    signupButton.addEventListener('click', function(e) {
      e.preventDefault();
      
      // 버튼 텍스트가 "마이페이지"인 경우 마이페이지로 이동
      const buttonText = this.querySelector('.text-10');
      if (buttonText && buttonText.textContent.includes('마이페이지')) {
        // 마이페이지로 이동하지 않고 드롭다운만 표시 (이미 hover로 처리됨)
        return;
      }
      
      // 클릭 시 active 클래스 추가 (hover 효과 유지)
      this.classList.add('active');
      // 페이지 이동 전에 약간의 지연을 주어 시각적 피드백 제공
      setTimeout(() => {
        window.location.href = 'signup.html';
      }, 150);
    });
    
    // 마우스가 버튼을 떠날 때 active 클래스 제거
    signupButton.addEventListener('mouseleave', function() {
      this.classList.remove('active');
    });
  }

  // Close modal when ESC key is pressed
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      if (findIdSuccessModal && findIdSuccessModal.style.display === 'flex') {
        closeFindIdSuccessModalFunc();
      } else if (resetPasswordInfoModal && resetPasswordInfoModal.style.display === 'flex') {
        closeResetPasswordInfoModalFunc();
      } else if (resetPasswordModal && resetPasswordModal.style.display === 'flex') {
        closeResetPasswordModalFunc();
      } else {
        const findIdModal = document.getElementById('find-id-modal');
        if (findIdModal && findIdModal.style.display === 'flex') {
          findIdModal.style.display = 'none';
          document.body.style.overflowY = 'scroll'; /* 스크롤바 공간 유지 */
        } else if (loginModal && loginModal.style.display === 'flex') {
          loginModal.style.display = 'none';
          document.body.style.overflowY = 'scroll'; /* 스크롤바 공간 유지 */
        }
      }
    }
  });

  // Handle login button click
  const loginSubmitBtn = document.getElementById('login-submit-btn');
  const loginErrorMessage = document.getElementById('login-error-message');
  
  if (loginSubmitBtn) {
    loginSubmitBtn.addEventListener('click', async function() {
      const loginId = document.getElementById('login-id').value;
      const loginPassword = document.getElementById('login-password').value;
      
      // Hide error message when user tries to login again
      if (loginErrorMessage) {
        loginErrorMessage.classList.remove('visible');
      }
      
      if (!loginId || !loginPassword) {
        if (loginErrorMessage) {
          loginErrorMessage.classList.add('visible');
        }
        return;
      }
      
      try {
        // API 호출: /api/v1/members/login
        const response = await fetch(`${API_BASE_URL}/members/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: window.CONFIG?.USE_CREDENTIALS ? 'include' : 'omit',
          body: JSON.stringify({
            loginId: loginId,
            password: loginPassword
          })
        });
        console.log('API Response:', response);
        const data = await response.json();
        
        // Hide error message first
        if (loginErrorMessage) {
          loginErrorMessage.classList.remove('visible');
        }
        
        if (response.ok && (data.success !== false)) {
          // Login successful - Save ID to localStorage if "아이디 저장" is checked
          const saveIdCheckbox = document.getElementById('save-id-checkbox');
          if (saveIdCheckbox && saveIdCheckbox.checked) {
            localStorage.setItem('savedLoginId', loginId);
          } else {
            // If checkbox is not checked, remove saved ID
            localStorage.removeItem('savedLoginId');
          }
          
          // Save user info to localStorage
          const userInfo = {
            loginId: loginId,
            name: data.name || loginId,
            ...data
          };
          localStorage.setItem('userInfo', JSON.stringify(userInfo));
          
          // Update header after login
          updateHeaderAfterLogin(userInfo);
          
          if (loginModal) {
            loginModal.style.display = 'none';
            document.body.style.overflowY = 'scroll'; /* 스크롤바 공간 유지 */
          }
          // Redirect or update UI as needed
          console.log('Login successful');
        } else {
          // Login failed - show error message
          if (loginErrorMessage) {
            loginErrorMessage.classList.add('visible');
          }
        }
      } catch (error) {
        // Network error or other error
        console.error('Login error:', error);
        if (loginErrorMessage) {
          loginErrorMessage.classList.add('visible');
        }
      }
    });
  }
  
  // Hide error message when user starts typing
  const loginIdInput = document.getElementById('login-id');
  const loginPasswordInput = document.getElementById('login-password');
  
  if (loginIdInput && loginErrorMessage) {
    loginIdInput.addEventListener('input', function() {
      loginErrorMessage.classList.remove('visible');
    });
  }
  
  if (loginPasswordInput && loginErrorMessage) {
    loginPasswordInput.addEventListener('input', function() {
      loginErrorMessage.classList.remove('visible');
    });
  }
  
  // Load saved ID from localStorage on page load
  const savedLoginId = localStorage.getItem('savedLoginId');
  if (savedLoginId && loginIdInput) {
    loginIdInput.value = savedLoginId;
    // Check the "아이디 저장" checkbox if ID is saved
    const saveIdCheckbox = document.getElementById('save-id-checkbox');
    if (saveIdCheckbox) {
      saveIdCheckbox.checked = true;
    }
  }
  
  // Find ID Modal functionality
  const findIdModal = document.getElementById('find-id-modal');
  const closeFindIdModal = document.getElementById('close-find-id-modal');
  const findIdModalOverlay = findIdModal ? findIdModal.querySelector('.modal-overlay') : null;
  const findIdLinks = document.querySelectorAll('.login-link');
  
  // Open find ID modal when "아이디 찾기" link is clicked
  findIdLinks.forEach(link => {
    if (link.textContent.includes('아이디 찾기')) {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        if (findIdModal) {
          findIdModal.style.display = 'flex';
          document.body.style.overflowY = 'hidden'; /* overflow-y만 숨김, 스크롤바 공간은 유지 */
          // Setup button handler after modal is shown
          setTimeout(setupFindIdButtonHandler, 100);
        }
      });
    }
    
    // Open reset password modal when "비밀번호 재설정" link is clicked
    if (link.textContent.includes('비밀번호 재설정')) {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        const resetPasswordModal = document.getElementById('reset-password-modal');
        if (resetPasswordModal) {
          resetPasswordModal.style.display = 'flex';
          document.body.style.overflowY = 'hidden'; /* overflow-y만 숨김, 스크롤바 공간은 유지 */
        }
      });
    }
  });
  
  // Close find ID modal
  if (closeFindIdModal) {
    closeFindIdModal.addEventListener('click', function() {
      if (findIdModal) {
        findIdModal.style.display = 'none';
        document.body.style.overflowY = 'scroll'; /* 스크롤바 공간 유지 */
      }
    });
  }
  
  if (findIdModalOverlay) {
    findIdModalOverlay.addEventListener('click', function() {
      if (findIdModal) {
        findIdModal.style.display = 'none';
        document.body.style.overflowY = 'scroll'; /* 스크롤바 공간 유지 */
      }
    });
  }
  
  // Handle find ID button click
  function setupFindIdButtonHandler() {
    const findIdSubmitBtn = document.getElementById('find-id-submit-btn');
    const findIdErrorMessage = document.getElementById('find-id-error-message');
    const findIdBusinessNumberInput = document.getElementById('find-id-business-number');
    
    if (!findIdSubmitBtn) return;
    
    // Check if handler already attached
    if (findIdSubmitBtn.dataset.handlerAttached === 'true') return;
    findIdSubmitBtn.dataset.handlerAttached = 'true';
    
    findIdSubmitBtn.addEventListener('click', async function(e) {
      e.preventDefault();
      e.stopPropagation();
      console.log('Find ID button clicked!');
      
      const businessNumber = findIdBusinessNumberInput ? findIdBusinessNumberInput.value.trim() : '';
      console.log('Business Number:', businessNumber);
      
      // Hide error message when user tries again
      if (findIdErrorMessage) {
        findIdErrorMessage.classList.remove('visible');
      }
      
      if (!businessNumber) {
        console.log('Business number is empty');
        if (findIdErrorMessage) {
          findIdErrorMessage.classList.add('visible');
        }
        return;
      }
      
      try {
        const findLoginIdEndpoint = window.CONFIG.ENDPOINT.FIND_LOGIN_ID;
        console.log('Calling API:', `${API_BASE_URL}${findLoginIdEndpoint}`);
        // API 호출: /api/v1/members/find-login-id
        const response = await fetch(`${API_BASE_URL}${findLoginIdEndpoint}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: window.CONFIG?.USE_CREDENTIALS ? 'include' : 'omit',
          body: JSON.stringify({
            businessRegistrationNumber: businessNumber
          })
        });
        
        console.log('Find ID API Response:', response);
        console.log('Response status:', response.status);
        
        if (!response.ok) {
          const errorText = await response.text();
          console.error('API Error Response:', errorText);
          let errorData;
          try {
            errorData = JSON.parse(errorText);
          } catch (e) {
            errorData = { message: errorText || '아이디 찾기에 실패했습니다.' };
          }
          throw new Error(errorData.message || '아이디 찾기에 실패했습니다.');
        }
        
        const data = await response.json();
        console.log('Response data:', data);
      
        // Hide error message first
        if (findIdErrorMessage) {
          findIdErrorMessage.classList.remove('visible');
        }
        
        // Find ID successful
        console.log('Find ID successful:', data);
        
        // Close the find ID input modal
        const findIdModal = document.getElementById('find-id-modal');
        if (findIdModal) {
          findIdModal.style.display = 'none';
        }
        
        // Show success modal with the found ID
        const findIdSuccessModal = document.getElementById('find-id-success-modal');
        const findIdResult = document.getElementById('find-id-result');
        
        if (findIdSuccessModal && findIdResult) {
          // Display the found ID (assuming the API returns loginId or similar)
          const foundId = data.loginId || data.id || data.username || '알 수 없음';
          findIdResult.textContent = foundId;
          findIdSuccessModal.style.display = 'flex';
          document.body.style.overflowY = 'hidden'; /* overflow-y만 숨김, 스크롤바 공간은 유지 */
        }
      } catch (error) {
        // Network error or other error
        console.error('Find ID error:', error);
        if (findIdErrorMessage) {
          const errorText = findIdErrorMessage.querySelector('span');
          if (errorText) {
            errorText.textContent = error.message || '사업자 등록번호를 정확히 입력해주세요.';
          }
          findIdErrorMessage.classList.add('visible');
        }
      }
    });
    
    // Hide error message when user starts typing
    if (findIdBusinessNumberInput && findIdBusinessNumberInput.dataset.handlerAttached !== 'true') {
      findIdBusinessNumberInput.dataset.handlerAttached = 'true';
      findIdBusinessNumberInput.addEventListener('input', function() {
        const findIdErrorMessage = document.getElementById('find-id-error-message');
        if (findIdErrorMessage) {
          findIdErrorMessage.classList.remove('visible');
        }
      });
    }
  }
  
  // Setup handler on page load
  setupFindIdButtonHandler();
  
  // 판매하기 버튼 클릭 이벤트
  const sellButton = document.querySelector('.sell-button-15');
  if (sellButton) {
    sellButton.addEventListener('click', function(e) {
      e.preventDefault();
      window.location.href = 'sell.html';
    });
  }
  
  // 푸터의 판매하기 링크 클릭 이벤트
  const footerLinks = document.querySelectorAll('.footer-link');
  footerLinks.forEach(link => {
    if (link.textContent.includes('판매하기')) {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        window.location.href = 'sell.html';
      });
    }
  });
  
  // 알림 설정 버튼 클릭 이벤트
  const buyButton = document.querySelector('.buy-button-19');
  if (buyButton) {
    buyButton.addEventListener('click', function(e) {
      e.preventDefault();
      window.location.href = 'notification-settings.html';
    });
    buyButton.style.cursor = 'pointer';
  }
  
});

