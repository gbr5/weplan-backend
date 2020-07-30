# Recuperação de senha

<!-- Requisitos Funcionais -->
**RF**

- O usuário deve poder recuperar sua senha informando o seu e-mail;
- O usuário deve receber um e-mail com as instruções de recuperação de senha;
- O usuário deve poder resetar sua senha;

<!-- Requisitos Não Funcionais -->
**RNF**

- Utilizar Mailtrap para testar envio de e-mail em ambiente de desenvolvimento;
- Utilizar Amazon SES para envios em produção;
- O envio de e-mails deve acontecer em segundo plano (background job);

<!-- Regras de Negócios -->
**RN**

- O link enviado por e-mail para resetar a senha, deve expirar em 2h;
- O usuário precisa confirmar a nova senha ao resetar a sua senha;

# Atualização do perfil

<!-- Requisitos Funcionais -->
**RF**

- O usuário deve poder atualizar o seu perfil;

<!-- Requisitos Não Funcionais -->
**RNF**

<!-- Regras de Negócios -->
**RN**

- O usuário não pode alterar seu e-mail para um e-mail já utilizado;
- Para atualizar a sua senha, o usuário deve informar a senha antiga;
- Para atualizar a sua senha, o usuário precisa confirmar a nova senha;

# Painel do prestador

<!-- Requisitos Funcionais -->
**RF**

- O usuário deve poder listar seus agendamentos de um dia específico;
- O prestadore deve receber uma notificação sempre que houver um novo agendamento;
- O prestador deve poder visualizar as notificações não lidas;

<!-- Requisitos Não Funcionais -->
**RNF**

- Os agendamento do prestador, no dia, devem ser armazenados em cache;
- As notificações do prestador devem ser armazenadas no MongoDb;
- As notificações do prestador devem ser enviadas em tempo real utilizando Socket.io;

<!-- Regras de Negócios -->
**RN**

- A notificação deve ter um status de lida ou não lida, para que o prestador possa controlar;


# Agendamento de serviços

<!-- Requisitos Funcionais -->
**RF**

- O usuário deve poder listar todos os prestadores de serviço cadastrados;
- O usuário deve poder listar os dias de um mês com pelo menos um horário disponível de um prestador;
- O usuário deve poder listar horários disponíveis em um dia específico de um prestador;
- o usuário deve poder realizar um novo agendamento com um prestador;

<!-- Requisitos Não Funcionais -->
**RNF**

- A listagem de prestadores deve ser armazenada em cache;

<!-- Regras de Negócios -->
**RN**

- Cada agendamento deve durar 1h exatamente;
- Os agendamentos devem estar disponíveis entre 8h às 18h (Primeiro às 8h, último às 17h);
- O usuário não pode agendar em um horário já ocupado;
- O usuário não pode agendar em um horário que já passou;
- O usuário não pode agendar serviços consigo mesmo;

