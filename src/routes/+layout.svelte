<script lang="ts">

    const userID = new Int8Array(64);

    let cred: PublicKeyCredential|null;
    let err: Error|null;

    let email = "";

    const createCredentials = async () => {
        try {
            const res = await fetch("/api/auth/challenge", {
                body: JSON.stringify({
                    email,
                })
            });

            const body = await res.json();

            const challenge = new Uint8Array(body.challenge);
            const userID = new Uint8Array(body.userID);

            console.info(challenge);

            cred = await navigator.credentials.create({
                publicKey: {
                    challenge,
                    user: {
                        id: userID,
                        displayName: email,
                        name: body.userID,
                    },
                    pubKeyCredParams: [
                        { alg: -7, type: "public-key" },
                        { alg: -8, type: "public-key" },
                        { alg: -257, type: "public-key" },
                    ],
                    rp: { name: "narobin" }
                }
            })
            console.info(cred);
        } catch (error) {
            err = error?.message;
        }


    };

    const login = async () => {
        try {
            cred = await navigator.credentials.get({
                publicKey: {
                    challenge,
                }
            })
            console.info(cred);
        } catch (error) {
            err = error?.message;
        }
    }
</script>

<header class="auth">

    <h1>t-zero</h1>

    <input type="email" bind:value={email} placeholder="email" />

    <button on:click={createCredentials}>sign up</button>
    <button on:click={login}>log in</button>

</header>

<main>
    <slot/>
</main>

<style lang="scss">
    .auth {
      padding: 1rem;
    }

    :global(body) {
      margin: 0;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;

      display: grid;
      grid-template-rows: auto 1fr;
      min-height: 100dvh;
      box-sizing: border-box;

      background-color: $primary-color;
    }

    :global(body, button, input, select, textarea) {
      font-family: 'Libre Baskerville', serif;
    }

    header {
      color: $bg-color;
      display: flex;
      gap: 0.5rem;
      align-items: baseline;
      h1 {
        flex-grow: 1;
        margin: 0;
        padding: 0;
      }
    }

    main {
      background-color: $bg-color;
      padding: 1rem;
      border-radius: 1rem 0 0 0;
      margin-left: 1rem;
    }
</style>
