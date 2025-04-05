import type { Component } from 'solid-js'

const App: Component = () => {
  return (
    <>
      <div class="min-h-dvh w-dvw grid justify-center pb-12 pt-4">
        <main class="min:h-dvh flex flex-col md:grid md:grid-cols-2 gap-4 md:gap-12 p-4 md:p-12 justify-center items-center">
          <div class="flex flex-col gap-8">
            <h1 class="text-6xl text-center md:text-right">PizeroLOL</h1>
            <div class="flex flex-col gap-4">
              <p class="bg-stone-200 dark:bg-stone-800 p-4 rounded-4xl">
                没有比摸鱼更爽的东西，如果有，就是在课上摸鱼。
                <br />
                所以摸鱼，<strong>爽！</strong>🐟
              </p>
              <nav class="bg-stone-200 dark:bg-stone-800 p-2 rounded-4xl flex *:hover:bg-stone-300 dark:*:hover:bg-stone-700 *:block *:rounded-full *:p-2">
                <a href="https://github.com/pizerolol">Github</a>
                <a href="https://space.bilibili.com/35602206">BiliBili</a>
              </nav>
            </div>
          </div>
          <div class="flex flex-col gap-8">
            <div class="flex flex-wrap gap-4 *:bg-stone-200 *:dark:bg-stone-800 *:flex-1/3 *:p-4 *:rounded-4xl">
              <div class="w-fit flex flex-col gap-2">
                <div class="text-center text-lg">歌名</div>
                <div>
                  <div class="mx-auto w-fit flex gap-2 *:hover:bg-stone-300 dark:*:hover:bg-stone-700 *:block *:rounded-full *:px-2 *:py-1">
                    <button>&lt;|</button>
                    <button>I I</button>
                    <button>|&gt;</button>
                  </div>
                </div>
                <div class="flex gap-2 justify-center">
                  <div class="text-nowrap">音量</div>
                  <input type="range" class="w-32 block" min={0} max={100}></input>
                </div>
              </div>
              <div class="flex flex-col gap-2 text-center  text-nowrap">
                <div class="text-lg">2025-4-6 周日</div>
                <div class="font-mono text-2xl">00:41:00</div>
                <div class="">天气什么的的不知道～</div>
              </div>
            </div>
            <div class="flex flex-col gap-4">
              <h2 class="text-4xl font-light">常用网站</h2>
              <div class="grid grid-rows-2 gap-4 grid-cols-3 *:bg-stone-200 *:dark:bg-stone-800 *:hover:bg-stone-300 *:dark:hover:bg-stone-700 *:content-center *:block *:text-center *:rounded-4xl *:p-4">
                <a href="https://www.bing.com">Bing</a>
                <a href="https://www.google.com">谷歌</a>
                <a href="https://www.github.com">GitHub</a>
                <a href="https://sspai.com">少数派</a>
                <a href="https://www.bilibili.com">Bilibili</a>
                <a href="https://music.163.com/">网易云音乐</a>
              </div>
            </div>
          </div>
        </main>
      </div>
      <footer class="bg-stone-200 dark:bg-stone-800 w-dvw fixed bottom-0 h-10 leading-10 text-center">
        <input
          type="range"
          min={0}
          max={10000}
          class="absolute block translate-x-1/2 right-1/2 -translate-y-1/2 w-dvw"
        />
        <div>
          {'<  < < <<'} 呐 {'>> > >  >'}
        </div>
      </footer>
    </>
  )
}

export default App
