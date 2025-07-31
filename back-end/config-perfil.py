def exibir_configuracoes(usuario):
    """Exibe as configurações atuais do usuário."""
    print("\n--- Configurações Atuais ---")
    print(f"1. Foto de Perfil: {usuario['foto_perfil']}")
    print(f"2. Nome de Usuário: {usuario['nome_usuario']}")
    print(f"3. Nome de Perfil: {usuario['nome_perfil']}")
    print(f"4. E-mail: {usuario['email']}")
    print(f"5. Telefone: {usuario['telefone']}")
    print(f"6. Senha: {'*' * len(usuario['senha'])}") 
    print("--------------------------")

def alterar_configuracoes(usuario):
    """Permite ao usuário alterar as configurações."""
    while True:
        exibir_configuracoes(usuario)
        opcao = input("Deseja alterar alguma configuração? (s/n): ").lower()

        if opcao == 'n':
            print("Configurações salvas.")
            break
        elif opcao == 's':
            try:
                escolha = int(input("Qual configuração deseja alterar? Digite o número (1-6): "))
                if escolha == 1:
                    usuario['foto_perfil'] = input("Nova foto de perfil: ")
                elif escolha == 2:
                    usuario['nome_usuario'] = input("Novo nome de usuário: ")
                elif escolha == 3:
                    usuario['nome_perfil'] = input("Novo nome de perfil: ")
                elif escolha == 4:
                    usuario['email'] = input("Novo e-mail: ")
                elif escolha == 5:
                    usuario['telefone'] = input("Novo telefone: ")
                elif escolha == 6:
                    usuario['senha'] = input("Nova senha: ")
                else:
                    print("Opção inválida. Por favor, digite um número de 1 a 6.")
            except ValueError:
                print("Entrada inválida. Por favor, digite um número.")
        else:
            print("Opção inválida. Por favor, digite 's' para sim ou 'n' para não.")

minha_conta = {
    'foto_perfil': 'avatar_padrao.png',
    'nome_usuario': 'usuario_ayuda',
    'nome_perfil': 'Doações Ayuda',
    'email': 'contato@ayuda.com',
    'telefone': '11999999999',
    'senha': 'senha123'
}

print("Bem-vindo ao sistema Ayuda!")
alterar_configuracoes(minha_conta)
print("\nObrigado por usar o Ayuda!")
