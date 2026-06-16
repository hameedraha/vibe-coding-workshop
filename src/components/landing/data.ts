import {
  Award,
  Calendar,
  Clock,
  Coffee,
  Gift,
  GraduationCap,
  Library,
  MapPin,
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
import leoPhoto from "@/assets/leo.jpeg";

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
}> = [
  {
    icon: GraduationCap,
    title: "Live with all 3 instructors",
    desc: "One room. One flow. Real-time feedback while you build.",
    className: "md:col-span-2",
  },
  { icon: Gift, title: "Lovable Pro", desc: "1 month included.", className: "" },
  {
    icon: Library,
    title: "Prompt library",
    desc: "Battle-tested prompts and frameworks.",
    className: "",
  },
  {
    icon: Megaphone,
    title: "Build -> Launch clarity",
    desc: "From product thinking to first users with a practical GTM path.",
    className: "md:col-span-2",
  },
  { icon: Award, title: "Certificate", desc: "Physical certificate (verifiable).", className: "" },
  {
    icon: Users,
    title: "Builder community",
    desc: "Access to AI:BN network after the workshop.",
    className: "",
  },
  {
    icon: Coffee,
    title: "Snacks & refreshments",
    desc: "Stay in flow for the full 4-hour sprint.",
    className: "md:col-span-2",
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

export const SPONSORS = [
  { name: "Paperflite", logo: "https://logo.clearbit.com/paperflite.com" },
  {
    name: "Lovable",
    logo: "https://images.seeklogo.com/logo-png/61/1/lovable-logo-png_seeklogo-618223.png",
    logoClass: "h-7 w-auto object-contain",
  },
  { name: "Razorpay", logo: "https://logo.clearbit.com/razorpay.com" },
  { name: "Notion", logo: "https://logo.clearbit.com/notion.so" },
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
  { icon: Calendar, label: "Date", value: "27 June 2026" },
  { icon: Clock, label: "Duration", value: "4-Hour Intensive" },
  {
    icon: MapPin,
    label: "Location",
    value: "Paperflite: 383, 1st Cross St, Nehru Nagar, Perungudi, Chennai, Tamil Nadu 600041",
  },
  { icon: Coffee, label: "Included", value: "Light Snacks & Refreshments" },
];

export const BRING_ITEMS = ["Your laptop", "An idea you want to build", "4 focused hours"];

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
