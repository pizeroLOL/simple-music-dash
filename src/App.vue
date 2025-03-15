<script setup lang="ts">
import { ref, useTemplateRef } from 'vue'

const artists = 'トゲナシトゲアリ'
const name = 'ダレモ'
const lrc = '歌词'
const audio = useTemplateRef("audio")
const audioProgressBar = useTemplateRef("audioProgressBar")
const audioProgressBarCircel = useTemplateRef("audioProgressBarCircle")
const isPlaying = ref(false)
const seekingStatus = ref(null as null | "audio")

const togglePlay = () => {
  if (!audio.value) return
  if (isPlaying.value) {
    audio.value.pause()
  } else {
    audio.value.play()
  }
}

const changeProgressBar = (progress: number) => {
  if (!audioProgressBar.value || !audioProgressBarCircel.value) return
  audioProgressBar.value.style.background = `linear-gradient(to right, white ${progress}%, darkgray ${progress}%)`
  audioProgressBarCircel.value.style.left = `${progress}%`
}

const updateTime = () => {
  if (!audio.value || seekingStatus.value == "audio") return
  changeProgressBar((audio.value.currentTime / audio.value.duration) * 100)
}

const calculateProgress = (progress: HTMLElement, clientX: number) => {
  const rect = progress.getBoundingClientRect()
  const x = clientX - rect.left
  const width = rect.width
  return Math.min(Math.max(x / width, 0), 1)
}

document.onmousemove = (event) => {
  if (seekingStatus.value == null || !audio.value || !audioProgressBar.value) return
  const progress = calculateProgress(audioProgressBar.value, event.clientX)
  changeProgressBar(progress * 100)
  audio.value.currentTime = progress * audio.value.duration
}

document.onmouseup = (event) => {
  if (seekingStatus.value == null || !audio.value || !audioProgressBar.value) return
  const progress = calculateProgress(audioProgressBar.value, event.clientX)
  changeProgressBar(progress * 100)
  audio.value.currentTime = progress * audio.value.duration
  seekingStatus.value = null
}

</script>

<template>
  <main>
    <div class="music-dash">
      <div class="music-about">{{ artists }} - {{ name }}</div>
      <div>
        <div class="music-ctrl">
          <button class="next-music">&LT;</button>
          <button class="play-pause" @click="togglePlay">{{ isPlaying ? '||' : '▶' }}</button>
          <button class="prev-music">&GT;</button>
        </div>
      </div>
      <div class="v-bar">
        <div class="line"></div>
        <div class="ok-line">
          <div class="bar-circle"></div>
        </div>
      </div>
    </div>
  </main>
  <footer>
    <div class="m-bar" @mousedown="seekingStatus = 'audio'">
      <div class="ok-line" ref="audioProgressBar">
        <div class="bar-circle" ref="audioProgressBarCircle"></div>
      </div>
    </div>
    <div class="lrc">
      {{ lrc }}
    </div>
  </footer>
  <audio src="https://metingapi.nanorocky.top/?server=netease&type=url&id=2683843127" @play="isPlaying = true"
    @pause="isPlaying = false" @ended="isPlaying = false" @timeupdate="updateTime" ref="audio"></audio>
</template>

<style scoped>
main {
  width: 100dvw;
  height: calc(100dvh - 2rem);
  display: flex;
  justify-items: center;
  align-items: center;
  justify-content: center;
}

main div.music-dash {
  background: #333;
  width: fit-content;
  padding: 1rem;
  border-radius: 1rem;
  display: flex;
  flex-flow: column;
  gap: 1rem;
}

div.music-ctrl {
  margin-inline: auto;
  width: fit-content;
  display: flex;
  gap: 0.5rem;
}

main button {
  display: block;
}

.v-bar {
  position: relative;
}

/* .line {
  position: absolute;
  width: 100%;
  background-color: darkgray;
  height: 4px;
  border-radius: 2px;
} */

.ok-line {
  /* position: absolute; */
  /* background-color: white; */
  height: 4px;
  border-radius: 2px;
}

.bar-circle {
  position: absolute;
  top: 0px;
  right: -4px;
  margin-top: -2px;
  margin-left: -4px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: white;
  cursor: pointer;
}



footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  /* display: flex; */
  /* align-items: center; */
  text-align: center;
  height: 2rem;
}

.lrc {
  padding: 0.5rem;
}
</style>
