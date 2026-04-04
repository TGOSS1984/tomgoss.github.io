const personal = {
  intro: {
    eyebrow: "Personal",
    title: "Beyond the build",
    summary:
      "A personal snapshot of the interests, environments, and creative influences that sit alongside my technical work.",
  },

  interests: [
    {
      id: "mountains",
      title: "Hiking, mountaineering, and climbing",
      text: "Mountain environments, scrambling, winter routes, and climbing are a huge part of what keeps me motivated. They influence both the themes I build around and the kind of challenge I enjoy.",
      type: "topo",
    },
    {
      id: "games-books-films",
      title: "Games, films, and books",
      text: "I am drawn to strong worlds, atmosphere, storytelling, and visual identity — whether that is in games, cinema, or novels.",
      type: "media-fan",
      mediaStack: [
        "/assets/images/personal/media-stack/dark-souls-3.jpg",
        "/assets/images/personal/media-stack/interstellar.jpg",
        "/assets/images/personal/media-stack/horus-heresy.jpg",
        "/assets/images/personal/media-stack/elden-ring.jpg",
        "/assets/images/personal/media-stack/lord-of-the-rings.jpg",
        "/assets/images/personal/media-stack/final-fantasy-7.jpg",
      ],
    },
    {
      id: "miniatures",
      title: "Miniature painting and 3D printing",
      text: "I enjoy the craft side of hobbies too — painting miniatures, experimenting with models, and the creativity of making something tangible.",
      image: "/assets/images/personal/miniatures.webp",
      imageLabel: "Craft & detail",
      paintReveal: true,
    },
    {
      id: "music",
      title: "Music and learning guitar",
      text: "Still very much a beginner, but learning guitar adds another creative outlet and keeps me in a beginner mindset — which is useful in tech too.",
      image: "/assets/images/personal/guitar.webp",
      imageLabel: "Learning by doing",
    },
    {
      id: "family",
      title: "Family and balance",
      text: "A lot of what matters most sits outside work: family, personal growth, and building a life that feels grounded as well as ambitious.",
      type: "family-sketch",
    },
  ],
};

export default personal;