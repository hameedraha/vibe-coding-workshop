import {
  Award,
  Calendar,
  Clock,
  Coffee,
  Gift,
  GraduationCap,
  Library,
  MapPin,
  MessageCircle,
  Megaphone,
  Rocket,
  Sparkles,
  Target,
  Users,
  Wrench,
  type LucideIcon,
} from "lucide-react";

import hameedPhoto from "@/assets/hameed.jpeg";
import hariPhoto from "@/assets/hari.png";
import leoPhoto from "@/assets/leo.png";
import doingThingsAiLogo from "@/assets/doing-things-ai-community.png";
import icrewsystemsLogo from "@/assets/icrewsystems-logo.png";
import lovableIconDark from "@/assets/lovable-icon-bg-dark.png";
import paperfliteWordmark from "@/assets/paperflite-wordmark.png";
import sayaboutusWordmark from "@/assets/sayaboutus-wordmark.png";

export type Speaker = {
  ring: "r1" | "r2" | "r3";
  photo: string;
  name: string;
  role: string;
  tagline: string;
  bio: string;
  points: string[];
  videos: string[];
  linkedin: string;
};

export type Testimonial = {
  name: string;
  title: string;
  img: string;
  linkedin: string;
  highlight: string;
  body: string;
};

export const HERO_MARQUEE_ITEMS = [
  "AI Vibe Coding",
  "★",
  "The Right Way",
  "★",
  "Build the right thing",
  "★",
  "Build it the right way",
  "★",
  "Take it to the right people",
  "★",
  "Chennai · 27 June 2026",
  "★",
];

export const LEARN_BLOCKS: Array<{
  icon: LucideIcon;
  step: string;
  title: string;
  desc: string;
  tone: "identify" | "validate" | "build" | "launch";
}> = [
  {
    icon: Target,
    step: "01",
    title: "Identify",
    desc: "Find real problems worth solving — not problems you invent to use a cool tool.",
    tone: "identify",
  },
  {
    icon: Sparkles,
    step: "02",
    title: "Validate",
    desc: "Pressure-test customer pain points before you write a single prompt.",
    tone: "validate",
  },
  {
    icon: Wrench,
    step: "03",
    title: "Build",
    desc: "Use AI tools to rapidly ship a Minimum Lovable Product — not just an MVP.",
    tone: "build",
  },
  {
    icon: Rocket,
    step: "04",
    title: "Launch",
    desc: "Position, price, and get your first real customers using a practical go-to-market plan.",
    tone: "launch",
  },
];

export const WORKSHOP_BENEFITS: Array<{
  icon: LucideIcon;
  title: string;
  desc: string;
  className: string;
  valueInr?: number;
  valueEstimated?: boolean;
  logo?: string;
  logoClassName?: string;
}> = [
  {
    icon: Gift,
    title: "Lovable Credits (300)",
    desc: "Build and iterate without hitting free-plan limits. Equivalent usage would otherwise cost about $20 USD/month for similar capacity.",
    valueInr: 7000,
    logo: lovableIconDark.src,
    className: "min-h-[280px]",
    logoClassName: "h-14 w-14 rounded-xl object-cover ring-1 ring-white/15",
  },
  {
    icon: Library,
    title: "Prompt Library + Build Stack",
    desc: "Ship faster with proven prompts, 100+ website design references, and ready n8n automations for your Minimum Lovable Product.",
    className: "min-h-[240px]",
  },
  {
    icon: MessageCircle,
    title: "SayAboutUs Credits",
    desc: "Collect fast, actionable feedback for your product using SayAboutUs credits included with your workshop access.",
    valueInr: 8500,
    valueEstimated: true,
    logo: sayaboutusWordmark.src,
    className: "min-h-[260px]",
    logoClassName: "h-8 w-auto max-w-[124px] rounded-md object-contain object-left",
  },
  {
    icon: Users,
    title: "AI Builders Network Access",
    desc: "Get unstuck fast in a private Telegram group with active builders sharing feedback, tools, and launch lessons.",
    className: "min-h-[220px]",
  },
  {
    icon: Award,
    title: "Physical Launch Certificate",
    desc: "Show credible proof that you launched. Share digitally verifiable credentials with recruiters, clients, and your network.",
    className: "min-h-[220px]",
  },
  {
    icon: Megaphone,
    title: "Vibe Coder Swag Stickers",
    desc: "Signal that you build in public. Use the sticker pack as social proof and a conversation starter with other makers.",
    className: "min-h-[240px]",
  },
];

export const SPEAKERS: Speaker[] = [
  {
    ring: "r1",
    photo: hameedPhoto.src,
    name: "Hameed",
    role: "The Why",
    tagline: "Product Thinking Before Product Building",
    bio: "20+ years as a product builder with Silicon Valley experience. Gartner recognized.",
    points: [
      "How to identify real problems worth solving",
      "How to avoid building products nobody wants",
      "How to validate customer pain points",
    ],
    videos: [
      "https://www.youtube.com/watch?v=e58uJOLVRns",
      "https://www.youtube.com/watch?v=zgyu2D6HH-8",
    ],
    linkedin: "https://www.linkedin.com/in/hameedraha",
  },
  {
    ring: "r2",
    photo: leoPhoto.src,
    name: "Leo",
    role: "The How",
    tagline: "Building the Minimum Lovable Product",
    bio: "10+ years building world-class, process-driven products. 3x award winner for Innovation in Technology.",
    points: [
      "How to use AI tools to rapidly build products",
      "How to structure a vibe coding workflow",
      "How to ship launch-ready products with process",
    ],
    videos: [
      "https://www.youtube.com/watch?v=66N6DdSAGew",
      "https://www.youtube.com/watch?v=NQFyhARc7QY",
    ],
    linkedin: "https://www.linkedin.com/in/leonardselvaraja/",
  },
  {
    ring: "r3",
    photo: hariPhoto.src,
    name: "Hari",
    role: "The Who",
    tagline: "Taking Your Product to Customers",
    bio: "12+ years of digital product marketing expertise.",
    points: [
      "How to identify the right customer segment",
      "How to position your product clearly",
      "How to get your first users or customers",
    ],
    videos: ["https://www.youtube.com/watch?v=2thtPgdX0ok"],
    linkedin: "https://www.linkedin.com/in/imharikumaran/",
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Arjun Mehta",
    title: "Founder, Stackline",
    img: "https://i.pravatar.cc/400?img=12",
    linkedin: "https://linkedin.com",
    highlight: "I shipped a paying product in a weekend — something I'd been stuck on for a year.",
    body: "I came in skeptical. I'd done a dozen AI courses. This was different — they made me throw away my idea on day one and rebuild it around an actual customer.",
  },
  {
    name: "Priya Raghavan",
    title: "PM, FinEdge",
    img: "https://i.pravatar.cc/400?img=47",
    linkedin: "https://linkedin.com",
    highlight: "Hameed's framing on problem-first thinking rewired how I scope every project now.",
    body: "Leo's build flow is the fastest I've seen, and Hari pulled my GTM out of vibes into something I could defend in a room.",
  },
  {
    name: "Karthik Subramanian",
    title: "Indie Hacker",
    img: "https://i.pravatar.cc/400?img=33",
    linkedin: "https://linkedin.com",
    highlight: "Four hours that paid me back ten-fold in the next two weeks.",
    body: "The prompt library alone is worth the ticket. The community is the real bonus — I'm still shipping with people I met that day.",
  },
  {
    name: "Sneha Iyer",
    title: "Designer turned Founder",
    img: "https://i.pravatar.cc/400?img=45",
    linkedin: "https://linkedin.com",
    highlight: "Stopped learning AI and started shipping with it the same evening.",
    body: "The structure — Why, How, Who — is genuinely the right order, and nobody else teaches it this way.",
  },
  {
    name: "Rahul Krishnan",
    title: "Engineer, Razorpay",
    img: "https://i.pravatar.cc/400?img=15",
    linkedin: "https://linkedin.com",
    highlight: "I stopped writing throwaway side projects. Now I ship things people pay for.",
    body: "The combination of product thinking + AI build flow + GTM is what every dev course is missing.",
  },
  {
    name: "Ananya Pillai",
    title: "Solo Founder",
    img: "https://i.pravatar.cc/400?img=49",
    linkedin: "https://linkedin.com",
    highlight:
      "Got my first 10 paying customers in 12 days using the GTM template from the session.",
    body: "I came in with nothing. I left with a product, a price, and a plan. That's wild for 4 hours.",
  },
  {
    name: "Vikram Shenoy",
    title: "Product Lead",
    img: "https://i.pravatar.cc/400?img=22",
    linkedin: "https://linkedin.com",
    highlight: "Best ROI I've ever had on a workshop ticket — by a wide margin.",
    body: "I sent two of my PMs the next month. They both came back shipping faster than the engineers.",
  },
  {
    name: "Meera Joseph",
    title: "Founder, Cohort",
    img: "https://i.pravatar.cc/400?img=44",
    linkedin: "https://linkedin.com",
    highlight: "Finally a workshop that respects your time and your money.",
    body: "Zero fluff. Hands on the keyboard within 20 minutes. Three frameworks I still use every week.",
  },
  {
    name: "Naveen Kumar",
    title: "CTO, early-stage SaaS",
    img: "https://i.pravatar.cc/400?img=53",
    linkedin: "https://linkedin.com",
    highlight: "I rewired our entire prototyping workflow the week after.",
    body: "Our PRD-to-prototype loop went from 3 weeks to 3 days. Genuinely changed how our team operates.",
  },
];

export type Sponsor = {
  name: string;
  logo?: string;
  logoClass?: string;
  href?: string;
};

export const SPONSORS: Sponsor[] = [
  {
    name: "iCrewSystems",
    logo: icrewsystemsLogo.src,
    logoClass: "h-8 w-auto max-w-[148px] object-contain",
    href: "https://icrewsystems.com",
  },
  {
    name: "SayAboutUs",
    logo: sayaboutusWordmark.src,
    logoClass: "h-8 w-auto max-w-[124px] rounded-md object-contain",
    href: "https://sayabout.us",
  },
  {
    name: "Cloud Engine Labs",
    href: "https://www.cloudenginelabs.io/",
  },
  {
    name: "HoldYourVoice",
    href: "https://holdyourvoice.com/",
  },
  {
    name: "Wepix AI",
    href: "https://www.wepix.in/business/ai-agents",
  },
  {
    name: "Proof by Zero Maintenance Engineers",
    href: "https://proof.zeromaintenanceengineer.in/",
  },
  {
    name: "Paperflite",
    logo: paperfliteWordmark.src,
    logoClass: "h-8 w-auto max-w-[140px] rounded-md object-contain",
    href: "https://www.paperflite.com/",
  },
  {
    name: "Doing Things AI",
    logo: doingThingsAiLogo.src,
    logoClass:
      "w-[148px] h-auto max-h-14 object-contain opacity-90 transition-opacity group-hover:opacity-100",
  },
  {
    name: "AI Builders Network",
    href: "https://aibn.in",
  },
];

export const FIT_AUDIENCE = [
  "You are a founder, entrepreneur, product manager, developer, student, freelancer, consultant, or business owner.",
  "You have an idea and want to turn it into a real product using AI.",
  "You are ready to do hands-on work, think clearly, and build with direction.",
  "You care about customers, markets, execution, and practical product thinking.",
  "You want to understand how AI can speed up product building without losing strategy.",
];

export const SKIP_AUDIENCE = [
  "You want passive theory without doing any hands-on work.",
  "You expect AI to magically build a business for you.",
  "You do not want to think about customers, markets, or real problems.",
  "You are only looking for a generic coding class.",
  "You want shortcuts without execution, clarity, or product discipline.",
];

export const EVENT_DETAILS: Array<{ icon: LucideIcon; label: string; value: string }> = [
  { icon: Calendar, label: "When", value: "27 June 2026 · Saturday · 4 hours" },
  {
    icon: MapPin,
    label: "Where",
    value: "Paperflite: 383, 1st Cross St, Nehru Nagar, Perungudi, Chennai, Tamil Nadu 600041",
  },
  {
    icon: Coffee,
    label: "What",
    value: "Live intensive workshop, practical frameworks, and snacks + refreshments.",
  },
  {
    icon: Users,
    label: "Who",
    value: "Founders, PMs, developers, students, freelancers, and operators building with AI.",
  },
];

export const BRING_ITEMS = [
  "Your laptop",
  "An idea you're excited to build",
  "4 focused hours of your time",
];

export const PRICING_INCLUDES = [
  "4-hour live workshop with Hameed, Leo & Hari",
  "Full playbook: identify → validate → build → launch",
  "Lovable credits (300) to ship your MLP",
  "Prompt library, design refs & n8n templates",
  "SayAboutUs credits for product feedback",
  "AI Builders Network community access",
  "Physical launch certificate + vibe coder swag",
  "Snacks and refreshments on the day",
];

export const toYouTubeEmbedUrl = (url: string) => {
  try {
    const parsed = new URL(url);
    let id: string | null = null;
    if (parsed.hostname.includes("youtu.be")) {
      id = parsed.pathname.replace("/", "");
    }
    if (parsed.hostname.includes("youtube.com")) {
      id = parsed.searchParams.get("v");
    }
    if (!id) return url;

    const embed = new URL(`https://www.youtube.com/embed/${id}`);
    embed.searchParams.set("rel", "0");
    embed.searchParams.set("modestbranding", "1");
    embed.searchParams.set("playsinline", "1");
    embed.searchParams.set("vq", "hd1080");
    return embed.toString();
  } catch {
    return url;
  }
};

export type FAQ = {
  question: string;
  answer: string;
};

export const FAQ_ITEMS: FAQ[] = [
  {
    question: "Will recordings be provided after the workshop?",
    answer:
      "No. This is a live, in-person workshop only. No recordings will be provided. You have to be there to get the full experience. The hands-on interactions, real-time feedback, and in-room energy cannot be replicated on video.",
  },
  {
    question: "Can I redeem the Lovable credits and other perks if I don't attend?",
    answer:
      "No. All credits, perks, and deliverables, including Lovable credits (300), SayAboutUs credits, the prompt library, design references, n8n templates, and the launch certificate, can only be redeemed by attendees who are present at the workshop. No-shows forfeit all included benefits.",
  },
  {
    question: "How do I redeem the Lovable credits?",
    answer:
      "Lovable credits (300) can only be redeemed by attendees present at the workshop. You will receive a redemption code during the session. Credits are non-transferable and must be claimed on the day of the event.",
  },
  {
    question: "How do I redeem the SayAboutUs credits?",
    answer:
      "Like the Lovable credits, SayAboutUs credits are only available to attendees who are present at the workshop. A redemption link will be shared during the session. These credits cannot be claimed after the event.",
  },
  {
    question: "When will I receive the Prompt Library and Build Stack?",
    answer:
      "All digital resources, including the Prompt Library, design references, and n8n automation templates, will be shared at the end of the workshop session. You must be present to receive access.",
  },
  {
    question: "Is this workshop for beginners?",
    answer:
      "Yes, but you should be ready to do hands-on work. The workshop is designed for anyone who wants to build products with AI, regardless of technical background. If you can use a laptop and are eager to learn, you'll be fine.",
  },
  {
    question: "What if I can't attend on 27 June?",
    answer:
      "Seats are limited and tickets are non-refundable unless the event is cancelled by the organisers. We recommend checking your availability before booking. If you have a genuine emergency, reach out to us and we'll try to help.",
  },
  {
    question: "Will food and refreshments be provided?",
    answer:
      "Yes. Snacks and refreshments are included with your ticket. If you have dietary restrictions, let us know when we reach out to confirm your registration.",
  },
  {
    question: "Can I get a refund?",
    answer:
      "Refunds are only available if the event is cancelled by the organisers. In that case, refunds will be processed within 14 business days. Seats are first come, first served and your payment confirms your spot.",
  },
];
