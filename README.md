# YouTube Position Saver

**Because checking something again shouldn't cost you your place.**

## Why I built this

I wanted to rewatch specific moments in YouTube videos without losing my original playback position.

So I built a small tool that lets me save a position, move around the video, and jump back whenever I need to.

## Features

- **Save position:** Press `Alt + S` to save your current playback position.
- **Automatic rewind:** Saves the position 5 seconds before the current timestamp.
- **Pause video:** Automatically pauses after saving.
- **Return to position:** Press `Alt + Q` to jump back to your saved position.
- **Video identification:** Checks the video ID before returning to a saved position, preventing accidental jumps in a different video.


## Keyboard Shortcuts

| Shortcut | Action |
|---|---|
| `Alt + S` | Save position and pause |
| `Alt + Q` | Return to saved position |

## Installation

### Browser Extension (Chrome / Brave)

1. Download or clone this repository.
2. Open `chrome://extensions/` in Chrome or `brave://extensions/` in Brave.
3. Enable **Developer mode**.
4. Click **Load unpacked**.
5. Select the `chrome-extension` folder.

### Tampermonkey Userscript

1. Install [Tampermonkey](https://www.tampermonkey.net/).
2. Open the Tampermonkey Dashboard.
3. Create a new userscript.
4. Copy the contents of `tampermonkey/youtube-position-saver.user.js`.
5. Paste the code and save.
6. Open YouTube and try the shortcuts.

## Problems I Encountered and Solved

### 1. Stale Video Element Reference

My first version selected the video element outside the keyboard event listener.

It worked initially but stopped working correctly after navigating to another video.

**Why it happened:** YouTube uses Single-Page Application (SPA) navigation. It changes videos without reloading the entire page, which meant my previously selected video element could become outdated.

**Solution:** I moved `document.querySelector("video")` inside the keyboard event listener so the script gets the current video element whenever a shortcut is pressed.

### 2. Returning to the Wrong Video

I encountered another issue: I could save a position in video A, switch to video B, press `Alt + Q`, and jump to an unrelated timestamp in video B.

**Why it happened:** I was storing only the playback timestamp, without tracking which video it belonged to.

**Solution:** I started storing the YouTube video ID alongside the playback position and checking whether the current video ID matches before seeking.

## Limitations (v0.1.0)

- Only one playback position can be saved at a time.
- Saved positions are stored in memory and disappear when the page is refreshed.
- Positions are not synchronized across tabs or devices.
- Video identification currently relies on the `v` query parameter in regular YouTube watch URLs.
- YouTube Shorts are not supported yet.
- Mac keyboard shortcut behavior has not been tested.


## Technologies

- JavaScript
- Browser DOM API
- Chrome Extension Manifest V3
- Tampermonkey

## Version

`0.1.0`