# Site pessoal — Josué da Silva Cavalcante

Site acadêmico estático de [Josué Cavalcante](https://wolf9611.github.io/), em inglês, com apresentação também em português. Mantém o tema minimalista em cinza escuro e a tipografia IBM Plex Sans + Serif.

## Estrutura

| Caminho | Conteúdo |
| --- | --- |
| `index.html` | Apresentação, formação, figuras e docência em inglês |
| `portugues/index.html` | Apresentação em português |
| `research/index.html` | Métodos, resultados e figuras dos trabalhos |
| `cv/index.html` | Currículo resumido |
| `pubs/index.html` | Monografia, dissertação e publicações |
| `css/style.css` | Estilos compartilhados e adaptação a telas menores |
| `assets/research/` | Recortes de figuras dos PDFs, em WebP sem perdas |
| `files/` | Dissertação completa em PDF |
| `horario/` | Aplicação independente de horários escolares |

Não há etapa de compilação nem dependências de JavaScript para as páginas acadêmicas. Os caminhos dos links são relativos à raiz do domínio do GitHub Pages. O diretório `horario/` mantém sua estrutura independente.

## Fontes do conteúdo

- **Monografia:** *Astronomia de Posição*, Licenciatura em Física, Universidade Estadual Vale do Acaraú, Sobral, 2018. Orientador: Antônio Fernandes Siqueira. Foram incluídos apenas os recortes das figuras solicitadas; o PDF integral fornecido pelo titular não é publicado nesta versão. O ano se refere ao trabalho, não a uma data de colação de grau verificada separadamente.
- **Dissertação:** *Astrometria e fotometria de pequenos corpos do Sistema Solar em imagens com campos estelares densos*, Mestrado em Astronomia, Observatório Nacional. O ano de 2025 está na folha de rosto; a capa do arquivo disponível também apresenta uma data posterior de compilação. Orientador: Julio I. Bueno de Camargo. Coorientador: Adriano Pieres.
- **Concurso:** [Comunicado CEV/UECE 131/2019, de 30 de dezembro de 2019](https://www.cev.uece.br/wp-content/uploads/2021/10/comunicado131.2019.pdf#page=16), resultado final definitivo do concurso SEDUC-CE 2018. O nome de Josué consta na página 16, disciplina Física. Esse resultado comprova a aprovação; não é usado para inferir data de nomeação ou posse.
- **Docência atual:** informada pelo titular do site.
- **Início do doutorado:** conteúdo preservado da versão anterior do site, sem acrescentar instituição ou data de ingresso.

## Figuras e referência de páginas

Os arquivos são renderizações de regiões dos PDFs originais, sem reconstrução das figuras ou alteração dos dados. A numeração impressa no trabalho difere da posição da página no arquivo; os links `#page=` da dissertação usam a posição no PDF. As figuras da monografia identificam a página impressa na legenda.

| Imagem | Trabalho | Figura | Página impressa | Página do PDF |
| --- | --- | --- | --- | --- |
| `horizontal-coordinates.webp` | Monografia | 5 | 24 | 25 |
| `position-triangle.webp` | Monografia | 12 | 34 | 35 |
| `chariklo-image-subtraction.webp` | Dissertação | 4.5 | 43 | 55 |
| `chariklo-photometry.webp` | Dissertação | 5.2 | 57 | 69 |

A tabela de astrometria na página Research usa a Tabela 4.1 da dissertação, página impressa 45 (página 57 do PDF), e informa os diferentes tamanhos das amostras. A incerteza da fase rotacional não é reproduzida no site porque o resumo e o corpo do PDF apresentam valores diferentes.

## Publicação

O site utiliza o repositório existente `wolf9611/wolf9611.github.io` e o fluxo de publicação do GitHub Pages. Revisar as alterações antes de incorporá-las à branch publicada. Não é necessário migrar para outro serviço ou criar um segundo site.
