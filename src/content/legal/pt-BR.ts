import type { LegalContent } from "./types";

const CONTACT_EMAIL = "hello@nekolculator.com.br";

export const legalPtBR: LegalContent = {
  privacy: {
    title: "Política de Privacidade",
    effectiveDate: "15 de setembro de 2026",
    intro: [
      "O Nekolculator (\"nós\", o \"Aplicativo\") é um aplicativo de calculadora. Esta Política de Privacidade explica quais informações o Aplicativo trata, por quê, e quais escolhas você tem. Tentamos escrevê-la da forma como gostaríamos que nos explicassem — de forma clara, sem esconder as partes importantes em juridiquês.",
      "Ao usar o Nekolculator, você concorda com as práticas descritas aqui. Se não concordar, por favor não use o Aplicativo.",
    ],
    sections: [
      {
        heading: "1. Informações que coletamos",
        body: [
          "O Nekolculator não exige conta, e não coletamos seu nome, e-mail ou qualquer cálculo que você faça. As contas que você realiza no aplicativo permanecem no seu dispositivo — nunca são enviadas para nós.",
          "O Aplicativo armazena localmente, no seu dispositivo (no local storage e session storage do navegador), um pequeno conjunto de preferências, como o tema de gato escolhido, idioma, modo claro/escuro e se o som está mudo. Essas informações não são transmitidas aos nossos servidores nem vinculadas à sua identidade.",
          "Se você instalar o Nekolculator como um Progressive Web App, o sistema operacional do seu dispositivo pode registrar informações padrão de instalação e uso (como o uso do ícone do app), assim como faria com qualquer outro aplicativo instalado. Isso é regido pelas práticas de privacidade do fabricante do seu dispositivo, não por nós.",
        ],
      },
      {
        heading: "2. Cookies e armazenamento local",
        body: [
          "Usamos um pequeno número de cookies e entradas de armazenamento do navegador para lembrar suas preferências e, quando a publicidade for habilitada, para dar suporte à exibição de anúncios. Consulte nossa Política de Cookies para a lista específica do que armazenamos e por quê.",
        ],
      },
      {
        heading: "3. Publicidade e serviços de terceiros",
        body: [
          "Planejamos exibir publicidade por meio de redes de anúncios de terceiros. Uma vez habilitadas, essas redes podem usar cookies, identificadores de dispositivo ou tecnologias semelhantes para veicular anúncios e medir seu desempenho, o que pode incluir publicidade personalizada com base na sua atividade de navegação em outros sites. Os scripts de anúncios só serão carregados depois que você consentir com cookies não essenciais no banner exibido no Aplicativo.",
          "Não controlamos diretamente essas tecnologias de terceiros. Recomendamos que você consulte a Política de Privacidade do Google (policies.google.com/privacy) e a documentação de privacidade de qualquer outra rede de anúncios que utilizemos, já que as práticas de dados delas são próprias e não são cobertas por esta política.",
          "Quando exigido pela legislação aplicável, solicitaremos seu consentimento antes de habilitar cookies de publicidade ou análise não essenciais, por meio do banner de cookies exibido no Aplicativo.",
        ],
      },
      {
        heading: "4. Privacidade infantil",
        body: [
          "O Nekolculator não é direcionado a crianças, e não coletamos intencionalmente informações pessoais de crianças. Como não coletamos informações pessoais de ninguém, isso é praticamente teórico — mas, se você acredita que uma criança nos forneceu informações pessoais, entre em contato conosco e resolveremos a questão.",
        ],
      },
      {
        heading: "5. Segurança dos dados",
        body: [
          "Como seus cálculos e a maioria das suas preferências nunca saem do seu dispositivo, há muito pouco seu para protegermos. Quando processamos algum dado (por exemplo, por meio de provedores de anúncios ou análise de terceiros, quando habilitados), escolhemos provedores que aplicam salvaguardas de padrão de mercado, mas nenhum método de transmissão ou armazenamento é 100% seguro.",
        ],
      },
      {
        heading: "6. Seus direitos",
        body: [
          "Dependendo de onde você mora, você pode ter direitos de acessar, corrigir, excluir ou restringir o uso de dados pessoais coletados sobre você (por exemplo, sob a LGPD no Brasil, o GDPR na UE/EEE ou a CCPA/CPRA na Califórnia). Como o Nekolculator não coleta dados pessoais diretamente, a maioria desses pedidos diria respeito a dados mantidos pelos nossos parceiros de publicidade ou análise, e não por nós — mas você pode entrar em contato conosco a qualquer momento e ajudaremos a orientá-lo, ou a limpar o armazenamento local em seu nome, quando aplicável.",
          "Você pode limpar todas as preferências armazenadas localmente a qualquer momento, apagando os dados do site do Nekolculator no seu navegador, ou usando o modo privado/anônimo do navegador.",
        ],
      },
      {
        heading: "7. Alterações a esta política",
        body: [
          "Podemos atualizar esta Política de Privacidade periodicamente, por exemplo, à medida que adicionamos recursos como publicidade. Atualizaremos a data de vigência acima quando isso ocorrer. O uso continuado do Aplicativo após as mudanças entrarem em vigor significa que você aceita a política revisada.",
        ],
      },
      {
        heading: "8. Fale conosco",
        body: [`Dúvidas sobre esta política? Fale conosco em ${CONTACT_EMAIL}.`],
      },
    ],
  },
  terms: {
    title: "Termos de Uso",
    effectiveDate: "15 de setembro de 2026",
    intro: [
      "Estes Termos de Uso (\"Termos\") regem o uso do Nekolculator (o \"Aplicativo\"). Ao usar o Aplicativo, você concorda com estes Termos. Se não concordar, por favor não use o Aplicativo.",
    ],
    sections: [
      {
        heading: "1. Descrição do serviço",
        body: [
          "O Nekolculator é um aplicativo de calculadora que oferece modos de cálculo básico, científico e financeiro (incluindo o modo RPN no estilo HP-12C), para uso pessoal, informativo e educacional.",
        ],
      },
      {
        heading: "2. Não é aconselhamento profissional",
        body: [
          "O Nekolculator é uma ferramenta de cálculo de uso geral. Os resultados dos modos financeiro e TVM (valor do dinheiro no tempo) — incluindo parcelas de empréstimos, crescimento composto e cálculos RPN — são fornecidos apenas para fins ilustrativos e informativos, e não constituem aconselhamento financeiro, tributário, jurídico ou contábil.",
          "Sempre verifique cálculos importantes de forma independente e consulte um profissional qualificado antes de tomar decisões financeiras. Não nos responsabilizamos por decisões tomadas com base em números produzidos pelo Aplicativo.",
        ],
      },
      {
        heading: "3. Uso aceitável",
        body: [
          "Você concorda em usar o Aplicativo apenas para fins lícitos e em não tentar interromper, fazer engenharia reversa com fins maliciosos, ou interferir no funcionamento normal do Aplicativo, incluindo qualquer publicidade exibida nele.",
        ],
      },
      {
        heading: "4. Propriedade intelectual",
        body: [
          "O design do Aplicativo, a marca, a arte do mascote gato e o código original são de nossa propriedade ou de nossos licenciadores, e são protegidos pelas leis de propriedade intelectual aplicáveis. Você pode usar o Aplicativo para sua finalidade pretendida, mas não pode copiar, redistribuir ou criar produtos derivados de sua marca ou conteúdo sem permissão.",
        ],
      },
      {
        heading: "5. Conteúdo de terceiros e publicidade",
        body: [
          "O Aplicativo pode exibir anúncios veiculados por redes de terceiros, uma vez habilitados. Não controlamos o conteúdo dos anúncios de terceiros e não somos responsáveis pelos produtos, serviços ou conteúdo que eles promovem. Interagir com qualquer anúncio é de sua exclusiva escolha e risco.",
        ],
      },
      {
        heading: "6. Isenção de garantias",
        body: [
          "O Aplicativo é fornecido \"como está\" e \"conforme disponível\", sem garantias de qualquer tipo, expressas ou implícitas, incluindo, entre outras, precisão, confiabilidade ou adequação a uma finalidade específica. Não garantimos que o Aplicativo estará livre de erros ou funcionará sem interrupções.",
        ],
      },
      {
        heading: "7. Limitação de responsabilidade",
        body: [
          "Na máxima extensão permitida pela legislação aplicável, não seremos responsáveis por quaisquer danos indiretos, incidentais ou consequenciais decorrentes do uso, ou da incapacidade de uso, do Aplicativo, incluindo quaisquer decisões financeiras tomadas com base em seus resultados de cálculo.",
        ],
      },
      {
        heading: "8. Alterações no Aplicativo ou nestes Termos",
        body: [
          "Podemos modificar, suspender ou descontinuar qualquer parte do Aplicativo, e podemos atualizar estes Termos periodicamente. Atualizaremos a data de vigência acima quando isso ocorrer. O uso continuado após as mudanças entrarem em vigor significa que você aceita os Termos revisados.",
        ],
      },
      {
        heading: "9. Fale conosco",
        body: [`Dúvidas sobre estes Termos? Fale conosco em ${CONTACT_EMAIL}.`],
      },
    ],
  },
  cookies: {
    title: "Política de Cookies",
    effectiveDate: "15 de setembro de 2026",
    intro: [
      "Esta Política de Cookies explica como o Nekolculator usa cookies e tecnologias de armazenamento local semelhantes, e as opções disponíveis para você. Ela deve ser lida em conjunto com nossa Política de Privacidade.",
    ],
    sections: [
      {
        heading: "1. O que são cookies e armazenamento local?",
        body: [
          "Cookies são pequenos arquivos de texto colocados no seu dispositivo pelos sites que você visita. Local storage e session storage são tecnologias de navegador semelhantes, que permitem que um site lembre informações no seu dispositivo entre visitas (local storage) ou apenas durante a visita atual (session storage). Usamos ambos, e nos referimos a eles coletivamente como \"cookies\" nesta política, por simplicidade.",
        ],
      },
      {
        heading: "2. Cookies que usamos atualmente (necessários)",
        body: [
          "Esses são estritamente necessários para que o Aplicativo lembre suas preferências, e não podem ser desativados individualmente — porém, você pode limpá-los a qualquer momento nas configurações do seu navegador.",
        ],
      },
      {
        heading: "3. O que armazenamos, especificamente",
        body: [
          "nekolculator-theme-id — lembra o tema de gato selecionado (session storage).",
          "nekolculator-dark-mode — lembra sua preferência de modo claro/escuro (local storage).",
          "nekolculator-muted — lembra se o som está mudo (local storage).",
          "nekolculator-language — lembra o idioma selecionado (local storage).",
          "nekolculator-cookie-consent — lembra sua escolha no banner de cookies (local storage).",
        ],
      },
      {
        heading: "4. Cookies de publicidade (em breve)",
        body: [
          "Quando habilitarmos publicidade por meio de redes de terceiros, essas redes poderão definir seus próprios cookies ou usar identificadores de dispositivo para veicular e medir anúncios, incluindo anúncios personalizados com base na atividade de navegação. Em conformidade com a legislação aplicável, solicitaremos seu consentimento para esses cookies não essenciais por meio do banner exibido no Aplicativo antes de qualquer script de anúncio ser carregado — escolher \"Somente essenciais\" manterá esses scripts desativados.",
        ],
      },
      {
        heading: "5. Gerenciando suas preferências",
        body: [
          "Você pode alterar sua escolha de cookies a qualquer momento usando o link \"Preferências de cookies\" no rodapé do Aplicativo, ou limpando os dados armazenados do seu navegador para este site. A maioria dos navegadores também permite bloquear cookies globalmente, embora isso possa afetar como algumas preferências do site são lembradas.",
        ],
      },
      {
        heading: "6. Alterações a esta política",
        body: [
          "Podemos atualizar esta Política de Cookies à medida que o Aplicativo evolui, especialmente conforme recursos de publicidade forem adicionados. Atualizaremos a data de vigência acima quando isso ocorrer.",
        ],
      },
      {
        heading: "7. Fale conosco",
        body: [`Dúvidas sobre esta política? Fale conosco em ${CONTACT_EMAIL}.`],
      },
    ],
  },
};
