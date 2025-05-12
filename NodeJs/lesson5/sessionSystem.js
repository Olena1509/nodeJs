global.users = {
    user1: { password: '1234' },
    user2: { password: 'abcd' }
  };
  
  global.sessions = {}; 
  
  function login(username, password) {
    const user = global.users[username];
    if (user && user.password === password) {
      const sessionId = Date.now() + '_' + username;
      global.sessions[sessionId] = { username, loginTime: new Date() };
      console.log(`✅ Успішний вхід. Сесія створена: ${sessionId}`);
      return sessionId;
    } else {
      console.log('❌ Невірний логін або пароль');
      return null;
    }
  }
  
  function logout(sessionId) {
    if (global.sessions[sessionId]) {
      delete global.sessions[sessionId];
      console.log(`🚪 Вихід. Сесію видалено: ${sessionId}`);
    } else {
      console.log('❗ Сесію не знайдено');
    }
  }
  
  
  const session = login('user1', '1234'); 
  logout(session); 
  