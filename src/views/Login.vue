<template>
  <div class="Login">
    <div class="login-box">
      <h1>Login</h1>
      <form>
      <input class="login-input" type="text" placeholder="usuário">
      <input class="login-input" type="password" placeholder="senha">
      <a href="#"><small>esqueci a senha</small></a>
      </form>
      <button class="login-btn" @click="signIn">Entrar</button>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Login',
  components: {

  },
  methods: {
    signIn() {
      this.$router.push("/dashboard/Home")
    }
  }
}
</script>

<style>

.Login {
  width: 100vw;
  height: calc(100vh - 80px);
  display: flex;
  justify-content: center;
  align-items: center;
  
}

.login-box {
  background-color: #41687E;
  width: 421px;
  height: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.login-box h1 {
  font-family: 'Titillium Web', sans-serif;
  font-weight: 400;
  color: #fff;
  margin: 50px 0 30px 0;
}

.login-box form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.login-input {
  background-color: #41687E;
  border: none;
  border-bottom: 1px solid white;
  font-size: 20px;
  color: #fff;
  margin-top: 40px;
  outline: none;
  padding: 0 5px;
  font-family: 'Titillium Web';
  font-weight: 200;
}

.login-input::placeholder {
  font-family: 'Titillium Web', sans-serif;
  color: white;
}

.login-btn {
  margin-top: 30px;
  padding: 5px 70px;
  background-color: #41687E;
  border: 1px solid white;
  font-family: 'Titillium Web', sans-serif;
  color: #fff;
  font-size: 25px;
  outline: none;
  cursor: pointer;
  transition: .2s;
}

.login-box button:hover {
  filter: brightness(110%);
}

.login-box a {
  color:#fff;
  align-self: start;
  margin-top: 10px;
  text-decoration: none;
}

</style>