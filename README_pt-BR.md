# Página acadêmica de Josué da Silva Cavalcante

Este repositório contém o código-fonte da página acadêmica estática de [Josué da Silva Cavalcante](https://wolf9611.github.io/pt/), físico e astrônomo. O site apresenta sua formação acadêmica, sua pesquisa em astrometria e fotometria de pequenos corpos do Sistema Solar, um currículo resumido e seus trabalhos acadêmicos. O conteúdo está redigido em inglês, com uma página introdutória em português do Brasil, e mantém a identidade visual minimalista em cinza escuro e a tipografia IBM Plex Sans e IBM Plex Serif do projeto anterior.

O site é construído em HTML e CSS puros. Não há etapa de compilação nem dependências de frameworks de JavaScript; o único script é um pequeno arquivo compartilhado que implementa o seletor de temas claro e escuro e registra a preferência de idioma. As páginas são publicadas por meio do GitHub Pages, e todos os caminhos internos são relativos à raiz do domínio do site.

## Estrutura do repositório

| Caminho                        | Conteúdo                                                                                                        |
| ------------------------------ | --------------------------------------------------------------------------------------------------------------- |
| `index.html`                   | Página de negociação de idioma na raiz do site; encaminha os visitantes para a versão em inglês ou em português |
| `en/index.html`                | Apresentação em inglês: formação, figuras selecionadas, docência e projetos                                     |
| `en/research/index.html`       | Métodos, resultados e figuras da monografia e da dissertação                                                    |
| `en/cv/index.html`             | Currículo resumido                                                                                              |
| `en/pubs/index.html`           | Teses e trabalhos acadêmicos                                                                                    |
| `pt/index.html`                | Página introdutória em português do Brasil; seus links levam às páginas em inglês                               |
| `css/style.css`                | Folha de estilos compartilhada: tema escuro por padrão, tema claro correspondente e layout responsivo           |
| `js/main.js`                   | Comportamento compartilhado: seletor de tema e preferência de idioma                                            |
| `assets/mark/`                 | Marca do site, favicon e ícones de aplicação                                                                    |
| `assets/research/`             | Recortes de figuras dos PDFs originais, em WebP sem perdas                                                      |
| `files/`                       | Dissertação de mestrado completa em PDF                                                                         |
| `404.html`                     | Página personalizada para endereços inexistentes                                                                |
| `sitemap.xml`, `robots.txt`    | Diretivas para rastreadores                                                                                     |
| `README.md`, `README_pt-BR.md` | Documentação em inglês e em português do Brasil                                                                 |

## Internacionalização

A raiz do site realiza a negociação de idioma. A página inicial consulta primeiro a preferência armazenada, em seguida o idioma do navegador e encaminha o visitante para a versão em inglês (`/en/`) ou em português (`/pt/`); o inglês é o padrão. Quando o JavaScript não está disponível, são oferecidos um redirecionamento alternativo e links explícitos de idioma. Todas as páginas trazem, no cabeçalho, um seletor compacto `EN | PT`, e o idioma escolhido por meio do seletor é armazenado localmente, de modo que a raiz possa honrá-lo nas visitas seguintes.

A página em português (`pt/index.html`) é mantida deliberadamente em português do Brasil, e seus links internos apontam para as versões em inglês das demais páginas, pois as seções de pesquisa, currículo e publicações existem apenas em inglês.

## Design e acessibilidade

O site preserva a estética minimalista em cinza do projeto original e a amplia em três direções. Primeiro, o cabeçalho está totalmente centralizado: os controles de idioma e tema, o título do site, a linha de assunto e a navegação estão alinhados em um eixo central comum. Segundo, o site oferece um tema claro como contraparte do tema escuro padrão; a paleta clara emprega tons de papel quente com a mesma hierarquia tipográfica, e a escolha é armazenada localmente. Terceiro, o layout é totalmente responsivo em telas de celular, tablet, desktop e ultralargas, com tipografia fluida (`clamp()`) e layouts flexíveis em Flexbox e CSS Grid.

A acessibilidade segue o nível AA da WCAG 2.1: as cores de texto e de interface atendem às razões de contraste exigidas em ambos os temas, todos os elementos interativos apresentam estados de foco visíveis, o botão de tema e o seletor de idioma possuem rótulos programáticos, a navegação marca a página atual com `aria-current` e as preferências de movimento reduzido são respeitadas. A página de currículo mantém um layout adequado à impressão, que força a paleta clara ao imprimir.

## Fontes do conteúdo

- **Monografia:** _Astronomia de Posição_, Licenciatura em Física, Universidade Estadual Vale do Acaraú, Sobral, 2018. Orientador: Antônio Fernandes Siqueira. Foram incluídos apenas os recortes das figuras solicitadas; o PDF integral fornecido pelo titular não é publicado nesta versão. O ano se refere ao trabalho, não a uma data de colação de grau verificada separadamente.
- **Dissertação:** _Astrometria e fotometria de pequenos corpos do Sistema Solar em imagens com campos estelares densos_, Mestrado em Astronomia, Observatório Nacional. O ano de 2025 consta na folha de rosto; a capa do arquivo disponível também apresenta uma data posterior de compilação. Orientador: Julio I. Bueno de Camargo. Coorientador: Adriano Pieres.
- **Concurso:** [Comunicado CEV/UECE 131/2019, de 30 de dezembro de 2019](https://www.cev.uece.br/wp-content/uploads/2021/10/comunicado131.2019.pdf#page=16), resultado final definitivo do concurso SEDUC-CE 2018 para professor de Física. O nome de Josué consta na página 16, na disciplina Física. O resultado comprova a aprovação; não é usado para inferir datas de nomeação ou posse.
- **Docência atual:** informada pelo titular do site.
- **Início do doutorado:** conteúdo preservado da versão anterior do site, sem acrescentar instituição ou data de ingresso.

## Figuras e referência de páginas

Os arquivos de imagem são renderizações de regiões dos PDFs originais, sem reconstrução das figuras ou alteração dos dados. A numeração impressa nos trabalhos difere da posição da página no arquivo correspondente; os links da dissertação com `#page=` usam a posição no PDF. As figuras da monografia identificam a página impressa na legenda.

| Imagem                            | Trabalho    | Figura | Página impressa | Página do PDF |
| --------------------------------- | ----------- | ------ | --------------- | ------------- |
| `horizontal-coordinates.webp`     | Monografia  | 5      | 24              | 25            |
| `position-triangle.webp`          | Monografia  | 12     | 34              | 35            |
| `chariklo-image-subtraction.webp` | Dissertação | 4.5    | 43              | 55            |
| `chariklo-photometry.webp`        | Dissertação | 5.2    | 57              | 69            |

A tabela de astrometria na página de pesquisa reproduz a Tabela 4.1 da dissertação, página impressa 45 (página 57 do PDF), e informa os diferentes tamanhos das amostras. A incerteza da fase rotacional não é reproduzida no site porque o resumo e o corpo do PDF apresentam valores diferentes.

## Projetos educacionais

A seção educacional do site descreve iniciativas colaborativas mantidas pelo autor, incluindo o [BuscApp](https://github.com/eemtijca/buscapp), projeto de acompanhamento de frequência e comunicação com as famílias desenvolvido com [Emanuel Lázaro](https://github.com/emanuellcs). Essas referências são mantidas para atribuição e para a documentação dos projetos.

## Visualização local

O site utiliza caminhos relativos à raiz do domínio, portanto deve ser visualizado por meio de um servidor estático local, por exemplo:

```bash
python3 -m http.server 8000
```

As páginas ficam disponíveis em `http://localhost:8000/pt/` e em `http://localhost:8000/en/`.

## Publicação

O site utiliza o repositório existente `wolf9611/wolf9611.github.io` e o fluxo de publicação padrão do GitHub Pages. As alterações devem ser revisadas antes de serem incorporadas à branch publicada. Não é necessário migrar para outro serviço nem criar um segundo site.
