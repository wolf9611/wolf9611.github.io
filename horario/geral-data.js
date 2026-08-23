/* Grade oficial EEMTI JCA 2026 — /work/JCA/2026/schedules/horario.pdf */
const GERAL_TURMAS = [
  {id:"1A",label:"1ª A",coord:"Edvan"},
  {id:"1B",label:"1ª B",coord:"Jaelson"},
  {id:"1C",label:"1ª C",coord:"Adriana"},
  {id:"2A",label:"2ª A",coord:"Augusto"},
  {id:"2B",label:"2ª B",coord:"Naíla"},
  {id:"2C",label:"2ª C",coord:"Valéria"},
  {id:"3A",label:"3ª A",coord:"Toinha"},
  {id:"3B",label:"3ª B",coord:"Romário"},
  {id:"3C",label:"3ª C",coord:"Deuseline"}
];
const GERAL_TIMES = ["7:20","8:10","9:20","10:10","11:00","13:00","13:50","14:55","15:45"];
function _c(d,p,extra){ var o={d:d,p:p}; if(extra) Object.assign(o,extra); return o; }
const GERAL = {
Segunda:{
"7:20":{"1A":_c("NTPPS","Dinar"),"1B":_c("Sociol.","Emília"),"1C":_c("Portug.","Patrícia"),"2A":_c("NTPPS","Augusto"),"2B":_c("Matemát.","Darly"),"2C":_c("Portug.","Deuseline"),"3A":_c("C.N. ENEM","Josué"),"3B":_c("Redação","Luciene"),"3C":_c("Filosofia","Kellysson")},
"8:10":{"1A":_c("NTPPS","Dinar"),"1B":_c("Ed. Fís.","Anaelton"),"1C":_c("Sociol.","Emília"),"2A":_c("NTPPS","Augusto"),"2B":_c("Inglês","Romário"),"2C":_c("Matemát.","Darly"),"3A":_c("Ling. ENEM","Deuseline"),"3B":_c("Filosofia","Kellysson"),"3C":_c("História","Flávio")},
"9:20":{"1A":_c("Espanhol","Elis"),"1B":_c("Inglês","Romário"),"1C":_c("Matemát.","Darly"),"2A":_c("Portug.","Patrícia"),"2B":_c("Biologia","Dinar"),"2C":_c("Ed. Fís.","Anaelton"),"3A":_c("Filosofia","Kellysson"),"3B":_c("Ling. ENEM","Deuseline"),"3C":_c("C.N. ENEM","Naíla")},
"10:10":{"1A":_c("Geografia","Maurício"),"1B":_c("Redação","Deuseline"),"1C":_c("Física","Josué"),"2A":_c("Matemát.","Darly"),"2B":_c("NTPPS","Naíla"),"2C":_c("Inglês","Romário"),"3A":_c("Espanhol","Elis"),"3B":_c("Ed. Fís.","Anaelton"),"3C":_c("NTPPS","Augusto")},
"11:00":{"1A":_c("Sociol.","Emília"),"1B":_c("Portug.","Patrícia"),"1C":_c("Ed. Fís.","Anaelton"),"2A":_c("Filosofia","Kellysson"),"2B":_c("NTPPS","Naíla"),"2C":_c("Física","Josué"),"3A":_c("História","Flávio"),"3B":_c("Geografia","Maurício"),"3C":_c("NTPPS","Augusto")},
"13:00":{"1A":_c("História","Aparecida"),"1B":_c("Est. orient.","Romário"),"1C":_c("Matemát.","Darly"),"2A":_c("Est. orient.","Deuseline"),"2B":_c("IFA Mat.","Murilo"),"2C":_c("Ed. Fís.","Anaelton"),"3A":_c("Portug.","Luciene"),"3B":_c("História","Flávio"),"3C":_c("Cult. Dig.","Edvan")},
"13:50":{"1A":_c("Est. orient.","Romário"),"1B":_c("Física","Josué"),"1C":_c("Redação","Deuseline"),"2A":_c("Ed. Fís.","Anaelton"),"2B":_c("IFA Mat.","Murilo"),"2C":_c("Geografia","Maurício"),"3A":_c("C.H. ENEM","Flávio"),"3B":_c("Portug.","Luciene"),"3C":_c("Cult. Dig.","Edvan")},
"14:55":{"1A":_c("Mundo Geek","Flávio",{e:1}),"1B":_c("Texto multimodal","Graça",{e:1}),"1C":_c("Convivência com o semiárido","Maurício",{e:1}),"2A":_c("Dialética da poesia / música","Valéria",{e:1}),"2B":_c("Microbiologia","Naíla",{e:1}),"2C":_c("Estudo das funções","Rita",{e:1}),"3A":_c("Biodiversidade e saúde","Toinha",{e:1}),"3B":_c("Educação financeira","Augusto",{e:1}),"3C":_c("Revoltas políticas no Ceará","Aparecida",{e:1})},
"15:45":{"1A":_c("Mundo Geek","Flávio",{e:1}),"1B":_c("Texto multimodal","Graça",{e:1}),"1C":_c("Convivência com o semiárido","Maurício",{e:1}),"2A":_c("Dialética da poesia / música","Valéria",{e:1}),"2B":_c("Microbiologia","Naíla",{e:1}),"2C":_c("Estudo das funções","Rita",{e:1}),"3A":_c("Biodiversidade e saúde","Toinha",{e:1}),"3B":_c("Educação financeira","Augusto",{e:1}),"3C":_c("Revoltas políticas no Ceará","Aparecida",{e:1})}
},
"Terça":{
"7:20":{"1A":_c("Geografia","Maurício"),"1B":_c("NTPPS","Adriana"),"1C":_c("Est. orient.","Romário"),"2A":_c("FCDCS","Augusto"),"2B":_c("NTPPS","Naíla"),"2C":_c("NTPPS","Toinha"),"3A":_c("Sociol.","Emília"),"3B":_c("Matemát.","Cláudio"),"3C":_c("Física","Josué")},
"8:10":{"1A":_c("Est. orient.","Romário"),"1B":_c("NTPPS","Adriana"),"1C":_c("Matemát.","Darly"),"2A":_c("Geografia","Maurício"),"2B":_c("NTPPS","Naíla"),"2C":_c("NTPPS","Toinha"),"3A":_c("Matemát.","Cláudio"),"3B":_c("C.H. ENEM","Flávio"),"3C":_c("Sociol.","Emília")},
"9:20":{"1A":_c("Matemát.","Cláudio"),"1B":_c("Est. orient.","Romário"),"1C":_c("NTPPS","Adriana"),"2A":_c("Biologia","Naíla"),"2B":_c("Física","Josué"),"2C":_c("Matemát.","Darly"),"3A":_c("Biologia","Toinha"),"3B":_c("Sociol.","Emília"),"3C":_c("C.H. ENEM","Flávio")},
"10:10":{"1A":_c("Biologia","Naíla"),"1B":_c("Física","Josué"),"1C":_c("NTPPS","Adriana"),"2A":_c("Matemát.","Darly"),"2B":_c("Cult. Dig.","Sílvia"),"2C":_c("IFA C.H.","Flávio"),"3A":_c("Matemát.","Cláudio"),"3B":_c("Biologia","Toinha"),"3C":_c("NTPPS","Augusto")},
"11:00":{"1A":_c("Matemát.","Cláudio"),"1B":_c("Matemát.","Sáthylla"),"1C":_c("Ed. Fís.","Anaelton"),"2A":_c("Sociol.","Emília"),"2B":_c("Cult. Dig.","Sílvia"),"2C":_c("IFA C.H.","Flávio"),"3A":_c("NTPPS","Maurício"),"3B":_c("C.N. ENEM","Josué"),"3C":_c("NTPPS","Augusto")},
"13:00":{"1A":_c("Matemát.","Cláudio"),"1B":_c("Geografia","Maurício"),"1C":_c("História","Flávio"),"2A":_c("Física","Josué"),"2B":_c("Matemát.","Darly"),"2C":_c("Biologia","Naíla"),"3A":_c("Espanhol","Elis"),"3B":_c("Cult. Dig.","Edvan"),"3C":_c("Mat. ENEM","Murilo")},
"13:50":{"1A":_c("História","Aparecida"),"1B":_c("Biologia","Naíla"),"1C":_c("Geografia","Maurício"),"2A":_c("Aprof. Mat.","Murilo"),"2B":_c("Espanhol","Elis"),"2C":_c("Matemát.","Darly"),"3A":_c("C.N. ENEM","Josué"),"3B":_c("Cult. Dig.","Edvan"),"3C":_c("Matemát.","Cláudio")},
"14:55":{"1A":_c("Dialética da poesia / música","Valéria",{e:1}),"1B":_c("Grandes guerras mundiais","Flávio",{e:1}),"1C":_c("Matemática básica II","Rita",{e:1}),"2A":_c("Espanhol","Elis"),"2B":_c("Matemát.","Darly"),"2C":_c("Aprof. Mat.","Murilo"),"3A":_c("Profissão e carreira","Graça",{e:1}),"3B":_c("Formação do povo brasileiro","Aparecida",{e:1}),"3C":_c("Zoologia","Toinha",{e:1})},
"15:45":{"1A":_c("Dialética da poesia / música","Valéria",{e:1}),"1B":_c("Grandes guerras mundiais","Flávio",{e:1}),"1C":_c("Matemática básica II","Rita",{e:1}),"2A":_c("Matemát.","Darly"),"2B":_c("FCDCS","Naíla"),"2C":_c("Aprof. Mat.","Murilo"),"3A":_c("Profissão e carreira","Graça",{e:1}),"3B":_c("Formação do povo brasileiro","Aparecida",{e:1}),"3C":_c("Zoologia","Toinha",{e:1})}
},
Quarta:{
"7:20":{"1A":_c("Química","França"),"1B":_c("FCDCS","Jaelson"),"1C":_c("Física","Josué"),"2A":_c("Portug.","Patrícia"),"2B":_c("Biologia","Dinar"),"2C":_c("Portug.","Deuseline"),"3A":_c("Est. orient.","Chagas"),"3B":_c("Química","Deiviane"),"3C":_c("Redação","Luciene")},
"8:10":{"1A":_c("NTPPS","Dinar"),"1B":_c("Portug.","Patrícia"),"1C":_c("História","Flávio"),"2A":_c("Arte","Jaelson"),"2B":_c("Portug.","Paloma"),"2C":_c("Física","Josué"),"3A":_c("Ed. Fís.","Anaelton"),"3B":_c("Est. orient.","Chagas"),"3C":_c("Portug.","Deuseline")},
"9:20":{"1A":_c("NTPPS","Dinar"),"1B":_c("Geografia","Maurício"),"1C":_c("Química","França"),"2A":_c("IFA Ling.","Deuseline"),"2B":_c("Portug.","Paloma"),"2C":_c("História","Flávio"),"3A":_c("Redação","Luciene"),"3B":_c("Espanhol","Elis"),"3C":_c("Est. orient.","Chagas")},
"10:10":{"1A":_c("Ed. Fís.","Anaelton"),"1B":_c("Química","França"),"1C":_c("Arte","Jaelson"),"2A":_c("Portug.","Patrícia"),"2B":_c("Ed. Fís.","Anaelton"),"2C":_c("Química","Deiviane"),"3A":_c("Geografia","Maurício"),"3B":_c("NTPPS","Augusto"),"3C":_c("Ling. ENEM","Luciene")},
"11:00":{"1A":_c("Arte","Jaelson"),"1B":_c("História","Flávio"),"1C":_c("Portug.","Patrícia"),"2A":_c("Química","França"),"2B":_c("Aprof. L.P.","Chagas"),"2C":_c("Portug.","Deuseline"),"3A":_c("Química","Deiviane"),"3B":_c("NTPPS","Augusto"),"3C":_c("Geografia","Maurício")},
"13:00":{"1A":_c("Cult. Dig.","Sílvia"),"1B":_c("História","Flávio"),"1C":_c("Espanhol","Elis"),"2A":_c("Ed. Fís.","Anaelton"),"2B":_c("Arte","Jaelson"),"2C":_c("Redação","Valéria"),"3A":_c("NTPPS","Maurício"),"3B":_c("Arte","Chagas"),"3C":_c("Inglês","Romário")},
"13:50":{"1A":_c("Redação","Deuseline"),"1B":_c("Arte","Jaelson"),"1C":_c("Geografia","Maurício"),"2A":_c("Aprof. L.P.","Chagas"),"2B":_c("Est. orient.","Valéria"),"2C":_c("Espanhol","Elis"),"3A":_c("Inglês","Romário"),"3B":_c("Ed. Fís.","Anaelton"),"3C":_c("História","Flávio")},
"14:55":{"1A":_c("Geometria I (plana)","Rita",{e:1}),"1B":_c("Criação literária","Graça",{e:1}),"1C":_c("Anatomia e fisiologia","Toinha",{e:1}),"2A":_c("IFA Ling.","Deuseline"),"2B":_c("Geografia","Maurício"),"2C":_c("Est. orient.","Valéria"),"3A":_c("Arte","Chagas"),"3B":_c("História","Flávio"),"3C":_c("Química","Deiviane")},
"15:45":{"1A":_c("Geometria I (plana)","Rita",{e:1}),"1B":_c("Criação literária","Graça",{e:1}),"1C":_c("Anatomia e fisiologia","Toinha",{e:1}),"2A":_c("Geografia","Maurício"),"2B":_c("Química","Deiviane"),"2C":_c("Arte","Jaelson"),"3A":_c("C.H. ENEM","Flávio"),"3B":_c("Inglês","Romário"),"3C":_c("Ed. Fís.","Anaelton")}
},
Quinta:{
"7:20":{"1A":_c("Portug.","Paloma"),"1B":_c("Portug.","Patrícia"),"1C":_c("NTPPS","Adriana"),"2A":_c("Redação","Chagas"),"2B":_c("Aprof. Mat.","Sáthylla"),"2C":_c("NTPPS","Toinha"),"3A":_c("Ed. Fís.","Anaelton"),"3B":_c("Matemát.","Cláudio"),"3C":_c("Portug.","Deuseline")},
"8:10":{"1A":_c("Cult. Dig.","Sílvia"),"1B":_c("Matemát.","Sáthylla"),"1C":_c("NTPPS","Adriana"),"2A":_c("Biologia","Naíla"),"2B":_c("Aprof. L.P.","Chagas"),"2C":_c("NTPPS","Toinha"),"3A":_c("Matemát.","Cláudio"),"3B":_c("Física","Josué"),"3C":_c("Redação","Luciene")},
"9:20":{"1A":_c("Matemát.","Cláudio"),"1B":_c("Matemát.","Sáthylla"),"1C":_c("Cult. Dig.","Sílvia"),"2A":_c("Ed. Fís.","Anaelton"),"2B":_c("Portug.","Paloma"),"2C":_c("Portug.","Deuseline"),"3A":_c("Física","Josué"),"3B":_c("Portug.","Luciene"),"3C":_c("Arte","Chagas")},
"10:10":{"1A":_c("Portug.","Paloma"),"1B":_c("NTPPS","Adriana"),"1C":_c("Cult. Dig.","Sílvia"),"2A":_c("Aprof. L.P.","Chagas"),"2B":_c("Ed. Fís.","Anaelton"),"2C":_c("Biologia","Naíla"),"3A":_c("Redação","Luciene"),"3B":_c("C.N. ENEM","Josué"),"3C":_c("Matemát.","Cláudio")},
"11:00":{"1A":_c("Matemát.","Cláudio"),"1B":_c("NTPPS","Adriana"),"1C":_c("Portug.","Patrícia"),"2A":_c("Física","Josué"),"2B":_c("Portug.","Paloma"),"2C":_c("Geografia","Maurício"),"3A":_c("Portug.","Luciene"),"3B":_c("Ed. Fís.","Anaelton"),"3C":_c("Biologia","Naíla")},
"13:00":{"1A":_c("Física","Edvan"),"1B":_c("Ed. Fís.","Anaelton"),"1C":_c("Inglês","Romário"),"2A":_c("IFA Ling.","Deuseline"),"2B":_c("Est. orient.","Valéria"),"2C":_c("Matemát.","Darly"),"3A":_c("Est. orient.","Chagas"),"3B":_c("Mat. ENEM","Murilo"),"3C":_c("Espanhol","Elis")},
"13:50":{"1A":_c("FCDCS","Edvan"),"1B":_c("Espanhol","Elis"),"1C":_c("Matemát.","Darly"),"2A":_c("IFA Ling.","Deuseline"),"2B":_c("Ed. Fís.","Anaelton"),"2C":_c("FCDCS","Valéria"),"3A":_c("Mat. ENEM","Murilo"),"3B":_c("Est. orient.","Chagas"),"3C":_c("Matemát.","Cláudio")},
"14:55":{"1A":_c("Competências comunicativas","Graça",{e:1}),"1B":_c("Geometria II (espacial)","Rita",{e:1}),"1C":_c("Primeiros socorros","Naíla",{e:1}),"2A":_c("AP em MT","Murilo"),"2B":_c("Matemát.","Darly"),"2C":_c("Est. orient.","Valéria"),"3A":_c("Cult. Dig.","Edvan"),"3B":_c("Ling. ENEM","Deuseline"),"3C":_c("Est. orient.","Chagas")},
"15:45":{"1A":_c("Competências comunicativas","Graça",{e:1}),"1B":_c("Geometria II (espacial)","Rita",{e:1}),"1C":_c("Primeiros socorros","Naíla",{e:1}),"2A":_c("Matemát.","Darly"),"2B":_c("Redação","Deuseline"),"2C":_c("Ed. Fís.","Anaelton"),"3A":_c("Cult. Dig.","Edvan"),"3B":_c("Matemát.","Cláudio"),"3C":_c("Mat. ENEM","Murilo")}
},
Sexta:{
"7:20":{"1A":_c("Portug.","Paloma"),"1B":_c("Matemát.","Sáthylla"),"1C":_c("Portug.","Patrícia"),"2A":_c("Matemát.","Darly"),"2B":_c("Filosofia","Kellysson"),"2C":_c("Cult. Dig.","Sílvia"),"3A":_c("FCDCS","Toinha"),"3B":_c("Portug.","Luciene"),"3C":_c("FCDCS","Deuseline")},
"8:10":{"1A":_c("Portug.","Paloma"),"1B":_c("Matemát.","Sáthylla"),"1C":_c("Matemát.","Darly"),"2A":_c("NTPPS","Augusto"),"2B":_c("História","Flávio"),"2C":_c("Cult. Dig.","Sílvia"),"3A":_c("Portug.","Luciene"),"3B":_c("FCDCS","Romário"),"3C":_c("Ed. Fís.","Anaelton")},
"9:20":{"1A":_c("Filosofia","Kellysson"),"1B":_c("Portug.","Patrícia"),"1C":_c("Ed. Fís.","Anaelton"),"2A":_c("NTPPS","Augusto"),"2B":_c("Aprof. Mat.","Sáthylla"),"2C":_c("Matemát.","Darly"),"3A":_c("Ling. ENEM","Deuseline"),"3B":_c("C.H. ENEM","Flávio"),"3C":_c("C.N. ENEM","Naíla")},
"10:10":{"1A":_c("Inglês","Elisângela"),"1B":_c("Cult. Dig.","Sílvia"),"1C":_c("Biologia","Naíla"),"2A":_c("Est. orient.","Deuseline"),"2B":_c("Sociol.","Emília"),"2C":_c("Filosofia","Kellysson"),"3A":_c("Ed. Fís.","Anaelton"),"3B":_c("NTPPS","Augusto"),"3C":_c("C.H. ENEM","Flávio")},
"11:00":{"1A":_c("Ed. Fís.","Anaelton"),"1B":_c("Cult. Dig.","Sílvia"),"1C":_c("FCDCS","Adriana"),"2A":_c("Portug.","Patrícia"),"2B":_c("Matemát.","Darly"),"2C":_c("Sociol.","Emília"),"3A":_c("História","Flávio"),"3B":_c("NTPPS","Augusto"),"3C":_c("Física","Josué")},
"13:00":{"1A":_c("Física","Edvan"),"1B":_c("Ed. Fís.","Anaelton"),"1C":_c("Filosofia","Kellysson"),"2A":_c("História","Flávio"),"2B":_c("IFA Mat.","Murilo"),"2C":_c("Aprof. L.P.","Deuseline"),"3A":_c("NTPPS","Maurício"),"3B":_c("Redação","Luciene"),"3C":_c("Espanhol","Elis")},
"13:50":{"1A":_c("Ed. Fís.","Anaelton"),"1B":_c("Filosofia","Kellysson"),"1C":_c("Est. orient.","Romário"),"2A":_c("Inglês","Romário"),"2B":_c("IFA Mat.","Murilo"),"2C":_c("Aprof. L.P.","Deuseline"),"3A":_c("NTPPS","Maurício"),"3B":_c("Física","Josué"),"3C":_c("Ling. ENEM","Luciene")},
"14:55":{"1A":_c("Clube","Graça",{e:1}),"1B":_c("Clube","Jaelson",{e:1}),"1C":_c("Clube","Edvan",{e:1}),"2A":_c("Cult. Dig.","Sílvia"),"2B":_c("Física","Josué"),"2C":_c("IFA C.H.","Flávio"),"3A":_c("Mat. ENEM","Murilo"),"3B":_c("Espanhol","Elis"),"3C":_c("Portug.","Deuseline")},
"15:45":{"1A":_c("Clube","Graça",{e:1}),"1B":_c("Clube","Jaelson",{e:1}),"1C":_c("Clube","Edvan",{e:1}),"2A":_c("Cult. Dig.","Sílvia"),"2B":_c("Geografia","Maurício"),"2C":_c("IFA C.H.","Flávio"),"3A":_c("Física","Josué"),"3B":_c("Mat. ENEM","Murilo"),"3C":_c("Ed. Fís.","Anaelton")}
}
};
