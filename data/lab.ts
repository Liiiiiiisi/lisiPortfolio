/**
 * Labs archive content — all entries are PLACEHOLDERS for now. The index
 * grid and the detail pages are both data-driven, so growing the archive
 * is just appending items here (detail routes are derived from `slug`).
 *
 * When real content lands per item:
 *   - set the grid thumbnail `src` and each detail `media` entry's `src`
 *     (MP4 'video' preferred over 'gif'; add `poster` for video);
 *   - adjust `aspect` to the real media ratio;
 *   - keep `intro` to ONE concise paragraph — the media does the talking;
 *   - vary each media block's `layout` (full / inset / half) so the page
 *     keeps its rhythm. Two consecutive 'half' items pair side by side.
 */
import type { LabItem, LabMedia } from '@/types/lab';

/** Placeholder detail sequence: large → inset → paired → large → inset. */
function placeholderMedia(): LabMedia[] {
  return [
    { kind: 'image', src: null, aspect: 'wide', layout: 'full' },
    { kind: 'image', src: null, aspect: 'wide', layout: 'inset' },
    { kind: 'image', src: null, aspect: 'square', layout: 'half' },
    { kind: 'image', src: null, aspect: 'square', layout: 'half' },
    { kind: 'video', src: null, aspect: 'wide', layout: 'full' },
    { kind: 'image', src: null, aspect: 'tall', layout: 'inset' },
  ];
}

const INTRO =
  'One short placeholder paragraph describing what this experiment, study or earlier project was — what was tried, and what made it interesting. Replace with the real note; the media carries the rest.';
const INTRO_ZH =
  '一段简短的占位说明：这个实验、研究或早期项目尝试了什么，以及有趣之处。待替换为真实内容，其余由媒体呈现。';

export const lab: LabItem[] = [
  {
    id: 'lab-01',
    slug: 'fill-in-a-square',
    title: 'Fill in a Square',
    titleZh: 'Fill in a Square',
    discipline: 'interaction',
    tools: 'Participatory Design / Public Intervention / Physical Prototyping',
    toolsZh: '参与式设计 / 公共空间实验 / 实体原型',
    year: '2018',
    introLead:
      'One question, different people, different settings, different responses.',
    introLeadZh:
      '同一个问题，在不同的人与不同的环境里，会得到不同的回应。',
    intro:
      'I brought the same poster prompt into a park, a church and a classroom, observing how age, context and the form of participation shaped the way people responded.',
    introZh:
      '我把同一句提问带到公园、教堂和课堂，观察年龄、场景与参与方式如何影响人们的回应。',
    kind: 'image',
    src: '/lab/fill-in-a-square/images/02-park-participation.jpg',
    alt: 'A participant adds a mark to the poster in the park.',
    altZh: '一位参与者在公园里的海报上做标记。',
    aspect: 'square',
    size: 'L',
    media: [
      { kind: 'image', src: '/lab/fill-in-a-square/images/01-prompt.jpg', alt: 'The poster prompt: "If you care about what other people think of you, fill in a square."', altZh: '海报提问：“如果你在意别人怎么看你，就填一个格子。”', aspect: 'wide', layout: 'full' },
      { kind: 'image', src: '/lab/fill-in-a-square/images/02-park-participation.jpg', alt: 'A participant engages with the poster in the park.', altZh: '一位参与者在公园里与海报互动。', aspect: 'square', layout: 'half' },
      { kind: 'image', src: '/lab/fill-in-a-square/images/03-park-result.jpg', alt: 'The poster after a round of responses in the park.', altZh: '公园里一轮回应之后的海报。', aspect: 'wide', layout: 'half' },
      { kind: 'image', src: '/lab/fill-in-a-square/images/04-church-children.jpg', alt: 'Children responding to the poster at the church.', altZh: '教堂里的孩子们对海报做出回应。', aspect: 'wide', layout: 'full' },
      {
        kind: 'image',
        src: '/lab/fill-in-a-square/images/05-church-older-participant.jpg',
        alt: 'An older participant considers the poster at the church.',
        altZh: '一位年长的参与者在教堂里端详海报。',
        aspect: 'wide',
        layout: 'inset',
        objectPosition: 'top',
        story: {
          heading: 'A SMALL CONTRADICTION',
          headingZh: '一个小小的矛盾',
          body:
            'One older participant chose not to fill a square, saying she cared less about others’ opinions as she grew older. Yet when I photographed her beside the work, she still wondered how she appeared in the image. That small contradiction stayed with me.',
          bodyZh:
            '一位年长的参与者选择不填格子，说随着年龄增长，她已经没有那么在意别人怎么看自己。但当我为她和作品拍照时，她仍然会在意自己在照片中的样子。这个小小的矛盾让我一直记得。',
          wideImage: true,
        },
      },
      { kind: 'image', src: '/lab/fill-in-a-square/images/06-classroom-participation.jpg', alt: 'Students responding to the poster in a classroom setting.', altZh: '课堂环境中学生们对海报的回应。', aspect: 'wide', layout: 'full' },
      {
        kind: 'image',
        src: '/lab/fill-in-a-square/images/07-punch-structure.jpg',
        alt: 'The reworked poster structure, now punched rather than marked.',
        altZh: '改造后的海报结构，从做标记改为打孔。',
        aspect: 'tall',
        layout: 'inset',
        story: {
          heading: 'CHANGING THE RESPONSE',
          headingZh: '改变回应方式',
          body:
            'I later changed the interaction from adding stickers to physically punching through the surface, exploring how the action itself could shape participation.',
          bodyZh:
            '后来我把回应方式从贴贴纸改成直接在表面打孔，继续观察参与动作本身如何影响人的回应。',
        },
      },
      { kind: 'image', src: '/lab/fill-in-a-square/images/08-punch-result.jpg', alt: 'The poster after a round of responses using the punch interaction.', altZh: '使用打孔互动方式后的海报结果。', aspect: 'wide', layout: 'full' },
    ],
  },
  {
    id: 'lab-02',
    slug: 'the-counterforce',
    title: 'The Counterforce',
    titleZh: 'The Counterforce',
    discipline: 'technical',
    tools: 'Arduino Uno / LDR / TouchDesigner / Dot Matrix / Fabrication',
    toolsZh: 'Arduino Uno / 光敏电阻 / TouchDesigner / 点阵屏 / 实体制作',
    year: '2024',
    intro:
      'An interactive device exploring parental authority through light and real-time feedback.',
    introZh:
      '一个通过光线与实时反馈讨论亲子关系中“控制”与“自主性”的互动装置。',
    kind: 'video',
    src: '/lab/the-counterforce/videos/01-final-interaction.mp4',
    poster: '/lab/the-counterforce/images/poster.webp',
    alt: 'A room-scale projection contracts and expands in response to a blocked light sensor.',
    altZh: '投影图像随光敏传感器被遮挡而收缩或扩张。',
    aspect: 'wide',
    size: 'M',
    media: [
      {
        kind: 'video',
        src: '/lab/the-counterforce/videos/01-final-interaction.mp4',
        poster: '/lab/the-counterforce/images/poster.webp',
        alt: 'The complete interaction: a hand blocks light and the projected visual responds in real time.',
        altZh: '完整的互动过程：手遮挡光线，投影图像实时做出响应。',
        aspect: 'wide',
        layout: 'full',
      },
      {
        kind: 'image',
        src: null,
        aspect: 'wide',
        layout: 'inset',
        diagram: {
          flow: [
            { label: 'BLOCK LIGHT', labelZh: '遮挡光线' },
            { label: 'LDR', labelZh: '光敏电阻' },
            { label: 'ARDUINO', labelZh: 'Arduino' },
            { label: 'TOUCHDESIGNER', labelZh: 'TouchDesigner' },
            { label: 'VISUAL CONTRACTS', labelZh: '视觉收缩' },
          ],
          supportingLines: [
            {
              text: 'Less light creates a smaller, less responsive waveform.',
              textZh: '光线越弱，波纹越小、响应越弱。',
            },
            {
              text: 'The dot matrix reveals a command word by word.',
              textZh: '点阵屏同时逐字显示命令。',
            },
          ],
        },
      },
      {
        kind: 'video',
        src: '/lab/the-counterforce/videos/03-physical-interface.mp4',
        alt: 'A hand covers the light sensor on the wooden interface.',
        altZh: '一只手遮住木质界面上的光敏传感器。',
        aspect: 'wide',
        layout: 'half',
        caption: 'PHYSICAL INPUT',
        captionZh: '物理输入',
      },
      {
        kind: 'video',
        src: '/lab/the-counterforce/videos/02-touchdesigner.mp4',
        alt: 'The TouchDesigner patch generating the real-time circular visual.',
        altZh: 'TouchDesigner 实时生成圆形视觉的画面。',
        aspect: 'wide',
        layout: 'half',
        caption: 'REAL-TIME RESPONSE',
        captionZh: '实时响应',
      },
      {
        kind: 'image',
        src: null,
        aspect: 'wide',
        layout: 'inset',
        note: {
          heading: 'CONTROL & AUTONOMY',
          headingZh: '控制与自主',
          body:
            'Blocking light becomes an act of control. As the projected form contracts, the interaction turns parental authority into something physical and visible.',
          bodyZh:
            '遮挡光线成为一种“控制”的动作。随着投影视觉收缩，抽象的亲子权力关系被转化为可触发、可见的反馈。',
          tightenAbove: true,
        },
      },
      {
        kind: 'video',
        src: '/lab/the-counterforce/videos/04-electronics.mp4',
        alt: 'Assembling the electronics for The Counterforce.',
        altZh: '组装 The Counterforce 的电子元件。',
        aspect: 'wide',
        layout: 'half',
      },
      {
        kind: 'video',
        src: '/lab/the-counterforce/videos/05-fabrication.mp4',
        alt: 'Fabricating the wooden enclosure for The Counterforce.',
        altZh: '制作 The Counterforce 的木质外壳。',
        aspect: 'wide',
        layout: 'half',
      },
      {
        kind: 'image',
        src: null,
        aspect: 'wide',
        layout: 'inset',
        note: {
          heading: 'FROM SIGNAL TO SPACE',
          headingZh: '从信号到空间',
          body:
            'Sensor, electronics, enclosure and real-time visuals — built into one physical interaction.',
          bodyZh:
            '将传感器、电子元件、实体外壳与实时视觉整合成一次完整的物理交互。',
          tightenAbove: true,
          roomyBelow: true,
        },
      },
      {
        kind: 'video',
        src: '/lab/the-counterforce/videos/06-final-installation.mp4',
        alt: 'The finished installation projected in the room.',
        altZh: '装置在房间中的最终投影效果。',
        aspect: 'wide',
        layout: 'full',
      },
    ],
  },
  {
    id: 'lab-03',
    slug: 'magnet-spice-box',
    title: 'Magnet Spice Box',
    titleZh: 'Magnet Spice Box',
    discipline: 'interaction',
    tools: 'Product Design / Physical Prototyping',
    toolsZh: '产品设计 / 实体原型',
    year: '2020',
    intro:
      'A compact spice container that turns nearby metal kitchen surfaces into storage.',
    introZh:
      '一个利用磁吸结构，将厨房周围的金属表面转化为收纳位置的小型调味容器。',
    kind: 'image',
    src: '/lab/magnet-spice-box/images/04-magnetic-storage.webp',
    alt: 'The container magnetically attached beneath a stainless-steel range hood.',
    altZh: '容器通过磁吸固定在不锈钢抽油烟机下方。',
    aspect: 'wide',
    size: 'M',
    media: [
      {
        kind: 'image',
        src: '/lab/magnet-spice-box/images/01-object.webp',
        alt: 'The magnet spice box on a plain white surface.',
        altZh: '磁吸调味盒放置在纯白背景上。',
        aspect: 'wide',
        layout: 'full',
      },
      {
        kind: 'video',
        src: '/lab/magnet-spice-box/images/02-fill.mp4',
        alt: 'Pouring spice into the open container.',
        altZh: '将调味料倒入打开的容器中。',
        aspect: 'wide',
        layout: 'full',
      },
      {
        kind: 'video',
        src: '/lab/magnet-spice-box/images/03-use.mp4',
        alt: 'Using the container to dispense spice over a bowl.',
        altZh: '使用容器将调味料撒入碗中。',
        aspect: 'wide',
        layout: 'full',
      },
      {
        kind: 'image',
        src: null,
        aspect: 'wide',
        layout: 'inset',
        note: {
          heading: 'USE \u2192 ATTACH \u2192 STORE',
          headingZh: '使用 \u2192 吸附 \u2192 收纳',
          body:
            'The magnet makes storage part of the interaction, keeping the container within reach without occupying countertop space.',
          bodyZh:
            '磁吸结构让收纳本身成为使用体验的一部分，让调味盒保持顺手可取，同时减少台面占用。',
        },
      },
      {
        kind: 'image',
        src: '/lab/magnet-spice-box/images/04-magnetic-storage.webp',
        alt: 'The container magnetically attached beneath a stainless-steel range hood.',
        altZh: '容器通过磁吸固定在不锈钢抽油烟机下方。',
        aspect: 'wide',
        layout: 'full',
      },
      {
        kind: 'video',
        src: '/lab/magnet-spice-box/images/05-opening-detail.mp4',
        alt: 'Detail of the hinged lid and dispensing mesh.',
        altZh: '翻盖与撒料网孔的细节。',
        aspect: 'wide',
        layout: 'full',
      },
      {
        kind: 'image',
        src: '/lab/magnet-spice-box/images/06-packaging.webp',
        alt: 'The container in its retail packaging.',
        altZh: '容器的零售包装。',
        aspect: 'wide',
        layout: 'full',
      },
    ],
  },
  {
    id: 'lab-04',
    slug: 'whoopee-sandwich',
    title: 'Whoopee Sandwich',
    titleZh: 'Whoopee Sandwich',
    discipline: 'interaction',
    tools: 'Packaging / Physical Interaction / Product Concept',
    toolsZh: '包装设计 / 实体交互 / 产品概念',
    year: '2020',
    intro:
      'A packaging concept that stays around the sandwich while eating, helping keep fillings contained and hands clean.',
    introZh:
      '一种在进食过程中继续包裹三明治的包装设计，帮助减少馅料掉落，也让双手保持整洁。',
    kind: 'image',
    src: '/lab/whoopee-sandwich/images/04-packaging-closeup.webp',
    alt: 'Three animal-character Whoopee Sandwich packages standing side by side.',
    altZh: '三款动物造型的 Whoopee Sandwich 包装并排展示。',
    aspect: 'wide',
    size: 'M',
    media: [
      {
        kind: 'video',
        src: '/lab/whoopee-sandwich/images/01-packaging-variants.mp4',
        alt: 'A hand holds a Whoopee Sandwich package while eating; the packaging stays wrapped around the sandwich.',
        altZh: '手持 Whoopee Sandwich 包装进食，包装始终包裹在三明治外部。',
        aspect: 'wide',
        layout: 'full',
      },
      {
        kind: 'image',
        src: '/lab/whoopee-sandwich/images/03-structure.webp',
        alt: 'The Whoopee Sandwich wordmark, color system, geometric construction, and packaging dieline.',
        altZh: 'Whoopee Sandwich 的字标、色彩系统、几何结构与包装刀版图。',
        aspect: 'wide',
        layout: 'full',
      },
      {
        kind: 'image',
        src: '/lab/whoopee-sandwich/images/04-packaging-closeup.webp',
        alt: 'Three animal-character Whoopee Sandwich packages standing side by side.',
        altZh: '三款动物造型的 Whoopee Sandwich 包装并排展示。',
        aspect: 'wide',
        layout: 'full',
      },
      {
        kind: 'image',
        src: '/lab/whoopee-sandwich/images/05-paper-bag.webp',
        alt: 'Two kraft-paper Whoopee Sandwich takeaway bags with die-cut handles.',
        altZh: '两个带模切手柄的 Whoopee Sandwich 牛皮纸手提袋。',
        aspect: 'wide',
        layout: 'full',
      },
    ],
  },
  {
    id: 'lab-05',
    slug: 'hand-gesture-study',
    title: 'Hand Gesture Study',
    titleZh: 'Hand Gesture Study',
    discipline: 'interaction',
    tools: 'Unreal Engine / VR Interaction / Real-time Visuals',
    toolsZh: 'Unreal Engine / VR 交互 / 实时视觉',
    year: '2023',
    intro:
      'A VR interaction study exploring how hand gestures can trigger immediate real-time visual responses in Unreal Engine.',
    introZh:
      '一个在 Unreal Engine 中测试手势输入与实时视觉反馈关系的 VR 交互实验。',
    kind: 'video',
    src: '/lab/hand-gesture-study/cover.mp4',
    poster: '/lab/hand-gesture-study/poster.webp',
    alt: 'A glowing particle formation rising over a dark horizon, rendered in real time in Unreal Engine.',
    altZh: '在 Unreal Engine 中实时渲染的发光粒子在昏暗地平线上升起。',
    aspect: 'square',
    size: 'M',
    media: [
      {
        kind: 'video',
        src: '/lab/hand-gesture-study/cover.mp4',
        poster: '/lab/hand-gesture-study/poster.webp',
        alt: 'A glowing particle formation rising over a dark horizon, rendered in real time in Unreal Engine.',
        altZh: '在 Unreal Engine 中实时渲染的发光粒子在昏暗地平线上升起。',
        aspect: 'wide',
        layout: 'full',
      },
      {
        kind: 'video',
        src: '/lab/hand-gesture-study/demo.mp4',
        alt: 'A picture-in-picture view of a participant performing hand gestures in a VR headset alongside the real-time particle response they trigger.',
        altZh: '画中画视角：参与者佩戴 VR 头显做出手势，同时触发对应的实时粒子反馈。',
        aspect: 'wide',
        layout: 'full',
      },
      {
        kind: 'image',
        src: null,
        aspect: 'wide',
        layout: 'inset',
        note: {
          heading: 'GESTURE AS INPUT',
          headingZh: '以手势作为输入',
          body: 'Hand gestures become direct inputs for triggering real-time particle responses.',
          bodyZh: '让手部动作直接成为输入，触发实时粒子反馈。',
        },
      },
    ],
  },
];

/** Detail route for a Labs entry — derived, never hardcoded. */
export function labsHref(slug: string): string {
  return `/labs/${slug}/`;
}

export function getLabItem(slug: string): LabItem | undefined {
  return lab.find((item) => item.slug === slug);
}

/** The next study, wrapping the last back to the first. */
export function nextLabItem(slug: string): LabItem | undefined {
  const i = lab.findIndex((item) => item.slug === slug);
  if (i < 0) return undefined;
  return lab[(i + 1) % lab.length];
}
