
export interface Flashcard {
  id: string;
  question: string;
  answer: string;
  topic: Topic;
}

export enum Topic {
  CONSTITUTIONAL = "Direito Constitucional",
  CIVIL = "Direito Civil",
  PENAL = "Direito Penal",
  ADMINISTRATIVE = "Direito Administrativo",
  TAX = "Direito Tributário",
  LABOR = "Direito do Trabalho",
  COMMERCIAL = "Direito Empresarial",
  PROCEDURAL_CIVIL = "Direito Processual Civil",
  PROCEDURAL_PENAL = "Direito Processual Penal",
  ETHICS = "Ética Profissional"
}

export const flashcards: Flashcard[] = [
  {
    id: "1",
    question: "Quais são os direitos fundamentais elencados no Art. 5º da Constituição Federal?",
    answer: "Os direitos à vida, à liberdade, à igualdade, à segurança e à propriedade, entre outros.",
    topic: Topic.CONSTITUTIONAL
  },
  {
    id: "2",
    question: "O que é capacidade civil?",
    answer: "É a aptidão para exercer, por si mesmo, os atos da vida civil. A capacidade plena é adquirida aos 18 anos completos.",
    topic: Topic.CIVIL
  },
  {
    id: "3",
    question: "O que caracteriza o crime culposo?",
    answer: "O crime culposo ocorre quando o agente dá causa ao resultado por imprudência, negligência ou imperícia.",
    topic: Topic.PENAL
  },
  {
    id: "4",
    question: "Quais são os princípios da Administração Pública explícitos na Constituição Federal?",
    answer: "Legalidade, impessoalidade, moralidade, publicidade e eficiência (LIMPE).",
    topic: Topic.ADMINISTRATIVE
  },
  {
    id: "5",
    question: "O que é o fato gerador no Direito Tributário?",
    answer: "É a situação definida em lei como necessária e suficiente para o surgimento da obrigação tributária.",
    topic: Topic.TAX
  },
  {
    id: "6",
    question: "Qual é o prazo prescricional para reclamar créditos trabalhistas?",
    answer: "5 anos para trabalhadores urbanos e rurais, até o limite de 2 anos após a extinção do contrato de trabalho.",
    topic: Topic.LABOR
  },
  {
    id: "7",
    question: "O que é uma sociedade limitada?",
    answer: "É um tipo societário em que a responsabilidade de cada sócio é restrita ao valor de suas quotas, mas todos respondem solidariamente pela integralização do capital social.",
    topic: Topic.COMMERCIAL
  },
  {
    id: "8",
    question: "O que é a petição inicial?",
    answer: "É a peça processual que dá início ao processo, contendo os fundamentos de fato e de direito do pedido, o pedido e as provas com que o autor pretende demonstrar a verdade dos fatos.",
    topic: Topic.PROCEDURAL_CIVIL
  },
  {
    id: "9",
    question: "O que é o inquérito policial?",
    answer: "É um procedimento administrativo preliminar, de caráter inquisitório, que tem por objetivo colher elementos sobre a existência do crime e sua autoria para servir de base à ação penal.",
    topic: Topic.PROCEDURAL_PENAL
  },
  {
    id: "10",
    question: "Quais são os deveres fundamentais do advogado conforme o Código de Ética?",
    answer: "Preservar os segredos do cliente, atuar com honestidade, veracidade, lealdade e boa-fé, ser leal à instituição a que serve e aos colegas de profissão, entre outros.",
    topic: Topic.ETHICS
  },
  {
    id: "11",
    question: "O que é o habeas corpus?",
    answer: "É uma garantia constitucional que visa proteger a liberdade de locomoção do indivíduo quando há violência, coação ilegal ou abuso de poder.",
    topic: Topic.CONSTITUTIONAL
  },
  {
    id: "12",
    question: "O que é usucapião?",
    answer: "É modo de aquisição da propriedade ou de direitos reais pela posse prolongada da coisa, de acordo com requisitos legais.",
    topic: Topic.CIVIL
  }
];

export const topicColors = {
  [Topic.CONSTITUTIONAL]: "bg-blue-100 text-blue-800",
  [Topic.CIVIL]: "bg-green-100 text-green-800",
  [Topic.PENAL]: "bg-red-100 text-red-800",
  [Topic.ADMINISTRATIVE]: "bg-purple-100 text-purple-800",
  [Topic.TAX]: "bg-yellow-100 text-yellow-800",
  [Topic.LABOR]: "bg-indigo-100 text-indigo-800",
  [Topic.COMMERCIAL]: "bg-orange-100 text-orange-800",
  [Topic.PROCEDURAL_CIVIL]: "bg-teal-100 text-teal-800",
  [Topic.PROCEDURAL_PENAL]: "bg-pink-100 text-pink-800",
  [Topic.ETHICS]: "bg-gray-100 text-gray-800",
};
