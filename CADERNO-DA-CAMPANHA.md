# Caderno da campanha — entrega de 18/11/2026

Implementação local dos pedidos 01, 03, 04, 06, 09, 10, 11, 12, 13, 14, 15 e 18, além do campo de dano efetivamente recebido. As alterações estão salvas para revisão e commit pelo proprietário. Não houve commit, push, deploy nem alteração no banco de produção.

## Como começar

1. Abra **Caderno da campanha**, disponível nas páginas do mestre e dos jogadores.
2. Como mestre, registre em **Regras acordadas** as opções oficiais adotadas pelo grupo. Elas começam desativadas; desativá-las depois preserva os registros.
3. Preencha aventura, sessão e cena. Use as abas para acompanhar objetivos, buscas divinas, desafios, obrigações, itens e domínios.
4. Em uma mesa online, use **Publicar na mesa** para compartilhar a versão destinada aos jogadores. Alterações locais não publicam automaticamente.

Jogadores podem consultar o material publicado, registrar concordância com regras e propor objetivos ou candidaturas. Aprovações e gestão dos registros pertencem ao mestre ou auxiliar. A ascensão começa como candidatura sem decisão: cadastrar alguém não o transforma em divindade.

## Recursos entregues

| Pedido | Resultado |
| --- | --- |
| 01 — Busca única | Busca sem distinção de acentos nos catálogos, fontes e referências fixadas com cópia do conteúdo na campanha. As 254 magias têm livro e página identificados. |
| 03 — Backup | Exportação dos dados locais e PDFs do IndexedDB, manifesto e integridade SHA-256; prévia por registro, manter/substituir/copiar, cópia anterior à restauração e reversão em caso de falha. |
| 04 — Histórico | Histórico local de PV, PM, condições e inventário, com desfazer e recusa quando o valor atual conflita com a operação registrada. |
| 06 — Testes e perigos | Testes estendidos com metas, falhas, rodadas, ajuda e pausa; acompanhamento de perigos por marcadores e registros do mestre. |
| 09 — Objetivos Heroicos | Sete categorias, proposta e aprovação, vínculo à ficha, contexto da aventura, controle do benefício e conclusão/abandono. |
| 10 — Deuses menores | 63 verbetes: os 60 do Guia de Deuses Menores e três de Deuses de Arton, com obrigações, poderes e referências. |
| 11 — Obrigações | Lembretes com datas do calendário ficcional, indicação no calendário da campanha e conclusão manual. |
| 12 — Ascensão | Candidatura, decisão entre ascensão e guardião, aprovação do feito, buscas, recompensas separadas por finalidade, evolução, 16 dádivas e desafios divinos. |
| 13 — Itens inteligentes | Geração pelas tabelas oficiais, atributos, capacidades, PM, descanso, ego e registro de conflitos; vínculo opcional ao inventário da ficha. |
| 14 — Maldições | 32 maldições oficiais, atribuição privada e revelações publicadas gradualmente. |
| 15 — Domínios | Domínios comuns e místicos, fundação, eventos, impostos, manutenção, corte, tropas, 80 construções e ações de regência compartilhadas por regente. Prévia antes de confirmar operações. |
| 18 — Regras opcionais | Adoção explícita de opções oficiais por campanha e registro de concordância dos participantes. |
| Dano recebido | Campo junto aos PV de personagens e criaturas. Aplica o valor final sem descontar RD; na ficha, consome PV temporários antes dos PV atuais. Inclui histórico e desfazer. |

## Regras e decisões manuais

As fontes utilizadas foram Tormenta20 — Jogo do Ano, Deuses de Arton, Guia de Deuses Menores, Heróis de Arton e Ameaças de Arton. Os dois livros excluídos pelo pedido não foram utilizados. As referências aparecem nas telas e nos catálogos correspondentes. Não foram criadas regras da casa nem adaptações ao personagem da mesa do solicitante.

O módulo acompanha as regras e valida custos, limites e pré-requisitos modelados. Aprovação de feitos, interpretação de eventos e perigos, resultados de testes informados, consequências narrativas, bônus que exigem escolhas e transferências de T$ para fichas continuam explícitos para conferência e aplicação pelo mestre. Não há aplicação universal de todos esses efeitos nos atributos das fichas, nem punição religiosa automática.

A busca também usa dados antigos do projeto. Quando um verbete antigo não contém página individual, a interface informa a origem disponível; não inventa uma referência.

## Publicação e recuperação

**Para usar o Caderno online, publique também o arquivo atualizado `firebase-rules.json` no Realtime Database, junto com os arquivos do site.** Isso não foi feito nesta entrega. As regras e a sincronização foram verificadas localmente; a integração final com um Firebase publicado ainda precisa ser validada após o deploy.

A publicação guarda versões privada e pública distintas. A versão pública usa uma lista explícita de campos permitidos, sem maldições, remoções, personalidade ou revelações ainda privadas. Revisões concorrentes impedem a substituição silenciosa das alterações de outro mestre. O histórico de desfazer é local ao navegador, conta e campanha; não é um histórico central de todos os participantes.

O backup cobre os dados disponíveis **neste navegador**, incluindo PDFs armazenados nele. Não busca automaticamente dados remotos de contas ou mesas que nunca foram carregados. Depois da restauração, a sincronização fica suspensa até a reconexão explícita. Revise o resultado antes de reconectar. Importar como cópia conserva os vínculos entre metadados e PDFs copiados.

## Verificação

- Suíte Node (`node --test tests/*.test.cjs`): **115 testes passaram, zero falhas**, incluindo regressões existentes e testes novos de regras, projeção pública, concorrência, permissões, progressão, domínios, fontes e histórico.
- Fluxo real no navegador: acordo de regras, sessão, candidatura, feito, busca, ascensão, dádiva, objetivo, teste, perigo, item, revelação, domínio, obrigação e persistência após recarregar.
- 80 combinações visuais do Caderno: dez abas, mestre/jogador, dia/noite e larguras de 390/1440 px; sem erros detectados de JavaScript, contraste ou transbordamento nas verificações executadas.
- Backup: pacote adulterado e JSON truncado rejeitados; restauração em perfil vazio, importação como cópia, vínculos de PDFs, falha de armazenamento com reversão e suspensão de sincronização verificados.
- Dano: personagem com PV temporários e criatura com RD alta; valor final aplicado sem RD, desfazer e disposição dos controles no celular conferidos. Corrigidos contraste do campo e largura dos botões da criatura.

Scripts locais e capturas de conferência estão em `docs/expansao-oficial/`, diretório ignorado pelo Git. Os testes permanentes novos estão em `tests/caderno.test.cjs`, `tests/caderno-sync.test.cjs` e `tests/historico-jogo.test.cjs`. Os PDFs originais não foram modificados.

## Sugestão de commit

```text
feat: adiciona caderno de campanha e ferramentas de regras oficiais
```
