# Site pessoal — Josué da Silva Cavalcante

Site acadêmico estático no estilo da página do Pedro Bernardinelli (estrutura: Home / Research / Português / CV / Publications), com **tema próprio: verde militar minimalista**.

## Estrutura

```
index.html          # Home (EN)
portugues/          # versão em português
research/
cv/
pubs/
css/style.css
```

## Como publicar (GitHub Pages)

1. Crie um repositório, por exemplo `josuecavalcante.github.io` (site de usuário) **ou** `academic-site` com Pages na branch `main` / pasta `/ (root)`.
2. Envie estes arquivos para a raiz do repo.
3. Em **Settings → Pages**: Source = Deploy from branch `main` / root.
4. Domínio próprio (opcional): `josuecavalcante.com` → CNAME no repo + DNS no registrador.

### Com Git (exemplo)

```bash
cd site-josue
git init
git add .
git commit -m "Initial academic site"
git branch -M main
git remote add origin git@github.com:SEU_USUARIO/josuecavalcante.github.io.git
git push -u origin main
```

## Preview local

```bash
cd site-josue
python3 -m http.server 8080
# abrir http://127.0.0.1:8080
```

## O que completar

- [ ] Graduação (instituição, anos)
- [ ] Nome do(s) orientador(es) de mestrado
- [ ] ORCID, ADS, GitHub
- [ ] PDF do CV
- [ ] Foto opcional (sóbria)
- [ ] Papers com DOI quando houver
- [ ] E-mail institucional se quiser separado do Proton

## Tema

Paleta: fundo `#1a2118`, texto `#e8ebe4`, acento verde militar `#6b7f5a` / `#8fa87a`, tipografia IBM Plex Sans + Serif.
