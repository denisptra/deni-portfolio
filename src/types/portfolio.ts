export interface NavItem {
  label: string;
  href: string;
}

export interface HeroData {
  name: string;
  headline: string;
  subheadline: string;
  badges: string[];
  avatarUrl?: string;
}

export interface AboutData {
  bio: string[];
  stats: StatItem[];
}

export interface StatItem {
  value: string;
  label: string;
}

export interface Skill {
  name: string;
  icon?: string;
}

export interface SkillCategory {
  title: string;
  icon: string;
  skills: Skill[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  techStack: string[];
  role: string;
  features?: string[];
  category: ProjectCategory;
  liveUrl?: string;
  githubUrl?: string;
  imageUrl?: string;
  featured?: boolean;
}

export type ProjectCategory = "All" | "Web App" | "Dashboard" | "UI/UX" | "Design";

export interface Experience {
  id: string;
  position: string;
  company: string;
  period: string;
  description: string[];
  tools: string[];
  type: "work" | "organization" | "freelance";
}

export interface Certificate {
  id: string;
  name: string;
  issuer: string;
  year: string;
  url?: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

export interface ContactInfo {
  email: string;
  phone?: string;
  whatsapp?: string;
  location: string;
  socialLinks: SocialLink[];
}

export interface PortfolioData {
  nav: NavItem[];
  hero: HeroData;
  about: AboutData;
  skillCategories: SkillCategory[];
  projects: Project[];
  experiences: Experience[];
  certificates: Certificate[];
  contact: ContactInfo;
}
