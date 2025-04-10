import { createSignal, onCleanup, onMount, type Component } from 'solid-js'

function Left() {
  return (
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
  )
}

function Pages() {
  return (
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
  )
}

function Time() {
  const [dt, setDatetime] = createSignal(new Date())
  const timer = setInterval(() => setDatetime(new Date()), 1000)
  onCleanup(() => clearInterval(timer))
  const dayMap = '周日、周一、周二、周三、周四、周五、周六'.split('、')
  const buildDate = (dt: Date) =>
    `${dt.getFullYear()}-${dt.getMonth() + 1}-${dt.getDate()} ${dayMap[dt.getDay()]}`
  const buildTime = (dt: Date) =>
    dt.getHours().toString().padStart(2, '0') +
    ':' +
    dt.getMinutes().toString().padStart(2, '0') +
    ':' +
    dt.getSeconds().toString().padStart(2, '0')
  return (
    <div class="flex flex-col gap-2 text-center text-nowrap justify-center items-center">
      <div class="text-lg">{buildDate(dt())}</div>
      <div class="font-mono text-2xl">{buildTime(dt())}</div>
      <div class="">天气什么的的不知道～</div>
    </div>
  )
}

type PlayListItem = { name: string; artist: string; url: string; lrc: string }
type PlayStatus = 'loadError' | 'playing' | 'loading' | 'pause'
// type PlayStatus =
//   | { type: 'loadingPlaylist' }
//   | { type: 'loadError' }
//   | { type: 'noSong' }
//   | { type: 'playing' | 'loading' | 'pause'; playlist: PlayListItem[]; index: number }

function songName(st: PlayStatus, index: number, playlist?: PlayListItem[]) {
  return st == 'loadError'
    ? '加载错误'
    : playlist == undefined
      ? '正在加载播放列表'
      : playlist.length == 0
        ? '暂无歌曲'
        : playlist[index].artist + ' - ' + playlist[index].name
}

const playlistUrl =
  (import.meta.env.VITE_MEETING_URL as string) +
  '?' +
  new URLSearchParams({
    server: 'netease',
    type: 'playlist',
    id: import.meta.env.VITE_PLAYLIST_ID as string,
  })

const App: Component = () => {
  const [playlist, setPlaylist] = createSignal<PlayListItem[] | undefined>(undefined)
  const [playStatus, setPlayStatus] = createSignal<PlayStatus>('loading')
  const [playIndex, setPlayIndex] = createSignal(0)
  // const [playMode, setPlayMode] = createSignal<'oneSong' | 'flow' | 'random'>('flow')
  // const [isSeekingProgress, setSeekingProgress] = createSignal(false)
  fetch(playlistUrl)
    .then((it) => it.json() as Promise<PlayListItem[]>)
    .then((it) => {
      setPlaylist(it)
      setPlayStatus('loading')
    })
    .catch((e) => {
      console.error(e)
      setPlayStatus('loadError')
    })
  let audio: HTMLAudioElement | undefined
  let range: HTMLInputElement | undefined
  const PlayingButton = (
    <button
      onClick={() =>
        setPlayStatus((acc) => {
          if (acc == 'playing') {
            audio?.pause()
            return 'pause'
          } else {
            return acc
          }
        })
      }
    >
      I I
    </button>
  )
  const PausedButton = (
    <button
      onClick={() =>
        setPlayStatus((acc) => {
          if (acc == 'pause') {
            audio?.play()
            return 'playing'
          } else {
            return acc
          }
        })
      }
    >
      |&gt;
    </button>
  )
  const LoadingButton = <button disabled> O </button>
  const statusMap = {
    loadingPlaylist: LoadingButton,
    loadError: LoadingButton,
    loading: LoadingButton,
    noSong: LoadingButton,
    playing: PlayingButton,
    pause: PausedButton,
  }
  // onMount(() => {

  // })
  return (
    <>
      <div class="min-h-dvh w-dvw grid justify-center pb-12 pt-4">
        <main class="min:h-dvh flex flex-col md:flex-row gap-4 md:gap-12 p-4 md:p-12 justify-center items-center">
          <Left />
          <div class="flex flex-col gap-8">
            <div class="flex flex-wrap gap-4 *:bg-stone-200 *:dark:bg-stone-800 *:flex-1/3 *:p-4 *:rounded-4xl">
              <div class="w-fit flex flex-col gap-2 items-center justify-center">
                <button class="w-fit text-lg hover:bg-stone-300 dark:hover:bg-stone-700 px-4 rounded-4xl">
                  {songName(playStatus(), playIndex(), playlist())}
                </button>
                <div>
                  <div class="mx-auto w-fit flex gap-2 *:hover:bg-stone-300 dark:*:hover:bg-stone-700 *:block *:rounded-full *:px-2 *:py-1">
                    <button
                      onClick={() => {
                        setPlayIndex((acc) => (acc - 1 >= 0 ? acc - 1 : 0))
                        if (audio) {
                          setPlayStatus('playing')
                          audio.play()
                        }
                      }}
                    >
                      I&lt;|
                    </button>
                    {statusMap[playStatus()]}
                    <button
                      onClick={() => {
                        setPlayIndex((acc) => {
                          const nowPlaylist = playlist()
                          if (nowPlaylist != undefined) {
                            return +1 < nowPlaylist.length ? acc + 1 : 0
                          }
                          return acc
                        })
                        if (audio) {
                          setPlayStatus('playing')
                          audio.play()
                        }
                      }}
                    >
                      |&gt;I
                    </button>
                  </div>
                </div>
                <div class="flex gap-2 justify-center">
                  <div class="text-nowrap">音量</div>
                  <input
                    type="range"
                    class="w-32 block"
                    min={0}
                    max={100}
                    onChange={(ev) => {
                      if (audio != undefined) {
                        audio.volume = Number(ev.currentTarget.value) / 100
                      }
                    }}
                  ></input>
                </div>
              </div>
              <Time />
            </div>
            <Pages />
          </div>
        </main>
      </div>
      <audio
        src={playlist()?.[playIndex()].url}
        onLoad={() => setPlayStatus('loading')}
        onPlay={() => setPlayStatus('playing')}
        onPause={() => setPlayStatus('pause')}
        onCanPlay={() => {
          console.log('?')
          setPlayStatus((acc) => (acc == 'loading' ? 'pause' : acc))
          if (audio) {
            audio.play()
          }
        }}
        onEnded={() => {
          setPlayStatus((acc) => (acc == 'playing' ? 'loading' : acc))
          setPlayIndex((acc) => {
            const nowPlaylist = playlist()
            if (nowPlaylist) {
              return acc + 1 < nowPlaylist.length ? acc + 1 : 0
            }
            return acc
          })
          if (audio) {
            audio.play()
          }
        }}
        onTimeUpdate={(it) => {
          if (range != undefined) {
            range.value = `${(it.currentTarget.currentTime / it.currentTarget.duration) * 100}`
          }
        }}
        ref={audio}
      ></audio>
      <footer class="bg-stone-200 dark:bg-stone-800 w-dvw fixed bottom-0 h-10 leading-10 text-center">
        <input
          type="range"
          min={0}
          max={100}
          step={0.01}
          class="absolute block translate-x-1/2 right-1/2 -translate-y-1/2 w-dvw"
          onChange={(it) => {
            if (audio != undefined) {
              audio.currentTime = (Number(it.currentTarget.value) / 100) * audio.duration
            }
          }}
          value={0}
          ref={range}
        />
        <div>
          {'< < < < <'} 呐 {'> > > > >'}
        </div>
      </footer>
    </>
  )
}

export default App
