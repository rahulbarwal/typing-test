<script lang="ts">
  import Footer from "./Footer.svelte";
  import Editor from "../components/Editor.svelte";
  import Stats from "../components/Stats.svelte";
  import RunningTimer from "../components/RunningTimer.svelte";

  let timer, editor, timerRunning;
</script>

<main class="h-screen pt-4">
  <section class="container h-4/5 m-auto flex ">
    <article class="w-2/3">
      <Editor
        bind:this={editor}
        on:typingStartedEvent={() => {
          timer.startTimer();
          timerRunning = true;
        }}
        on:resetEditor={() => timer.resetTimer()}
      />
    </article>
    <nav class="w-1/3 p-9 flex flex-col justify-between">
      <span class={timerRunning ? "opacity-25" : "opacity-100"}><Stats /></span>
      <RunningTimer
        bind:this={timer}
        on:timerEnded={() => {
          editor.disableTyping();
          timerRunning = false;
        }}
      />
    </nav>
  </section>
  <article>
    <Footer />
  </article>
</main>
