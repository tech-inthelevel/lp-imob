import type { LanguageCode } from '@/lib/i18n/translations';

export type LegalSection = { heading: string; body: string[] };
export type LegalPage = { title: string; updated: string; sections: LegalSection[] };

export const PRIVACY_CONTENT: Record<LanguageCode, LegalPage> = {
  pt: {
    title: 'Política de Privacidade',
    updated: 'Última atualização: junho de 2025',
    sections: [
      {
        heading: '1. Quem somos',
        body: [
          'O JSYNQ Workspace é desenvolvido e operado pela In The Level Tecnologia Ltda., com sede no Brasil. Para fins desta Política, "JSYNQ", "nós" ou "nosso" refere-se à empresa e à plataforma.',
        ],
      },
      {
        heading: '2. Dados que coletamos',
        body: [
          'Dados de cadastro: nome, e-mail, empresa e senha (armazenada com hash).',
          'Dados de uso: tarefas, projetos, documentos, mensagens e gravações de reuniões criados dentro do workspace.',
          'Dados técnicos: endereço IP, navegador, sistema operacional, logs de acesso e cookies de sessão.',
          'Dados de pagamento: processados por gateways certificados (PCI-DSS). Não armazenamos números de cartão.',
        ],
      },
      {
        heading: '3. Como usamos seus dados',
        body: [
          'Fornecer, operar e melhorar o JSYNQ Workspace.',
          'Processar pagamentos e gerenciar assinaturas.',
          'Enviar comunicações transacionais (confirmações, alertas de segurança).',
          'Enviar comunicações de marketing, com possibilidade de descadastro a qualquer momento.',
          'Cumprir obrigações legais e regulatórias.',
        ],
      },
      {
        heading: '4. Base legal (LGPD)',
        body: [
          'Tratamos seus dados com base no consentimento (art. 7º, I), execução de contrato (art. 7º, V), cumprimento de obrigação legal (art. 7º, II) e legítimo interesse (art. 7º, IX), conforme a Lei Geral de Proteção de Dados (Lei nº 13.709/2018).',
        ],
      },
      {
        heading: '5. Compartilhamento de dados',
        body: [
          'Não vendemos seus dados. Podemos compartilhá-los com:',
          'Provedores de serviço: hospedagem, pagamentos, e-mail transacional e analytics, sob acordos de confidencialidade.',
          'Autoridades legais: quando exigido por lei, ordem judicial ou regulamentação aplicável.',
        ],
      },
      {
        heading: '6. Transferência internacional',
        body: [
          'Alguns de nossos provedores estão localizados fora do Brasil. Nestes casos, adotamos cláusulas contratuais padrão ou verificamos que o país destinatário oferece grau adequado de proteção, conforme os arts. 33 e 34 da LGPD.',
        ],
      },
      {
        heading: '7. Retenção de dados',
        body: [
          'Mantemos seus dados enquanto a conta estiver ativa. Após o cancelamento, excluímos ou anonimizamos os dados em até 90 dias, salvo obrigação legal de retenção por prazo maior.',
        ],
      },
      {
        heading: '8. Seus direitos',
        body: [
          'Confirmar a existência de tratamento de seus dados.',
          'Acessar, corrigir ou atualizar seus dados.',
          'Solicitar a portabilidade ou exclusão dos dados.',
          'Revogar consentimento previamente concedido.',
          'Opor-se a tratamentos realizados com base em legítimo interesse.',
          'Para exercer seus direitos, entre em contato pelo e-mail privacidade@jsynq.com.',
        ],
      },
      {
        heading: '9. Cookies',
        body: [
          'Usamos cookies essenciais para autenticação e sessão, e cookies analíticos (opt-in) para entender como os usuários utilizam a plataforma. Você pode gerenciar suas preferências a qualquer momento no banner de cookies.',
        ],
      },
      {
        heading: '10. Segurança',
        body: [
          'Adotamos medidas técnicas e organizacionais para proteger seus dados, incluindo criptografia em trânsito (TLS) e em repouso (AES-256), controle de acesso baseado em funções e monitoramento contínuo de segurança.',
        ],
      },
      {
        heading: '11. Alterações nesta política',
        body: [
          'Podemos atualizar esta Política periodicamente. Notificaremos usuários ativos por e-mail com pelo menos 15 dias de antecedência em caso de alterações relevantes.',
        ],
      },
      {
        heading: '12. Contato',
        body: ['Para dúvidas sobre privacidade, entre em contato com nosso DPO pelo e-mail privacidade@jsynq.com.'],
      },
    ],
  },

  en: {
    title: 'Privacy Policy',
    updated: 'Last updated: June 2025',
    sections: [
      {
        heading: '1. Who we are',
        body: [
          'JSYNQ Workspace is developed and operated by In The Level Tecnologia Ltda., headquartered in Brazil. In this Policy, "JSYNQ", "we" or "our" refers to the company and the platform.',
        ],
      },
      {
        heading: '2. Data we collect',
        body: [
          'Account data: name, email, company and password (stored as a hash).',
          'Usage data: tasks, projects, documents, messages and meeting recordings created inside the workspace.',
          'Technical data: IP address, browser, operating system, access logs and session cookies.',
          'Payment data: processed by certified gateways (PCI-DSS). We do not store card numbers.',
        ],
      },
      {
        heading: '3. How we use your data',
        body: [
          'Provide, operate and improve JSYNQ Workspace.',
          'Process payments and manage subscriptions.',
          'Send transactional communications (confirmations, security alerts).',
          'Send marketing communications, with opt-out available at any time.',
          'Comply with legal and regulatory obligations.',
        ],
      },
      {
        heading: '4. Legal basis',
        body: [
          'We process your data based on consent, contract performance, legal obligation and legitimate interest, in accordance with applicable data protection laws including Brazil\'s LGPD and the GDPR where applicable.',
        ],
      },
      {
        heading: '5. Data sharing',
        body: [
          'We do not sell your data. We may share it with:',
          'Service providers: hosting, payments, transactional email and analytics, under confidentiality agreements.',
          'Legal authorities: when required by law, court order or applicable regulation.',
        ],
      },
      {
        heading: '6. International transfers',
        body: [
          'Some of our providers are located outside Brazil. In such cases, we adopt standard contractual clauses or verify that the recipient country provides an adequate level of protection.',
        ],
      },
      {
        heading: '7. Data retention',
        body: [
          'We retain your data while your account is active. After cancellation, we delete or anonymize data within 90 days, unless a longer retention period is required by law.',
        ],
      },
      {
        heading: '8. Your rights',
        body: [
          'Confirm whether your data is being processed.',
          'Access, correct or update your data.',
          'Request portability or deletion of your data.',
          'Withdraw previously given consent.',
          'Object to processing based on legitimate interest.',
          'To exercise your rights, contact us at privacy@jsynq.com.',
        ],
      },
      {
        heading: '9. Cookies',
        body: [
          'We use essential cookies for authentication and session management, and opt-in analytics cookies to understand how users interact with the platform. You can manage your preferences at any time via the cookie banner.',
        ],
      },
      {
        heading: '10. Security',
        body: [
          'We adopt technical and organizational measures to protect your data, including encryption in transit (TLS) and at rest (AES-256), role-based access control and continuous security monitoring.',
        ],
      },
      {
        heading: '11. Changes to this policy',
        body: [
          'We may update this Policy periodically. Active users will be notified by email at least 15 days before any material changes take effect.',
        ],
      },
      {
        heading: '12. Contact',
        body: ['For privacy-related questions, contact our DPO at privacy@jsynq.com.'],
      },
    ],
  },

  es: {
    title: 'Política de Privacidad',
    updated: 'Última actualización: junio de 2025',
    sections: [
      {
        heading: '1. Quiénes somos',
        body: [
          'JSYNQ Workspace es desarrollado y operado por In The Level Tecnologia Ltda., con sede en Brasil. En esta Política, "JSYNQ", "nosotros" o "nuestro" se refiere a la empresa y la plataforma.',
        ],
      },
      {
        heading: '2. Datos que recopilamos',
        body: [
          'Datos de registro: nombre, correo electrónico, empresa y contraseña (almacenada con hash).',
          'Datos de uso: tareas, proyectos, documentos, mensajes y grabaciones de reuniones creados en el workspace.',
          'Datos técnicos: dirección IP, navegador, sistema operativo, registros de acceso y cookies de sesión.',
          'Datos de pago: procesados por pasarelas certificadas (PCI-DSS). No almacenamos números de tarjeta.',
        ],
      },
      {
        heading: '3. Cómo usamos tus datos',
        body: [
          'Proporcionar, operar y mejorar JSYNQ Workspace.',
          'Procesar pagos y gestionar suscripciones.',
          'Enviar comunicaciones transaccionales (confirmaciones, alertas de seguridad).',
          'Enviar comunicaciones de marketing, con posibilidad de cancelar la suscripción en cualquier momento.',
          'Cumplir con obligaciones legales y regulatorias.',
        ],
      },
      {
        heading: '4. Base legal',
        body: [
          'Tratamos tus datos en base al consentimiento, ejecución de contrato, obligación legal e interés legítimo, conforme a las leyes de protección de datos aplicables, incluyendo la LGPD de Brasil y el RGPD donde corresponda.',
        ],
      },
      {
        heading: '5. Compartición de datos',
        body: [
          'No vendemos tus datos. Podemos compartirlos con:',
          'Proveedores de servicios: alojamiento, pagos, correo transaccional y analítica, bajo acuerdos de confidencialidad.',
          'Autoridades legales: cuando lo exija la ley, una orden judicial o la regulación aplicable.',
        ],
      },
      {
        heading: '6. Transferencias internacionales',
        body: [
          'Algunos de nuestros proveedores están ubicados fuera de Brasil. En estos casos, adoptamos cláusulas contractuales estándar o verificamos que el país destinatario ofrece un nivel adecuado de protección.',
        ],
      },
      {
        heading: '7. Retención de datos',
        body: [
          'Conservamos tus datos mientras tu cuenta esté activa. Tras la cancelación, eliminamos o anonimizamos los datos en un plazo de 90 días, salvo obligación legal de conservación por un período mayor.',
        ],
      },
      {
        heading: '8. Tus derechos',
        body: [
          'Confirmar si tus datos están siendo tratados.',
          'Acceder, corregir o actualizar tus datos.',
          'Solicitar la portabilidad o eliminación de tus datos.',
          'Revocar el consentimiento previamente otorgado.',
          'Oponerte al tratamiento basado en interés legítimo.',
          'Para ejercer tus derechos, contáctanos en privacidad@jsynq.com.',
        ],
      },
      {
        heading: '9. Cookies',
        body: [
          'Utilizamos cookies esenciales para autenticación y sesión, y cookies analíticas (opt-in) para entender cómo los usuarios interactúan con la plataforma. Puedes gestionar tus preferencias en cualquier momento a través del banner de cookies.',
        ],
      },
      {
        heading: '10. Seguridad',
        body: [
          'Adoptamos medidas técnicas y organizativas para proteger tus datos, incluyendo cifrado en tránsito (TLS) y en reposo (AES-256), control de acceso basado en roles y monitorización continua de seguridad.',
        ],
      },
      {
        heading: '11. Cambios en esta política',
        body: [
          'Podemos actualizar esta Política periódicamente. Los usuarios activos serán notificados por correo electrónico con al menos 15 días de antelación ante cambios relevantes.',
        ],
      },
      {
        heading: '12. Contacto',
        body: ['Para consultas sobre privacidad, contacta a nuestro DPO en privacidad@jsynq.com.'],
      },
    ],
  },
};

export const TERMS_CONTENT: Record<LanguageCode, LegalPage> = {
  pt: {
    title: 'Termos de Uso',
    updated: 'Última atualização: junho de 2025',
    sections: [
      {
        heading: '1. Aceitação dos termos',
        body: [
          'Ao criar uma conta ou utilizar o JSYNQ Workspace, você concorda com estes Termos de Uso. Se não concordar, não utilize a plataforma. Estes Termos constituem um contrato vinculante entre você (ou a empresa que representa) e a In The Level Tecnologia Ltda.',
        ],
      },
      {
        heading: '2. Descrição do serviço',
        body: [
          'O JSYNQ Workspace é uma plataforma SaaS que oferece gestão de projetos, reuniões em vídeo, controle de tempo, documentos colaborativos, mensagens e um Agente de IA integrado, disponível por meio de assinatura mensal ou anual.',
        ],
      },
      {
        heading: '3. Elegibilidade',
        body: [
          'Para usar o JSYNQ você deve ter pelo menos 18 anos de idade, ou a maioridade legal em sua jurisdição. Ao aceitar estes termos, você declara ter capacidade legal para firmar contratos.',
        ],
      },
      {
        heading: '4. Cadastro e conta',
        body: [
          'Você é responsável por manter a confidencialidade de suas credenciais de acesso.',
          'Deve fornecer informações verdadeiras, precisas e atualizadas no cadastro.',
          'Notifique-nos imediatamente em caso de uso não autorizado da sua conta.',
          'Uma conta não pode ser compartilhada entre múltiplas pessoas físicas.',
        ],
      },
      {
        heading: '5. Planos e pagamento',
        body: [
          'Os planos pagos são cobrados por usuário/mês (mensal ou anual, conforme escolha).',
          'Pagamentos são processados via gateways seguros. Não armazenamos dados de cartão.',
          'Planos anuais têm desconto e são cobrados antecipadamente pelo período completo.',
          'Não há reembolso proporcional por cancelamento antes do fim do período contratado, salvo disposição legal em contrário.',
        ],
      },
      {
        heading: '6. Período de teste gratuito',
        body: [
          'Planos pagos oferecem 14 dias de teste gratuito. Após o período de teste, a cobrança é iniciada automaticamente, salvo cancelamento antes do vencimento.',
        ],
      },
      {
        heading: '7. Uso aceitável',
        body: [
          'Atividades ilegais ou que violem direitos de terceiros.',
          'Envio de spam, phishing ou conteúdo malicioso.',
          'Tentativas de acesso não autorizado a sistemas ou contas de terceiros.',
          'Revenda, sublicenciamento ou uso comercial não autorizado da plataforma.',
          'Scraping automatizado em escala que prejudique a infraestrutura do serviço.',
        ],
      },
      {
        heading: '8. Propriedade intelectual',
        body: [
          'Todo o código, design, marca e conteúdo produzido pelo JSYNQ pertencem à In The Level Tecnologia Ltda. Você retém a propriedade dos dados e conteúdos que criar dentro da plataforma.',
          'Ao usar o JSYNQ, você nos concede uma licença limitada, não exclusiva e não transferível para processar seus dados com o único propósito de prestar o serviço contratado.',
        ],
      },
      {
        heading: '9. Disponibilidade e SLA',
        body: [
          'Buscamos disponibilidade de 99,5% ao mês. Manutenções programadas serão comunicadas com antecedência. Planos Enterprise possuem SLA dedicado conforme contrato específico.',
        ],
      },
      {
        heading: '10. Limitação de responsabilidade',
        body: [
          'Na máxima extensão permitida por lei, o JSYNQ não se responsabiliza por danos indiretos, incidentais, especiais ou consequenciais. Nossa responsabilidade total não excederá o valor pago pelo usuário nos 3 meses anteriores ao evento.',
        ],
      },
      {
        heading: '11. Cancelamento e encerramento',
        body: [
          'Você pode cancelar sua conta a qualquer momento nas configurações da plataforma. Reservamo-nos o direito de suspender ou encerrar contas que violem estes Termos, com ou sem aviso prévio.',
        ],
      },
      {
        heading: '12. Alterações nos termos',
        body: [
          'Podemos atualizar estes Termos periodicamente. Usuários ativos serão notificados por e-mail com pelo menos 15 dias de antecedência em caso de alterações relevantes.',
        ],
      },
      {
        heading: '13. Lei aplicável e foro',
        body: [
          'Estes Termos são regidos pelas leis da República Federativa do Brasil. Fica eleito o foro da Comarca de São Paulo/SP para dirimir quaisquer controvérsias.',
        ],
      },
      {
        heading: '14. Contato',
        body: ['Para dúvidas sobre estes Termos, entre em contato pelo e-mail legal@jsynq.com.'],
      },
    ],
  },

  en: {
    title: 'Terms of Use',
    updated: 'Last updated: June 2025',
    sections: [
      {
        heading: '1. Acceptance of terms',
        body: [
          'By creating an account or using JSYNQ Workspace, you agree to these Terms of Use. If you do not agree, please do not use the platform. These Terms constitute a binding agreement between you (or the company you represent) and In The Level Tecnologia Ltda.',
        ],
      },
      {
        heading: '2. Service description',
        body: [
          'JSYNQ Workspace is a SaaS platform offering project management, video meetings, time tracking, collaborative documents, messaging and an integrated AI Agent, available via monthly or annual subscription.',
        ],
      },
      {
        heading: '3. Eligibility',
        body: [
          'To use JSYNQ you must be at least 18 years old, or the legal age of majority in your jurisdiction. By accepting these Terms, you confirm you have the legal capacity to enter into contracts.',
        ],
      },
      {
        heading: '4. Registration and account',
        body: [
          'You are responsible for maintaining the confidentiality of your access credentials.',
          'You must provide truthful, accurate and up-to-date information when registering.',
          'Notify us immediately in case of unauthorized use of your account.',
          'An account may not be shared among multiple individuals.',
        ],
      },
      {
        heading: '5. Plans and payment',
        body: [
          'Paid plans are billed per user/month (monthly or annual, as chosen).',
          'Payments are processed via secure gateways. We do not store card data.',
          'Annual plans are discounted and billed upfront for the full period.',
          'No pro-rated refund is provided for cancellations before the end of the contracted period, unless required by law.',
        ],
      },
      {
        heading: '6. Free trial period',
        body: [
          'Paid plans include a 14-day free trial. After the trial period, billing starts automatically unless cancelled before the trial expires.',
        ],
      },
      {
        heading: '7. Acceptable use',
        body: [
          'The following are prohibited: illegal activities or those that violate third-party rights.',
          'Sending spam, phishing or malicious content.',
          'Attempting unauthorized access to systems or third-party accounts.',
          'Resale, sublicensing or unauthorized commercial use of the platform.',
          'Automated scraping at scale that harms the service infrastructure.',
        ],
      },
      {
        heading: '8. Intellectual property',
        body: [
          'All code, design, branding and content produced by JSYNQ belong to In The Level Tecnologia Ltda. You retain ownership of data and content you create within the platform.',
          'By using JSYNQ, you grant us a limited, non-exclusive, non-transferable licence to process your data solely for the purpose of providing the contracted service.',
        ],
      },
      {
        heading: '9. Availability and SLA',
        body: [
          'We target 99.5% monthly availability. Scheduled maintenance will be communicated in advance. Enterprise plans include a dedicated SLA as specified in the relevant contract.',
        ],
      },
      {
        heading: '10. Limitation of liability',
        body: [
          'To the maximum extent permitted by law, JSYNQ is not liable for indirect, incidental, special or consequential damages. Our total liability shall not exceed the amount paid by the user in the 3 months preceding the event.',
        ],
      },
      {
        heading: '11. Cancellation and termination',
        body: [
          'You may cancel your account at any time in the platform settings. We reserve the right to suspend or terminate accounts that violate these Terms, with or without prior notice.',
        ],
      },
      {
        heading: '12. Changes to terms',
        body: [
          'We may update these Terms periodically. Active users will be notified by email at least 15 days before any material changes take effect.',
        ],
      },
      {
        heading: '13. Governing law and jurisdiction',
        body: [
          'These Terms are governed by the laws of Brazil. The courts of São Paulo/SP are elected as the exclusive venue for resolving any disputes.',
        ],
      },
      {
        heading: '14. Contact',
        body: ['For questions about these Terms, contact us at legal@jsynq.com.'],
      },
    ],
  },

  es: {
    title: 'Términos de Uso',
    updated: 'Última actualización: junio de 2025',
    sections: [
      {
        heading: '1. Aceptación de los términos',
        body: [
          'Al crear una cuenta o utilizar JSYNQ Workspace, aceptas estos Términos de Uso. Si no estás de acuerdo, no utilices la plataforma. Estos Términos constituyen un acuerdo vinculante entre tú (o la empresa que representas) e In The Level Tecnologia Ltda.',
        ],
      },
      {
        heading: '2. Descripción del servicio',
        body: [
          'JSYNQ Workspace es una plataforma SaaS que ofrece gestión de proyectos, reuniones en video, control de tiempo, documentos colaborativos, mensajería y un Agente de IA integrado, disponible mediante suscripción mensual o anual.',
        ],
      },
      {
        heading: '3. Elegibilidad',
        body: [
          'Para usar JSYNQ debes tener al menos 18 años, o la mayoría de edad legal en tu jurisdicción. Al aceptar estos Términos, declaras tener capacidad legal para celebrar contratos.',
        ],
      },
      {
        heading: '4. Registro y cuenta',
        body: [
          'Eres responsable de mantener la confidencialidad de tus credenciales de acceso.',
          'Debes proporcionar información verdadera, precisa y actualizada al registrarte.',
          'Notifícanos de inmediato en caso de uso no autorizado de tu cuenta.',
          'Una cuenta no puede ser compartida entre múltiples personas.',
        ],
      },
      {
        heading: '5. Planes y pago',
        body: [
          'Los planes de pago se cobran por usuario/mes (mensual o anual, según elección).',
          'Los pagos se procesan a través de pasarelas seguras. No almacenamos datos de tarjeta.',
          'Los planes anuales tienen descuento y se cobran por adelantado por el período completo.',
          'No se realizan reembolsos proporcionales por cancelación antes del fin del período contratado, salvo disposición legal en contrario.',
        ],
      },
      {
        heading: '6. Período de prueba gratuito',
        body: [
          'Los planes de pago incluyen 14 días de prueba gratuita. Tras el período de prueba, la facturación comienza automáticamente, salvo cancelación antes del vencimiento.',
        ],
      },
      {
        heading: '7. Uso aceptable',
        body: [
          'Está prohibido: realizar actividades ilegales o que vulneren derechos de terceros.',
          'Enviar spam, phishing o contenido malicioso.',
          'Intentar acceder sin autorización a sistemas o cuentas de terceros.',
          'Revender, sublicenciar o hacer uso comercial no autorizado de la plataforma.',
          'Realizar scraping automatizado a escala que perjudique la infraestructura del servicio.',
        ],
      },
      {
        heading: '8. Propiedad intelectual',
        body: [
          'Todo el código, diseño, marca y contenido producido por JSYNQ pertenece a In The Level Tecnologia Ltda. Tú conservas la propiedad de los datos y contenidos que crees en la plataforma.',
          'Al usar JSYNQ, nos otorgas una licencia limitada, no exclusiva e intransferible para procesar tus datos con el único propósito de prestar el servicio contratado.',
        ],
      },
      {
        heading: '9. Disponibilidad y SLA',
        body: [
          'Buscamos una disponibilidad del 99,5% mensual. El mantenimiento programado se comunicará con antelación. Los planes Enterprise incluyen SLA dedicado según contrato específico.',
        ],
      },
      {
        heading: '10. Limitación de responsabilidad',
        body: [
          'En la máxima medida permitida por la ley, JSYNQ no se responsabiliza por daños indirectos, incidentales, especiales o consecuentes. Nuestra responsabilidad total no superará el importe pagado por el usuario en los 3 meses anteriores al evento.',
        ],
      },
      {
        heading: '11. Cancelación y rescisión',
        body: [
          'Puedes cancelar tu cuenta en cualquier momento desde la configuración de la plataforma. Nos reservamos el derecho de suspender o cancelar cuentas que incumplan estos Términos, con o sin previo aviso.',
        ],
      },
      {
        heading: '12. Cambios en los términos',
        body: [
          'Podemos actualizar estos Términos periódicamente. Los usuarios activos serán notificados por correo electrónico con al menos 15 días de antelación ante cambios relevantes.',
        ],
      },
      {
        heading: '13. Ley aplicable y fuero',
        body: [
          'Estos Términos se rigen por las leyes de Brasil. Se elige el juzgado de São Paulo/SP para resolver cualquier controversia.',
        ],
      },
      {
        heading: '14. Contacto',
        body: ['Para dudas sobre estos Términos, contáctanos en legal@jsynq.com.'],
      },
    ],
  },
};
