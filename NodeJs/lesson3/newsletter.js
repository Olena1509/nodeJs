class Newsletter {
    constructor() {
      this.subscribers = [];
    }
  
    subscribe(userName, callback) {
      this.subscribers.push({ userName, callback });
      console.log(`${userName} підписався на новини.`);
    }
  
    newArticle(title) {
      console.log(`📰 Нова стаття: "${title}"`);
      this.subscribers.forEach(sub =>
        sub.callback(title, sub.userName)
      );
    }
  }
  
  const news = new Newsletter();
  
  news.subscribe('Олена', (title, name) => {
    console.log(`📩 ${name}, нова стаття: "${title}"`);
  });
  
  news.subscribe('Ігор', (title, name) => {
    console.log(`📩 ${name}, нова стаття: "${title}"`);
  });
  
  news.newArticle('10 порад для ефективного навчання');
  