window.raivData = {
  institution: {
    university: "Kumoh National Institute of Technology",
    universityLabel: "Kumoh National Institute of Technology (KIT)",
    school: "School of Electronic Engineering",
    universityHref: "https://eng.kumoh.ac.kr/eng/index.do?sso=ok",
    schoolHref: "https://see.kumoh.ac.kr",
  },
  lab: {
    name: "Robotics and AI Vision Lab",
    shortName: "RAIV Lab",
    tagline: "Vision-Based Embodied Intelligence",
    mission:
      "We aim to pioneer vision-based embodied intelligence, enabling next-generation robots to seamlessly adapt to complex and dynamic human environments.",
  },
  brand: {
    homeHref: "index.html",
    ariaLabel: "RAIV Lab home",
    logoSrc: "assets/logo-symbol.png",
    subpageLogoSrc: "assets/logo-wordmark.png",
    logoAlt: "RAIV Lab",
  },
  navItems: [
    { key: "home", label: "Home", href: "index.html" },
    { key: "people", label: "People", href: "people.html" },
    { key: "projects", label: "Research", href: "projects.html" },
    { key: "publications", label: "Publications", href: "publications.html" },
    { key: "album", label: "Album", href: "album.html" },
    { key: "news", label: "News", href: "news.html" },
    { key: "contact", label: "Contact", href: "contact.html" },
  ],
  pages: {
    home: {
      hero: {
        title: "Robotics and AI Vision Lab",
        logoSrc: "assets/logo-lockup-wide.png",
        logoAlt: "",
        mission: [
          { text: "At " },
          { text: "RAIV", strong: true, accent: true },
          { text: " Lab", strong: true },
          { text: ", we aim to pioneer " },
          { text: "Vision-Based Embodied Intelligence", strong: true },
          { text: ", enabling next-generation robots to " },
          { text: "seamlessly adapt to complex and dynamic human environments", strong: true },
          { text: "." },
        ],
      },
      sections: {
        latestResearch: {
          title: "Latest Research",
          linkLabel: "All research",
          href: "projects.html",
        },
        latestNews: {
          title: "Latest News",
          linkLabel: "All news",
          href: "news.html",
        },
      },
    },
    projects: { title: "Research" },
    people: { title: "Current Members" },
    publications: { title: "Publications" },
    album: { title: "Gallery" },
    news: { title: "News" },
    contact: { title: "Contact" },
    join: { title: "Join Us" },
    calendar: { title: "Calendar" },
  },
  calendar: {
    embedSrc: "https://calendar.google.com/calendar/embed?src=jmong1994%40gmail.com&ctz=Asia%2FSeoul",
    title: "RAIV Lab Google Calendar",
  },
  contactPage: {
    title: "Contact Information",
    email: "mhjeon@kumoh.ac.kr",
    phone: "+82-54-478-7454",
    phoneHref: "tel:+82544787454",
    addressKr: "(39177) 경북 구미시 대학로 61 국립금오공과대학교 디지털관 204호",
    addressEn:
      "Room 204, Digital Hall, Kumoh National Institute of Technology, 61 Daehak-ro, Gumi, Gyeongbuk 39177, Korea",
    mapTitle: "Kumoh National Institute of Technology Digital Hall",
    mapEmbedSrc:
      "https://www.google.com/maps?q=Room%20204%2C%20Digital%20Hall%2C%20Kumoh%20National%20Institute%20of%20Technology%2C%2061%20Daehak-ro%2C%20Gumi-si%2C%20Gyeongsangbuk-do%2C%2039177%2C%20Republic%20of%20Korea&output=embed",
  },
  recruiting: {
    // Change this to "open" when RAIV Lab is actively recruiting students.
    status: "open",
    title: "Open Positions",
    states: {
      open: {
        summary: "We are looking for motivated undergraduate and graduate students to join our research team.",
        ctaLabel: "Join RAIV Lab",
        ctaHref: "join.html",
      },
      closed: {
        hidden: true,
        ctaLabel: "",
        ctaHref: "",
      },
    },
    bullets: [
      "Undergraduate research opportunities",
      "Integrated B.S.-M.S. program",
      "M.S. and Ph.D. positions",
    ],
  },
  albums: [
    {
      title: "2026년 한국로봇종합학술대회 참석",
      date: "2026.02.04-2026.02.06",
      imageSrc: "assets/사진/앨범/KROC2026.jpg",
      imageAlt: "2026년 한국로봇종합학술대회 참석",
    },
    {
      title: "2026년 구미고등학교 프로그래밍 수업",
      date: "2026.01.08-2026.01.27",
      imageSrc: "assets/사진/앨범/구미고.jpg",
      imageAlt: "2026년 구미고등학교 프로그래밍 수업",
    },
    {
      title: "2025년 전자공학회 추계학술대회 참석",
      date: "2025.11.28",
      imageSrc: "assets/사진/앨범/전자공학회_추계학술대회_2025.jpg",
      imageAlt: "2025년 전자공학회 추계학술대회 참석",
    },
  ],
  links: [
    {
      label: "School",
      href: "https://see.kumoh.ac.kr",
    },
    {
      label: "University",
      href: "https://eng.kumoh.ac.kr/eng/index.do?sso=ok",
    },
    {
      label: "Email",
      href: "mailto:mhjeon@kumoh.ac.kr",
    },
  ],
  projects: [
    {
      venue: "Under Review",
      title: "Kitchen Robotic Manipulation utilizing Foundation Models",
      authors: "Myung-Hwan Jeon, Sankalp Yamsani, and Joohyung Kim",
      summary: "Under Review.",
      href: "https://raivlab.github.io/FM_kitchen/",
      linkLabel: "Project",
      youtubeHref: "https://www.youtube.com/watch?v=tYHywdV1Nvs",
      links: [{ label: "Project", href: "https://raivlab.github.io/FM_kitchen/" }],
    },
    {
      venue: "ICCV 2025",
      title:
        "TRAN-D: 2D Gaussian Splatting-based Sparse-view Transparent Object Depth Reconstruction via Physics Simulation for Scene Update",
      authors: "Hyeonjae Gil, Myung-Hwan Jeon, and Ayoung Kim",
      summary:
        "IEEE/CVF International Conference on Computer Vision, 2025.",
      href: "https://arxiv.org/pdf/2507.11069",
      linkLabel: "Paper",
      youtubeHref: "https://www.youtube.com/watch?v=R_Ixk3i_09g",
      links: [
        { label: "Code", href: "https://github.com/jeongyun0609/TRAN-D" },
        { label: "Paper", href: "https://arxiv.org/pdf/2507.11069" },
      ],
    },
    {
      venue: "ISR 2024",
      title: "Imaging radar and LiDAR Image Translation for 3-DOF Extrinsic Calibration",
      authors: "Sangwoo Jung, Hyesu Jang, Minwoo Jung, Ayoung Kim, and Myung-Hwan Jeon",
      summary: "Intelligent Service Robotics, 17, pp.167-179, 2024.",
      href: "https://link.springer.com/article/10.1007/s11370-023-00498-y",
      imageSrc: "assets/%EC%82%AC%EC%A7%84/isr.jpg",
      imageAlt: "Imaging radar and LiDAR translation teaser",
      linkLabel: "Paper",
      links: [
        {
          label: "Paper",
          href: "https://link.springer.com/article/10.1007/s11370-023-00498-y",
        },
      ],
    },
    {
      venue: "RA-L 2024",
      title: "Fieldscale: Locality-Aware Field-based Adaptive Rescaling for Thermal Infrared Image",
      authors: "Hyeonjae Gil, Myung-Hwan Jeon, and Ayoung Kim",
      summary: "IEEE Robotics and Automation Letters, 9(7), pp.6424-6431, 2024.",
      href: "https://arxiv.org/pdf/2405.15395",
      linkLabel: "Paper",
      youtubeHref: "https://www.youtube.com/watch?v=xe7sFsw655c",
      links: [
        { label: "Code", href: "https://github.com/HyeonJaeGil/fieldscale" },
        {
          label: "Paper",
          href: "https://arxiv.org/pdf/2405.15395",
        },
      ],
    },
    {
      venue: "CVPR 2024 Highlight",
      title: "DiscoCal: Unbiased Estimator for Distorted Conics in Camera Calibration",
      authors: "Chaehyeon Song, Jaeho Shin, Myung-Hwan Jeon, Jongwoo Lim, and Ayoung Kim",
      summary: "IEEE/CVF Conference on Computer Vision and Pattern Recognition, 2024.",
      href: "https://arxiv.org/pdf/2403.04583",
      linkLabel: "Paper",
      youtubeHref: "https://www.youtube.com/watch?v=87_R7Qkpczo",
      links: [
        { label: "Code", href: "https://github.com/chaehyeonsong/discocal" },
        {
          label: "Paper",
          href: "https://arxiv.org/pdf/2403.04583",
        },
      ],
    },
    {
      venue: "RA-L 2024",
      title: "LodeStar: Maritime Radar Descriptor for Semi-Direct Radar Odometry",
      authors: "Hyesu Jang, Minwoo Jung, Myung-Hwan Jeon, and Ayoung Kim",
      summary: "IEEE Robotics and Automation Letters, 9(2), pp.1684-1691, 2024.",
      href: "https://ieeexplore.ieee.org/document/10380692",
      linkLabel: "Paper",
      youtubeHref: "https://www.youtube.com/watch?v=YRMNGUgaGSI",
      links: [
        { label: "Code", href: "https://github.com/hyesu-jang/LodeStar" },
        {
          label: "Paper",
          href: "https://ieeexplore.ieee.org/document/10380692",
        },
      ],
    },
    {
      venue: "IJRR 2024",
      title: "TRansPose: Large-Scale Multispectral Dataset for Transparent Object",
      authors: "Myung-Hwan Jeon, Jeongyun Kim, Sangwoo Jung, Wooseong Yang, Minwoo Jung, Jaeho Shin, and Ayoung Kim",
      summary: "The International Journal of Robotics Research, 43(6), pp.731-738, 2024.",
      href: "https://sites.google.com/view/transpose-dataset/home",
      imageSrc: "assets/%EC%82%AC%EC%A7%84/transpose.jpg",
      imageAlt: "TRansPose dataset teaser",
      linkLabel: "Project",
      links: [
        { label: "Project", href: "https://sites.google.com/view/transpose-dataset/home" },
        {
          label: "Paper",
          href: "https://arxiv.org/abs/2307.05016",
        },
      ],
    },
    {
      venue: "ICRA 2023",
      title: "Edge-guided Multi-domain RGB-to-TIR image Translation for Training Vision Tasks with Challenging Labels",
      authors: "Dong-Guw Lee, Myung-Hwan Jeon, Younggun Cho, and Ayoung Kim",
      summary: "IEEE International Conference on Robotics and Automation (ICRA), 2023.",
      href: "https://arxiv.org/abs/2301.12689",
      linkLabel: "Paper",
      youtubeHref: "https://www.youtube.com/watch?v=zq8Qh9ygm6w",
      links: [
        { label: "Code", href: "https://github.com/RPM-Robotics-Lab/sRGB-TIR" },
        {
          label: "Paper",
          href: "https://arxiv.org/abs/2301.12689",
        },
      ],
    },
    {
      venue: "RA-L 2023",
      title: "PrimA6D++: Ambiguity-Aware Multi-Object Pose Optimization for Visually-Assisted Robot Manipulation",
      authors: "Myung-Hwan Jeon, Jeongyun Kim, Jee-Hwan Ryu, and Ayoung Kim",
      summary: "IEEE Robotics and Automation Letters, 8(1), pp.137-144, 2023.",
      href: "https://arxiv.org/abs/2211.00960",
      linkLabel: "Paper",
      youtubeHref: "https://www.youtube.com/watch?v=akbI61jUJgY",
      links: [
        { label: "Code", href: "https://github.com/MyungHwanJeon/PrimA6D" },
        {
          label: "Paper",
          href: "https://arxiv.org/abs/2211.00960",
        },
      ],
    },
    {
      venue: "IROS 2022",
      title: "STheReO: Stereo Thermal Dataset for Research in Odometry and Mapping",
      authors: "Joowan Kim, Myung-Hwan Jeon, Younggun Cho, and Ayoung Kim",
      summary: "IEEE/RSJ International Conference on Intelligent Robots and Systems, 2022.",
      href: "https://sites.google.com/view/rpmsthereo/",
      imageSrc: "assets/%EC%82%AC%EC%A7%84/sthereo.jpg",
      imageAlt: "STheReO dataset teaser",
      linkLabel: "Project",
      links: [
        { label: "Project", href: "https://sites.google.com/view/rpmsthereo/" },
        {
          label: "Paper",
          href: "https://ieeexplore.ieee.org/document/9981857",
        },
      ],
    },
    {
      venue: "IROS 2022 Poster",
      title: "Measuring Prediction Reliabilty on 6D Object Pose Estimation",
      authors: "Myung-Hwan Jeon and Ayoung Kim",
      summary: "IEEE/RSJ International Conference on Intelligent Robots and Systems, 2022.",
      href: "https://www.youtube.com/watch?v=qSHd3oweD34",
      linkLabel: "YouTube",
      youtubeHref: "https://www.youtube.com/watch?v=qSHd3oweD34",
      links: [],
    },
    {
      venue: "RA-L 2020",
      title: "PrimA6D: Rotational Primitive Reconstruction for Enhanced and Robust 6D Pose Estimation",
      authors: "Myung-Hwan Jeon and Ayoung Kim",
      summary: "IEEE Robotics and Automation Letters, 5(3), pp.4955-4962, 2020.",
      href: "https://arxiv.org/abs/2006.07789",
      linkLabel: "Paper",
      youtubeHref: "https://www.youtube.com/watch?v=HbNmsmTLRmk",
      links: [
        { label: "Code", href: "https://github.com/MyungHwanJeon/PrimA6D" },
        {
          label: "Paper",
          href: "https://arxiv.org/abs/2006.07789",
        },
      ],
    },
    {
      venue: "RA-L 2020",
      title: "Dark Synthetic Vision: Lightweight Active Vision to Navigate in the Dark",
      authors: "Joowan Kim, Myung-Hwan Jeon, Younggun Cho, and Ayoung Kim",
      summary: "IEEE Robotics and Automation Letters, 5(3), pp.4955-4962, 2020.",
      href: "https://ieeexplore.ieee.org/document/9246220",
      linkLabel: "Paper",
      youtubeHref: "https://www.youtube.com/watch?v=XmmJBgy5PbQ",
      links: [
        {
          label: "Paper",
          href: "https://ieeexplore.ieee.org/document/9246220",
        },
      ],
    },
  ],
  faculty: {
    name: "Myung-Hwan Jeon",
    title: "Assistant Professor | Ph.D.",
    imageSrc: "assets/사진/전명환.jpg",
    imageAlt: "Portrait of Myung-Hwan Jeon",
    affiliationLinks: [
      { label: "School of Electronic Engineering", href: "https://see.kumoh.ac.kr/see/index.do" },
      { label: "KIT", href: "https://eng.kumoh.ac.kr/eng/index.do" },
    ],
    email: "mhjeon@kumoh.ac.kr",
    educationItems: [
      { degree: "Ph.D.", year: "2023", school: "KAIST", href: "https://www.kaist.ac.kr/en/" },
      { degree: "M.S.", year: "2020", school: "KAIST", href: "https://www.kaist.ac.kr/en/" },
      { degree: "B.S.", year: "2017", school: "Kwangwoon Univ.", href: "https://www.kw.ac.kr/ko/#" },
    ],
    careerItems: [
      {
        role: "Postdoc",
        years: "2024-2025",
        lab: "KIMLAB",
        labHref: "https://publish.illinois.edu/kimlab2020/",
        institution: "UIUC",
        institutionHref: "https://illinois.edu/",
      },
      {
        role: "Postdoc",
        years: "2023-2024",
        lab: "RPM Robotics Lab",
        labHref: "https://rpm.snu.ac.kr/",
        institution: "SNU",
        institutionHref: "https://en.snu.ac.kr/index.html",
      },
    ],
    links: [
      { label: "Scholar", href: "https://scholar.google.com/citations?user=ivOqySYAAAAJ&hl=en" },
      { label: "GitHub", href: "https://github.com/MyungHwanJeon" },
      { label: "LinkedIn", href: "https://www.linkedin.com/in/myung-hwan-jeon-544613219/" },
      { label: "CV", href: "https://drive.google.com/file/d/1L7OpdVD1cdZDKbX8sfDh40tDzGsJs8z3/view?usp=drive_link" },
      { label: "Calendar", href: "calendar.html" },
    ],
  },
  people: [
    {
      name: "Chan-Hyeok Park",
      role: "Integrated BS-MS Program",
      email: "sun5408@kumoh.ac.kr",
      imageSrc: "assets/사진/박찬혁.jpg",
      imageAlt: "Portrait of Chan-Hyeok Park",
    },
    {
      name: "Tae-Jun Kim",
      role: "Undergraduate Student",
      email: "20210338@kumoh.ac.kr",
      imageSrc: "assets/사진/김태준.jpg",
      imageAlt: "Portrait of Tae-Jun Kim",
    },
    {
      name: "Dong-Sik Yoon",
      role: "Undergraduate Student",
      email: "yoon00@kumoh.ac.kr",
      imageSrc: "assets/사진/윤동식.jpg",
      imageAlt: "Portrait of Dong-Sik Yoon",
    },
    {
      name: "Chanhyo Kim",
      role: "Undergraduate Student",
      email: "wktlr1239@kumoh.ac.kr",
      imageSrc: "assets/사진/김찬효.jpg",
      imageAlt: "Portrait of Chanhyo Kim",
    },
    {
      name: "Eui-Jin Oh",
      role: "Undergraduate Student",
      email: "dhdmlwls07@kumoh.ac.kr",
      imageSrc: "assets/사진/오의진.jpg",
      imageAlt: "Portrait of Eui-Jin Oh",
    },
    {
      name: "Jeongwook Park",
      role: "Undergraduate Student",
      email: "jeongug2217@kumoh.ac.kr",
      imageSrc: "assets/사진/박정욱.jpg",
      imageAlt: "Portrait of Jeongwook Park",
    },
        {
      name: "Gyeongmun Lee",
      role: "Undergraduate Student",
      email: "20210772@kumoh.ac.kr",
      imageSrc: "assets/사진/이경문.jpg",
      imageAlt: "Portrait of Gyeongmun Lee",
    },
  ],
  publications: [
    {
      year: 2025,
      title:
        "TRAN-D: 2D Gaussian Splatting-based Sparse-view Transparent Object Depth Reconstruction via Physics Simulation for Scene Update",
      authors:
        "Jeongyun Kim, Seunghoon Jeong, Giseop Kim, Myung-Hwan Jeon, Eunji Jun, and Ayoung Kim",
      venue: "IEEE/CVF International Conference on Computer Vision (ICCV), 2025",
      href: "https://arxiv.org/pdf/2507.11069",
    },
    {
      year: 2024,
      title: "Unbiased Estimator for Distorted Conic in Camera Calibration",
      authors:
        "Chaehyeon Song, Jaeho Shin, Myung-Hwan Jeon, Jongwoo Lim, and Ayoung Kim",
      venue: "IEEE/CVF Conference on Computer Vision and Pattern (CVPR) - Highlight, 2024",
      href: "https://arxiv.org/abs/2403.04583",
    },
    {
      year: 2024,
      title: "Imaging radar and LiDAR Image Translation for 3-DOF Extrinsic Calibration",
      authors:
        "Sangwoo Jung, Hyesu Jang, Minwoo Jung, Ayoung Kim, and Myung-Hwan Jeon",
      venue: "Intelligent Service Robotics (ISR), 2024",
      href:
        "https://link.springer.com/article/10.1007/s11370-023-00498-y?utm_source=rct_congratemailt&utm_medium=email&utm_campaign=oa_20240103&utm_content=10.1007%2Fs11370-023-00498-y",
    },
    {
      year: 2024,
      title: "LodeStar: Maritime Radar Descriptor for Semi-Direct Radar Odometry",
      authors: "Hyesu Jang, Minwoo Jung, Myung-Hwan Jeon, and Ayoung Kim",
      venue: "IEEE Robotics and Automation Letters (RA-Letters), 2024",
      href: "https://ieeexplore.ieee.org/document/10380692",
    },
    {
      year: 2024,
      title: "Fieldscale: Locality-Aware Field-based Adaptive Rescaling for Thermal Infrared Image",
      authors: "Hyeonjae Gil, Myung-Hwan Jeon, and Ayoung Kim",
      venue: "IEEE Robotics and Automation Letters (RA-Letters), 2024",
      href: "https://arxiv.org/pdf/2405.15395",
    },
    {
      year: 2024,
      title: "자율 주행에서 단일 센서 성능 향상을 위한 FMCW 스캐닝 레이더 노이즈 제거",
      authors: "양우성, 전명환, 김아영",
      venue: "로봇학회 논문지, 2024",
      href: "https://jkros.org/xml//37542/37542.pdf",
    },
    {
      year: 2024,
      title: "열화상 이미지 히스토그램의 가우시안 혼합 모델 근사를 통한 열화상-관성 센서 오도메트리",
      authors: "신재호, 전명환, 김아영",
      venue: "로봇학회 논문지, 2024",
      href: "https://jkros.org/xml//37541/37541.pdf",
    },
    {
      year: 2023,
      title:
        "Edge-guided multi-domain rgb-to-tir image translation for training vision tasks with challenging labels",
      authors: "Dong–Guw Lee, Myung-Hwan Jeon, Younggun Cho, and Ayoung Kim",
      venue: "IEEE International Conference on Robotics and Automation (ICRA), 2023",
      href: "https://arxiv.org/abs/2301.12689",
    },
    {
      year: 2023,
      title: "TRansPose: Large-scale multispectral dataset for transparent object",
      authors:
        "Myung-Hwan Jeon, Jeongyun Kim, Sangwoo Jung, Wooseong Yang, Minwoo Jung, Jaeho Shin, and Ayoung Kim",
      venue: "The International Journal of Robotics Research (IJRR), 2023",
      href: "https://journals.sagepub.com/doi/10.1177/02783649231213117",
    },
    {
      year: 2022,
      title: "Sthereo: Stereo thermal dataset for research in odometry and mapping",
      authors:
        "Seungsang Yun, Minwoo Jung, Jeongyun Kim, Sangwoo Jung, Younghun Cho, Myung-Hwan Jeon, Giseop Kim, and Ayoung Kim",
      venue: "IEEE/RSJ International Conference on Intelligent Robots and Systems (IROS), 2022",
      href: "https://ieeexplore.ieee.org/document/9981857",
    },
    {
      year: 2022,
      title: "Data augmentation using image translation for underwater sonar image segmentation",
      authors: "Eon-ho Lee, Byungjae Park, Myung-Hwan Jeon, Hyesu Jang, Ayoung Kim, and Sejin Lee",
      venue: "Plos one, 2022",
      href: "https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0272602",
    },
    {
      year: 2022,
      title:
        "Ambiguity-Aware Multi-Object Pose Optimization for Visually-Assisted Robot Manipulation",
      authors: "Myung-Hwan Jeon, Jeongyun Kim, Jee-Hwan Ryu, and Ayoung Kim",
      venue: "IEEE Robotics and Automation Letters (RA-Letters), 2022",
      href: "https://arxiv.org/abs/2211.00960",
    },
    {
      year: 2022,
      title: "열화상 이미지 다중 채널 재매핑을 통한 단일 열화상 이미지 깊이 추정 향상",
      authors: "김정윤, 전명환, 김아영",
      venue: "로봇학회 논문지, 2022",
      href: "https://jkros.org/xml/33768/33768.pdf",
    },
    {
      year: 2020,
      title: "PrimA6D: Rotational Primitive Reconstruction for Enhanced and Robust 6D Pose Estimation",
      authors: "Myung-Hwan Jeon, and Ayoung Kim",
      venue: "IEEE Robotics and Automation Letters (RA-Letters), 2020",
      href: "https://arxiv.org/abs/2006.07789",
    },
    {
      year: 2020,
      title: "Dark Synthetic Vision: Lightweight Active Vision to Navigate in the Dark",
      authors: "Joowan Kim, Myung-Hwan Jeon, Younggun Cho, and Ayoung Kim",
      venue: "IEEE Robotics and Automation Letters (RA-Letters), 2020",
      href: "https://ieeexplore.ieee.org/document/9246220?denied=",
    },
    {
      year: 2019,
      title: "Underwater object detection and pose estimation using deep learning",
      authors: "Myung-Hwan Jeon, Yeongjun Lee, Young-Sik Shin, Hyesu Jang, and Ayoung Kim",
      venue: "IFAC-PapersOnLine, 2019",
      href: "https://www.sciencedirect.com/science/article/pii/S2405896319321718",
    },
    {
      year: 2019,
      title: "Multi-hand direct manipulation of complex constrained virtual objects",
      authors: "Jun-Sik Kim, Myung-Hwan Jeon, and Jung-Min Park",
      venue: "IEEE/RSJ International Conference on Intelligent Robots and Systems (IROS), 2019",
      href: "https://ieeexplore.ieee.org/document/8968088",
    },
    {
      year: 2019,
      title: "강건한 CNN기반 수중 물체 인식을 위한 이미지 합성과 자동화된 Annotation Tool",
      authors: "전명환, 이영준, 신영식, 장혜수, 여태경, 김아영",
      venue: "로봇학회 논문지, 2019",
      href: "https://jkros.org/xml/26130/26130.pdf",
    },
  ],
  newsSections: [
    {
      title: "Papers",
      items: [
        {
          date: "Jul 2025",
          sortDate: "2025-07",
          title: "TRAN-D accepted @ICCV 2025",
        },
      ],
    },
    {
      title: "Projects",
      items: [
        {
          date: "May 2026",
          sortDate: "2026-05",
          title: "RAIV Lab won a grant (KIT-RISE)",
        },
        {
          date: "Dec 2025",
          sortDate: "2025-12",
          title: "RAIV Lab won a grant (KIT-RISE)",
        },
      ],
    },
    {
      title: "New Members",
      items: [
        {
          date: "Jun 2026",
          sortDate: "2026-06",
          title: "Gyeongmun Lee joined @RAIV Lab",
          names: ["Gyeongmun Lee"],
        },
        {
          date: "Jan 2026",
          sortDate: "2026-01",
          title: "Chanhyo Kim joined @RAIV Lab",
          names: ["Chanhyo Kim"],
        },
        {
          date: "Dec 2025",
          sortDate: "2025-12",
          title: "Jeongwook Park joined @RAIV Lab",
          names: ["Jeongwook Park"],
        },
        {
          date: "Dec 2025",
          sortDate: "2025-12",
          title: "Dong-Sik Yoon joined @RAIV Lab",
          names: ["Dong-Sik Yoon"],
        },
        {
          date: "Nov 2025",
          sortDate: "2025-11",
          title: "Tae-Jun Kim joined @RAIV Lab",
          names: ["Tae-Jun Kim"],
        },
        {
          date: "Nov 2025",
          sortDate: "2025-11",
          title: "Eui-Jin Oh joined @RAIV Lab",
          names: ["Eui-Jin Oh"],
        },
        {
          date: "Oct 2025",
          sortDate: "2025-10",
          title: "Jae-Min Park joined @RAIV Lab → currently serving in the military",
          names: ["Jae-Min Park"],
        },
        {
          date: "Sep 2025",
          sortDate: "2025-09",
          title: "Chan-Hyeok Park joined @RAIV Lab",
          names: ["Chan-Hyeok Park"],
        },
      ],
    },
  ],
  joinPage: {
    title: "Join RAIV Lab",
    intro: [
      "RAIV Lab develops intelligent robotic systems that perceive, reconstruct, reason about, and interact with complex human-centered environments through vision and embodied AI.",
      "We welcome motivated undergraduate and graduate students who are eager to advance intelligent robotic systems through 3D perception, multimodal sensing, robot foundation models, and robot manipulation.",
    ],
    sections: [
      {
        title: "Research Areas",
        layout: "areas",
        items: [
          {
            title: "3D Perception & Multimodal Robot Sensing",
            bullets: [
              "3D reconstruction, mapping, scene understanding, and object-centric perception",
              "Robust robot perception using cameras, LiDAR, radar, thermal, event-based, and other multimodal sensors",
            ],
          },
          {
            title: "Robot Foundation Models",
            bullets: [
              "Foundation models for robot perception, reasoning, planning, and decision-making",
              "World models and vision-language-action models for robot prediction, decision-making, and control",
            ],
          },
          {
            title: "Robot Manipulation",
            bullets: [
              "Robot manipulation systems that connect perception, reasoning, and action",
              "Vision-language-action-based manipulation for real-world robot tasks",
            ],
          },
        ],
      },
      {
        title: "Research Environment",
        paragraphs: [
          "Students participate in the full research process, from exploring research ideas and implementing algorithms to running robot experiments and preparing publications.",
          "RAIV Lab values reliable research code, reproducible experiments, and collaborative research across robot vision, embodied AI, 3D perception, multimodal sensing, foundation models, and real-world robotic systems.",
        ],
      },
      {
        title: "What We Expect",
        items: [
          "Strong interest in robotics, computer vision, and artificial intelligence",
          "Motivation to solve challenging real-world problems in perception and robot intelligence",
          "Willingness to learn Python or C++ and develop reliable research code",
          "Willingness to read papers, run experiments, and communicate effectively with lab members",
        ],
      },
      {
        title: "What You Will Gain",
        items: [
          "Hands-on experience in robot vision, embodied AI, and robot manipulation research",
          "Experience with 3D perception, multimodal sensing, foundation models, and various robotic systems",
          "Opportunities to participate in research projects, robot experiments, and paper writing",
        ],          
      },
      {
        title: "Open Positions",
        layout: "positions",
        items: [
          "Undergraduate Researchers",
          "Integrated B.S.-M.S. Students",
          "M.S. Students",
          "Ph.D. Students",
        ],
      },
      {
        title: "How to Apply",
        paragraphs: [
          "Please email a short introduction with your research interests. A CV, transcript, portfolio, or GitHub link is helpful if available."
        ],
        ctaLabel: "Email mhjeon@kumoh.ac.kr",
        ctaHref: "mailto:mhjeon@kumoh.ac.kr",
      },
    ],
    korean: {
      title: "RAIV Lab 학생 모집",
      intro: [
        "RAIV Lab은 로봇이 복잡한 사람 중심 환경을 인지하고, 3차원으로 재구성하며, 추론하고, 실제 세계와 상호작용할 수 있는 지능형 로봇 시스템을 연구합니다.",
        "3D 인지, 멀티모달 센싱, 로봇 파운데이션 모델, 로봇 조작 연구에 관심 있는 학부생 및 대학원생을 모집합니다.",
      ],
      sections: [
        {
          title: "연구 분야",
          layout: "areas",
          items: [
            {
              title: "3D 인지 및 멀티모달 로봇 센싱",
              bullets: [
                "3D 재구성, 매핑, 장면 이해, 객체 중심 인지",
                "카메라, LiDAR, 레이더, 열화상, 이벤트 카메라 등 다양한 센서를 활용한 강인한 로봇 인지",
              ],
            },
            {
              title: "로봇 파운데이션 모델",
              bullets: [
                "로봇의 인지, 추론, 계획, 의사결정을 위한 파운데이션 모델",
                "로봇의 예측, 판단, 제어를 위한 월드 모델 및 Vision-Language-Action 모델",
              ],
            },
            {
              title: "로봇 조작",
              bullets: [
                "인지, 추론, 행동을 연결하는 로봇 조작 시스템",
                "실세계 로봇 작업 수행을 위한 Vision-Language-Action 기반 조작 지능",
              ],
            },
          ],
        },
        {
          title: "연구 환경",
          paragraphs: [
            "학생들은 연구 아이디어 탐색, 알고리즘 구현, 로봇 실험, 논문 작성에 이르기까지 연구의 전 과정에 참여합니다.",
            "RAIV Lab은 신뢰성 있는 연구 코드 개발, 재현 가능한 실험, 그리고 로봇 비전, Embodied AI, 3D 인지, 멀티모달 센싱, 파운데이션 모델, 실세계 로봇 시스템 전반에 걸친 협력 연구를 중요하게 생각합니다.",
          ],
        },
        {
          title: "지원자에게 기대하는 점",
          items: [
            "로봇공학, 컴퓨터 비전, 인공지능에 대한 높은 관심",
            "실세계 인지 및 로봇 지능 문제를 해결하고자 하는 동기",
            "Python 또는 C++를 학습하고 신뢰성 있는 연구 코드를 개발하려는 의지",
            "논문을 읽고, 실험을 수행하며, 연구팀과 협력적으로 소통하려는 자세",
          ],
        },
        {
          title: "연구를 통해 얻을 수 있는 경험",
          items: [
            "로봇 비전, Embodied AI, 로봇 조작 연구에 대한 실질적인 경험",
            "3D 인지, 멀티모달 센싱, 파운데이션 모델, 다양한 로봇 시스템에 대한 경험",
            "연구 프로젝트, 로봇 실험, 논문 작성에 참여할 기회",
          ],
        },
        {
          title: "모집 대상",
          layout: "positions",
          items: [
            "학부 연구생",
            "학석사 연계과정",
            "석사과정",
            "박사과정",
          ],
        },
        {
          title: "지원 방법",
          paragraphs: [
            "아래 구글 폼을 통해 간단한 자기소개, 관심 연구 분야, 관련 경험을 제출해 주세요.",
          ],
          ctaLabel: "구글 폼으로 지원하기",
          ctaHref: "https://forms.gle/qLLWLFpNrqJfrPF9A",
        },
      ],
    },
  },
};
