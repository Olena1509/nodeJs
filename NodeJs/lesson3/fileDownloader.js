const EventEmitter = require('events');

class FileDownloader extends EventEmitter {
  constructor() {
    super();
    this.progress = 0;
  }

  startDownload() {
    const interval = setInterval(() => {
      this.progress += 10;
      this.emit('progress', this.progress);

      if (this.progress >= 100) {
        clearInterval(interval);
        this.emit('completed');
      }
    }, 500); 
  }
}

const downloader = new FileDownloader();

downloader.on('progress', (percent) => {
  console.log(`Завантаження: ${percent}%`);
});

downloader.on('completed', () => {
  console.log('✅ Завантаження завершено!');
});

downloader.startDownload();
