# Örnek: "Mona Lisa'yı çalan adam" (35 sn, 15 çekim)
- `script.txt`: okunan metin · `sound.json`: müzik + efekt zamanları · `story.js`: dünya, karakterler, kamera.
- Yeni projede `story.js` bu dosyadan başlar; kendi hikâyen için `SHOTS` tablosunu ve `build/frame` içeriğini baştan yaz.
- İçindeki kalıplar: çekim tablosu + `shotAt(f)`, sahneleri x ekseninde ayrı yerlere kurmak (galeri 0, dış mekân 200, sorgu -200),
  CanvasTexture ile kendi tablonu çizmek, isim kartı (`overlay`), flaş ile zaman atlaması, kuyruk boyunca kamera kaydırma.
