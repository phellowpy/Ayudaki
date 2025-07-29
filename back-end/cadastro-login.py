import random

print("bem vindo ao cadastro!!")

nome_usuario = input("Digite seu nome de usuario: ")
nome_perfil = input("Digite seu nome de perfil: ")
email = input("Digite seu email: ")
telefone = int(input("Digite seu telefone: "))
data_nasc = int(input("Digite sua data de nascimento: "))
senha = input("Digite sua senha: ")

texto = ''.join(senha)
letras = list(texto)
random.shuffle(letras)
senha_crip = ''.join(letras)

print("\nFaça seu login agora.")

email_login = input("Digite seu email: ")
senha_login = input("Digite sua senha: ")

if email_login == email and senha_login == senha:
    print("Logado com sucesso!!")
else:
    print("Algo esta errado nas informações.")
