// In-place language switching. The page ships the full English text and
// marks translatable nodes with data-i18n, data-i18n-attr and
// data-i18n-html. Both languages share one URL; the choice is stored under
// jdc-lang and applied before the first paint.
(function () {
  "use strict";

  var LANG_KEY = "jdc-lang";
  var DEFAULT_LANG = "en";
  var SUPPORTED = ["en", "pt-BR"];

  // Labels for the theme toggle, mirroring its data-label attributes.
  var themes = {
    "pt-BR": {
      dark: "Ativar tema escuro",
      light: "Ativar tema claro",
    },
    en: {
      dark: "Switch to dark theme",
      light: "Switch to light theme",
    },
  };

  var catalog = {
    en: {
      // Shared chrome
      "common.skip": "Skip to content",
      "common.langGroup": "Language",
      "common.navAria": "Main",
      "common.navHome": "Home",
      "common.navResearch": "Research",
      "common.navCv": "CV",
      "common.navPubs": "Publications",
      "common.siteTitle": "Josué da Silva Cavalcante",
      "common.siteTag":
        "Astronomy · Small bodies · Astrometry · Machine learning",
      "common.footerSite": "Site",
      "common.footerEmail": "cavalcante_wolf@proton.me",
      "common.footerLattes": "Lattes CV",
      "common.footerGithub": "GitHub",
      "common.footerX": "X · @CavalcanteWolf",
      "common.footerInstagram": "Instagram · cavalcante_josue96",
      "common.copyright":
        "© 2026 Josué da Silva Cavalcante. All rights reserved.",
      "common.figureViewerTitle": "Figure",
      "common.figureViewerClose": "Close the figure viewer",
      // Homepage
      "home.title": "Josué da Silva Cavalcante · Physicist & Astronomer",
      "home.description":
        "Physicist and astronomer. Physics degree from UVA in Sobral, master's in Astronomy from Observatório Nacional, research on small Solar System bodies, and Physics teaching in Ceará.",
      "home.ogTitle": "Josué da Silva Cavalcante · Physicist & Astronomer",
      "home.kicker": "About me",
      "home.h1": "Physicist & astronomer",
      "home.lead":
        "I am the first astronomer from Ubajara, Ceará, Brazil. I study the positions and brightness of small Solar System bodies, with a focus on measuring them against dense stellar backgrounds.",
      "home.intro":
        "My path connects a degree in Physics in Sobral, a master's in Astronomy in Rio de Janeiro, and teaching in Ceará's public schools. I am also a technology and artificial intelligence enthusiast.",
      "home.linksResearch": "Research & figures",
      "home.linksCv": "Curriculum vitae",
      "home.linksLang": "Ler em português",
      "home.educationHeading": "From physics to astronomy",
      "home.ugWhen": "2018 thesis",
      "home.ugTitle": "Undergraduate degree in Physics",
      "home.ugInstitution": "Universidade Estadual Vale do Acaraú (UVA)",
      "home.ugPlace": "Sobral, Ceará",
      "home.ugBodyHtml":
        'I earned a <strong>Licenciatura in Physics</strong>, an undergraduate degree that includes teacher education. My thesis, <em lang="pt-BR">Astronomia de Posição</em>, explores celestial coordinates, spherical trigonometry, and the geometry used to locate objects in the sky.',
      "home.ugLink": "Explore the undergraduate research",
      "home.msWhen": "2025 thesis",
      "home.msTitle": "Master's degree in Astronomy",
      "home.msInstitution": "Observatório Nacional (ON/MCTI)",
      "home.msPlace": "Rio de Janeiro",
      "home.msBodyHtml":
        "My master's research investigated astrometry and photometry of small Solar System bodies in crowded fields. Using observations of <strong>(10199) Chariklo</strong>, I studied how difference image analysis can improve measurements when neighboring stars interfere.",
      "home.msLink": "Read the master's thesis (PDF, Portuguese)",
      "home.figuresHeading": "Figures from my work",
      "home.figCapAria": "Open full-size figure",
      "home.figHorizAlt":
        "Celestial sphere showing altitude, azimuth, the horizon and the local meridian.",
      "home.figHorizCap":
        "Describing a position in the sky. A diagram from my undergraduate thesis illustrates the horizontal coordinate system. Figure 5, p. 24.",
      "home.figCharAlt":
        "Four astronomical images: science frame, reference template, resampled science frame and difference image, with Chariklo marked by red arrows in the science frames.",
      "home.figCharCapHtml":
        '<strong>Measuring Chariklo in a crowded field.</strong> Image subtraction separates a moving object from the stellar background in my master\'s work. <a href="/files/dissertacao_cavalcante_2025.pdf#page=55">Figure 4.5, p. 43</a>.',
      "home.figuresLink": "Explore the methods, results, and more figures",
      "home.teachingHeading": "Teaching & public service",
      "home.teachingBody":
        "I teach Physics in the Ceará state public-school network, through SEDUC-CE. My work in education accompanies my academic training in Physics and Astronomy.",
      "home.teachingExamHtml":
        "I passed the <strong>SEDUC-CE 2018 competitive examination for Physics teachers</strong>. My name appears in the final list of approved candidates published on 30 December 2019.",
      "home.teachingLink":
        "Official result · CEV/UECE, Comunicado 131/2019, p. 16 (PDF)",
      "home.projectsHeading": "Current educational projects",
      "home.projectsIntro":
        "My projects in education are purely collaborative initiatives of my own. Drawing on my knowledge of technology and artificial intelligence, I contribute tools for the school.",
      "home.project1Title": "Chamada",
      "home.project1Body":
        "Records presence, absence, and excused absence on a phone for regrouped classes, gathers each student by their original class, and synchronizes the records with spreadsheets.",
      "home.project2Title": "BuscApp",
      "home.project2BodyHtml":
        'A project under my guidance for attendance monitoring, outreach to absent students, and communication with families. <a href="https://github.com/emanuellcs" rel="noopener" target="_blank">Emanuel Lázaro</a>, a Computer Engineering student at the Federal University of Ceará (UFC), Sobral campus, collaborates directly.',
      "home.project3Title": "Teaching materials",
      "home.project3Body":
        "Lesson notes, presentations, and activities for secondary Physics and ENEM preparation, plus simulations and Python animations of the work done by a gas, electrical circuits, charged-particle motion in magnetic fields, and the celestial sphere.",
      "home.nextHeading": "Astronomy, technology & AI",
      "home.nextBody":
        "I am beginning doctoral studies along the same research trajectory, with a focus on astrometric software that integrates machine learning and artificial intelligence. I am interested in making measurements of small bodies more reliable in challenging stellar fields.",

      // Research
      "research.title": "Research · Josué da Silva Cavalcante",
      "research.description":
        "From positional astronomy at UVA to measurements of Chariklo at Observatório Nacional: methods, thesis figures, astrometric results, and research directions.",
      "research.kicker": "Research",
      "research.h1": "Positions, light & small bodies",
      "research.lead":
        "My work connects the geometry of the celestial sphere with the practical challenge of measuring moving objects in crowded astronomical images.",
      "research.linksUg": "Undergraduate work",
      "research.linksMs": "Master's research",
      "research.linksDoc": "Doctoral direction",
      "research.ugHeading": "Positional astronomy · undergraduate work",
      "research.ugInstitution":
        "Licenciatura in Physics · Universidade Estadual Vale do Acaraú · Sobral · 2018 thesis",
      "research.ugBody1":
        "My undergraduate thesis, Astronomia de Posição (Positional Astronomy), brings together celestial reference systems, spherical trigonometry, and transformations between astronomical coordinates. It also discusses apparent celestial motion and uses Stellarium to illustrate astronomical situations.",
      "research.ugBody2":
        "This work addresses a basic question behind astrometry: how do we define and relate the coordinates used to describe a position in the sky?",
      "research.ugSupervisor":
        "Supervisor: Prof. Dr. Antônio Fernandes Siqueira.",
      "research.figCapAria": "Open full-size figure",
      "research.figHorizAlt":
        "A celestial sphere with the horizon plane in blue and arcs indicating altitude and azimuth.",
      "research.figHorizCap":
        "Horizontal coordinates. Altitude and azimuth locate an object relative to an observer's horizon. Original diagram from Astronomia de Posição. Figure 5, p. 24.",
      "research.figTriAlt":
        "Spherical position triangle connecting the zenith, the elevated celestial pole and a star, with angular relationships marked.",
      "research.figTriCap":
        "The position triangle. Spherical geometry connects the observer's latitude with horizontal and equatorial coordinates. Original diagram from the undergraduate thesis. Figure 12, p. 34.",
      "research.msHeading":
        "Small bodies in crowded fields · master's research",
      "research.msInstitution":
        "Master's in Astronomy · Observatório Nacional · Rio de Janeiro · 2025 thesis",
      "research.msBody":
        "My master's thesis, Astrometria e fotometria de pequenos corpos do Sistema Solar em imagens com campos estelares densos, studies how neighboring stars affect the measured position and brightness of a moving Solar System body.",
      "research.msSupervisor":
        "Supervisor: Dr. Julio I. Bueno de Camargo. Co-supervisor: Dr. Adriano Pieres.",
      "research.msPdf": "Read the full thesis (PDF, Portuguese)",
      "research.sepHeading": "Separating the target from the background",
      "research.sepBody1":
        "I first compared PRAIA and DAOPHOT measurements of reference-star positions in a simulated dense field. I then applied difference image analysis (DIA), using DIAPL2, to a sequence of SOAR/SOI observations of the centaur (10199) Chariklo.",
      "research.sepBody2":
        "A reference image models the stellar background without the moving target. Subtracting that model from aligned science images makes it possible to measure Chariklo with less contamination. Reference stars are measured with PRAIA on the resampled science images.",
      "research.figSubAlt":
        "Science, template, resampled science and difference images of a dense stellar field. Red arrows indicate Chariklo in the science images.",
      "research.figSubCap":
        "Removing the stellar background. From left to right: the science image, reference template, resampled science image, and difference image. The red arrows identify Chariklo in the science frames.",
      "research.figSubLink": "Figure 4.5, p. 43",
      "research.resHeading": "Astrometric results",
      "research.resBody":
        "The analysis found smaller scatter in position residuals relative to the NIMA ephemeris after image subtraction. The table below reproduces the scatter values and sample sizes reported in the thesis.",
      "research.tableCaption": "Chariklo astrometry · thesis, Table 4.1",
      "research.tableReduction": "Reduction",
      "research.tableMeasurements": "Measurements",
      "research.tableScatterRa": "Scatter in Δα cos δ",
      "research.tableScatterDec": "Scatter in Δδ",
      "research.tableNoDia": "Without DIA",
      "research.tableWithDia": "With DIA",
      "research.resNote":
        "The reductions contain different numbers of accepted measurements. These results describe this observing sequence.",
      "research.resLink": "See Table 4.1 and its discussion, p. 45",
      "research.lcHeading": "Recovering the light curve",
      "research.lcBody":
        "Photometry on the difference images also recovered Chariklo's rotational brightness variation. Cleaner position and brightness measurements can support stellar-occultation predictions and the physical study of small bodies.",
      "research.figPhotAlt":
        "Two plots of instrumental magnitude against time: original-image PSF photometry on the left and difference-image aperture photometry on the right. The vertical scales differ.",
      "research.figPhotCap":
        "Photometry before and after subtraction. Original-image PSF photometry (left) and difference-image aperture photometry (right). The panels use different vertical scales; the comparison illustrates the effect of stellar contamination.",
      "research.figPhotLink": "Figure 5.2, p. 57",
      "research.docHeading": "Doctoral research direction",
      "research.docBody":
        "I am beginning doctoral studies in small-body astrometry and photometry, with an emphasis on measurement software that incorporates machine learning and artificial intelligence. My interests include detection and centroid estimation under crowding, robust treatment of moving sources, and reproducible processing of astronomical images.",

      // Curriculum vitae
      "cv.title": "CV · Josué da Silva Cavalcante",
      "cv.description":
        "Academic CV: Physics licentiate from UVA, master's in Astronomy from Observatório Nacional, small-body research, and Physics teaching in the Ceará state school network.",
      "cv.ogTitle": "CV · Josué da Silva Cavalcante",
      "cv.nameLine": "Physicist & astronomer",
      "cv.h1": "Curriculum vitae",
      "cv.lead":
        "Physicist and astronomer working on astrometry and photometry of small Solar System bodies. Physics teacher in Ceará's state public-school network. I am also a technology and artificial intelligence enthusiast.",
      "cv.educationHeading": "Education",
      "cv.msTitle": "Master's degree in Astronomy",
      "cv.msPlace": "Observatório Nacional (ON/MCTI), Rio de Janeiro, Brazil.",
      "cv.msThesisHtml":
        '2025 thesis: <em lang="pt-BR">Astrometria e fotometria de pequenos corpos do Sistema Solar em imagens com campos estelares densos</em>.',
      "cv.msSupervisor":
        "Supervisor: Dr. Julio I. Bueno de Camargo. Co-supervisor: Dr. Adriano Pieres.",
      "cv.msPdf": "Thesis PDF (Portuguese)",
      "cv.ugTitle": "Licenciatura in Physics",
      "cv.ugPlace":
        "Universidade Estadual Vale do Acaraú (UVA), Sobral, Ceará, Brazil. Undergraduate degree including teacher education.",
      "cv.ugThesisHtml":
        '2018 thesis: <em lang="pt-BR">Astronomia de Posição</em>. Supervisor: Prof. Dr. Antônio Fernandes Siqueira.',
      "cv.ugLink": "Summary & figures",
      "cv.teachingHeading": "Teaching & public service",
      "cv.teachTitle": "Physics teacher · SEDUC-CE",
      "cv.teachPlace": "Ceará state public-school network, Brazil.",
      "cv.teachExam":
        "Approved in the SEDUC-CE 2018 competitive examination for Physics teachers; final approved-candidate list published on 30 December 2019.",
      "cv.teachLink": "Official CEV/UECE result, p. 16 (PDF)",
      "cv.researchHeading": "Research",
      "cv.research1":
        "Astrometry and photometry of small Solar System bodies in dense stellar fields.",
      "cv.research2":
        "Difference image analysis with DIAPL2; reference-star measurements with PRAIA; comparison with DAOPHOT.",
      "cv.research3":
        "SOAR/SOI observations of (10199) Chariklo, light curves, and astrometric support for stellar occultations.",
      "cv.research4":
        "Beginning doctoral studies focused on astrometric software incorporating machine learning and AI.",
      "cv.researchLink": "Research methods, figures, and results",
      "cv.projectsHeading": "Educational projects",
      "cv.projectsIntro":
        "Purely collaborative initiatives of my own. I contribute tools for the school from my knowledge of technology and artificial intelligence.",
      "cv.project1":
        "Chamada: attendance for regrouped classes, consolidated by original class and synchronized with spreadsheets.",
      "cv.project2Html":
        '<a href="https://github.com/eemtijca/buscapp" rel="noopener" target="_blank">BuscApp</a>: attendance follow-up and communication with families, with <a href="https://github.com/emanuellcs" rel="noopener" target="_blank">Emanuel Lázaro</a> (Computer Engineering, UFC, Sobral).',
      "cv.project3":
        "Lesson notes, activities, and Python animations for secondary Physics and ENEM preparation.",
      "cv.contactHeading": "Contact & academic record",
      "cv.contactLattes": "Full Lattes CV",
      "cv.contactPubs": "Theses & publications",

      // Theses and publications
      "pubs.title": "Theses & Publications · Josué da Silva Cavalcante",
      "pubs.description":
        "Explore Josué Cavalcante's undergraduate research in positional astronomy (UVA, 2018) and master's research on dense-field astrometry and photometry (Observatório Nacional, 2025).",
      "pubs.ogTitle": "Theses & Publications · Josué da Silva Cavalcante",
      "pubs.kicker": "Publications",
      "pubs.h1": "Theses & academic work",
      "pubs.lead":
        "My undergraduate and master's research, with summaries and figures from both works and the full text of the master's thesis. Both works are written in Portuguese.",
      "pubs.msWhen": "Master's thesis · 2025",
      "pubs.msHeading":
        "Astrometria e fotometria de pequenos corpos do Sistema Solar em imagens com campos estelares densos",
      "pubs.msInstitution":
        "Josué da Silva Cavalcante · Master's in Astronomy · Observatório Nacional, Rio de Janeiro",
      "pubs.msBody":
        "Astrometry and photometry of small Solar System bodies in dense stellar fields. The work compares reference-star measurements and applies difference image analysis to SOAR/SOI observations of (10199) Chariklo.",
      "pubs.msSupervisor":
        "Supervisor: Dr. Julio I. Bueno de Camargo. Co-supervisor: Dr. Adriano Pieres.",
      "pubs.msPdf": "Read thesis (PDF · 9.6 MB)",
      "pubs.msMethods": "Methods, figures & results",
      "pubs.msRecord": "Institutional record · TEDE ON, handle tede/207.",
      "pubs.ugWhen": "Undergraduate thesis · 2018",
      "pubs.ugHeading": "Astronomia de Posição",
      "pubs.ugInstitution":
        "Josué da Silva Cavalcante · Licenciatura in Physics · Universidade Estadual Vale do Acaraú, Sobral",
      "pubs.ugBody":
        "Positional astronomy: the celestial sphere, astronomical coordinate systems, spherical trigonometry, coordinate transformations, and apparent celestial motion, with examples using Stellarium.",
      "pubs.ugSupervisor": "Supervisor: Prof. Dr. Antônio Fernandes Siqueira.",
      "pubs.ugLink": "Summary & figures",

      // Not found
      "notfound.title": "Page not found · Josué da Silva Cavalcante",
      "notfound.description":
        "This address does not match a page on the site of Josué da Silva Cavalcante.",
      "notfound.kicker": "404",
      "notfound.h1": "This page is not on the site",
      "notfound.lead": "The address does not match a page here.",
    },

    "pt-BR": {
      // Shared chrome
      "common.skip": "Ir para o conteúdo",
      "common.langGroup": "Idioma",
      "common.navAria": "Principal",
      "common.navHome": "Início",
      "common.navResearch": "Pesquisa",
      "common.navCv": "Currículo",
      "common.navPubs": "Publicações",
      "common.siteTitle": "Josué da Silva Cavalcante",
      "common.siteTag":
        "Astronomia · Pequenos corpos · Astrometria · Aprendizado de máquina",
      "common.footerSite": "Site",
      "common.footerEmail": "cavalcante_wolf@proton.me",
      "common.footerLattes": "Currículo Lattes",
      "common.footerGithub": "GitHub",
      "common.footerX": "X · @CavalcanteWolf",
      "common.footerInstagram": "Instagram · cavalcante_josue96",
      "common.copyright":
        "© 2026 Josué da Silva Cavalcante. Todos os direitos reservados.",
      "common.figureViewerTitle": "Figura",
      "common.figureViewerClose": "Fechar o visualizador de figuras",
      // Homepage
      "home.title": "Sobre mim · Josué da Silva Cavalcante",
      "home.description":
        "Físico e astrônomo. Licenciatura em Física pela UVA, em Sobral, mestrado em Astronomia pelo Observatório Nacional, pesquisa e docência na SEDUC-CE.",
      "home.ogTitle": "Sobre mim · Josué da Silva Cavalcante",
      "home.kicker": "Sobre mim",
      "home.h1": "Físico e astrônomo",
      "home.lead":
        "Sou o primeiro astrônomo de Ubajara, no Ceará. Estudo a posição e o brilho de pequenos corpos do Sistema Solar, com foco em medições em regiões do céu com grande concentração de estrelas.",
      "home.intro":
        "Minha trajetória reúne a formação em Física em Sobral, o mestrado em Astronomia no Rio de Janeiro e a atuação como professor na rede pública do Ceará. Tenho também interesse por tecnologia e inteligência artificial.",
      "home.linksResearch": "Pesquisa e figuras",
      "home.linksCv": "Currículo resumido",
      "home.linksLang": "Read in English",
      "home.educationHeading": "Da Física à Astronomia",
      "home.ugWhen": "Monografia · 2018",
      "home.ugTitle": "Licenciatura em Física",
      "home.ugInstitution": "Universidade Estadual Vale do Acaraú (UVA)",
      "home.ugPlace": "Sobral, Ceará",
      "home.ugBodyHtml":
        "Concluí a <strong>Licenciatura em Física</strong>, graduação que inclui a formação para a docência. Em minha monografia, <em>Astronomia de Posição</em>, explorei as coordenadas celestes, a trigonometria esférica e a geometria usada para localizar objetos no céu.",
      "home.ugLink": "Conhecer a monografia: resumo e figuras",
      "home.msWhen": "Dissertação · 2025",
      "home.msTitle": "Mestrado em Astronomia",
      "home.msInstitution": "Observatório Nacional (ON/MCTI)",
      "home.msPlace": "Rio de Janeiro",
      "home.msBodyHtml":
        "Minha pesquisa de mestrado investigou a astrometria e a fotometria de pequenos corpos do Sistema Solar em campos densos. A partir de observações do <strong>(10199) Chariklo</strong>, estudei como a análise por diferença de imagens pode melhorar as medições quando estrelas vizinhas interferem.",
      "home.msLink": "Ler a dissertação (PDF, em português)",
      "home.figuresHeading": "Figuras dos meus trabalhos",
      "home.figCapAria": "Ampliar a figura",
      "home.figHorizAlt":
        "Esfera celeste com altura, azimute, horizonte e meridiano local.",
      "home.figHorizCap":
        "Como descrever uma posição no céu. Diagrama do sistema de coordenadas horizontais, elaborado para minha monografia. Ver figura 5, p. 24.",
      "home.figCharAlt":
        "Quatro imagens astronômicas: ciência, modelo de referência, ciência reamostrada e diferença; setas vermelhas indicam Chariklo nas imagens de ciência.",
      "home.figCharCapHtml":
        '<strong>Como medir Chariklo em um campo denso.</strong> A subtração de imagens separa o objeto em movimento do fundo estelar. <a href="/files/dissertacao_cavalcante_2025.pdf#page=55">Ver figura 4.5, p. 43</a>.',
      "home.figuresLink": "Ver mais figuras, métodos e resultados",
      "home.teachingHeading": "Docência e serviço público",
      "home.teachingBody":
        "Sou professor de Física da rede estadual de ensino do Ceará, vinculado à SEDUC-CE. Minha atuação em educação acompanha minha formação em Física e Astronomia.",
      "home.teachingExamHtml":
        "Fui aprovado no <strong>concurso da SEDUC-CE de 2018 para professor de Física</strong>. Meu nome consta na relação definitiva de candidatos aprovados, publicada em 30 de dezembro de 2019.",
      "home.teachingLink":
        "Resultado oficial · CEV/UECE, Comunicado 131/2019, p. 16 (PDF)",
      "home.projectsHeading": "Projetos educacionais atuais",
      "home.projectsIntro":
        "Meus projetos na área da educação são puramente iniciativas colaborativas minhas. A partir do meu conhecimento em tecnologia e inteligência artificial, contribuo com ferramentas para a escola.",
      "home.project1Title": "Chamada",
      "home.project1Body":
        "Registra, pelo celular, presenças, faltas e faltas justificadas de alunos de turmas reorganizadas. Os registros são reunidos por turma de origem e sincronizados com planilhas.",
      "home.project2Title": "BuscApp",
      "home.project2BodyHtml":
        'Projeto sob minha orientação para o acompanhamento da frequência, a busca ativa de estudantes e a comunicação com as famílias. <a href="https://github.com/emanuellcs" rel="noopener" target="_blank">Emanuel Lázaro</a>, estudante de Engenharia da Computação da Universidade Federal do Ceará (UFC), campus Sobral, colabora diretamente.',
      "home.project3Title": "Materiais de aula",
      "home.project3Body":
        "Notas, apresentações e atividades de Física para o ensino médio e o ENEM, com simulações e animações em Python sobre o trabalho de um gás, circuitos elétricos, o movimento de cargas em campos magnéticos e a geometria da esfera celeste.",
      "home.nextHeading": "Astronomia, tecnologia e IA",
      "home.nextBody":
        "Estou iniciando o doutorado para dar continuidade à pesquisa em astrometria de pequenos corpos do Sistema Solar. Meu foco é desenvolver software que incorpore técnicas de aprendizado de máquina e inteligência artificial para tornar as medições mais confiáveis, mesmo em regiões com grande concentração de estrelas.",

      // Research
      "research.title": "Pesquisa · Josué da Silva Cavalcante",
      "research.description":
        "Da astronomia de posição na UVA às medições de Chariklo no Observatório Nacional: métodos, figuras dos trabalhos, resultados astrométricos e rumos da pesquisa.",
      "research.kicker": "Pesquisa",
      "research.h1": "Posições, luz e pequenos corpos",
      "research.lead":
        "Meu trabalho conecta a geometria da esfera celeste ao desafio prático de medir objetos em movimento em imagens astronômicas com campos densos.",
      "research.linksUg": "Monografia",
      "research.linksMs": "Pesquisa de mestrado",
      "research.linksDoc": "Rumo ao doutorado",
      "research.ugHeading": "Astronomia de posição · monografia",
      "research.ugInstitution":
        "Licenciatura em Física · Universidade Estadual Vale do Acaraú · Sobral · Monografia de 2018",
      "research.ugBody1":
        "Minha monografia, Astronomia de Posição, reúne os sistemas de referência celeste, a trigonometria esférica e as transformações entre coordenadas astronômicas. O trabalho também discute o movimento aparente do céu e usa o Stellarium para ilustrar situações astronômicas.",
      "research.ugBody2":
        "O trabalho aborda uma pergunta básica da astrometria: como definimos e relacionamos as coordenadas usadas para descrever uma posição no céu?",
      "research.ugSupervisor":
        "Orientador: Prof. Dr. Antônio Fernandes Siqueira.",
      "research.figCapAria": "Ampliar a figura",
      "research.figHorizAlt":
        "Esfera celeste com o plano do horizonte em azul e arcos que indicam altura e azimute.",
      "research.figHorizCap":
        "Coordenadas horizontais. Altura e azimute localizam um objeto em relação ao horizonte do observador. Diagrama original de Astronomia de Posição. Figura 5, p. 24.",
      "research.figTriAlt":
        "Triângulo de posição esférico que liga o zênite, o polo celeste elevado e uma estrela, com as relações angulares indicadas.",
      "research.figTriCap":
        "O triângulo de posição. A geometria esférica relaciona a latitude do observador às coordenadas horizontais e equatoriais. Diagrama original da monografia. Figura 12, p. 34.",
      "research.msHeading":
        "Pequenos corpos em campos densos · pesquisa de mestrado",
      "research.msInstitution":
        "Mestrado em Astronomia · Observatório Nacional · Rio de Janeiro · Dissertação de 2025",
      "research.msBody":
        "Minha dissertação, Astrometria e fotometria de pequenos corpos do Sistema Solar em imagens com campos estelares densos, estuda como estrelas vizinhas afetam a posição e o brilho medidos de um corpo em movimento do Sistema Solar.",
      "research.msSupervisor":
        "Orientador: Dr. Julio I. Bueno de Camargo. Coorientador: Dr. Adriano Pieres.",
      "research.msPdf": "Ler a dissertação completa (PDF, em português)",
      "research.sepHeading": "Separando o alvo do fundo",
      "research.sepBody1":
        "Primeiro comparei medições de PRAIA e DAOPHOT para as posições das estrelas de referência em um campo denso simulado. Em seguida apliquei a análise por diferença de imagens (DIA), com o DIAPL2, a uma sequência de observações SOAR/SOI do centauro (10199) Chariklo.",
      "research.sepBody2":
        "Uma imagem de referência modela o fundo estelar sem o alvo em movimento. Subtrair esse modelo das imagens de ciência alinhadas permite medir Chariklo com menos contaminação. As estrelas de referência são medidas com o PRAIA nas imagens de ciência reamostradas.",
      "research.figSubAlt":
        "Imagens de ciência, modelo de referência, ciência reamostrada e diferença de um campo estelar denso. Setas vermelhas indicam Chariklo nas imagens de ciência.",
      "research.figSubCap":
        "Removendo o fundo estelar. Da esquerda para a direita: imagem de ciência, modelo de referência, imagem de ciência reamostrada e imagem de diferença. As setas vermelhas identificam Chariklo nas imagens de ciência.",
      "research.figSubLink": "Figura 4.5, p. 43",
      "research.resHeading": "Resultados astrométricos",
      "research.resBody":
        "A análise encontrou menor dispersão nos resíduos de posição em relação à efeméride NIMA após a subtração de imagens. A tabela abaixo reproduz os valores de dispersão e os tamanhos das amostras relatados na dissertação.",
      "research.tableCaption":
        "Astrometria de Chariklo · dissertação, Tabela 4.1",
      "research.tableReduction": "Redução",
      "research.tableMeasurements": "Medições",
      "research.tableScatterRa": "Dispersão em Δα cos δ",
      "research.tableScatterDec": "Dispersão em Δδ",
      "research.tableNoDia": "Sem DIA",
      "research.tableWithDia": "Com DIA",
      "research.resNote":
        "As reduções contêm números diferentes de medições aceitas. Esses resultados descrevem esta sequência de observações.",
      "research.resLink": "Ver a Tabela 4.1 e sua discussão, p. 45",
      "research.lcHeading": "Recuperando a curva de luz",
      "research.lcBody":
        "A fotometria nas imagens de diferença também recuperou a variação rotacional de brilho de Chariklo. Medições mais limpas de posição e brilho podem apoiar previsões de ocultações estelares e o estudo físico de pequenos corpos.",
      "research.figPhotAlt":
        "Dois gráficos de magnitude instrumental em função do tempo: fotometria PSF nas imagens originais à esquerda e fotometria de abertura nas imagens de diferença à direita. As escalas verticais são diferentes.",
      "research.figPhotCap":
        "Fotometria antes e depois da subtração. Fotometria PSF nas imagens originais (à esquerda) e fotometria de abertura nas imagens de diferença (à direita). Os painéis usam escalas verticais diferentes; a comparação ilustra o efeito da contaminação estelar.",
      "research.figPhotLink": "Figura 5.2, p. 57",
      "research.docHeading": "Rumo à pesquisa de doutorado",
      "research.docBody":
        "Estou iniciando o doutorado em astrometria e fotometria de pequenos corpos, com ênfase em software de medição que incorpore aprendizado de máquina e inteligência artificial. Meus interesses incluem detecção e estimativa de centroide em campos densos, tratamento robusto de fontes em movimento e processamento reprodutível de imagens astronômicas.",

      // Curriculum vitae
      "cv.title": "Currículo · Josué da Silva Cavalcante",
      "cv.description":
        "Currículo acadêmico: Licenciatura em Física pela UVA, mestrado em Astronomia pelo Observatório Nacional, pesquisa em pequenos corpos e docência na rede estadual do Ceará.",
      "cv.ogTitle": "Currículo · Josué da Silva Cavalcante",
      "cv.nameLine": "Físico e astrônomo",
      "cv.h1": "Currículo vitae",
      "cv.lead":
        "Físico e astrônomo, atuo em astrometria e fotometria de pequenos corpos do Sistema Solar. Professor de Física da rede estadual de ensino do Ceará. Tenho também interesse por tecnologia e inteligência artificial.",
      "cv.educationHeading": "Formação",
      "cv.msTitle": "Mestrado em Astronomia",
      "cv.msPlace": "Observatório Nacional (ON/MCTI), Rio de Janeiro, Brasil.",
      "cv.msThesisHtml":
        "Dissertação de 2025: <em>Astrometria e fotometria de pequenos corpos do Sistema Solar em imagens com campos estelares densos</em>.",
      "cv.msSupervisor":
        "Orientador: Dr. Julio I. Bueno de Camargo. Coorientador: Dr. Adriano Pieres.",
      "cv.msPdf": "Dissertação em PDF (em português)",
      "cv.ugTitle": "Licenciatura em Física",
      "cv.ugPlace":
        "Universidade Estadual Vale do Acaraú (UVA), Sobral, Ceará, Brasil. Graduação que inclui a formação para a docência.",
      "cv.ugThesisHtml":
        "Monografia de 2018: <em>Astronomia de Posição</em>. Orientador: Prof. Dr. Antônio Fernandes Siqueira.",
      "cv.ugLink": "Resumo e figuras",
      "cv.teachingHeading": "Docência e serviço público",
      "cv.teachTitle": "Professor de Física · SEDUC-CE",
      "cv.teachPlace": "Rede estadual de ensino do Ceará, Brasil.",
      "cv.teachExam":
        "Aprovado no concurso da SEDUC-CE de 2018 para professor de Física; relação definitiva de aprovados publicada em 30 de dezembro de 2019.",
      "cv.teachLink": "Resultado oficial CEV/UECE, p. 16 (PDF)",
      "cv.researchHeading": "Pesquisa",
      "cv.research1":
        "Astrometria e fotometria de pequenos corpos do Sistema Solar em campos estelares densos.",
      "cv.research2":
        "Análise por diferença de imagens com o DIAPL2; medições de estrelas de referência com o PRAIA; comparação com o DAOPHOT.",
      "cv.research3":
        "Observações SOAR/SOI do (10199) Chariklo, curvas de luz e apoio astrométrico a ocultações estelares.",
      "cv.research4":
        "Início do doutorado com foco em software astrométrico que incorpora aprendizado de máquina e IA.",
      "cv.researchLink": "Métodos, figuras e resultados da pesquisa",
      "cv.projectsHeading": "Projetos educacionais",
      "cv.projectsIntro":
        "Iniciativas puramente colaborativas minhas. Contribuo com ferramentas para a escola a partir do meu conhecimento em tecnologia e inteligência artificial.",
      "cv.project1":
        "Chamada: frequência de turmas reorganizadas, reunida por turma de origem e sincronizada com planilhas.",
      "cv.project2Html":
        '<a href="https://github.com/eemtijca/buscapp" rel="noopener" target="_blank">BuscApp</a>: acompanhamento de frequência e comunicação com as famílias, com <a href="https://github.com/emanuellcs" rel="noopener" target="_blank">Emanuel Lázaro</a> (Engenharia da Computação, UFC, Sobral).',
      "cv.project3":
        "Notas de aula, atividades e animações em Python para a Física do ensino médio e a preparação para o ENEM.",
      "cv.contactHeading": "Contato e registro acadêmico",
      "cv.contactLattes": "Currículo Lattes completo",
      "cv.contactPubs": "Teses e publicações",

      // Theses and publications
      "pubs.title": "Teses e publicações · Josué da Silva Cavalcante",
      "pubs.description":
        "Conheça a pesquisa de graduação de Josué Cavalcante em astronomia de posição (UVA, 2018) e a pesquisa de mestrado em astrometria e fotometria em campos densos (Observatório Nacional, 2025).",
      "pubs.ogTitle": "Teses e publicações · Josué da Silva Cavalcante",
      "pubs.kicker": "Publicações",
      "pubs.h1": "Teses e trabalhos acadêmicos",
      "pubs.lead":
        "Minhas pesquisas de graduação e de mestrado, com resumos e figuras dos dois trabalhos e o texto completo da dissertação. Ambos os trabalhos são escritos em português.",
      "pubs.msWhen": "Dissertação de mestrado · 2025",
      "pubs.msHeading":
        "Astrometria e fotometria de pequenos corpos do Sistema Solar em imagens com campos estelares densos",
      "pubs.msInstitution":
        "Josué da Silva Cavalcante · Mestrado em Astronomia · Observatório Nacional, Rio de Janeiro",
      "pubs.msBody":
        "Astrometria e fotometria de pequenos corpos do Sistema Solar em campos estelares densos. O trabalho compara medições de estrelas de referência e aplica a análise por diferença de imagens a observações SOAR/SOI do (10199) Chariklo.",
      "pubs.msSupervisor":
        "Orientador: Dr. Julio I. Bueno de Camargo. Coorientador: Dr. Adriano Pieres.",
      "pubs.msPdf": "Ler a dissertação (PDF · 9,6 MB)",
      "pubs.msMethods": "Métodos, figuras e resultados",
      "pubs.msRecord": "Registro institucional · TEDE ON, handle tede/207.",
      "pubs.ugWhen": "Monografia de graduação · 2018",
      "pubs.ugHeading": "Astronomia de Posição",
      "pubs.ugInstitution":
        "Josué da Silva Cavalcante · Licenciatura em Física · Universidade Estadual Vale do Acaraú, Sobral",
      "pubs.ugBody":
        "Astronomia de posição: a esfera celeste, os sistemas de coordenadas astronômicas, a trigonometria esférica, as transformações de coordenadas e o movimento aparente do céu, com exemplos no Stellarium.",
      "pubs.ugSupervisor": "Orientador: Prof. Dr. Antônio Fernandes Siqueira.",
      "pubs.ugLink": "Resumo e figuras",

      // Not found
      "notfound.title": "Página não encontrada · Josué da Silva Cavalcante",
      "notfound.description":
        "Este endereço não corresponde a uma página do site de Josué da Silva Cavalcante.",
      "notfound.kicker": "404",
      "notfound.h1": "Esta página não está no site",
      "notfound.lead": "O endereço não corresponde a nenhuma página aqui.",
    },
  };

  function normalize(tag) {
    if (!tag) {
      return null;
    }
    var lower = String(tag).toLowerCase();
    if (lower.indexOf("pt") === 0) {
      return "pt-BR";
    }
    if (lower.indexOf("en") === 0) {
      return "en";
    }
    return null;
  }

  function readStored() {
    try {
      return normalize(localStorage.getItem(LANG_KEY));
    } catch (e) {
      return null;
    }
  }

  function store(lang) {
    try {
      localStorage.setItem(LANG_KEY, lang);
    } catch (e) {
      // private mode
    }
  }

  /* Both languages share one URL, so the address bar cannot express the
     choice. The stored preference wins, then the browser language, then the
     default of English. There is deliberately no query parameter to read. */
  function detect() {
    return readStored() || normalize(navigator.language) || DEFAULT_LANG;
  }

  /* Resolve a dotted key against the active catalog, then English. Passing
     quiet suppresses the missing-key warning, which is useful for optional
     keys such as a page-specific Open Graph title. */
  function translate(lang, key, quiet) {
    var active = catalog[lang];
    if (active && Object.prototype.hasOwnProperty.call(active, key)) {
      return active[key];
    }
    if (Object.prototype.hasOwnProperty.call(catalog.en, key)) {
      if (lang !== "en" && !quiet) {
        console.warn("[i18n] missing " + lang + " string for " + key);
      }
      return catalog.en[key];
    }
    if (!quiet) {
      console.warn("[i18n] unknown key " + key);
    }
    return null;
  }

  function has(lang, key) {
    return (
      Object.prototype.hasOwnProperty.call(catalog[lang] || {}, key) ||
      Object.prototype.hasOwnProperty.call(catalog.en, key)
    );
  }

  function setMeta(selector, value) {
    var node = document.querySelector(selector);
    if (node && value != null) {
      node.setAttribute("content", value);
    }
  }

  function setHref(selector, value) {
    var node = document.querySelector(selector);
    if (node && value != null) {
      node.setAttribute("href", value);
    }
  }

  function applyNodes(lang) {
    var i;
    var j;

    var textNodes = document.querySelectorAll("[data-i18n]");
    for (i = 0; i < textNodes.length; i++) {
      var key = textNodes[i].getAttribute("data-i18n");
      var value = translate(lang, key);
      if (value == null) {
        continue;
      }
      // Keys ending in "Html" carry inline markup on purpose.
      if (/Html$/.test(key)) {
        textNodes[i].innerHTML = value;
      } else {
        textNodes[i].textContent = value;
      }
    }

    var attrNodes = document.querySelectorAll("[data-i18n-attr]");
    for (i = 0; i < attrNodes.length; i++) {
      var pairs = attrNodes[i].getAttribute("data-i18n-attr").split(";");
      for (j = 0; j < pairs.length; j++) {
        var pair = pairs[j].split(":");
        if (pair.length !== 2) {
          continue;
        }
        var attr = pair[0].replace(/^\s+|\s+$/g, "");
        var attrKey = pair[1].replace(/^\s+|\s+$/g, "");
        var attrValue = translate(lang, attrKey);
        if (attrValue != null) {
          attrNodes[i].setAttribute(attr, attrValue);
        }
      }
    }
  }

  /* Reflect the active language on every switch control. Header segments are
     toggles and carry aria-pressed; inline prose calls to action only get the
     label, since they read as a link rather than a toggle. */
  function applySwitcher(lang) {
    var controls = document.querySelectorAll("[data-set-lang]");
    for (var i = 0; i < controls.length; i++) {
      var active = controls[i].getAttribute("data-set-lang") === lang;
      controls[i].classList.toggle("is-active", active);
      if (controls[i].classList.contains("lang-switch-btn")) {
        controls[i].setAttribute("aria-pressed", String(active));
      }
    }
  }

  /* Theme labels depend on the language, so the toggle is refreshed here.
     The theme state itself is owned by main.js, which dispatches
     jdc:themechange whenever it changes. */
  function applyThemeLabels(lang) {
    var theme = document.documentElement.getAttribute("data-theme") || "dark";
    var dict = themes[lang] || themes.en;
    var buttons = document.querySelectorAll("[data-theme-toggle]");
    for (var i = 0; i < buttons.length; i++) {
      var label = theme === "light" ? dict.dark : dict.light;
      buttons[i].setAttribute("aria-label", label);
      buttons[i].removeAttribute("title");
    }
  }

  function applyMeta(lang, page) {
    var prefix = page + ".";
    var title = translate(lang, prefix + "title");
    var description = translate(lang, prefix + "description");
    var ogTitle = has(lang, prefix + "ogTitle")
      ? translate(lang, prefix + "ogTitle")
      : title;

    if (title) {
      document.title = title;
    }
    if (description) {
      setMeta('meta[name="description"]', description);
    }

    setMeta('meta[property="og:title"]', ogTitle);
    setMeta('meta[name="twitter:title"]', ogTitle);
    setMeta('meta[property="og:description"]', description);
    setMeta('meta[name="twitter:description"]', description);

    var locale = document.querySelector('meta[property="og:locale"]');
    if (locale) {
      locale.setAttribute("content", lang === "pt-BR" ? "pt_BR" : "en_US");
    }

    /* The canonical is the page path. Both languages share this URL, so the
       path does not change with the language. */
    var base = "https://wolf9611.github.io";
    var path = window.location.pathname.replace(/\/index\.html$/, "/");
    setHref('link[rel="canonical"]', base + path);
  }

  function setLanguage(lang) {
    if (SUPPORTED.indexOf(lang) === -1) {
      lang = DEFAULT_LANG;
    }

    var page = document.body.getAttribute("data-page") || "home";

    currentLanguage = lang;
    document.documentElement.setAttribute("lang", lang);
    applyNodes(lang);
    applySwitcher(lang);
    applyThemeLabels(lang);
    applyMeta(lang, page);
    store(lang);
  }

  function bindFigureViewer() {
    var dialog = document.getElementById("figure-viewer");
    if (!dialog || typeof dialog.showModal !== "function") {
      return;
    }
    var image = dialog.querySelector("img");

    document.addEventListener("click", function (event) {
      var target = event.target;
      if (!target || !target.closest) {
        return;
      }
      var opener = target.closest("[data-figure-open]");
      if (opener) {
        if (image) {
          image.src = opener.getAttribute("data-figure-open");
          var img = opener.querySelector("img");
          if (img) {
            image.alt = img.alt;
          }
        }
        dialog.showModal();
        return;
      }
      if (target.closest("[data-figure-close]") || target === dialog) {
        dialog.close();
      }
    });
  }

  var initialLanguage = detect();
  var currentLanguage = initialLanguage;

  document.documentElement.setAttribute("lang", initialLanguage);

  function boot() {
    document.addEventListener("click", function (event) {
      var target = event.target;
      if (!target || !target.closest) {
        return;
      }
      var trigger = target.closest("[data-set-lang]");
      if (trigger) {
        event.preventDefault();
        setLanguage(trigger.getAttribute("data-set-lang"));
      }
    });

    // main.js fires this after a theme change so the button keeps its label
    // in the active language.
    document.addEventListener("jdc:themechange", function () {
      applyThemeLabels(currentLanguage);
    });

    bindFigureViewer();
    setLanguage(initialLanguage);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }

  window.i18n = {
    setLanguage: function (lang) {
      setLanguage(normalize(lang) || DEFAULT_LANG);
    },
    detect: detect,
    catalog: catalog,
  };
})();
