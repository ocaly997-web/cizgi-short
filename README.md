# cizgi-short

Claude Code için bir skill: seslendirmeden **dikey (9:16), altyazılı, müzikli çizgi film Short'u** üretir (YouTube Shorts, Reels, TikTok).

Karakterler, 3D dünya, kamera, ışık, müzik ve ses efektleri tamamen kodla üretilir. Video üreten yapay zekâ, Blender veya kurgu programı gerekmez.

## Ne yapar?
1. 10 özgün hikâye fikri sunar, sen birini seçersin.
2. Viral formatta Türkçe senaryo yazar, bilgileri doğrular.
3. Seslendirmeni (ör. ElevenLabs) kelime kelime zamanlar.
4. Sahneleri kurar, önizleme sayfası çıkarır, 1080x1920 MP4 verir.

## Kurulum
1. Bu depoyu indir (Code → Download ZIP) ve klasörü `~/.claude/skills/cizgi-short` olarak koy.
2. Gerekenler: Python 3 + `numpy` + `Pillow`, `ffmpeg`, `playwright` (+ `python -m playwright install chromium`).
3. İsteğe bağlı ama önerilir: `pip install faster-whisper` (kelime zamanlaması çok daha doğru olur).
4. Claude Code'da "animasyon short yap" de.

Windows notu: `python3` yerine `py -3` kullan. Whisper varsayılan olarak işlemcide (CPU) çalışır; ekran kartı için `WHISPER_DEVICE=cuda`.

## Kredi ve lisans
Hazırlayan: **Burak Özer** (@burakozerweb). Kit kodu MIT lisanslıdır; ayrıntılar `LICENSE.txt` içinde.
three.js r160 (MIT), Nunito yazı tipi (SIL OFL).
Bu kopyada küçük bir değişiklik var: `kit/tools/timing.py` Whisper'ı varsayılan olarak CPU'da çalıştırır.