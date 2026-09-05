import type { CaseMediaAspect, CaseStudy } from '@/types/caseStudy';

const media = (
  name: string,
  alt: string,
  altZh: string,
  caption: string,
  captionZh: string,
  aspect: CaseMediaAspect = 'wide',
  fit: 'cover' | 'contain' = 'cover',
) => ({
  kind: 'video' as const,
  src: `/projects/signie/images/${name}.mp4`,
  poster: `/projects/signie/images/${name}-poster.webp`,
  aspect,
  alt,
  altZh,
  caption,
  captionZh,
  fit,
});

/**
 * Final Signie content module and visual/editorial pilot.
 * English copy stays synchronized with public/projects/signie/texts/page.md.
 * Presentation fields are opt-in and are not applied to legacy projects.
 */
export const signieCaseStudy: CaseStudy = {
  projectId: 'signie',
  artDirection: 'campaign-editorial',
  discipline: 'Mixed Reality / Hand Tracking / ASL Learning',
  disciplineZh: '混合现实 / 手部追踪 / ASL 学习',
  proposition: 'An MR learning system that evolved from guided ASL practice into a wearable live-translation concept.',
  propositionZh: '一个从引导式 ASL 练习发展到可穿戴实时翻译概念的混合现实学习系统。',
  role: 'Project management · Interaction and UX design · Animation · XR development',
  roleZh: '项目管理 · 交互与 UX 设计 · 动画 · XR 开发',
  team: 'Brian Mira · Mohammad Asim Khan · Manikant Mudgil · Siming Wang · Lisi Xie',
  teamZh: 'Brian Mira · Mohammad Asim Khan · Manikant Mudgil · 王思明 · 谢李思',
  platform: 'Mixed reality · Hand tracking · AI glasses',
  platformZh: '混合现实 · 手部追踪 · AI 眼镜',
  year: '2025',
  outcome: '2× XRDC Award Winner — Contextual AI & Community Impact',
  outcomeZh: '两项 XRDC 奖项——Contextual AI 与 Community Impact',
  outcomeEmphasis: true,
  hero: {
    kind: 'video',
    src: '/projects/signie/videos/hero.mp4',
    poster: '/projects/signie/videos/preview-poster.webp',
    aspect: 'ultra',
    alt: 'Signie mixed-reality learning experience',
    altZh: 'Signie 混合现实学习体验',
    caption: 'Signie mixed-reality learning experience.',
    captionZh: 'Signie 混合现实学习体验。',
  },
  sections: [
    {
      id: 'the-idea',
      label: 'The Idea',
      labelZh: '核心想法',
      lead: 'Learning through doing, not only watching.',
      leadZh: '通过亲手实践学习，而不只是观看。',
      body: [
        'Signie began with a basic communication and learning problem: ASL learners need to observe a sign, try it with their own hands, and receive feedback within the same experience. The first spatial prototype placed a virtual instructor and learner in a shared MR environment so practice could become embodied rather than passive.',
      ],
      bodyZh: [
        'Signie 从一个基本的沟通与学习问题出发：ASL 学习者需要在同一个体验中观察手语、亲手尝试并获得反馈。最初的空间原型将虚拟教师与学习者置于共享的混合现实环境中，使练习从被动观看转变为具身参与。',
      ],
      media: [
        {
          layout: 'full',
          spacing: 'loose',
          items: [
            media(
              'xrdc_shapexr',
              'Early ShapeXR spatial prototype',
              '早期 ShapeXR 空间原型',
              'Early ShapeXR prototype testing the spatial relationship between learner, instructor, and interface.',
              '早期 ShapeXR 原型，用于测试学习者、虚拟教师与界面之间的空间关系。',
              'wide',
              'contain',
            ),
          ],
        },
      ],
      density: 'sparse',
    },
    {
      id: 'v1-core-experience',
      label: 'V1',
      labelZh: 'V1',
      lead: 'Building the Core Experience',
      leadZh: '构建核心体验',
      body: [
        'The initial concept became a working MR experience built around a virtual instructor, a spatial learning environment, and hand-based interaction. The learner could watch the instructor, mirror the demonstrated movement, and move through the early learning flow inside the headset.',
      ],
      bodyZh: [
        '最初的概念逐渐成为围绕虚拟教师、空间学习环境与手部交互构建的可运行 MR 体验。学习者可以在头显中观察教师、模仿示范动作，并完成早期学习流程。',
      ],
      points: [
        { label: 'Virtual instructor', labelZh: '虚拟教师', text: 'Demonstrates signs within the learner’s view.', textZh: '在学习者视野内示范手语动作。' },
        { label: 'Hand interaction', labelZh: '手部交互', text: 'Turns observation into embodied practice.', textZh: '将观察转化为具身练习。' },
        { label: 'Working build', labelZh: '可运行版本', text: 'Connects the scene, spatial interface, and interaction logic in Unity.', textZh: '在 Unity 中连接场景、空间界面与交互逻辑。' },
      ],
      media: [
        {
          layout: 'detail-sequence', spacing: 'normal',
          items: [
            {
              ...media('xrdc_unity', 'Unity MR interaction prototype', 'Unity MR 交互原型', 'Unity MR prototype connecting the virtual instructor, spatial UI, and hand interaction.', 'Unity MR 原型将虚拟教师、空间 UI 与手部交互连接起来。', 'wide', 'contain'),
              title: 'Primary MR Experience',
              titleZh: '核心 MR 体验',
            },
            {
              ...media('awe_word', 'Early word-recall learning exercise', '早期单词回忆学习练习', 'A learner-facing word-recall exercise extending the first working MR flow.', '面向学习者的单词回忆练习，将首个可运行 MR 流程进一步扩展。', 'wide', 'contain'),
          title: 'Word Recall Exercise',
          titleZh: '单词回忆练习',
            },
          ],
        },
      ],
      density: 'medium',
    },
    {
      id: 'v2-learning-system',
      label: 'V2',
      labelZh: 'V2',
      lead: 'From a Demo to a Learning System',
      leadZh: '从演示到学习系统',
      body: [
        'V2 expanded the working demo into a structured learning loop. Learners first followed a guided sign, then practiced from recall, reviewed the motion when needed, and applied it in a rhythm-based game.',
      ],
      bodyZh: [
        'V2 将可运行演示扩展为结构化学习循环。学习者先跟随引导完成手语动作，再通过回忆进行练习，在需要时回看动作，并最终将所学应用于节奏游戏。',
      ],
      media: [],
      learningShowcase: {
        intervalMs: 7500,
        useMediaDuration: true,
        stages: [
          {
            id: 'learn', title: 'Learn', titleZh: '学习',
            copy: 'Copy a static pose to unlock the full motion, visualized with movement bubbles.',
            copyZh: '模仿静态手势以解锁完整动作，并通过动态气泡呈现运动过程。',
            media: media('awe_learn', 'Guided sign learning', '引导式手语学习', 'Guided sign learning.', '引导式手语学习。'),
          },
          {
            id: 'practice', title: 'Practice', titleZh: '练习',
            copy: 'Sign a displayed sentence to practice from recall.',
            copyZh: '根据显示的句子完成手语表达，进行回忆练习。',
            media: media('awe_practice', 'Practice from recall', '通过回忆进行练习', 'Practice from recall.', '通过回忆进行练习。'),
          },
          {
            id: 'review', title: 'Review', titleZh: '复习',
            copy: 'Replay the virtual instructor before continuing.',
            copyZh: '继续之前回放虚拟教师进行复习。',
            media: media('awe_review', 'Virtual instructor review', '虚拟教师复习', 'Virtual instructor review.', '虚拟教师复习。'),
          },
          {
            id: 'play', title: 'Play', titleZh: '游戏',
            copy: 'Sign correctly to grow the basket, then catch falling fruit in rhythm.',
            copyZh: '正确完成手语动作以扩大篮子，再跟随节奏接住下落的水果。',
            media: media('awe_musicgame', 'Rhythm-based ASL game', '节奏型 ASL 游戏', 'Rhythm-based ASL game.', '节奏型 ASL 游戏。'),
          },
        ],
        technicalAnnotation: {
          title: 'Gesture Recognition System',
          titleZh: '手势识别系统',
          copy: "Detects the learner's hand pose and validates it against the target sign in Unity, providing immediate feedback.",
          copyZh: '检测学习者的手部姿态，并在 Unity 中与目标手语动作进行比对验证，从而提供即时反馈。',
          media: media(
            'awe_geturerecongnition',
            'Unity gesture-recognition system validating a learner’s hand pose',
            '在 Unity 中验证学习者手部姿态的手势识别系统',
            '',
            '',
            'wide',
            'contain',
          ),
        },
      },
      density: 'dense',
    },
    {
      id: 'v3-ai-glasses',
      label: 'V3',
      labelZh: 'V3',
      lead: 'Exploring AI Glasses',
      leadZh: '探索 AI 眼镜',
      body: [
        'V3 carried the same communication idea into a lighter wearable context. Micro-gestures provided hands-free control, while speech was converted to text through Wit.ai and routed through an animation state machine for signed output.',
      ],
      bodyZh: [
        'V3 将相同的沟通理念带入更轻量的可穿戴场景。微手势提供免手操作，语音则通过 Wit.ai 转换为文本，再经动画状态机驱动手语输出。',
      ],
      media: [
        {
          layout: 'inset', scale: 'large', align: 'left', spacing: 'normal',
          items: [{
            ...media('AIglass_microgesture', 'AI-glasses micro-gesture control', 'AI 眼镜微手势控制', 'Micro-gesture input for hands-free system control.', '通过微手势实现免手操作的系统控制。'),
            title: 'Micro-Gesture Interaction',
            titleZh: '微手势交互',
            objectPosition: 'center center',
          }],
        },
        {
          layout: 'technical-split', spacing: 'loose',
          items: [{
            ...media('AIglass_wit', 'Speech-to-sign workflow', '语音到手语流程', 'Speech-to-text and animation-state workflow for live sign output.', '用于实时手语输出的语音转文本与动画状态工作流。', 'wide', 'contain'),
            title: 'Wit.ai / Speech Input',
            titleZh: 'Wit.ai / 语音输入',
          }],
        },
      ],
      density: 'dense',
    },
    {
      id: 'from-design-to-build',
      label: 'Process',
      labelZh: '过程',
      lead: 'From Design to Build',
      leadZh: '从设计到构建',
      body: [
        'The learning flow moved from sketches to motion, in-headset gesture recording, and working Unity prototypes—bringing the virtual instructor, spatial UI, and hand interaction into one MR experience.',
      ],
      bodyZh: [
        '学习流程从草图推进到动作设计、头显内手势录制与可运行的 Unity 原型，将虚拟教师、空间 UI 和手部交互整合为一个 MR 体验。',
      ],
      media: [
        {
          layout: 'inset', scale: 'large', align: 'left',
          items: [
            {
              ...media(
                'awe_virtualguide',
                'Virtual Guide Tool authoring tutor and two-hand gestures',
                '用于录制教师及双手手势的虚拟引导工具',
                'A custom in-headset authoring tool for recording tutor and two-hand gestures used in guided learning sequences.',
                '一款自定义头显内创作工具，用于录制引导式学习序列中的教师动作与双手手势。',
                'wide',
                'contain',
              ),
              title: 'Virtual Guide Tool',
              titleZh: '虚拟引导工具',
            },
          ],
        },
        {
          layout: 'pair', pairBalance: 'equal', spacing: 'normal',
          items: [
            {
              ...media('xrdc_miro', 'Interaction and production planning', '交互与制作规划', 'Mapped the learning flow, spatial interface, and demo narrative.', '梳理学习流程、空间界面与演示叙事。', 'wide', 'contain'),
              title: 'Interaction / Production Planning',
              titleZh: '交互与制作规划',
            },
            {
              ...media('xrdc_mocap', 'Motion-capture preparation', '动作捕捉准备', 'Prepared selected ASL sentences for animation through motion capture.', '通过动作捕捉为选定的 ASL 句子准备动画。', 'wide', 'contain'),
              title: 'Motion Capture',
              titleZh: '动作捕捉',
            },
          ],
        },
        {
          layout: 'inset', scale: 'small', align: 'right', spacing: 'normal',
          items: [
            {
              ...media('xrdc_unity', 'Unity MR integration', 'Unity MR 集成', 'Brought the scene, spatial interface, and interaction logic together in a working build.', '将场景、空间界面与交互逻辑整合到可运行的版本中。', 'wide', 'contain'),
              title: 'Unity / MR Prototyping',
              titleZh: 'Unity / MR 原型开发',
            },
          ],
        },
      ],
      density: 'medium',
      presentation: 'media-spread',
    },
    {
      id: 'my-contribution',
      label: 'Role',
      labelZh: '角色',
      lead: 'My Contribution',
      leadZh: '我的贡献',
      body: [
        'Signie was a team project. My contribution connected the project’s structure and learning experience to the practical work required to build and test it.',
      ],
      bodyZh: [
        'Signie 是一个团队项目。我的工作贯穿项目统筹、学习体验设计、开发与测试，把概念推进为可运行的 MR 体验。',
      ],
      points: [
        { label: 'Project ownership', labelZh: '项目统筹', text: 'Meeting structure, task breakdown, production planning, and coordination across the team.', textZh: '负责会议组织、任务拆分、制作规划与团队协调。' },
        { label: 'Experience direction', labelZh: '体验方向', text: 'Owned the learning flow, spatial interface, and interaction behavior from concept through testing.', textZh: '负责从概念到测试阶段的学习流程、空间界面与交互行为。' },
        { label: 'XR implementation', labelZh: 'XR 实现', text: 'Built scenes, implemented interactions, and tested the working mixed-reality experience.', textZh: '构建场景、实现交互，并测试可运行的混合现实体验。' },
        { label: 'Motion / assets', labelZh: '动作与资产', text: 'Prepared production assets, animated characters, and integrated them into the Unity build.', textZh: '准备制作资产、完成角色动画，并将其集成到 Unity 版本中。' },
      ],
      media: [],
      density: 'sparse',
      presentation: 'typography',
    },
    {
      id: 'outcome',
      label: 'Outcome',
      labelZh: '成果',
      lead: '2× XRDC\nAWARD WINNER',
      leadZh: '两项 XRDC\n奖项',
      body: [
        'Signie received the Contextual AI and Community Impact awards. Across three iterations, the project developed from an MR learning concept into a playable learning system and a wearable live-translation exploration.',
      ],
      bodyZh: [
        'Signie 获得 Contextual AI 与 Community Impact 奖项。经过三次迭代，项目从 MR 学习概念发展为可游玩的学习系统，并进一步探索了可穿戴实时翻译。',
      ],
      media: [
        {
          layout: 'full', spacing: 'loose',
          items: [media('xrdc_win', 'Signie award evidence', 'Signie 获奖记录', 'Supporting evidence from the award outcome.', '奖项成果的支持性记录。')],
        },
      ],
      density: 'strong',
      presentation: 'outcome',
    },
  ],
  credits: [
    { role: 'Project management · UX · Animation · XR development', roleZh: '项目管理 · UX · 动画 · XR 开发', names: 'Lisi Xie' },
    { role: 'V1 collaborators', roleZh: 'V1 协作者', names: 'Brian Mira, Mohammad Asim Khan, Manikant Mudgil' },
    { role: 'V2 / V3 collaborator', roleZh: 'V2 / V3 协作者', names: 'Siming Wang' },
  ],
  showCredits: false,
};
