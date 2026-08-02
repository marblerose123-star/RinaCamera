# Rina Camera Development Guide

# 1. プロジェクト概要

## 目的

iCam365の代わりになる、
広告のないAI監視アプリを作る。

最終目標

・チャチャを検知
・シロを検知
・人を検知
・よその猫を区別
・虫や草木では通知しない
・Androidだけで利用できる

---

# 2. 現在の完成状況

## 完成

✅ ライブ画面

✅ AIステータス

✅ 通知

✅ 履歴

✅ 今日の検知

✅ 設定画面

✅ AI判定エリア

✅ monitor.js

✅ history.js

✅ notify.js

✅ camera.js

✅ ai.js

---

# 3. システム構成

Camera

↓

camera.js

↓

monitor.js

↓

runAI()

↓

preprocessImage()

↓

detectObject()

↓

postprocessResult()

↓

notify.js

↓

history.js

↓

画面表示

---

# 4. フォルダ構成

images

├ captures

│ ├ chacha

│ ├ shiro

│ ├ person

│ ├ other-cat

│ ├ empty

│ └ unknown

├ no-camera.png

├ chacha-test.jpg

├ shiro-test.jpg

├ person-test.jpg

---

# captures の意味

chacha

チャチャだけ

---

shiro

シロだけ

---

person

人だけ

---

other-cat

近所の猫

---

empty

何もいない

草木

虫

雨

影

光

---

unknown

人が見ても判定できない画像

真っ暗

ブレ

半分だけ写っている

---

# 5. JavaScript

camera.js

カメラ管理

---

monitor.js

監視エンジン

---

ai.js

AI処理

---

notify.js

通知

---

history.js

履歴管理

---

script.js

画面操作

---

# 6. AI処理

画像取得

↓

前処理

↓

AI判定

↓

後処理

↓

通知

---

# 7. AI学習

現在は

画像名で判定

将来

画像そのものをAIが判定する。

---

# 8. 最終目標

RTSP映像取得

↓

AI

↓

チャチャ

シロ

人

よその猫

↓

通知

↓

履歴保存

↓

Androidだけで動作

iCam365不要

---

# 9. 今後の予定

Ver.2.6

画像収集

---

Ver.2.7

Motion Detection

---

Ver.2.8

AI信頼度

---

Ver.3

Android版

---

Ver.4

本物のAI学習
