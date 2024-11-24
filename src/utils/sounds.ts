class Sound {
  private audio: HTMLAudioElement;

  constructor(url: string) {
    this.audio = new Audio(url);
  }

  play() {
    this.audio.currentTime = 0;
    this.audio.play().catch(() => {
      // Ignore autoplay restrictions
    });
  }
}

export const dropSound = new Sound('https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3');
export const winSound = new Sound('https://assets.mixkit.co/active_storage/sfx/1435/1435-preview.mp3');