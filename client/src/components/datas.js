const responses = [
  {
    id: 1,
    texte:
      "vous pouvez vous retrouver à la fin du cours pour en discuter entre vous et trouver une solution.",
    points: -1,
    notes: "note 1",
    endGame: false,
  },
  {
    id: 2,
    texte: "nous avons assez perdu de temps comme ça, au travail…",
    points: -2,
    notes: "note 2",
    endGame: false,
  },
  {
    id: 3,
    texte:
      "je vous promets que nous prendrons le prochain cours pour aborder cette question",
    points: 0,
    notes: "note 3",
    endGame: false,
  },
  {
    id: 4,
    texte:
      "vous prendrez la parole lors du prochain cours pour nous expliquer comment vous voyez la chose.",
    points: -1,
    notes: "note 4",
    endGame: false,
  },
  {
    id: 5,
    texte:
      "Changer la composition des groupes de travail pour chaque nouvelle heure de cours",
    points: 0,
    notes: "note 5",
    endGame: true,
  },
  {
    id: 6,
    texte:
      "Imposer que chaque groupe de travail inclue obligatoirement, un ou une étudiante qui n’est pas Suisse de naissance",
    points: -2,
    notes: "note 6",
    endGame: true,
  },
];

const steps = [
  {
    teacher: [
      {
        text:
          "Bonjour, avant d’avancer dans le programme, je voudrais savoir si vous avez des questions concernant le sujet que nous avons abordé lors de notre dernier cours.",
        studentNext: true,
      },
      {
        text:
          "Merci pour votre honnêteté, comme j’aime à vous le répéter, il n’y a pas de mauvaises questions, et de toute façon, je suis là pour ça… ",
        studentNext: false,
      },
      {
        text: "Quel est le point particulier qui vous pose un problème ?",
        studentNext: true,
      },
      {
        text:
          "Ah ! Je vois, je peux imaginer que vous n’êtes pas le seul dans ce cas.",
        studentNext: false,
      },
      {
        text:
          "Je vous propose donc de former des petits groupes de trois ou quatre personnes pour réaliser des modèles de prédiction qui seront utilisés dans le domaine de la vente et de la location immobilière.",
        studentNext: false,
      },
      {
        text: "Des questions ?",
        studentNext: false,
      },
      {
        text: "Bien alors au travail, formez les groupes…",
        studentNext: true,
      },
      {
        text:
          "Bon, écoutez, ce n’est pas un cours de philosophie ou de littérature,",
        studentNext: false,
      },
      {
        text:
          "nous sommes ici pour comprendre comment fonctionnent les sciences de données,",
        studentNext: false,
      },
      {
        text:
          "dépêchez-vous de former vos groupes, nous ne pouvons pas nous permettre de perdre du temps pour ce genre de question",
        studentNext: true,
        askQuestion: true,
      },
    ],
    student: [
      {
        text:
          "Monsieur, j’ai du mal, à voir comment nous pourrions appliquer ce que vous nous avez enseigné de façon concrète.",
        teacherNext: true,
      },
      {
        text:
          "Je n’ai pas bien compris comment utiliser l’algorithme de la régression linéaire…",
        teacherNext: true,
      },
      {
        text:
          "Monsieur, une autre question, ce n’est pas une question concernant le cours.",
        teacherNext: false,
      },
      {
        text:
          "Chaque fois que nous travaillons par petit groupe, je me retrouve systématiquement avec les trois autres personnes qui ne sont pas blanches dans notre classe.",
        teacherNext: true,
      },
    ],
  },
  {
    teacher: [
      {
        text:
          "D’accord, d’accord, il ne faut pas vous mettre dans cet état, si c’est tellement important pour vous.",
        studentNext: false,
      },
      {
        text: "Je suis désolé de ne pas l’avoir compris avant.",
        studentNext: false,
      },
      {
        text:
          "Nous pourrons en parler tous ensemble et réfléchir aux différentes possibilités de résoudre cette situation.",
        studentNext: false,
      },
      {
        text:
          "Mais peut-être que le plus efficace serait de commencer par vous laisser exposer en détail ce qui vous dérange dans ce cas,",
        studentNext: false,
      },
      {
        text:
          "puisqu’il me semble que vous êtes le premier concerné et que vous avez la langue bien pendue",
        studentNext: true,
        askQuestion: true,
      },
    ],
    student: [
      {
        text:
          "Excusez-moi, monsieur, mais avec tout le respect que je vous dois, je dirais que c’est un peu facile de nous jeter la patate chaude. ",
        teacherNext: false,
      },
      {
        text:
          "Si j’ai bien compris, cette question n’est tellement pas importante pour vous, que c’est à nous de nous débrouiller avec.",
        teacherNext: false,
      },
      {
        text:
          "Il me semble pourtant que cette problématique fait partie de l’enseignement, même si nous ne sommes pas dans un cours de sciences humaine.",
        teacherNext: false,
      },
      {
        text:
          "Ce serait réellement utile que vous nous proposiez une méthodologie pour traiter cette question.",
        teacherNext: true,
      },
    ],
  },
  {
    teacher: [
      {
        text:
          "Je comprends, je n’avais pas vu les choses sous cet angle et je ne voulais pas vous mettre mal à l’aise.",
        studentNext: false,
      },
      {
        text:
          "Je vais réfléchir à des propositions concrètes à mettre en place.",
        studentNext: false,
      },
      {
        text:
          "Nous pourrions faire ce changement pendant une session que nous pourrions partager en deux ou trois périodes, cela permettrait à chacun de travailler un moment avec tous les étudiants de la classe.",
        studentNext: false,
      },
      {
        text:
          "Maintenant, si mes propositions ne vous conviennent pas, je pourrais aussi appliquer une méthode beaucoup plus simple et qui ne nous ferait pas perdre de temps en discussions inutiles.",
        studentNext: false,
      },
      {
        text: "La question serait ainsi rapidement réglée…",
        studentNext: false,
        askQuestion: true,
      },
    ],
    student: [
      {
        text:
          "Heueu… je ne suis pas d’accord, monsieur, cette situation est déjà suffisamment embarrassante pour moi, et vous voudriez qu’en plus ce soit moi qui m’impose à la classe pour proposer des solutions, ce n’est pas mon rôle, je voudrais juste pouvoir m’intégrer plus facilement dans cette classe.",
        teacherNext: true,
      },
    ],
  },
];
export { responses, steps };
