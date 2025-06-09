<?php $base = "/SuaFacul/public"; ?>
<!DOCTYPE html>
<html lang="pt-br">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>SuaFacul</title>

  <!-- Boxicons -->
  <link href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css" rel="stylesheet">

  <!-- Bootstrap (opcional, para alertas) -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">

  <!-- Seu CSS -->
  <link rel="stylesheet" href="<?= $base ?>/assets/css/pages/loginstyle.css" />
</head>

<body>
  <div class="container">

    <!-- MENSAGENS DE FEEDBACK (opcional com sessão) -->
    <?php session_start(); ?>
    <?php if (!empty($_SESSION['sucesso'])): ?>
      <div class="alert alert-success alert-dismissible fade show" role="alert">
        <?= $_SESSION['sucesso'] ?>
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
      </div>
      <?php unset($_SESSION['sucesso']); ?>
    <?php endif; ?>

    <?php if (!empty($_SESSION['erro'])): ?>
      <div class="alert alert-danger alert-dismissible fade show" role="alert">
        <?= $_SESSION['erro'] ?>
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
      </div>
      <?php unset($_SESSION['erro']); ?>
    <?php endif; ?>

    <!-- FORM DE LOGIN -->
    <div class="form-box login">
      <form action="<?= $base ?>/login" method="POST">
        <h1>Entrar</h1>
        <div class="input-box">
          <input type="text" name="email" placeholder="Usuário" required>
          <i class='bx bxs-user'></i>
        </div>
        <div class="input-box">
          <input type="password" name="senha" placeholder="Senha" required>
          <i class='bx bxs-lock-alt'></i>
        </div>
        <div class="forgot-link">
          <a href="#">Esqueceu a senha?</a>
        </div>
        <button type="submit" class="btn">Entrar</button>
        <p>Entrar com uma plataforma</p>
        <div class="social-icons">
          <a href="https://accounts.google.com/"><i class='bx bxl-google'></i></a>
          <a href="https://github.com/login"><i class='bx bxl-github'></i></a>
          <a href="https://www.linkedin.com/login"><i class='bx bxl-linkedin'></i></a>
        </div>
      </form>
    </div>

    <!-- FORM DE REGISTRO -->
    <div class="form-box register">
      <form action="<?= $base ?>/registrar" method="POST">
        <h1>Registro</h1>
        <div class="input-box">
          <input type="text" name="email" placeholder="Email" required>
          <i class='bx bxs-envelope'></i>
        </div>
        <div class="input-box">
          <input type="password" name="senha" placeholder="Senha" required>
          <i class='bx bxs-lock-alt'></i>
        </div>
        <button type="submit" class="btn">Registrar</button>
        <p>Registrar com uma plataforma</p>
        <div class="social-icons">
          <a href="https://accounts.google.com/"><i class='bx bxl-google'></i></a>
          <a href="https://github.com/login"><i class='bx bxl-github'></i></a>
          <a href="https://www.linkedin.com/login"><i class='bx bxl-linkedin'></i></a>
        </div>
      </form>
    </div>

    <!-- TOGGLE BOX (animação de transição entre login e registro) -->
    <div class="toggle-box">
      <div class="toggle-panel toggle-left">
        <h1>Olá, bem-vindo!</h1>
        <p>Não tem uma conta?</p>
        <button class="btn register-btn">Registrar</button>
      </div>
      <div class="toggle-panel toggle-right">
        <h1>Bem-vindo de volta!</h1>
        <p>Tem uma conta?</p>
        <button class="btn login-btn">Entrar</button>
      </div>
    </div>

  </div>

  <!-- Seu JavaScript -->
  <script src="<?= $base ?>/assets/js/loginscript.js"></script>

  <!-- Bootstrap JS (para fechar alertas) -->
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>

</html>
