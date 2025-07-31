# 1. Admin: e-mail: admin@doacoes.com, senha: 123
# 2. Usuário Normal: e-mail: joao@email.com, senha: abc
# 3. ONG: e-mail: ong@doacoes.com, senha: xyz

import datetime

contas = [
    {"username": "admin", "nome_perfil": "Administrador Geral", "email": "admin@doacoes.com", "senha": "123", "telefone": "999999999", "tipo": "admin"},
    {"username": "usuario1", "nome_perfil": "João Silva", "email": "joao@email.com", "senha": "abc", "telefone": "988887777", "tipo": "normal"},
    {"username": "ongsolidaria", "nome_perfil": "ONG Solidária", "email": "ong@doacoes.com", "senha": "xyz", "telefone": "977776666", "tipo": "ong"}
]

campanhas = [
    {"id": 1, "nome": "Ajuda às Vítimas da Chuva", "descricao": "Arrecadação para famílias afetadas pelas enchentes no sul do país.", "data_criacao": "2025-07-29", "hora_criacao": "10:00", "valor_estimado": 5000.00, "valor_arrecadado": 1500.00, "criador_email": "ong@doacoes.com"},
    {"id": 2, "nome": "Natal Sem Fome", "descricao": "Campanha para doação de cestas básicas para comunidades carentes.", "data_criacao": "2025-07-29", "hora_criacao": "14:30", "valor_estimado": 10000.00, "valor_arrecadado": 3200.00, "criador_email": "ong@doacoes.com"},
    {"id": 3, "nome": "Apoio a Animais Abandonados", "descricao": "Arrecadação para compra de ração e medicamentos para abrigos de animais.", "data_criacao": "2025-07-29", "hora_criacao": "18:00", "valor_estimado": 3000.00, "valor_arrecadado": 800.00, "criador_email": "ong@doacoes.com"}
]

proximo_id_campanha = 4
conta_logada = None

def obter_inteiro(prompt):
    while True:
        try:
            valor = input(prompt)
            if not valor.isdigit():
                raise ValueError
            return int(valor)
        except ValueError:
            print("\nEntrada inválida. Por favor, digite um número inteiro válido.")

def obter_flutuante(prompt):
    while True:
        try:
            return float(input(prompt))
        except ValueError:
            print("\nEntrada inválida. Por favor, digite um valor numérico válido (ex: 100.00).")
        
def exibir_menu_principal():
    print("\n--- Menu Principal ---")
    print("1. Fazer Login")
    print("2. Cadastrar Nova Conta")
    if conta_logada and conta_logada["tipo"] != "admin":
        print("3. Desconectar Conta")
    print("0. Sair")

def fazer_login():
    global conta_logada
    if conta_logada:
        print(f"\nVocê já está logado como {conta_logada['nome_perfil']}.")
        return

    email = input("Digite seu e-mail: ")
    senha = input("Digite sua senha: ")

    for conta in contas:
        if conta["email"] == email and conta["senha"] == senha:
            conta_logada = conta
            print(f"\nLogin realizado com sucesso! Bem-vindo(a), {conta_logada['nome_perfil']}!")
            return
    print("\nE-mail ou senha incorretos. Tente novamente.")

def cadastrar_conta():
    print("\n--- Cadastro de Nova Conta ---")
    username = input("Nome de usuário: ")
    nome_perfil = input("Nome de perfil: ")
    email = input("E-mail: ")

    while True:
        email_valido = True
        for conta in contas:
            if conta["email"] == email:
                print("\nEste e-mail já está em uso. Por favor, use outro.")
                email_valido = False
                break
        if email_valido:
            break
        email = input("E-mail: ") 
    senha = input("Senha: ")
    
    telefone = str(obter_inteiro("Telefone (apenas números): "))

    nova_conta = {
        "username": username,
        "nome_perfil": nome_perfil,
        "email": email,
        "senha": senha,
        "telefone": telefone,
        "tipo": "normal"  
    }
    contas.append(nova_conta)
    print("\nConta cadastrada com sucesso! Agora você pode fazer login.")

def desconectar_conta_atual():
    global conta_logada
    if not conta_logada:
        print("\nNenhuma conta está logada para desconectar.")
        return
    
    if conta_logada["tipo"] == "admin":
        print("\nA conta de administrador não pode ser desconectada por este menu.")
        return

    while True:
        confirmacao = input(f"\nDeseja realmente desconectar a conta {conta_logada['nome_perfil']}? (s/n): ").lower()
        if confirmacao in ['s', 'n']:
            break
        else:
            print("Resposta inválida. Por favor, digite 's' para sim ou 'n' para não.")

    if confirmacao == 's':
        conta_logada = None
        print("\nConta desconectada com sucesso.")
    else:
        print("\nDesconexão cancelada.")

def menu_usuario_normal():
    while True:
        print("\n--- Menu do Usuário Normal ---")
        print("1. Doar para Campanha")
        print("2. Desconectar Minha Conta")
        print("3. Voltar ao Menu Principal (Login/Cadastro)")
        print("0. Sair do Sistema")

        escolha = obter_inteiro("Escolha uma opção: ")

        if escolha == 1:
            doar_para_campanha()
        elif escolha == 2:
            desconectar_conta_atual()
            if not conta_logada:
                break
        elif escolha == 3:
            break
        elif escolha == 0:
            print("\nSaindo do sistema. Até mais!")
            exit()
        else:
            print("\nOpção inválida. Tente novamente.")

def doar_para_campanha():
    if not campanhas:
        print("\nNão há campanhas ativas no momento.")
        return

    print("\n--- Campanhas Disponíveis para Doação ---")
    for campanha in campanhas:
        print(f"ID: {campanha['id']}")
        print(f"Nome: {campanha['nome']}")
        print(f"Descrição: {campanha['descricao']}")
        print(f"Arrecadado: R$ {campanha['valor_arrecadado']:.2f} / Estimado: R$ {campanha['valor_estimado']:.2f}")
        print("-" * 30)


    while True:
        id_campanha = obter_inteiro("Digite o ID da campanha para a qual deseja doar: ")
        campanha_encontrada = None
        for campanha in campanhas:
            if campanha["id"] == id_campanha:
                campanha_encontrada = campanha
                break
        
        if campanha_encontrada:
            break 
        else:
            print("\nID de campanha inválido ou não encontrado. Verifique o ID e digite novamente.")


    while True:
        valor_doacao = obter_flutuante("Digite o valor que deseja doar: R$ ")
        if valor_doacao > 0:
            break
        else:
            print("\nO valor da doação deve ser positivo. Digite novamente.")

    campanha_encontrada["valor_arrecadado"] += valor_doacao
    print(f"\nDoação de R$ {valor_doacao:.2f} realizada com sucesso para a campanha '{campanha_encontrada['nome']}'!")
    print(f"Novo valor arrecadado: R$ {campanha_encontrada['valor_arrecadado']:.2f}")

def menu_ong():
    while True:
        print("\n--- Menu da ONG ---")
        print("1. Criar Nova Campanha")
        print("2. Ver Minhas Campanhas e Gerenciar")
        print("3. Desconectar Minha Conta")
        print("4. Voltar ao Menu Principal (Login/Cadastro)")
        print("0. Sair do Sistema")

        escolha = obter_inteiro("Escolha uma opção: ")

        if escolha == 1:
            criar_campanha()
        elif escolha == 2:
            gerenciar_minhas_campanhas()
        elif escolha == 3:
            desconectar_conta_atual()
            if not conta_logada:
                break
        elif escolha == 4:
            break
        elif escolha == 0:
            print("\nSaindo do sistema. Até mais!")
            exit()
        else:
            print("\nOpção inválida. Tente novamente.")

def criar_campanha():
    global proximo_id_campanha
    print("\n--- Criar Nova Campanha ---")
    nome = input("Nome da campanha: ")
    descricao = input("Descrição da campanha: ")
    data_criacao = datetime.date.today().strftime("%Y-%m-%d")
    hora_criacao = datetime.datetime.now().strftime("%H:%M")
    
    while True:
        valor_estimado = obter_flutuante("Valor estimado necessário para a campanha (R$): ")
        if valor_estimado > 0:
            break
        else:
            print("\nO valor estimado deve ser positivo. Digite novamente.")

    nova_campanha = {
        "id": proximo_id_campanha,
        "nome": nome,
        "descricao": descricao,
        "data_criacao": data_criacao,
        "hora_criacao": hora_criacao,
        "valor_estimado": valor_estimado,
        "valor_arrecadado": 0.00,
        "criador_email": conta_logada["email"]
    }
    campanhas.append(nova_campanha)
    proximo_id_campanha += 1
    print(f"\nCampanha '{nome}' criada com sucesso com o ID: {nova_campanha['id']}!")

def gerenciar_minhas_campanhas():
    minhas_campanhas = [c for c in campanhas if c["criador_email"] == conta_logada["email"]]

    if not minhas_campanhas:
        print("\nVocê ainda não criou nenhuma campanha.")
        return

    while True:
        print("\n--- Minhas Campanhas ---")
        for campanha in minhas_campanhas:
            print(f"ID: {campanha['id']}")
            print(f"Nome: {campanha['nome']}")
            print(f"Arrecadado: R$ {campanha['valor_arrecadado']:.2f} / Estimado: R$ {campanha['valor_estimado']:.2f}")
            print("-" * 30)

        print("\nOpções de Gerenciamento:")
        print("1. Retirar Valor da Campanha")
        print("2. Apagar Campanha")
        print("3. Voltar ao Menu da ONG")
        
        escolha = obter_inteiro("Escolha uma opção: ")

        if escolha == 1:

            while True:
                id_campanha = obter_inteiro("Digite o ID da campanha para retirar o valor: ")
                campanha_selecionada = None
                for c in minhas_campanhas:
                    if c["id"] == id_campanha:
                        campanha_selecionada = c
                        break
                
                if campanha_selecionada:
                    break 
                else:
                    print("\nID de campanha inválido ou a campanha não pertence a você. Digite novamente.")

            while True:
                valor_retirar = obter_flutuante("Digite o valor a ser retirado: R$ ")
                if valor_retirar <= 0:
                    print("\nO valor a ser retirado deve ser positivo. Digite novamente.")
                elif valor_retirar > campanha_selecionada["valor_arrecadado"]:
                    current_arrecadado = next((c['valor_arrecadado'] for c in campanhas if c['id'] == campanha_selecionada['id']), 0)
                    print(f"\nNão é possível retirar R$ {valor_retirar:.2f}. Saldo atual: R$ {current_arrecadado:.2f}. Digite novamente.")
                else:
                    for c in campanhas:
                        if c["id"] == campanha_selecionada["id"]:
                            c["valor_arrecadado"] -= valor_retirar
                            print(f"\nRetirada de R$ {valor_retirar:.2f} realizada com sucesso da campanha '{c['nome']}'.")
                            print(f"Novo valor arrecadado: R$ {c['valor_arrecadado']:.2f}")
                            break
                    break 

        elif escolha == 2:
            while True:
                id_campanha = obter_inteiro("Digite o ID da campanha que deseja apagar: ")
                campanha_para_apagar = None
                index_para_apagar = -1

                for i, c in enumerate(campanhas):
                    if c["id"] == id_campanha and c["criador_email"] == conta_logada["email"]:
                        campanha_para_apagar = c
                        index_para_apagar = i
                        break
                
                if campanha_para_apagar:
                    break 
                else:
                    print("\nID de campanha inválido ou a campanha não pertence a você. Digite novamente.")

            while True:
                confirmacao = input(f"Tem certeza que deseja apagar a campanha '{campanha_para_apagar['nome']}'? (s/n): ").lower()
                if confirmacao in ['s', 'n']:
                    break
                else:
                    print("Resposta inválida. Por favor, digite 's' para sim ou 'n' para não.")
            
            if confirmacao == 's':
                campanhas.pop(index_para_apagar)
                print(f"\nCampanha '{campanha_para_apagar['nome']}' apagada com sucesso.")
                minhas_campanhas = [c for c in campanhas if c["criador_email"] == conta_logada["email"]] 
            else:
                print("\nOperação de apagar campanha cancelada.")

        elif escolha == 3:
            break
        else:
            print("\nOpção inválida. Tente novamente.")

def menu_admin():
    print("\n--- Menu do Administrador ---")
    print("Funcionalidades de administrador ainda não implementadas.")
    print("A conta de administrador não pode ser desconectada por este menu.")
    print("1. Voltar ao Menu Principal (Login/Cadastro)")
    print("0. Sair do Sistema")
    
    escolha = obter_inteiro("Escolha uma opção: ")
    if escolha == 1:
        pass
    elif escolha == 0:
        print("\nSaindo do sistema. Até mais!")
        exit()
    else:
        print("\nOpção inválida. Tente novamente.")

def iniciar_sistema():
    while True:
        exibir_menu_principal()
        escolha = obter_inteiro("Escolha uma opção: ")

        if escolha == 1:
            fazer_login()
            if conta_logada:
                if conta_logada["tipo"] == "normal":
                    menu_usuario_normal()
                elif conta_logada["tipo"] == "ong":
                    menu_ong()
                elif conta_logada["tipo"] == "admin":
                    menu_admin()
        elif escolha == 2:
            cadastrar_conta()
        elif escolha == 3 and conta_logada and conta_logada["tipo"] != "admin":
            desconectar_conta_atual()
        elif escolha == 0:
            print("\nSaindo do sistema. Até mais!")
            break
        else:
            print("\nOpção inválida ou ação não permitida no momento. Tente novamente.")

if __name__ == "__main__":
    iniciar_sistema()
