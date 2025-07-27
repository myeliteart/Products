import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'

export const useMusicStore = defineStore('music', () => {
  const albums = useLocalStorage('albums', [
    {
      id: 1,
      title: 'Lipala',
      artist: 'Lipa Shmeltzer',
      img: new URL('@/assets/img/lipa/lipala.jpg', import.meta.url).href,
      price: 25,
      quantity: 0,
      subtotal: 0,
      audio: new URL ('@/assets/img/lipa/news.mp3', import.meta.url).href,
      reviews: [],
      reviewCount: 0,
      tag: 'New',
      cat: ['Featured'],
      desc: 'Totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?'
    },
    {
      id: 2,
      title: 'Olam',
      artist: 'All Star',
      img: new URL('@/assets/img/allStar/olam.webp', import.meta.url).href,
      price: 20,
      quantity: 0,
      subtotal: 0,
      audio: new URL ('@/assets/img/allStar/venisgov.mp3', import.meta.url).href,
      reviews: [],
      reviewCount: 0,
      tag: 'New',
      cat: ['Featured'],
      desc: 'Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero,'
    },
    {
      id: 3,
      title: 'From Hashem',
      artist: 'Ahrele Samet',
      img: new URL('@/assets/img/ahrela/hashem.jpg', import.meta.url).href,
      price: 20,
      quantity: 0,
      subtotal: 0,
      audio: new URL('@/assets/img/ahrela/yuchid.mp3', import.meta.url).href,
      reviews: [],
      reviewCount: 0,
      tag: 'New',
      cat: ['Featured'],
      desc: 'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.'
    },
    {
      id: 4,
      title: 'The Dance Album',
      artist: 'Baruch Levine',
      img: new URL('@/assets/img/BaruchL/TheDanceAlbum.webp', import.meta.url).href,
      price: 27,
      quantity: 0,
      subtotal: 0,
      audio: new URL ('@/assets/img/BaruchL/vzakeini.mp3', import.meta.url).href,
      reviews: [],
      reviewCount: 0,
      tag: 'New',
      cat: ['Featured'],
      desc: 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which dont look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isnt anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.'
    },
    {
      id: 5,
      title: 'Kodesh LaHashem',
      artist: 'Yissachar Dror',
      img: new URL('@/assets/img/droir/KodeshLaHashem.webp', import.meta.url).href,
      price: 20,
      quantity: 0,
      subtotal: 0,
      audio: '',
      reviews: [],
      reviewCount: 0,
      tag: 'New',
      cat: ['Featured'],
      desc: 'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.'
    },
    {
      id: 6,
      title: 'Tedaber Ito',
      artist: 'Shmulik Sukkot',
      img: new URL('@/assets/img/shmulik/Tedaber.webp', import.meta.url).href,
      price: 15,
      quantity: 0,
      subtotal: 0,
      audio: '',
      reviews: [],
      reviewCount: 0,
      tag: 'New',
      cat: ['Featured'],
      desc: 'will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).'
    },
    {
      id: 7,
      title: 'Yingerlich 4',
      artist: 'Yingerlich',
      img: new URL('@/assets/img/Yingerlich/Yingerlich.webp', import.meta.url).href,
      price: 24,
      quantity: 0,
      subtotal: 0,
      audio: '',
      reviews: [],
      reviewCount: 0,
      tag: 'New',
      cat: ['Featured'],
      desc: 'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.'
    },
    {
      id: 8,
      title: 'Elokai Neshama',
      artist: 'Volvy Rosenberg',
      img: new URL('@/assets/img/VolvyRosenberg/VolvyRosenberg.webp', import.meta.url).href,
      price: 8,
      quantity: 0,
      subtotal: 0,
      audio: '',
      reviews: [],
      reviewCount: 0,
      tag: 'New',
      cat: ['Featured'],
      desc: 'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.'
    },
    {
      id: 9,
      title: 'Upsherin Collection',
      artist: 'Lchaim',
      img: new URL('@/assets/img/Lchaim/Lchaim.webp', import.meta.url).href,
      price: 20,
      quantity: 0,
      subtotal: 0,
      audio: new URL ('@/assets/img/Lchaim/Lchaim.mp3', import.meta.url).href,
      reviews: [],
      reviewCount: 0,
      tag: 'New',
      cat: ['Featured'],
      desc: 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.'
    },
    {
      id: 10,
      title: 'Shuki',
      artist: 'Rabbi Yoel Ferber',
      img: new URL('@/assets/img/Shuki/Shuki.webp', import.meta.url).href,
      price: 16,
      quantity: 0,
      subtotal: 0,
      audio: '',
      reviews: [],
      reviewCount: 0,
      tag: 'New',
      cat: ['Featured'],
      desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    },
    {
      id: 11,
      title: 'Gedolim Stories',
      artist: 'The Loop',
      img: new URL('@/assets/img/loop/gedolimEdition.webp', import.meta.url).href,
      price: 20,
      quantity: 0,
      subtotal: 0,
      audio: '',
      reviews: [],
      reviewCount: 0,
      tag: 'New',
      cat: ['Featured'],
      desc: 'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.'
    },
    {
      id: 12,
      title: 'A Frishe Tantz',
      artist: 'Avrum Shmiel Wieder',
      img: new URL('@/assets/img/wieder/good.webp', import.meta.url).href,
      price: 16,
      quantity: 0,
      subtotal: 0,
      audio: '',
      reviews: [],
      reviewCount: 0,
      tag: 'New',
      cat: ['Featured'],
      desc: 'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.'
    },
    {
      id: 13,
      title: 'Simchas Hachaim',
      artist: 'Simchas Hachaim',
      img: new URL('@/assets/img/simchasHachaim/simchasHachaim.webp', import.meta.url).href,
      price: 35,
      quantity: 0,
      subtotal: 0,
      audio: '',
      reviews: [],
      reviewCount: 0,
      tag: 'New',
      cat: ['Featured'],
      desc: 'On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains'
    },
    {
      id: 14,
      title: 'Melodies Of Modzits',
      artist: 'Modzits',
      img: new URL('@/assets/img/Modzits/Modzits.webp', import.meta.url).href,
      price: 15,
      quantity: 0,
      subtotal: 0,
      audio: new URL ('@/assets/img/Modzits/Modzits.mp3', import.meta.url).href,
      reviews: [],
      reviewCount: 0,
      tag: 'New',
      cat: ['Featured'],
      desc: 'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.'
    },
    {
      id: 15,
      title: 'Mishta Hayayin 2',
      artist: 'Amrom Aker',
      img: new URL('@/assets/img/Aker/Mishta.webp', import.meta.url).href,
      price: 25,
      quantity: 0,
      subtotal: 0,
      audio: '',
      reviews: [],
      reviewCount: 0,
      tag: 'New',
      cat: ['Featured'],
      desc: 'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.'
    },
    {
      id: 16,
      title: 'Klangen & Gezangen',
      artist: 'Yingerlich',
      img: new URL('@/assets/img/Yingerlich/123.webp', import.meta.url).href,
      price: 30,
      quantity: 0,
      subtotal: 0,
      audio: '',
      reviews: [],
      reviewCount: 0,
      tag: 'New',
      cat: ['Featured'],
      desc: 'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for, The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.'
    },
    {
      id: 17,
      title: 'Purim In Toldos Aharon',
      artist: 'Meir Starik',
      img: new URL('@/assets/img/Starik/ta.webp', import.meta.url).href,
      price: 10,
      quantity: 0,
      subtotal: 0,
      audio: '',
      reviews: [],
      reviewCount: 0,
      tag: 'New',
      cat: ['Singles'],
      desc: 'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.'
    },
    {
      id: 18,
      title: 'Chazunes Collection 2',
      artist: 'Nissim Saal',
      img: new URL('@/assets/img/saal/saal.webp', import.meta.url).href,
      price: 15,
      quantity: 0,
      subtotal: 0,
      audio: '',
      reviews: [],
      reviewCount: 0,
      tag: 'New',
      cat: ['Singles'],
      desc: 'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.'
    },
    {
      id: 19,
      title: 'Chaverim',
      artist: 'Mbd',
      img: new URL('@/assets/img/mbd/Chaverim.webp', import.meta.url).href,
      price: 2,
      quantity: 0,
      subtotal: 0,
      audio: '',
      reviews: [],
      reviewCount: 0,
      tag: 'New',
      cat: ['Singles'],
      desc: 'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.'
    },
    {
      id: 20,
      title: 'Haman Hows Hangin',
      artist: '8th Day',
      img: new URL('@/assets/img/8thDay/Haman.webp', import.meta.url).href,
      price: 2,
      quantity: 0,
      subtotal: 0,
      audio: '',
      reviews: [],
      reviewCount: 0,
      tag: 'New',
      cat: ['Singles'],
      desc: 'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.'
    },
    {
      id: 21,
      title: 'Zeh Zeh',
      artist: 'Dovid Pearlman',
      img: new URL('@/assets/img/DovidPearlman/Zeh.webp', import.meta.url).href,
      price: 0,
      quantity: 0,
      subtotal: 0,
      audio: '',
      reviews: [],
      reviewCount: 0,
      tag: 'New',
      cat: ['Singles'],
      desc: 'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.'
    },
    {
      id: 22,
      title: 'Mutzusi Chein',
      artist: 'Ahrele Samet',
      img: new URL('@/assets/img/YosselLeiferAhreleSamet/Mutzusi.webp', import.meta.url).href,
      price: 0,
      quantity: 0,
      subtotal: 0,
      audio: '',
      reviews: [],
      reviewCount: 0,
      tag: 'New',
      cat: ['Singles'],
      desc: 'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.'
    },
    {
      id: 23,
      title: 'Ein Kemo Tatte',
      artist: 'Yidi Bialostozky',
      img: new URL('@/assets/img/Bialostozky/Bialostozky.webp', import.meta.url).href,
      price: 0,
      quantity: 0,
      subtotal: 0,
      audio: new URL ('@/assets/img/Bialostozky/vezakeynu.mp3', import.meta.url).href,
      reviews: [],
      reviewCount: 0,
      tag: 'New',
      cat: ['Singles'],
      desc: 'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.'
    },
    {
      id: 24,
      title: 'A Yiddish Tantz 2',
      artist: 'Sruly Green',
      img: new URL('@/assets/img/greenS/tantz.webp', import.meta.url).href,
      price: 2,
      quantity: 0,
      subtotal: 0,
      audio: new URL ('@/assets/img/Bialostozky/vezakeynu.mp3', import.meta.url).href,
      reviews: [],
      reviewCount: 0,
      tag: 'New',
      cat: ['Singles'],
      desc: 'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.'
    },
    {
      id: 25,
      title: 'Galgalim',
      artist: 'Yaakov Shwekey',
      img: new URL('@/assets/img/Shwekey/Galgalim.webp', import.meta.url).href,
      price: 2,
      quantity: 0,
      subtotal: 0,
      audio: '',
      reviews: [],
      reviewCount: 0,
      tag: 'New',
      cat: ['Singles'],
      desc: 'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.'
    },
    {
      id: 26,
      title: 'Kaddish',
      artist: 'Yaakov Shwekey',
      img: new URL('@/assets/img/Shwekey/11.webp', import.meta.url).href,
      price: 2,
      quantity: 0,
      subtotal: 0,
      audio: '',
      reviews: [],
      reviewCount: 0,
      tag: 'New',
      cat: ['Singles'],
      desc: 'when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
    },
    {
      id: 27,
      title: 'Shabesdig',
      artist: 'Ahrele Samet',
      img: new URL('@/assets/img/ahrela/shabesdig.jpg', import.meta.url).href,
      price: 19,
      quantity: 0,
      subtotal: 0,
      audio: new URL('@/assets/img/ahrela/Chanina.mp3', import.meta.url).href,
      reviews: [],
      reviewCount: 0,
      tag: '',
      cat: ['Other'],
      desc: 'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.'
    },
    {
      id: 28,
      title: 'Keine hora',
      artist: 'Lipa Shmeltzer',
      img: new URL('@/assets/img/lipa/Keinehora.jfif', import.meta.url).href,
      price: 10,
      quantity: 0,
      subtotal: 0,
      audio: new URL('@/assets/img/lipa/Keinehora.mp3', import.meta.url).href,
      reviews: [],
      reviewCount: 0,
      tag: '',
      cat: ['Other'],
      desc: 'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.'
    },
    {
      id: 29,
      title: 'Bav Lipa',
      artist: 'Lipa Shmeltzer',
      img: new URL('@/assets/img/lipa/bavlipa_2.webp', import.meta.url).href,
      price: 15,
      quantity: 0,
      subtotal: 0,
      audio: '',
      reviews: [],
      reviewCount: 0,
      tag: '',
      cat: ['Other'],
      desc: 'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.'
    },
    {
      id: 30,
      title: 'Nissim',
      artist: 'Shlomy Gertner',
      img: new URL('@/assets/img/sGertner/nisim.jfif', import.meta.url).href,
      price: 19,
      quantity: 0,
      subtotal: 0,
      audio: new URL('@/assets/img/sGertner/nisim.mp3', import.meta.url).href,
      reviews: [],
      reviewCount: 0,
      tag: '',
      cat: ['Other'],
      desc: 'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.'
    },
    {
      id: 31,
      title: 'Ahavat Olam',
      artist: 'Yaakov Shwekey',
      img: new URL('@/assets/img/Shwekey/Shwekey.webp', import.meta.url).href,
      price: 5,
      quantity: 0,
      subtotal: 0,
      audio: '',
      reviews: [],
      reviewCount: 0,
      tag: '',
      cat: ['Other'],
      desc: 'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.'
    },
    {
      id: 32,
      title: 'Ahrele',
      artist: 'Ahrele Samet',
      img: new URL('@/assets/img/ahrela/Ahrele.webp', import.meta.url).href,
      price: 15,
      quantity: 0,
      subtotal: 0,
      audio: new URL('@/assets/img/ahrela/uleini.mp3', import.meta.url).href,
      reviews: [],
      reviewCount: 0,
      tag: '',
      cat: ['Other'],
      desc: 'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.'
    },
    {
      id: 33,
      title: 'Project X',
      artist: 'Ahrele Samet',
      img: new URL('@/assets/img/ahrela/Chassidishe.webp', import.meta.url).href,
      price: 12,
      quantity: 0,
      subtotal: 0,
      audio: '',
      reviews: [],
      reviewCount: 0,
      tag: '',
      cat: ['Other'],
      desc: 'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.'
    },
    {
      id: 34,
      title: 'Touched By A Niggun',
      artist: 'Baruch Levine',
      img: new URL('@/assets/img/BaruchL/niggun.jpg', import.meta.url).href,
      price: 12,
      quantity: 0,
      subtotal: 0,
      audio: new URL ('@/assets/img/BaruchL/niggun.mp3', import.meta.url).href,
      reviews: [],
      reviewCount: 0,
      tag: '',
      cat: ['Other'],
      desc: 'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.'
    },
    {
      id: 35,
      title: 'Shabbos Yeshiva',
      artist: 'Naftali Kempeh',
      img: new URL('@/assets/img/Kempeh/Shabbos.jpg', import.meta.url).href,
      price: 15,
      quantity: 0,
      subtotal: 0,
      audio: '',
      reviews: [],
      reviewCount: 0,
      tag: '',
      cat: ['Other'],
      desc: 'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.'
    },
    {
      id: 36,
      title: 'Those Were The Days',
      artist: 'Yaakov Shwekey',
      img: new URL('@/assets/img/Shwekey/twtdbookletfnl_2.webp', import.meta.url).href,
      price: 18,
      quantity: 0,
      subtotal: 0,
      audio: '',
      reviews: [],
      reviewCount: 0,
      tag: '',
      cat: ['Other'],
      desc: 'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.'
    },
    {
      id: 37,
      title: 'Tzeakah',
      artist: 'Mbd',
      img: new URL('@/assets/img/Mbd/coverTzaakah.webp', import.meta.url).href,
      price: 10,
      quantity: 0,
      subtotal: 0,
      audio: '',
      reviews: [],
      reviewCount: 0,
      tag: '',
      cat: ['Other'],
      desc: 'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested.The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.'
    },
    {
      id: 38,
      title: 'Kumzing 3',
      artist: 'Mbd',
      img: new URL('@/assets/img/Mbd/Kumzing.webp', import.meta.url).href,
      price: 50,
      quantity: 0,
      subtotal: 0,
      audio: '',
      reviews: [],
      reviewCount: 0,
      tag: '',
      cat: ['Other'],
      desc: 'Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested.The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.'
    },
    {
      id: 39,
      title: 'Avira DEretz Yisroel',
      artist: 'Ahrele Samet',
      img: new URL('@/assets/img/ahrela/avira_samet.webp', import.meta.url).href,
      price: 17,
      quantity: 0,
      subtotal: 0,
      audio: '',
      reviews: [],
      reviewCount: 0,
      tag: '',
      cat: ['Other'],
      desc: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante.'
    }           
  ])
  
  const cart = ref([]);
  const CartCount = ref (0)
  const itemAdded = ref(false)
  const listCount = ref (0)
  const favorites = ref ([])
  const searchedText = ref ('')

  const options = ref([
    {
      id: 1,
      name: 'Title'
    },
    {
      id: 2,
      name: 'Artist'
    }
  ]);

  const shipRate = ref('');
  const checks = ref ([])
  const selectedDetailId = ref(null)

  const selectedFav = ref(null)
  const selectedAlbumToDelete = ref(null)

  const NewAlbumError = ref(false)
  const sorted = ref(['A to Z', 'Price: High to Low', 'Price: Low to High'])
  const sortedSelected = ref('')

  const albumTitle = ref (['Featured', 'Singles', 'Other']);

  const selectedFilterCat = ref('Featured')

  const minPrice = ref('');
  const maxPrice = ref('');

  const filteredMusic = computed(() => {
    return albums.value.sort((a, b) => {
        if(sortedSelected.value == 'A to Z'){
          return a.title.toLowerCase().localeCompare(b.title.toLowerCase())
        }
        if(sortedSelected.value == 'Price: High to Low'){
          return b.price - a.price
        }
        if(sortedSelected.value == 'Price: Low to High'){
          return a.price - b.price
        }
    }).filter(item => selectedFilterCat.value == '' || item.cat.includes(selectedFilterCat.value) &&
      item.title.toLowerCase().includes(searchedText.value.trim().toLocaleLowerCase()) &&
      (!minPrice.value || item.price >= Number(minPrice.value)) && (!maxPrice.value || item.price <= Number(maxPrice.value)) &&
      (checks.value.length === 0 || checks.value.includes(item.artist))
    )
  })
  
  // watch(minPrice.value, (newVal, oldVal) => {
 
  // })
  
  const allArtists = computed(() => {
    const names = ref(albums.value.filter((itm) => itm.cat.includes(selectedFilterCat.value || selectedFilterCat.value == '')).map(item => item.artist))
    return [...new Set(names.value)]; 
    })
   
  const artistCounts = computed(() => {
    const counts = {};
    albums.value.filter(itm => itm.cat.includes(selectedFilterCat.value)).forEach(album => {
      counts[album.artist] = (counts[album.artist] || 0) + 1;
    });
    return counts;
  });

  // const homeAlbums = ref(albums.value.slice(0, 9));

  const slicedAlbums = computed(() => {
    return albums.value.slice(0, 9).filter(item => item.title.toLowerCase().includes(searchedText.value.toLocaleLowerCase()))
  })

  const view = ref ('grid')

  const rate = ref([1, 2, 3, 4, 5]);
  const rating = ref('')

const billing = ref ([])
const shipping = ref ([])
const shipDetails = ref (false)

const bigImage = ref (false)

const favSolid = ref('fas')
const favRegular = ref('far')

const card = ref([])
const completed = ref([]) 

const ordered = ref([])

const itemDetailsforReviews = ref (null)

const fieldsToEdit = ref(false);
let editText = ref(null)

let selectedAlbum = ref ([]);

  return { minPrice, maxPrice, selectedAlbumToDelete, view, NewAlbumError, albumTitle, selectedFilterCat, selectedAlbum, editText, fieldsToEdit, rate, rating, artistCounts, slicedAlbums, itemDetailsforReviews, ordered, allArtists, favSolid, favRegular, shipRate, bigImage, card, shipDetails, shipping, billing, completed, sorted, sortedSelected, completed, albums, selectedFav, itemAdded, checks, listCount, selectedDetailId, CartCount, favorites, options, searchedText, filteredMusic, cart }
})
