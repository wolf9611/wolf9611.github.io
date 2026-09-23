# Página acadêmica de Josué da Silva Cavalcante

Este repositório contém o código-fonte da página acadêmica estática de
[Josué da Silva Cavalcante](https://wolf9611.github.io/), físico e astrônomo.
O site apresenta sua formação acadêmica, sua pesquisa em astrometria e
fotometria de pequenos corpos do Sistema Solar, um currículo resumido e seus
trabalhos acadêmicos. O conteúdo é oferecido em inglês e em português do
Brasil, e mantém a identidade visual minimalista em cinza escuro e a tipografia
IBM Plex do projeto original.

## Arquitetura

O site é um artefato estático. Não há etapa de compilação, nem framework de
JavaScript, nem dependência além da folha de estilos do Google Fonts. Cada
página é um único arquivo HTML, todo o estilo está em uma única folha e o
comportamento se limita a dois pequenos scripts. As páginas são publicadas
pelo GitHub Pages, e todos os caminhos internos são absolutos a partir da
raiz do domínio.

| Aspecto       | Implementação                                                                        |
| ------------- | ------------------------------------------------------------------------------------ |
| Marcação      | Um arquivo HTML por página, com todos os idiomas suportados                          |
| Estilo        | `css/style.css`, um sistema de design escrito à mão, com temas claro e escuro        |
| Comportamento | `js/main.js` para o tema, `js/i18n.js` para a troca de idioma                        |
| Dependências  | Nenhuma em tempo de execução, além do IBM Plex Sans e IBM Plex Serif do Google Fonts |
| Compilação    | Nenhuma. Os arquivos são servidos como estão                                         |
| Publicação    | GitHub Pages, a partir do repositório `wolf9611/wolf9611.github.io`                  |

## Estrutura do repositório

| Caminho                        | Conteúdo                                                          |
| ------------------------------ | ----------------------------------------------------------------- |
| `index.html`                   | Apresentação: formação, figuras selecionadas, docência e projetos |
| `research/index.html`          | Métodos, resultados e figuras da monografia e da dissertação      |
| `cv/index.html`                | Currículo resumido                                                |
| `pubs/index.html`              | Teses e trabalhos acadêmicos                                      |
| `404.html`                     | Página personalizada para endereços inexistentes                  |
| `css/style.css`                | Folha compartilhada e tokens de design                            |
| `js/main.js`                   | Seletor de tema, aplicado antes da primeira pintura               |
| `js/i18n.js`                   | Catálogos de tradução e o runtime de idioma em tempo de execução  |
| `assets/mark/`                 | Marca do site, favicon e ícones de aplicação                      |
| `assets/research/`             | Recortes de figuras dos PDFs originais, em WebP sem perdas        |
| `files/`                       | Dissertação de mestrado completa em PDF                           |
| `sitemap.xml`, `robots.txt`    | Diretivas para rastreadores                                       |
| `README.md`, `README_pt-BR.md` | Documentação em inglês e em português do Brasil                   |

## Internacionalização

O inglês é o idioma principal e fica na raiz do site. O português do Brasil é
um idioma secundário, oferecido a quem o escolhe. Os dois são servidos pela
mesma URL: não existe cópia em português de nenhuma página, e nenhum segmento
de idioma nem parâmetro de consulta aparece em endereço algum.

### Como funciona

Cada nó traduzível da marcação carrega um atributo. O runtime em `js/i18n.js`
guarda os catálogos e reescreve esses nós quando o idioma muda, de modo que a
troca de idioma nunca recarrega a página e nunca perde a posição de leitura.

| Atributo         | Função                                                           |
| ---------------- | ---------------------------------------------------------------- |
| `data-i18n`      | Substitui o conteúdo textual do elemento                         |
| `data-i18n-attr` | Define um ou mais atributos, escritos como pares `attribute:key` |
| `data-set-lang`  | Marca um controle que troca o idioma quando acionado             |

Uma chave de catálogo terminada em `Html` é aplicada como marcação, e não como
texto simples. Isso fica reservado às poucas frases que envolvem um link ou uma
ênfase em um trecho. Todos os outros valores são atribuídos como texto, de modo
que nenhuma entrada de catálogo pode injetar marcação inesperada.

### Preferência e escolha de projeto

Os dois idiomas compartilham uma única URL, portanto a barra de endereços não
consegue expressar a escolha. O runtime resolve o idioma nesta ordem: a
preferência armazenada na chave `jdc-lang`, o idioma do navegador e, por fim, o
inglês. Não há parâmetro de consulta a ler. A troca de idioma nunca navega e
nunca recarrega, de modo que o leitor mantém a posição de leitura.

Essa escolha tem três consequências que convém declarar. O endereço permanece o
mesmo enquanto o idioma visível muda, portanto `/cv/` pode estar exibindo
português. Um link copiado durante a leitura em português abre em inglês para
quem não tem preferência armazenada. Os mecanismos de busca indexam uma URL por
página, e o que eles veem é o inglês. O inglês é o idioma principal por
decisão, e a edição em português é uma conveniência para quem a escolhe.

Sem JavaScript, as páginas ainda exibem o texto completo em inglês, e o
controle de idioma da própria página então aponta para a mesma página, de modo
que nenhum conteúdo se perde.

### Manutenção

Para acrescentar uma frase, adicione-a aos dois catálogos em `js/i18n.js` sob a
mesma chave e faça referência a essa chave na marcação. O runtime registra um
aviso no console quando uma chave falta no catálogo ativo ou não existe, de
modo que uma inconsistência nunca passa em silêncio. Para acrescentar um
idioma, estenda o objeto `catalog` e a lista `SUPPORTED`, adicione um botão com
`data-set-lang` ao seletor e inclua o `hreflang` correspondente nas páginas
afetadas.

## Sistema de design

A folha de estilos está organizada em seções numeradas, dos tokens de design à
impressão. Dois temas são definidos: uma paleta escura, que é o padrão, e uma
paleta clara em tons de papel quente. Ambos compartilham a mesma hierarquia
tipográfica, e a escolha é armazenada na chave `jdc-theme`. O layout usa
tipografia fluida por meio de `clamp()` e contêineres flexíveis em Flexbox e
CSS Grid, de modo que se adapta do celular às telas ultralargas sem marcação
específica por ponto de quebra.

## Acessibilidade

O site segue o nível AA da WCAG 2.1. As cores de texto e de interface atendem
às razões de contraste exigidas nos dois temas, todos os elementos interativos
apresentam estado de foco visível, a navegação marca a página atual com
`aria-current` e o seletor de idioma informa seu estado por meio de
`aria-pressed`. As preferências de movimento reduzido são respeitadas, o
visualizador de figuras abre em um diálogo nativo que prende e devolve o foco,
e o runtime de idioma atualiza o atributo `lang`, de modo que a tecnologia
assistiva anuncia o idioma correto. A página de currículo mantém um layout
adequado à impressão, que força a paleta clara ao imprimir.

## Fontes do conteúdo

- **Monografia:** _Astronomia de Posição_, Licenciatura em Física, Universidade
  Estadual Vale do Acaraú, Sobral, 2018. Orientador: Antônio Fernandes
  Siqueira. O ano se refere ao trabalho, não a uma data de colação de grau
  verificada separadamente. Foram incluídos apenas os recortes de figuras
  solicitados; o PDF completo não é publicado aqui.
- **Dissertação:** _Astrometria e fotometria de pequenos corpos do Sistema
  Solar em imagens com campos estelares densos_, Mestrado em Astronomia,
  Observatório Nacional. O ano de 2025 consta na folha de rosto. Orientador:
  Julio I. Bueno de Camargo. Coorientador: Adriano Pieres.
- **Concurso:** [Comunicado CEV/UECE 131/2019, de 30 de dezembro de
  2019](https://www.cev.uece.br/wp-content/uploads/2021/10/comunicado131.2019.pdf#page=16),
  resultado final do concurso SEDUC-CE 2018 para professor de Física. O nome
  consta na página 16, na disciplina Física, e o resultado comprova a
  aprovação. Ele não é usado para inferir datas de nomeação ou posse.
- **Docência atual:** informada pelo titular do site.
- **Doutorado:** informado pelo titular do site, sem instituição nem data de
  ingresso.

## Figuras e referência de páginas

Os arquivos de imagem são renderizações de regiões dos PDFs originais, sem
reconstrução das figuras ou alteração dos dados. A numeração impressa nos
trabalhos difere da posição da página no arquivo correspondente. Os links que
usam `#page=` referem-se à posição no PDF, enquanto a página impressa aparece
na legenda.

| Imagem                            | Trabalho    | Figura | Página impressa | Página do PDF |
| --------------------------------- | ----------- | ------ | --------------- | ------------- |
| `horizontal-coordinates.webp`     | Monografia  | 5      | 24              | 25            |
| `position-triangle.webp`          | Monografia  | 12     | 34              | 35            |
| `chariklo-image-subtraction.webp` | Dissertação | 4.5    | 43              | 55            |
| `chariklo-photometry.webp`        | Dissertação | 5.2    | 57              | 69            |

A tabela de astrometria na página de pesquisa reproduz a Tabela 4.1 da
dissertação, página impressa 45 (página 57 do PDF), e informa os diferentes
tamanhos das amostras. A incerteza da fase rotacional não é reproduzida porque
o resumo e o corpo do PDF apresentam valores diferentes.

## Projetos educacionais

A seção educacional descreve iniciativas colaborativas mantidas pelo autor,
incluindo o [BuscApp](https://github.com/eemtijca/buscapp), projeto de
acompanhamento de frequência e comunicação com as famílias desenvolvido com
[Emanuel Lázaro](https://github.com/emanuellcs). Essas referências são mantidas
para atribuição e para a documentação dos projetos.

## Visualização local

O site usa caminhos absolutos a partir da raiz do domínio, portanto deve ser
visualizado por meio de um servidor estático local:

```bash
python3 -m http.server 8000
```

As páginas ficam disponíveis em `http://localhost:8000/`. O seletor de idioma
pode ser testado em qualquer página, e a preferência armazenada pode ser
verificada recarregando após a troca.

## Publicação e manutenção

O site é publicado pelo GitHub Pages a partir do repositório existente, e as
alterações devem ser revisadas antes de chegarem à branch publicada. Quando a
folha de estilos ou um script muda, atualize a consulta `?v=` nas tags `<link>`
e `<script>` das páginas afetadas. O valor atual é `v=7`, e ele existe apenas
para contornar o cache do navegador em visitas recorrentes.

## Direitos autorais

Copyright 2026 Josué da Silva Cavalcante. Todos os direitos reservados.
